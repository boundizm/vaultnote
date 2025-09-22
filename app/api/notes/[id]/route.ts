import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getNoteSchema, deleteNoteSchema } from '@/lib/zod';
import { rateLimit } from '@/lib/ratelimit';
import { decryptMetadata } from '@/lib/metadata-encryption';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { id } = await params;
    const { id: validatedId } = getNoteSchema.parse({ id });

    let note;
    
    // Get note with all fields
    note = await prisma.note.findUnique({
      where: { id: validatedId },
    });

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    // Check if expired
    if (note.expiresAt && note.expiresAt < new Date()) {
      await prisma.note.delete({ where: { id: validatedId } });
      return NextResponse.json({ error: 'Note expired' }, { status: 410 });
    }

    // Check remaining reads
    if (note.remainingReads !== null && note.remainingReads <= 0) {
      await prisma.note.delete({ where: { id: validatedId } });
      return NextResponse.json({ error: 'Note consumed' }, { status: 410 });
    }

    // Increment view count
    await prisma.note.update({
      where: { id: validatedId },
      data: {
        viewCount: { increment: 1 },
      },
    });

    // Decrement remaining reads if set
    if (note.remainingReads !== null) {
      await prisma.note.update({
        where: { id: validatedId },
        data: {
          remainingReads: note.remainingReads - 1,
          consumedAt: note.remainingReads - 1 === 0 ? new Date() : null,
        },
      });
    }

    const remainingReadsPreview = note.remainingReads !== null ? note.remainingReads - 1 : null;

    return NextResponse.json({
      title: note.titleEncrypted ? await decryptMetadata(note.titleEncrypted) : null,
      ciphertext: note.ciphertext,
      iv: note.iv,
      remainingReadsPreview,
      isProtected: note.isProtected,
      encryptedKey: note.encryptedKey || null,
      keyIv: note.keyIv || null,
      salt: note.salt || null,
      images: note.images ? JSON.parse(note.images) : null,

      // Author information (decrypted from encrypted fields)
      authorName: note.authorNameEncrypted ? await decryptMetadata(note.authorNameEncrypted) : 'Anonymous',
      authorEmail: note.authorEmailEncrypted ? await decryptMetadata(note.authorEmailEncrypted) : '',

      // View tracking
      createdAt: note.createdAt.toISOString(),
      expiresAt: note.expiresAt?.toISOString() || null,
      viewCount: note.viewCount,
      maxViews: note.maxViews,
    });
  } catch (error) {
    console.error('Get note error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { id } = await params;
    const { id: validatedId, token } = deleteNoteSchema.parse({ id, ...body });

    const note = await prisma.note.findUnique({
      where: { id: validatedId },
    });

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    // Check token if provided
    if (token && note.destroyToken !== token) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    await prisma.note.delete({ where: { id: validatedId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete note error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
