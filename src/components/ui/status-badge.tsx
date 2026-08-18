import * as React from 'react';
import { getStatusBadge, getDifficultyColor, cn } from '@/lib/utils';
import { CheckCircle2, Clock, AlertCircle, Archive, FileEdit, PenTool, ArrowLeftRight, Hash, ListOrdered } from 'lucide-react';
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

export function QuestionTypeBadge({ type }: { type?: string }) {
  switch (type) {
    case 'fill_in_the_blank':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <PenTool className="h-3 w-3 mr-1" />
          <span>เติมคำในช่องว่าง</span>
        </span>
      );
    case 'matching':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
          <ArrowLeftRight className="h-3 w-3 mr-1" />
          <span>จับคู่</span>
        </span>
      );
    case 'numeric':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Hash className="h-3 w-3 mr-1" />
          <span>เติมตัวเลข</span>
        </span>
      );
    case 'single_choice':
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          <ListOrdered className="h-3 w-3 mr-1" />
          <span>ปรนัย (4 ตัวเลือก)</span>
        </span>
      );
  }
}
