import { NextRequest, NextResponse } from 'next/server';
import { createNoteSchema } from '@/lib/zod';
import { rateLimit } from '@/lib/ratelimit';
import { prisma } from '@/lib/db';
import { randomBytes } from 'crypto';
import { encryptMetadata } from '@/lib/metadata-encryption';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const validated = createNoteSchema.parse(body);

    // Decode base64
    const ciphertext = Buffer.from(validated.ciphertext, 'base64');
    const iv = Buffer.from(validated.iv, 'base64');

    // Handle password protection fields
    let encryptedKey: Buffer | null = null;
    let keyIv: Buffer | null = null;
    let salt: Buffer | null = null;

    if (validated.isProtected && validated.encryptedKey && validated.keyIv && validated.salt) {
      encryptedKey = Buffer.from(validated.encryptedKey, 'base64');
      keyIv = Buffer.from(validated.keyIv, 'base64');
      salt = Buffer.from(validated.salt, 'base64');
    }

    // Validate payload size (~64KB)
    if (ciphertext.length > 65536) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const expiresAt = validated.duration ? new Date(Date.now() + validated.duration * 60 * 1000) : null;
    const destroyToken = randomBytes(32).toString('hex');

    console.log('Create API - Validated data:', validated);
    console.log('Create API - Title to encrypt:', validated.title);

    // Encrypt metadata fields
    const [encryptedTitle, encryptedAuthorName, encryptedAuthorEmail] = await Promise.all([
      validated.title ? encryptMetadata(validated.title) : null,
      validated.authorName ? encryptMetadata(validated.authorName) : null,
      validated.authorEmail ? encryptMetadata(validated.authorEmail) : null,
    ]);

    console.log('Create API - Metadata to encrypt:', {
      title: validated.title,
      authorName: validated.authorName,
      authorEmail: validated.authorEmail
    });
    console.log('Create API - Encrypted results:', {
      encryptedTitle,
      encryptedAuthorName,
      encryptedAuthorEmail
    });

    // Try to create note with new fields, fallback to old schema if migration not done
    let note;
    try {
      note = await prisma.note.create({
        data: {
          titleEncrypted: encryptedTitle ? Buffer.from(encryptedTitle) : null,
          ciphertext,
          iv,
          remainingReads: validated.maxReads,
          expiresAt,
          destroyToken,
          isProtected: validated.isProtected || false,
          encryptedKey,
          keyIv,
          salt,
          images: validated.images ? JSON.stringify(validated.images) : null,
          authorNameEncrypted: encryptedAuthorName ? Buffer.from(encryptedAuthorName) : null,
          authorEmailEncrypted: encryptedAuthorEmail ? Buffer.from(encryptedAuthorEmail) : null,
          viewCount: 0,
          maxViews: validated.maxViews || null,
        },
      });
    } catch (migrationError) {
      // Fallback for non-migrated database
      console.warn('Database migration not applied, using fallback schema:', migrationError);
      note = await prisma.note.create({
        data: {
          titleEncrypted: encryptedTitle ? Buffer.from(encryptedTitle) : null,
          ciphertext,
          iv,
          remainingReads: validated.maxReads,
          expiresAt,
          destroyToken,
          isProtected: validated.isProtected || false,
          encryptedKey,
          keyIv,
          salt,
          images: validated.images ? JSON.stringify(validated.images) : null,
          authorNameEncrypted: encryptedAuthorName ? Buffer.from(encryptedAuthorName) : null,
          authorEmailEncrypted: encryptedAuthorEmail ? Buffer.from(encryptedAuthorEmail) : null,
        },
      });
    }

    return NextResponse.json({ id: note.id });
  } catch (error) {
    console.error('Create note error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
