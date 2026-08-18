'use client';

import * as React from 'react';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { DifficultyBadge, QuestionTypeBadge } from '@/components/ui/status-badge';
import { PageTransition } from '@/components/ui/page-transition';
import { ListSkeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { getBookmarks, toggleBookmarkAction, getCurrentSessionUser } from '@/lib/db-adapter';
import { Bookmark, Trash2, FileText } from 'lucide-react';
import type { Bookmark as BookmarkType } from '@/lib/types/database';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = React.useState<BookmarkType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { showToast } = useToast();

  React.useEffect(() => {
    const user = getCurrentSessionUser();
    setIsLoading(true);
    getBookmarks(user.id).then(res => {
      setBookmarks(res);
      setIsLoading(false);
    });
  }, []);

  // Optimistic UI for removing bookmark with rollback on error
  const handleRemoveBookmark = async (questionId: string) => {
    const user = getCurrentSessionUser();
    const previousBookmarks = [...bookmarks];

    // Optimistic Update: remove immediately
    setBookmarks(prev => prev.filter(b => b.question_id !== questionId));

    try {
      await toggleBookmarkAction(user.id, questionId);
      showToast('ลบข้อสอบออกจากรายการที่บันทึกแล้ว', 'info');
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
      // Rollback
      setBookmarks(previousBookmarks);
      showToast('ไม่สามารถลบข้อสอบได้ กรุณาลองใหม่อีกครั้ง', 'error');
    }
  };

  return (
    <PageTransition className="space-y-6">
      <LearnerPageHeader
        title="ข้อสอบที่บันทึกไว้ (Bookmarked Questions)"
        description="รายการข้อสอบที่คุณติดดาวไว้สำหรับการทบทวนซ้ำและการทำความเข้าใจเพิ่มเติม"
      />

      {isLoading ? (
        <ListSkeleton rows={4} />
      ) : bookmarks.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="ยังไม่มีข้อสอบที่บันทึกไว้"
          description="คุณสามารถกดปุ่ม 'บันทึกข้อนี้' ระหว่างการทำข้อสอบ เพื่อเก็บข้อที่น่าสนใจหรือข้อที่สงสัยไว้ทบทวนที่นี่"
          actionLabel="เริ่มทำข้อสอบ"
          actionHref="/practice/new"
        />
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bm, idx) => {
            const q = bm.question;
            if (!q) return null;
            const qType = q.question_type || 'single_choice';

            return (
              <Card key={bm.id} className="p-5 space-y-4 border-[var(--border)] motion-slide-up">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[var(--primary-subtle)] text-xs font-bold text-[var(--primary)] border border-blue-200">
                      ข้อที่ {idx + 1}
                    </span>
                    <QuestionTypeBadge type={qType} />
                    <DifficultyBadge difficulty={q.difficulty} />
                    <span className="text-xs text-[var(--foreground-muted)]">
                      {q.topic_title || 'General'}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveBookmark(q.id)}
                    className="text-[var(--danger)] hover:bg-red-50 text-xs h-7 px-2"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    <span>ลบออก</span>
                  </Button>
                </div>

                <div className="text-base font-medium text-[var(--foreground)] leading-relaxed">
                  {q.question_text}
                </div>

                {/* Fill-in-the-blank Preview */}
                {qType === 'fill_in_the_blank' && q.word_bank && (
                  <div className="p-3 rounded bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
                    <span className="text-xs font-semibold text-[var(--foreground-muted)]">
                      คลังคำศัพท์ตัวเลือก (Word Bank):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {q.word_bank.map((w, wIdx) => (
                        <span key={wIdx} className="px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matching Preview */}
                {qType === 'matching' && q.matching_pairs && (
                  <div className="p-3 rounded bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
                    <span className="text-xs font-semibold text-[var(--foreground-muted)]">
                      คู่คำตอบสำหรับจับคู่:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.matching_pairs.map((p, pIdx) => (
                        <div key={p.id} className="p-2 rounded bg-white border border-[var(--border)] flex items-center justify-between gap-1">
                          <span className="font-semibold text-teal-800">{String.fromCharCode(65 + pIdx)}. {p.left}</span>
                          <span className="text-zinc-400 font-bold">↔</span>
                          <span className="text-zinc-600 truncate">{p.right}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Choices list for Single Choice */}
                {(qType === 'single_choice' || qType === 'numeric') && q.choices && q.choices.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.choices.map(c => (
                      <div
                        key={c.choice_key}
                        className="p-2.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] text-xs flex items-center gap-2"
                      >
                        <span className="h-5 w-5 rounded bg-white text-xs font-bold flex items-center justify-center border shrink-0">
                          {c.choice_key}
                        </span>
                        <span className="truncate">{c.choice_text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Notes / Citation */}
                {bm.notes && (
                  <div className="p-3 rounded bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
                    <strong>บันทึกช่วยจำ:</strong> {bm.notes}
                  </div>
                )}

                {q.source && (
                  <div className="text-[11px] text-[var(--foreground-muted)] flex items-center gap-1.5 pt-1">
                    <FileText className="h-3.5 w-3.5 text-[var(--primary)]" />
                    <span>อ้างอิง: {q.source.file_name} (หน้าที่ {q.source.page_numbers.join(', ')})</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </PageTransition>
  );
}
