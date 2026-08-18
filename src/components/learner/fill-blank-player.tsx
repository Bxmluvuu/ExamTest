'use client';

import * as React from 'react';
import { Sparkles, RotateCcw, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FillBlankItem } from '@/lib/types/database';

interface FillBlankPlayerProps {
  text: string;
  wordBank: string[];
  blanks: FillBlankItem[];
  userAnswers: Record<string, string>;
  onAnswerChange: (answers: Record<string, string>) => void;
  disabled?: boolean;
}

export function FillBlankPlayer({
  text,
  wordBank,
  blanks,
  userAnswers,
  onAnswerChange,
  disabled = false,
}: FillBlankPlayerProps) {
  // If blanks aren't specified explicitly, detect tokens like [blank_1], [blank_2] or generate from text
  const effectiveBlanks: FillBlankItem[] = React.useMemo(() => {
    if (blanks && blanks.length > 0) return blanks;

    // Detect patterns like [blank_1], [1], [___]
    const detected: FillBlankItem[] = [];
    const regex = /\[(?:blank_)?(\w+)\]/g;
    let match;
    let idx = 1;
    while ((match = regex.exec(text)) !== null) {
      detected.push({
        id: match[1] ? `blank_${match[1]}` : `blank_${idx}`,
        position: idx,
        placeholder: `ช่องว่างที่ ${idx}`,
      });
      idx++;
    }
    if (detected.length === 0) {
      // Fallback: 1 blank
      detected.push({ id: 'blank_1', position: 1, placeholder: 'ช่องว่างที่ 1' });
    }
    return detected;
  }, [blanks, text]);

  // Track currently selected active blank slot
  const [activeBlankId, setActiveBlankId] = React.useState<string>(() => {
    // Default to first empty blank
    const firstEmpty = effectiveBlanks.find(b => !userAnswers[b.id]);
    return firstEmpty ? firstEmpty.id : effectiveBlanks[0]?.id || 'blank_1';
  });

  // Keep active blank updated if answers change
  React.useEffect(() => {
    if (!activeBlankId || userAnswers[activeBlankId]) {
      const firstEmpty = effectiveBlanks.find(b => !userAnswers[b.id]);
      if (firstEmpty) {
        setActiveBlankId(firstEmpty.id);
      }
    }
  }, [userAnswers, effectiveBlanks, activeBlankId]);

  // Set of words already placed in blanks
  const usedWords = React.useMemo(() => {
    return new Set(Object.values(userAnswers).filter(Boolean));
  }, [userAnswers]);

  // Place word into active slot or next available slot
  const handleSelectWord = (word: string) => {
    if (disabled) return;

    let targetId = activeBlankId;
    // If active blank is already filled or not set, find first empty
    if (!targetId || userAnswers[targetId]) {
      const emptyBlank = effectiveBlanks.find(b => !userAnswers[b.id]);
      if (emptyBlank) {
        targetId = emptyBlank.id;
      }
    }

    if (!targetId) {
      targetId = effectiveBlanks[0]?.id || 'blank_1';
    }

    const updated = {
      ...userAnswers,
      [targetId]: word,
    };
    onAnswerChange(updated);

    // Auto-advance to next empty blank
    const nextEmpty = effectiveBlanks.find(b => b.id !== targetId && !updated[b.id]);
    if (nextEmpty) {
      setActiveBlankId(nextEmpty.id);
    }
  };

  // Remove word from a specific blank
  const handleClearBlank = (blankId: string, e?: React.MouseEvent) => {
    if (disabled) return;
    if (e) e.stopPropagation();

    const updated = { ...userAnswers };
    delete updated[blankId];
    onAnswerChange(updated);
    setActiveBlankId(blankId);
  };

  // Clear all blanks
  const handleClearAll = () => {
    if (disabled) return;
    onAnswerChange({});
    if (effectiveBlanks[0]) {
      setActiveBlankId(effectiveBlanks[0].id);
    }
  };

  // Parse text segments and render inline blanks
  const renderInteractiveText = () => {
    // Replace [blank_X] with markers or split
    // Regex matches [blank_1], [blank_2], [blank_3], etc.
    const parts: React.ReactNode[] = [];
    const tokenRegex = /\[(?:blank_)?([a-zA-Z0-9_-]+)\]/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(text)) !== null) {
      const matchedKey = match[1];
      const blankId = matchedKey.startsWith('blank_') ? matchedKey : `blank_${matchedKey}`;
      const blankItem = effectiveBlanks.find(b => b.id === blankId || b.id === matchedKey) || {
        id: blankId,
        position: parts.length + 1,
        placeholder: `ช่องที่ ${parts.length + 1}`,
      };

      // Add text before the token
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`} className="leading-relaxed">
            {text.slice(lastIndex, match.index)}
          </span>
        );
      }

      const filledWord = userAnswers[blankItem.id];
      const isActive = activeBlankId === blankItem.id;

      parts.push(
        <span key={`blank-${blankItem.id}`} className="inline-block mx-1.5 my-1 align-middle">
          {filledWord ? (
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleClearBlank(blankItem.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-150 shadow-xs border',
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400 ring-offset-1'
                  : 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 hover:border-blue-400',
                disabled && 'cursor-default'
              )}
              title="คลิกเพื่อลบคำออกจากช่องนี้"
            >
              <span className="text-[11px] font-bold opacity-75">#{blankItem.position}</span>
              <span>{filledWord}</span>
              {!disabled && <X className="h-3.5 w-3.5 opacity-70 hover:opacity-100 ml-0.5" />}
            </button>
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={() => setActiveBlankId(blankItem.id)}
              className={cn(
                'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border-2 border-dashed transition-all duration-150 min-w-[120px] justify-center',
                isActive
                  ? 'border-blue-600 bg-blue-50/70 text-blue-700 ring-2 ring-blue-300 animate-pulse'
                  : 'border-zinc-300 bg-zinc-50/80 text-zinc-600 hover:border-blue-400 hover:bg-blue-50/40',
                disabled && 'cursor-default'
              )}
            >
              <span className="font-bold text-zinc-400">#{blankItem.position}</span>
              <span>{isActive ? 'เลือกคำตอบด้านล่าง' : (blankItem.placeholder || 'แตะเพื่อเติม')}</span>
            </button>
          )}
        </span>
      );

      lastIndex = tokenRegex.lastIndex;
    }

    // Add trailing text
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-end`} className="leading-relaxed">
          {text.slice(lastIndex)}
        </span>
      );
    }

    // If no token was found, render fallback text + list of blanks
    if (parts.length === 0) {
      return (
        <div className="space-y-4">
          <p className="leading-relaxed text-[var(--foreground)]">{text}</p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {effectiveBlanks.map(blank => {
              const filledWord = userAnswers[blank.id];
              const isActive = activeBlankId === blank.id;
              return (
                <div key={blank.id} className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--foreground-muted)]">
                    ช่องที่ {blank.position}:
                  </span>
                  {filledWord ? (
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => handleClearBlank(blank.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-300 text-sm font-semibold hover:bg-blue-100"
                    >
                      <span>{filledWord}</span>
                      <X className="h-3 w-3" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => setActiveBlankId(blank.id)}
                      className={cn(
                        'px-3 py-1 rounded-full border-2 border-dashed text-xs font-medium',
                        isActive
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-300'
                          : 'border-zinc-300 bg-zinc-50 text-zinc-600 hover:border-blue-400'
                      )}
                    >
                      {isActive ? 'เลือกคำตอบด้านล่าง' : 'แตะเพื่อเติมคำ'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return <div className="text-base sm:text-lg leading-loose text-[var(--foreground)]">{parts}</div>;
  };

  const filledCount = Object.values(userAnswers).filter(Boolean).length;
  const totalBlanks = effectiveBlanks.length;

  return (
    <div className="space-y-6">
      {/* Passage / Stem Area */}
      <div className="p-5 sm:p-6 rounded-[var(--radius)] bg-[var(--surface-subtle)] border border-[var(--border)] relative">
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--border)] text-xs text-[var(--foreground-muted)]">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>เติมคำในช่องว่างให้สมบูรณ์</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--foreground)]">
              เติมแล้ว {filledCount} / {totalBlanks} ช่อง
            </span>
            {filledCount > 0 && !disabled && (
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

        {renderInteractiveText()}
      </div>

      {/* Word Bank Area */}
      <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
            คลังคำศัพท์ (Word Bank) - แตะเพื่อเลือกคำ
          </h3>
          <span className="text-[11px] text-[var(--foreground-muted)]">
            {activeBlankId
              ? `กำลังเลือกให้: ช่อง #${effectiveBlanks.find(b => b.id === activeBlankId)?.position || 1}`
              : 'แตะช่องว่างด้านบนเพื่อระบุตำแหน่ง'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {wordBank.map((word, idx) => {
            const isUsed = usedWords.has(word);
            return (
              <button
                key={`${word}-${idx}`}
                type="button"
                disabled={disabled}
                onClick={() => handleSelectWord(word)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-120 cursor-pointer select-none border',
                  isUsed
                    ? 'bg-zinc-100 text-zinc-400 border-zinc-200 line-through opacity-60'
                    : 'bg-white hover:bg-blue-50 text-zinc-800 hover:text-blue-700 border-zinc-300 hover:border-blue-400 shadow-xs active:scale-95'
                )}
              >
                <span>{word}</span>
                {isUsed && <Check className="h-3.5 w-3.5 text-zinc-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
