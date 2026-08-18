'use client';

import * as React from 'react';
import { Link2, Unlink, RotateCcw, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MatchingPair } from '@/lib/types/database';

interface MatchingPlayerProps {
  matchingPairs: MatchingPair[];
  shuffledRights?: Array<{ id: string; right: string }>;
  userAnswers: Record<string, string>;
  onAnswerChange: (answers: Record<string, string>) => void;
  disabled?: boolean;
}

const PAIR_COLORS = [
  { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300', badge: 'bg-blue-600 text-white', ring: 'ring-blue-400' },
  { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300', badge: 'bg-emerald-600 text-white', ring: 'ring-emerald-400' },
  { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300', badge: 'bg-purple-600 text-white', ring: 'ring-purple-400' },
  { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', badge: 'bg-amber-600 text-white', ring: 'ring-amber-400' },
  { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300', badge: 'bg-rose-600 text-white', ring: 'ring-rose-400' },
  { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-300', badge: 'bg-cyan-600 text-white', ring: 'ring-cyan-400' },
];

export function MatchingPlayer({
  matchingPairs,
  shuffledRights,
  userAnswers,
  onAnswerChange,
  disabled = false,
}: MatchingPlayerProps) {
  // Right items available to match against
  const rights = React.useMemo(() => {
    if (shuffledRights && shuffledRights.length > 0) return shuffledRights;
    return matchingPairs.map(p => ({ id: p.id, right: p.right }));
  }, [shuffledRights, matchingPairs]);

  // Selected left item for interactive tap-to-match
  const [selectedLeftId, setSelectedLeftId] = React.useState<string | null>(() => {
    const firstUnpaired = matchingPairs.find(p => !userAnswers[p.id]);
    return firstUnpaired ? firstUnpaired.id : matchingPairs[0]?.id || null;
  });

  // Inverse lookup: mapping rightId -> leftId
  const rightToLeftMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    Object.entries(userAnswers).forEach(([lId, rId]) => {
      if (rId) map[rId] = lId;
    });
    return map;
  }, [userAnswers]);

  // Handle clicking a left item
  const handleSelectLeft = (leftId: string) => {
    if (disabled) return;
    if (selectedLeftId === leftId) {
      setSelectedLeftId(null);
    } else {
      setSelectedLeftId(leftId);
    }
  };

  // Handle clicking a right item to pair with selected left
  const handleSelectRight = (rightId: string) => {
    if (disabled) return;

    if (!selectedLeftId) {
      // If no left item is selected, find the first unpaired left item
      const unpairedLeft = matchingPairs.find(p => !userAnswers[p.id]);
      if (unpairedLeft) {
        pairItems(unpairedLeft.id, rightId);
      }
      return;
    }

    pairItems(selectedLeftId, rightId);
  };

  const pairItems = (leftId: string, rightId: string) => {
    const updated = { ...userAnswers };

    // If another left item was already paired with this rightId, unpair it
    Object.keys(updated).forEach(lId => {
      if (updated[lId] === rightId) {
        delete updated[lId];
      }
    });

    updated[leftId] = rightId;
    onAnswerChange(updated);

    // Auto-select next unpaired left item
    const nextUnpaired = matchingPairs.find(p => p.id !== leftId && !updated[p.id]);
    setSelectedLeftId(nextUnpaired ? nextUnpaired.id : null);
  };

  // Unpair a specific left item
  const handleUnpair = (leftId: string, e?: React.MouseEvent) => {
    if (disabled) return;
    if (e) e.stopPropagation();

    const updated = { ...userAnswers };
    delete updated[leftId];
    onAnswerChange(updated);
    setSelectedLeftId(leftId);
  };

  // Clear all pairings
  const handleClearAll = () => {
    if (disabled) return;
    onAnswerChange({});
    if (matchingPairs[0]) {
      setSelectedLeftId(matchingPairs[0].id);
    }
  };

  const pairedCount = Object.values(userAnswers).filter(Boolean).length;
  const totalPairs = matchingPairs.length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 p-3.5 rounded-[var(--radius)] bg-[var(--surface-subtle)] border border-[var(--border)] text-xs">
        <div className="flex items-center gap-1.5 font-medium text-[var(--foreground)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span>แตะเลือกรายการด้านซ้าย แล้วแตะคำตอบที่ตรงกันด้านขวาเพื่อจับคู่</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-semibold text-[var(--primary)]">
            จับคู่แล้ว {pairedCount} / {totalPairs} คู่
          </span>
          {pairedCount > 0 && !disabled && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-6 px-2 text-xs text-[var(--foreground-muted)] hover:text-red-600"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              ล้างทั้งหมด
            </Button>
          )}
        </div>
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
        {/* Left Column: Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
              รายการโจทย์ (Column A)
            </span>
            <span className="text-[11px] text-[var(--foreground-muted)]">เลือกข้อที่ต้องการจับคู่</span>
          </div>

          <div className="space-y-2.5">
            {matchingPairs.map((pair, idx) => {
              const pairedRightId = userAnswers[pair.id];
              const isSelected = selectedLeftId === pair.id;
              const colorStyle = PAIR_COLORS[idx % PAIR_COLORS.length];
              const matchedRightObj = rights.find(r => r.id === pairedRightId);

              return (
                <div
                  key={pair.id}
                  onClick={() => handleSelectLeft(pair.id)}
                  className={cn(
                    'p-4 rounded-[var(--radius)] border transition-all duration-120 cursor-pointer select-none space-y-2.5',
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-400 ring-offset-1'
                      : pairedRightId
                      ? `${colorStyle.bg} ${colorStyle.border} text-zinc-900`
                      : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]',
                    disabled && 'cursor-default'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          'h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0',
                          pairedRightId ? colorStyle.badge : 'bg-zinc-200 text-zinc-700'
                        )}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm font-semibold pt-0.5 leading-relaxed text-[var(--foreground)]">
                        {pair.left}
                      </span>
                    </div>

                    {pairedRightId && !disabled && (
                      <button
                        type="button"
                        onClick={e => handleUnpair(pair.id, e)}
                        className="text-xs text-zinc-400 hover:text-red-600 p-1 hover:bg-white/80 rounded transition-colors shrink-0"
                        title="ยกเลิกการจับคู่นี้"
                      >
                        <Unlink className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Paired Preview Tag */}
                  {pairedRightId && matchedRightObj && (
                    <div className="pl-8 pt-1 text-xs flex items-center gap-1.5 text-zinc-700">
                      <Link2 className="h-3 w-3 shrink-0 text-zinc-500" />
                      <span className="font-medium text-zinc-500 shrink-0">คู่กับ:</span>
                      <span className="truncate italic font-medium">{matchedRightObj.right}</span>
                    </div>
                  )}

                  {!pairedRightId && isSelected && (
                    <div className="pl-8 text-xs text-blue-700 font-medium animate-pulse">
                      แตะเลือกคำตอบใน Column B ด้านขวา
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Targets / Definitions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
              ตัวเลือกคำตอบ (Column B)
            </span>
            <span className="text-[11px] text-[var(--foreground-muted)]">แตะเพื่อจับคู่กับข้อที่เลือก</span>
          </div>

          <div className="space-y-2.5">
            {rights.map((rightObj, rIdx) => {
              const pairedLeftId = rightToLeftMap[rightObj.id];
              const leftIdx = pairedLeftId ? matchingPairs.findIndex(p => p.id === pairedLeftId) : -1;
              const colorStyle = leftIdx >= 0 ? PAIR_COLORS[leftIdx % PAIR_COLORS.length] : null;

              return (
                <div
                  key={rightObj.id}
                  onClick={() => handleSelectRight(rightObj.id)}
                  className={cn(
                    'p-4 rounded-[var(--radius)] border transition-all duration-120 cursor-pointer select-none space-y-2',
                    colorStyle
                      ? `${colorStyle.bg} ${colorStyle.border} shadow-xs`
                      : 'bg-[var(--surface)] border-[var(--border)] hover:border-blue-400 hover:bg-blue-50/40',
                    disabled && 'cursor-default'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          'h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0',
                          colorStyle ? colorStyle.badge : 'bg-zinc-100 text-zinc-600 border border-zinc-300'
                        )}
                      >
                        {rIdx + 1}
                      </span>
                      <span className="text-sm font-medium pt-0.5 leading-relaxed text-[var(--foreground)]">
                        {rightObj.right}
                      </span>
                    </div>

                    {colorStyle && (
                      <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded bg-white border border-zinc-200 text-zinc-700 shrink-0">
                        <Check className="h-3 w-3 mr-0.5 text-emerald-600" />
                        คู่กับ {String.fromCharCode(65 + leftIdx)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
