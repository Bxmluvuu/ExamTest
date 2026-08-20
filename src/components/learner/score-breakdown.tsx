'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { AttemptQuestion, QuestionDifficulty } from '@/lib/types/database';

export function ScoreBreakdown({ questions }: { questions: AttemptQuestion[] }) {
  // Aggregate stats by topic
  const topicStats = React.useMemo(() => {
    const map = new Map<string, { correct: number; points: number; total: number }>();
    questions.forEach(q => {
      const top = q.question_snapshot?.topic_title || q.topic_title || q.chapter_title || 'General';
      const cur = map.get(top) || { correct: 0, points: 0, total: 0 };
      cur.total += 1;
      const pts = q.points_earned ?? (q.is_correct ? 1 : 0);
      cur.points += pts;
      if (q.is_correct) cur.correct += 1;
      map.set(top, cur);
    });
    return Array.from(map.entries()).map(([topic, stat]) => ({
      topic,
      correct: stat.correct,
      points: Number(stat.points.toFixed(2)),
      total: stat.total,
      percentage: stat.total > 0 ? Math.round((stat.points / stat.total) * 100) : 0,
    }));
  }, [questions]);

  // Aggregate stats by difficulty
  const diffStats = React.useMemo(() => {
    const map: Record<QuestionDifficulty, { correct: number; points: number; total: number }> = {
      easy: { correct: 0, points: 0, total: 0 },
      medium: { correct: 0, points: 0, total: 0 },
      hard: { correct: 0, points: 0, total: 0 },
    };
    questions.forEach(q => {
      const d = ((q.question_snapshot?.difficulty || q.difficulty || 'medium') as QuestionDifficulty);
      if (map[d]) {
        map[d].total += 1;
        const pts = q.points_earned ?? (q.is_correct ? 1 : 0);
        map[d].points += pts;
        if (q.is_correct) map[d].correct += 1;
      }
    });
    return map;
  }, [questions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Topics Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[var(--foreground)]">
            ผลคะแนนแยกตามหัวข้อ (Topic Breakdown)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          {topicStats.map(item => (
            <div key={item.topic} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[var(--foreground)] truncate max-w-[200px]">{item.topic}</span>
                <span className="text-[var(--foreground-muted)]">
                  {item.points !== undefined && item.points !== item.correct ? `${item.points} คะแนน / ${item.total} ข้อ` : `${item.correct} / ${item.total}`} ({item.percentage}%)
                </span>
              </div>
              <Progress
                value={item.percentage}
                indicatorClassName={item.percentage >= 70 ? 'bg-[var(--success)]' : item.percentage >= 50 ? 'bg-[var(--primary)]' : 'bg-[var(--danger)]'}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Difficulty Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[var(--foreground)]">
            ผลคะแนนแยกตามระดับความยาก (Difficulty)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          {(['easy', 'medium', 'hard'] as QuestionDifficulty[]).map(diff => {
            const stat = diffStats[diff];
            const pct = stat.total > 0 ? Math.round((stat.points / stat.total) * 100) : 0;
            const labels = { easy: 'ง่าย (Easy)', medium: 'ปานกลาง (Medium)', hard: 'ยาก (Hard)' };

            return (
              <div key={diff} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[var(--foreground)]">{labels[diff]}</span>
                  <span className="text-[var(--foreground-muted)]">
                    {stat.points !== undefined && stat.points !== stat.correct ? `${Number(stat.points.toFixed(2))} คะแนน / ${stat.total} ข้อ` : `${stat.correct} / ${stat.total}`} ({pct}%)
                  </span>
                </div>
                <Progress
                  value={pct}
                  indicatorClassName={diff === 'easy' ? 'bg-emerald-600' : diff === 'medium' ? 'bg-blue-600' : 'bg-rose-600'}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
