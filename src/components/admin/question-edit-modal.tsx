'use client';

import * as React from 'react';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuestionStatusBadge, DifficultyBadge } from '@/components/ui/status-badge';
import { saveQuestionAction } from '@/lib/db-adapter';
import type { Question, QuestionStatus, QuestionDifficulty, QuestionType, FillBlankItem, MatchingPair } from '@/lib/types/database';

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
  const [questionType, setQuestionType] = React.useState<QuestionType>('single_choice');
  const [questionText, setQuestionText] = React.useState('');
  const [difficulty, setDifficulty] = React.useState<QuestionDifficulty>('medium');
  const [status, setStatus] = React.useState<QuestionStatus>('draft');
  
  // Single Choice state
  const [choices, setChoices] = React.useState<Array<{ key: 'A' | 'B' | 'C' | 'D'; text: string }>>([
    { key: 'A', text: '' },
    { key: 'B', text: '' },
    { key: 'C', text: '' },
    { key: 'D', text: '' },
  ]);
  const [correctChoice, setCorrectChoice] = React.useState<'A' | 'B' | 'C' | 'D'>('A');

  // Fill-in-the-blank state
  const [wordBankInput, setWordBankInput] = React.useState('');
  const [blanks, setBlanks] = React.useState<Array<{ id: string; position: number; correct_word: string }>>([
    { id: 'blank_1', position: 1, correct_word: '' },
    { id: 'blank_2', position: 2, correct_word: '' },
  ]);

  // Matching state
  const [matchingPairs, setMatchingPairs] = React.useState<Array<{ id: string; left: string; right: string }>>([
    { id: 'p1', left: '', right: '' },
    { id: 'p2', left: '', right: '' },
    { id: 'p3', left: '', right: '' },
  ]);

  const [explanation, setExplanation] = React.useState('');
  const [citationFile, setCitationFile] = React.useState('chapter-01.pdf');
  const [citationPage, setCitationPage] = React.useState('1');
  const [citationEvidence, setCitationEvidence] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (question) {
      setQuestionType(question.question_type || 'single_choice');
      setQuestionText(question.question_text || '');
      setDifficulty(question.difficulty || 'medium');
      setStatus(question.status || 'draft');

      if (question.choices && question.choices.length === 4) {
        setChoices(question.choices.map((c, i) => ({
          key: (c.choice_key || c.key || ['A', 'B', 'C', 'D'][i]) as 'A' | 'B' | 'C' | 'D',
          text: c.choice_text || c.text || '',
        })));
      }

      if (question.word_bank) {
        setWordBankInput(question.word_bank.join(', '));
      }
      if (question.blanks && question.blanks.length > 0) {
        setBlanks(question.blanks.map(b => ({
          id: b.id,
          position: b.position,
          correct_word: b.correct_word || '',
        })));
      }

      if (question.matching_pairs && question.matching_pairs.length > 0) {
        setMatchingPairs(question.matching_pairs.map(p => ({
          id: p.id,
          left: p.left,
          right: p.right,
        })));
      }

      setExplanation(question.source?.evidence_text || 'คำอธิบายหลักการของข้อสอบนี้');
      if (question.source) {
        setCitationFile(question.source.file_name || 'chapter-01.pdf');
        setCitationPage(question.source.page_numbers?.[0]?.toString() || '1');
        setCitationEvidence(question.source.evidence_text || '');
      }
    } else {
      setQuestionType('single_choice');
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
      setWordBankInput('');
      setBlanks([
        { id: 'blank_1', position: 1, correct_word: '' },
        { id: 'blank_2', position: 2, correct_word: '' },
      ]);
      setMatchingPairs([
        { id: 'p1', left: '', right: '' },
        { id: 'p2', left: '', right: '' },
        { id: 'p3', left: '', right: '' },
      ]);
      setExplanation('');
      setCitationEvidence('');
    }
  }, [question, open]);

  // Handlers for Blanks
  const handleAddBlank = () => {
    const nextPos = blanks.length + 1;
    setBlanks(prev => [...prev, { id: `blank_${nextPos}`, position: nextPos, correct_word: '' }]);
  };

  const handleRemoveBlank = (index: number) => {
    setBlanks(prev => prev.filter((_, i) => i !== index));
  };

  // Handlers for Matching Pairs
  const handleAddPair = () => {
    const nextId = `p${matchingPairs.length + 1}`;
    setMatchingPairs(prev => [...prev, { id: nextId, left: '', right: '' }]);
  };

  const handleRemovePair = (index: number) => {
    setMatchingPairs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      alert('กรุณากรอกโจทย์คำถาม');
      return;
    }

    setIsSaving(true);
    try {
      let wordBankArray: string[] = [];
      const correctBlankAnswers: Record<string, string> = {};
      const correctMatching: Record<string, string> = {};

      if (questionType === 'fill_in_the_blank') {
        wordBankArray = wordBankInput
          .split(/,|\n/)
          .map(w => w.trim())
          .filter(Boolean);

        blanks.forEach(b => {
          if (b.correct_word) {
            correctBlankAnswers[b.id] = b.correct_word.trim();
            // Ensure correct word is also in word bank
            if (!wordBankArray.includes(b.correct_word.trim())) {
              wordBankArray.push(b.correct_word.trim());
            }
          }
        });
      }

      if (questionType === 'matching') {
        matchingPairs.forEach(p => {
          correctMatching[p.id] = p.id;
        });
      }

      await saveQuestionAction(
        {
          id: question?.id,
          question_text: questionText,
          question_type: questionType,
          difficulty,
          status,
          choices: questionType === 'single_choice' ? choices : [],
          correctChoice,
          word_bank: questionType === 'fill_in_the_blank' ? wordBankArray : undefined,
          blanks: questionType === 'fill_in_the_blank' ? blanks : undefined,
          matching_pairs: questionType === 'matching' ? matchingPairs : undefined,
          correctBlankAnswers: questionType === 'fill_in_the_blank' ? correctBlankAnswers : undefined,
          correctMatching: questionType === 'matching' ? correctMatching : undefined,
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
      description="จัดการเนื้อหาคำถาม รูปแบบข้อสอบ (ปรนัย/เติมคำ/จับคู่) ตัวเลือก และคำเฉลย"
      className="max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <form onSubmit={handleSave} className="space-y-4 pt-2">
        {/* Type, Status & Difficulty Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              รูปแบบข้อสอบ (Question Type)
            </label>
            <select
              value={questionType}
              onChange={e => setQuestionType(e.target.value as QuestionType)}
              className="w-full h-9 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-xs font-semibold text-[var(--foreground)]"
            >
              <option value="single_choice">ปรนัย (4 ตัวเลือก)</option>
              <option value="fill_in_the_blank">เติมคำในช่องว่าง (Word Bank)</option>
              <option value="matching">จับคู่ (Matching Pairs)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              สถานะ (Lifecycle)
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
            โจทย์คำถาม (Question Stem / Passage)
            {questionType === 'fill_in_the_blank' && (
              <span className="text-[11px] font-normal text-blue-600 ml-1">
                (ใช้ [blank_1], [blank_2] ในข้อความเพื่อระบุตำแหน่งช่องว่าง)
              </span>
            )}
          </label>
          <textarea
            value={questionText}
            onChange={e => setQuestionText(e.target.value)}
            rows={3}
            className="w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] p-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
            placeholder={
              questionType === 'fill_in_the_blank'
                ? 'เช่น ใน TCP/IP ชั้น [blank_1] จัดการส่งข้อมูลผ่านโปรโตคอล [blank_2]...'
                : questionType === 'matching'
                ? 'เช่น จงจับคู่อุปกรณ์เครือข่ายกับหน้าที่การทำงานให้ถูกต้อง'
                : 'พิมพ์โจทย์คำถามที่ต้องการทดสอบ...'
            }
            required
          />
        </div>

        {/* 1. Single Choice Choices */}
        {questionType === 'single_choice' && (
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
                  required={questionType === 'single_choice'}
                />
              </div>
            ))}
            <p className="text-[11px] text-[var(--foreground-muted)]">
              * คลิกวงกลมด้านซ้ายเพื่อตั้งค่าตัวเลือกนั้นเป็นคำตอบที่ถูกต้อง (Answer Key)
            </p>
          </div>
        )}

        {/* 2. Fill in the Blank Editor */}
        {questionType === 'fill_in_the_blank' && (
          <div className="p-4 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--foreground)]">
                กำหนดคำเฉลยสำหรับแต่ละช่องว่าง (Blanks Answer Keys)
              </span>
              <Button type="button" variant="outline" size="sm" onClick={handleAddBlank} className="h-7 text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" />
                เพิ่มช่องว่าง
              </Button>
            </div>

            <div className="space-y-2">
              {blanks.map((b, idx) => (
                <div key={b.id} className="flex items-center gap-2">
                  <span className="h-7 px-2 rounded bg-purple-100 text-purple-800 text-xs font-bold flex items-center shrink-0">
                    #{b.position} ({b.id})
                  </span>
                  <input
                    type="text"
                    value={b.correct_word}
                    onChange={e => {
                      const copy = [...blanks];
                      copy[idx].correct_word = e.target.value;
                      setBlanks(copy);
                    }}
                    placeholder={`คำตอบที่ถูกต้องของช่อง #${b.position}`}
                    className="flex-1 h-8 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-xs"
                    required={questionType === 'fill_in_the_blank'}
                  />
                  {blanks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBlank(idx)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                คลังคำศัพท์ตัวเลือก (Word Bank) - คั่นแต่ละคำด้วยเครื่องหมายจุลภาค (,)
              </label>
              <textarea
                value={wordBankInput}
                onChange={e => setWordBankInput(e.target.value)}
                rows={2}
                placeholder="เช่น Transport Layer, TCP, UDP, Network Layer, IP, HTTP..."
                className="w-full rounded border border-[var(--border-strong)] bg-[var(--surface)] p-2 text-xs"
              />
              <p className="text-[11px] text-[var(--foreground-muted)] mt-1">
                * คำเฉลยของแต่ละช่องว่างจะถูกนำมารวมในคลังคำศัพท์ให้อัตโนมัติ สามารถเพิ่มตัวลวง (Distractors) ในนี้ได้
              </p>
            </div>
          </div>
        )}

        {/* 3. Matching Editor */}
        {questionType === 'matching' && (
          <div className="p-4 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--foreground)]">
                รายการคู่คำศัพท์/นิยาม (Matching Pairs)
              </span>
              <Button type="button" variant="outline" size="sm" onClick={handleAddPair} className="h-7 text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" />
                เพิ่มคู่คำตอบ
              </Button>
            </div>

            <div className="space-y-2">
              {matchingPairs.map((pair, idx) => (
                <div key={pair.id} className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <input
                    type="text"
                    value={pair.left}
                    onChange={e => {
                      const copy = [...matchingPairs];
                      copy[idx].left = e.target.value;
                      setMatchingPairs(copy);
                    }}
                    placeholder={`โจทย์ฝั่งซ้าย (${String.fromCharCode(65 + idx)})`}
                    className="flex-1 h-8 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-xs"
                    required={questionType === 'matching'}
                  />
                  <span className="text-xs font-bold text-zinc-400">↔</span>
                  <input
                    type="text"
                    value={pair.right}
                    onChange={e => {
                      const copy = [...matchingPairs];
                      copy[idx].right = e.target.value;
                      setMatchingPairs(copy);
                    }}
                    placeholder={`คำเฉลย/นิยามฝั่งขวา`}
                    className="flex-1 h-8 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-xs"
                    required={questionType === 'matching'}
                  />
                  {matchingPairs.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePair(idx)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
