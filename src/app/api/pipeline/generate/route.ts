import { NextResponse } from 'next/server';
import { generateQuestionsWithAi } from '@/lib/ai-adapter';
import { getServerProfile } from '@/lib/auth/session';

export async function POST(request: Request) {
  try {
    // 1. Server-side Admin Authorization Guard
    const profile = await getServerProfile();
    if (!profile || profile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required to invoke generation pipeline' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { subjectName, chapterTitle, topicTitle, documentFileName, documentPages, count } = body;

    if (!subjectName || !chapterTitle || !topicTitle) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const aiResponse = await generateQuestionsWithAi({
      subjectName,
      chapterTitle,
      topicTitle,
      documentFileName: documentFileName || 'chapter-01.pdf',
      documentPages: documentPages || [
        { pageNumber: 1, text: 'Core principles of database and relational concepts.' }
      ],
      count: count || 5,
    });

    return NextResponse.json({
      success: true,
      questions: aiResponse.questions,
      modelUsed: aiResponse.modelUsed,
      tokensUsed: aiResponse.tokensUsed,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Generation failed' }, { status: 500 });
  }
}
