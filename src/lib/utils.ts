import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatThaiDate(dateString?: string): string {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function formatScore(score: number, max: number): string {
  return `${score} / ${max}`;
}

export function getDifficultyColor(diff: string): { bg: string; text: string; label: string } {
  switch (diff) {
    case 'easy':
      return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'text-emerald-700', label: 'ง่าย (Easy)' };
    case 'hard':
      return { bg: 'bg-rose-50 text-rose-700 border-rose-200', text: 'text-rose-700', label: 'ยาก (Hard)' };
    case 'medium':
    default:
      return { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'text-amber-700', label: 'ปานกลาง (Medium)' };
  }
}

export function getStatusBadge(status: string): { bg: string; text: string; label: string } {
  switch (status) {
    case 'published':
      return { bg: 'bg-blue-50 text-blue-700 border-blue-200', text: 'text-blue-700', label: 'เผยแพร่แล้ว (Published)' };
    case 'approved':
      return { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', text: 'text-indigo-700', label: 'อนุมัติแล้ว (Approved)' };
    case 'needs_review':
      return { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'text-amber-700', label: 'รอตรวจสอบ (Review)' };
    case 'retired':
      return { bg: 'bg-zinc-100 text-zinc-600 border-zinc-200', text: 'text-zinc-600', label: 'ยกเลิกแล้ว (Retired)' };
    case 'draft':
    default:
      return { bg: 'bg-zinc-100 text-zinc-700 border-zinc-200', text: 'text-zinc-700', label: 'ฉบับร่าง (Draft)' };
  }
}
