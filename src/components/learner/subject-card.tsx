import * as React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Layers, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Subject } from '@/lib/types/database';

export function SubjectCard({
  subject,
  coveragePercentage = 0,
  averageScore,
  chaptersCount = 0,
  docsCount = 0,
}: {
  subject: Subject;
  coveragePercentage?: number;
  averageScore?: number;
  chaptersCount?: number;
  docsCount?: number;
}) {
  return (
    <Card className="flex flex-col hover:border-[var(--border-strong)] transition-all">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="h-9 w-9 rounded-md bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center font-bold text-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--foreground-muted)] border border-[var(--border)]">
            เป้าหมาย {subject.question_target} ข้อ
          </span>
        </div>
        <CardTitle className="text-base font-semibold mt-3 text-[var(--foreground)]">
          {subject.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs leading-relaxed">
          {subject.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 py-2 flex-1 space-y-3">
        <div className="flex items-center gap-4 text-xs text-[var(--foreground-muted)]">
          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            <span>{chaptersCount} บทเรียน</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            <span>{docsCount} เอกสาร/สไลด์</span>
          </div>
        </div>

        {/* Coverage bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-[var(--foreground-muted)] font-medium">
            <span>ความครอบคลุมข้อสอบ</span>
            <span className="text-[var(--foreground)]">{coveragePercentage}%</span>
          </div>
          <Progress value={coveragePercentage} />
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-3 border-t border-[var(--border)] flex items-center justify-between">
        <div className="text-xs">
          {averageScore !== undefined && averageScore > 0 ? (
            <span className="text-[var(--foreground-muted)]">
              คะแนนเฉลี่ย: <strong className="text-[var(--primary)] font-semibold">{averageScore}%</strong>
            </span>
          ) : (
            <span className="text-[var(--foreground-muted)]">ยังไม่มีประวัติการสอบ</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/subjects/${subject.slug}`}>
              <span>ดูวิชา</span>
            </Link>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link href={`/practice/new?subjectId=${subject.id}`}>
              <span>เริ่มสอบ</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
