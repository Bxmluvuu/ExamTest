'use client';

import * as React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatDuration, cn } from '@/lib/utils';

export function ExamTimer({
  initialMinutes = 30,
  initialSpentSeconds = 0,
  onTimeExpired,
  onTick,
}: {
  initialMinutes: number;
  initialSpentSeconds?: number;
  onTimeExpired?: () => void;
  onTick?: (spentSeconds: number) => void;
}) {
  const totalSeconds = initialMinutes * 60;
  const [spent, setSpent] = React.useState(initialSpentSeconds);

  const remaining = Math.max(0, totalSeconds - spent);
  const isLowTime = remaining <= 300 && remaining > 0; // <= 5 mins

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSpent(prev => {
        const next = prev + 1;
        if (onTick) onTick(next);
        if (next >= totalSeconds) {
          clearInterval(timer);
          if (onTimeExpired) onTimeExpired();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds, onTimeExpired, onTick]);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] font-mono text-sm font-semibold border transition-colors',
        isLowTime
          ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
          : 'bg-[var(--surface-subtle)] text-[var(--foreground)] border-[var(--border)]'
      )}
      aria-label={`Time remaining: ${formatDuration(remaining)}`}
    >
      {isLowTime ? (
        <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
      ) : (
        <Clock className="h-4 w-4 text-[var(--foreground-muted)] shrink-0" />
      )}
      <span>{formatDuration(remaining)}</span>
    </div>
  );
}
