import type { ExamAttempt, AttemptAnswer, Subject, Question, UserAnalyticsSummary } from './types/database';

export function computeUserAnalytics(
  userId: string,
  attempts: ExamAttempt[],
  answers: AttemptAnswer[],
  subjects: Subject[],
  allQuestions: Question[]
): UserAnalyticsSummary {
  const userAttempts = attempts.filter(a => a.user_id === userId);
  const completedAttempts = userAttempts.filter(a => a.status === 'submitted');

  const totalAttempts = userAttempts.length;
  const totalCompleted = completedAttempts.length;

  let totalQuestionsAnswered = 0;
  let totalCorrect = 0;
  let totalScoreSum = 0;

  for (const att of completedAttempts) {
    totalQuestionsAnswered += att.total_questions;
    totalCorrect += att.score_total;
    totalScoreSum += att.score_percentage;
  }

  const overallAccuracy = totalQuestionsAnswered > 0
    ? Number(((totalCorrect / totalQuestionsAnswered) * 100).toFixed(1))
    : 0;

  const averageScorePercentage = totalCompleted > 0
    ? Number((totalScoreSum / totalCompleted).toFixed(1))
    : 0;

  // Practice days
  const practiceDaysSet = new Set<string>();
  for (const att of userAttempts) {
    if (att.started_at) {
      practiceDaysSet.add(att.started_at.substring(0, 10));
    }
  }
  const totalPracticeDays = practiceDaysSet.size;

  // Subject Stats
  const subjectStats = subjects.map(sub => {
    const subAttempts = completedAttempts.filter(a => a.subject_id === sub.id);
    const subCorrect = subAttempts.reduce((acc, a) => acc + a.score_total, 0);
    const subTotal = subAttempts.reduce((acc, a) => acc + a.total_questions, 0);
    const subScoreSum = subAttempts.reduce((acc, a) => acc + a.score_percentage, 0);
    const avgScore = subAttempts.length > 0 ? Number((subScoreSum / subAttempts.length).toFixed(1)) : 0;
    const acc = subTotal > 0 ? Number(((subCorrect / subTotal) * 100).toFixed(1)) : 0;

    // Unique questions answered for this subject
    const subQuestions = allQuestions.filter(q => q.subject_id === sub.id);
    const subQIds = new Set(subQuestions.map(q => q.id));
    const userSubAnswers = answers.filter(ans => subQIds.has(ans.question_id));
    const uniqueAnsweredQIds = new Set(userSubAnswers.map(ans => ans.question_id));
    const coveragePercentage = sub.question_target > 0
      ? Number(Math.min(100, (uniqueAnsweredQIds.size / sub.question_target) * 100).toFixed(1))
      : 0;

    return {
      subject_id: sub.id,
      subject_name: sub.name,
      attempts_count: subAttempts.length,
      average_score: avgScore,
      total_answered: subTotal,
      accuracy: acc,
      coverage_percentage: coveragePercentage,
    };
  });

  // Topic Accuracies
  const topicMap = new Map<string, { topic: string; chapter: string; total: number; correct: number; points: number }>();
  const questionMap = new Map<string, Question>();
  for (const q of allQuestions) {
    questionMap.set(q.id, q);
  }

  for (const ans of answers) {
    const q = questionMap.get(ans.question_id);
    if (!q) continue;
    const topicKey = q.topic_title || 'General';
    const chapterName = q.chapter_title || 'General';

    const stat = topicMap.get(topicKey) || {
      topic: topicKey,
      chapter: chapterName,
      total: 0,
      correct: 0,
      points: 0,
    };

    stat.total += 1;
    const pts = ans.points_earned ?? (ans.is_correct ? 1 : 0);
    stat.points += pts;
    if (ans.is_correct) {
      stat.correct += 1;
    }
    topicMap.set(topicKey, stat);
  }

  const topicAccuracies = Array.from(topicMap.values()).map(t => {
    const pct = t.total > 0 ? Number(((t.points / t.total) * 100).toFixed(1)) : 0;
    let status: 'strong' | 'moderate' | 'weak' = 'moderate';
    if (pct >= 75) status = 'strong';
    else if (pct < 55) status = 'weak';

    return {
      topic: t.topic,
      chapter: t.chapter,
      total_answered: t.total,
      correct_count: t.correct,
      points_earned: Number(t.points.toFixed(2)),
      accuracy_percentage: pct,
      status,
    };
  });

  // Sort weak topics first
  topicAccuracies.sort((a, b) => a.accuracy_percentage - b.accuracy_percentage);

  // Score trends (sorted chronologically)
  const scoreTrends = [...completedAttempts]
    .sort((a, b) => new Date(a.started_at).getTime() - new Date(b.started_at).getTime())
    .map(a => {
      const sub = subjects.find(s => s.id === a.subject_id);
      return {
        date: a.started_at ? new Date(a.started_at).toLocaleDateString('th-TH', { day: '2-digit', month: 'short' }) : '',
        score_percentage: a.score_percentage,
        mode: a.mode,
        subject_name: sub?.name || 'Subject',
        attempt_id: a.id,
      };
    });

  // Deterministic Recommendations
  const recommendations: UserAnalyticsSummary['recommendations'] = [];

  // 1. Weakness recommendation
  const weakestTopic = topicAccuracies.find(t => t.total_answered >= 2 && t.accuracy_percentage < 60);
  if (weakestTopic) {
    recommendations.push({
      type: 'weakness',
      title: `เร่งฟื้นฟูหัวข้อ "${weakestTopic.topic}"`,
      description: `ความแม่นยำปัจจุบันอยู่ที่ ${weakestTopic.accuracy_percentage}% จาก ${weakestTopic.total_answered} ข้อที่เคยตอบ ฝึกโหมด Weakness เพื่อปิดจุดอ่อน`,
      target_topic: weakestTopic.topic,
      action_label: 'ฝึกจุดอ่อนหัวข้อนี้',
      action_url: `/practice/new?mode=weakness&topic=${encodeURIComponent(weakestTopic.topic)}`,
    });
  }

  // 2. Coverage recommendation
  const lowestCoverageSub = [...subjectStats].sort((a, b) => a.coverage_percentage - b.coverage_percentage)[0];
  if (lowestCoverageSub && lowestCoverageSub.coverage_percentage < 50) {
    recommendations.push({
      type: 'coverage',
      title: `ขยายคลังข้อสอบวิชา "${lowestCoverageSub.subject_name}"`,
      description: `ทำข้อสอบไปแล้ว ${lowestCoverageSub.coverage_percentage}% ของเป้าหมาย ทำข้อสอบจำลองเพิ่มเพื่อครอบคลุมเนื้อหา`,
      target_subject_id: lowestCoverageSub.subject_id,
      action_label: 'ทำข้อสอบจำลอง',
      action_url: `/practice/new?subjectId=${lowestCoverageSub.subject_id}&mode=exam`,
    });
  }

  // 3. Mistakes recommendation
  const incorrectCount = answers.filter(a => a.is_correct === false).length;
  if (incorrectCount > 0) {
    recommendations.push({
      type: 'review',
      title: `ทบทวนข้อที่ตอบผิด (${incorrectCount} ข้อ)`,
      description: `มีข้อสอบที่คุณเคยตอบผิดรอการทบทวน ทำซ้ำในโหมด Mistakes เพื่อไม่ให้พลาดซ้ำ`,
      action_label: 'ทบทวนข้อผิด',
      action_url: `/practice/new?mode=mistakes`,
    });
  }

  // 4. Regular practice encouragement
  if (totalPracticeDays >= 1) {
    recommendations.push({
      type: 'streak',
      title: `สะสมวันฝึกฝนต่อเนื่อง (${totalPracticeDays} วัน)`,
      description: 'การฝึกทำข้อสอบอย่างสม่ำเสมอวันละ 15-20 นาที ช่วยเพิ่ม Retention rate ได้กว่า 40%',
      action_label: 'ฝึกทำโจทย์ด่วน',
      action_url: '/practice/new',
    });
  }

  return {
    user_id: userId,
    total_attempts: totalAttempts,
    completed_attempts: totalCompleted,
    total_questions_answered: totalQuestionsAnswered,
    total_correct_answers: totalCorrect,
    overall_accuracy: overallAccuracy,
    average_score_percentage: averageScorePercentage,
    total_practice_days: totalPracticeDays,
    subject_stats: subjectStats,
    topic_accuracies: topicAccuracies,
    score_trends: scoreTrends,
    recommendations,
  };
}
