import * as React from 'react';
import { getStatusBadge, getDifficultyColor, cn } from '@/lib/utils';
import { CheckCircle2, Clock, AlertCircle, Archive, FileEdit } from 'lucide-react';
import type { QuestionStatus, QuestionDifficulty } from '@/lib/types/database';

export function QuestionStatusBadge({ status }: { status: QuestionStatus }) {
  const badge = getStatusBadge(status);
  
  const icon = {
    published: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
    approved: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
    needs_review: <Clock className="w-3.5 h-3.5 mr-1" />,
    retired: <Archive className="w-3.5 h-3.5 mr-1" />,
    draft: <FileEdit className="w-3.5 h-3.5 mr-1" />,
  }[status] || <AlertCircle className="w-3.5 h-3.5 mr-1" />;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
        badge.bg
      )}
    >
      {icon}
      <span>{badge.label}</span>
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: QuestionDifficulty }) {
  const diff = getDifficultyColor(difficulty);
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
        diff.bg
      )}
    >
      {diff.label}
    </span>
  );
}
