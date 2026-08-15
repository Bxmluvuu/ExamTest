'use client';

import * as React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuestionStatusBadge, DifficultyBadge } from '@/components/ui/status-badge';
import { saveQuestionAction } from '@/lib/db-adapter';
import type { Question, QuestionStatus, QuestionDifficulty } from '@/lib/types/database';

export function QuestionEditModal({
  question,
  open,
  onClose,
  onSaved,
  adminUserId,
  subjects,
}: {
  question?: Question | null;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  adminUserId: string;
  subjects: Array<{ id: string; name: string }>;
}) {
  const [questionText, setQuestionText] = React.useState('');
  const [difficulty, setDifficulty] = React.useState<QuestionDifficulty>('medium');
  const [status, setStatus] = React.useState<QuestionStatus>('draft');
  const [choices, setChoices] = React.useState<Array<{ key: 'A' | 'B' | 'C' | 'D'; text: string }>>([
    { key: 'A', text: '' },
    { key: 'B', text: '' },
    { key: 'C', text: '' },
    { key: 'D', text: '' },
  ]);
  const [correctChoice, setCorrectChoice] = React.useState<'A' | 'B' | 'C' | 'D'>('A');
  const [explanation, setExplanation] = React.useState('');
  const [citationFile, setCitationFile] = React.useState('chapter-01.pdf');
  const [citationPage, setCitationPage] = React.useState('1');
  const [citationEvidence, setCitationEvidence] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (question) {
      setQuestionText(question.question_text || '');
      setDifficulty(question.difficulty || 'medium');
      setStatus(question.status || 'draft');
      if (question.choices && question.choices.length === 4) {
        setChoices(question.choices.map((c, i) => ({
          key: (c.choice_key || c.key || ['A', 'B', 'C', 'D'][i]) as 'A' | 'B' | 'C' | 'D',
          text: c.choice_text || c.text || '',
        })));
      }
      setExplanation(question.source?.evidence_text || 'คำอธิบายหลักการของข้อสอบนี้');
      if (question.source) {
        setCitationFile(question.source.file_name || 'chapter-01.pdf');
        setCitationPage(question.source.page_numbers?.[0]?.toString() || '1');
        setCitationEvidence(question.source.evidence_text || '');
      }
    } else {
      setQuestionText('');
      setDifficulty('medium');
      setStatus('draft');
      setChoices([
        { key: 'A', text: '' },
        { key: 'B', text: '' },
        { key: 'C', text: '' },
        { key: 'D', text: '' },
      ]);
      setCorrectChoice('A');
      setExplanation('');
      setCitationEvidence('');
    }
  }, [question, open]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      alert('กรุณากรอกโจทย์คำถาม');
      return;
    }

    setIsSaving(true);
    try {
      await saveQuestionAction(
        {
          id: question?.id,
          question_text: questionText,
          difficulty,
          status,
          choices,
          correctChoice,
          explanation: explanation || 'คำอธิบายคำตอบที่ถูกต้อง',
          sourceCitation: {
            file_name: citationFile,
            pages: [parseInt(citationPage, 10) || 1],
            evidence_text: citationEvidence || 'ความถูกต้องตามเอกสารประกอบการสอน',
          },
        },
        adminUserId
      );

      setIsSaving(false);
      onSaved();
      onClose();
    } catch (err) {
      console.error('Save question error:', err);
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={question ? 'แก้ไขข้อสอบและเฉลย' : 'สร้างคำถามใหม่'}
      description="จัดการเนื้อหาคำถาม ตัวเลือก คำเฉลย และข้อมูลอ้างอิงจากสไลด์"
      className="max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <form onSubmit={handleSave} className="space-y-4 pt-2">
        {/* Status & Difficulty Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              สถานะ (Question Lifecycle)
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as QuestionStatus)}
              className="w-full h-9 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-xs text-[var(--foreground)]"
            >
              <option value="draft">Draft (ฉบับร่าง)</option>
              <option value="needs_review">Needs Review (รอตรวจ)</option>
              <option value="approved">Approved (อนุมัติแล้ว)</option>
              <option value="published">Published (เผยแพร่สู่คลังสอบ)</option>
              <option value="retired">Retired (ยกเลิก)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              ระดับความยาก (Difficulty)
            </label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value as QuestionDifficulty)}
              className="w-full h-9 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-xs text-[var(--foreground)]"
            >
              <option value="easy">Easy (ง่าย)</option>
              <option value="medium">Medium (ปานกลาง)</option>
              <option value="hard">Hard (ยาก)</option>
            </select>
          </div>
        </div>

        {/* Question Stem */}
        <div>
          <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
            โจทย์คำถาม (Question Stem)
          </label>
          <textarea
            value={questionText}
            onChange={e => setQuestionText(e.target.value)}
            rows={3}
            className="w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] p-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
            placeholder="พิมพ์โจทย์คำถามที่ต้องการทดสอบ..."
            required
          />
        </div>

        {/* 4 Choices */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[var(--foreground)]">
            ตัวเลือก 4 ข้อ (Choices A, B, C, D) พร้อมกำหนดเฉลย
          </label>
          {choices.map((c, idx) => (
            <div key={c.key} className="flex items-center gap-2">
              <input
                type="radio"
                name="correctChoice"
                checked={correctChoice === c.key}
                onChange={() => setCorrectChoice(c.key)}
                id={`choice-radio-${c.key}`}
                className="h-4 w-4 text-[var(--primary)] cursor-pointer"
                title="กำหนดเป็นคำตอบที่ถูกต้อง"
              />
              <span className="h-7 w-7 rounded bg-[var(--surface-subtle)] text-xs font-bold flex items-center justify-center border shrink-0">
                {c.key}
              </span>
              <input
                type="text"
                value={c.text}
                onChange={e => {
                  const copy = [...choices];
                  copy[idx].text = e.target.value;
                  setChoices(copy);
                }}
                placeholder={`เนื้อหาตัวเลือก ${c.key}`}
                className="flex-1 h-9 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2.5 text-sm text-[var(--foreground)]"
                required
              />
            </div>
          ))}
          <p className="text-[11px] text-[var(--foreground-muted)]">
            * คลิกวงกลมด้านซ้ายเพื่อตั้งค่าตัวเลือกนั้นเป็นคำตอบที่ถูกต้อง (Answer Key)
          </p>
        </div>

        {/* Explanation */}
        <div>
          <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
            คำอธิบายเฉลย (Explanation)
          </label>
          <textarea
            value={explanation}
            onChange={e => setExplanation(e.target.value)}
            rows={2}
            className="w-full rounded border border-[var(--border-strong)] bg-[var(--surface)] p-2 text-xs text-[var(--foreground)]"
            placeholder="อธิบายเหตุผลที่ข้อนี้ถูกต้องเพื่อแสดงให้ผู้เรียนหลังสอบ..."
          />
        </div>

        {/* Citation Metadata */}
        <div className="p-3 rounded bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
          <div className="text-xs font-semibold text-[var(--foreground)]">
            การอ้างอิงเอกสาร (Slide / Source Citation)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="ชื่อไฟล์สไลด์"
              value={citationFile}
              onChange={e => setCitationFile(e.target.value)}
              className="h-8 text-xs"
            />
            <Input
              label="หน้าที่อ้างอิง"
              value={citationPage}
              onChange={e => setCitationPage(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <Input
            label="ข้อความหลักฐานจากสไลด์ (Evidence Snippet)"
            value={citationEvidence}
            onChange={e => setCitationEvidence(e.target.value)}
            className="h-8 text-xs"
            placeholder="ข้อความที่ปรากฏในสไลด์เพื่อยืนยันข้อเท็จจริง..."
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
            บันทึกคำถาม
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
