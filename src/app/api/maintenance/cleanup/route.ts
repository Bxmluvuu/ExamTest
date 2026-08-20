import { NextResponse } from 'next/server';
import { cleanupOldExamAttempts, DATA_RETENTION_DAYS } from '@/lib/db-adapter';

export async function POST() {
  try {
    const result = await cleanupOldExamAttempts(DATA_RETENTION_DAYS);
    return NextResponse.json({
      success: true,
      message: `Cleaned up exam history older than ${DATA_RETENTION_DAYS} days`,
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Cleanup failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
