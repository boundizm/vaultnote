import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  // Simple auth: check for a secret query param
  const auth = request.nextUrl.searchParams.get('auth');
  if (auth !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();

    // Delete expired notes
    const expired = await prisma.note.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: now } },
          { remainingReads: { lte: 0 } },
        ],
      },
    });

    return NextResponse.json({ deleted: expired.count });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}
