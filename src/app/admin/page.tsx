'use client';

import * as React from 'react';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShieldAlert,
  Database,
  Sliders,
  FileText,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flag,
  FileSpreadsheet,
} from 'lucide-react';
import { getDataStore, getAdminAuditLogs, getCurrentSessionUser } from '@/lib/db-adapter';
import { formatThaiDate } from '@/lib/utils';
import type { AdminAuditLog } from '@/lib/types/database';

export default function AdminOverviewPage() {
  const [stats, setStats] = React.useState({
    totalQuestions: 0,
    publishedCount: 0,
    draftCount: 0,
    reviewCount: 0,
    totalSubjects: 0,
    totalDocuments: 0,
    totalBlueprints: 0,
    flaggedCount: 0,
  });

  const [logs, setLogs] = React.useState<AdminAuditLog[]>([]);

  React.useEffect(() => {
    const store = getDataStore();
    const questions = store.questions;
    setStats({
      totalQuestions: questions.length,
      publishedCount: questions.filter(q => q.status === 'published').length,
      draftCount: questions.filter(q => q.status === 'draft').length,
      reviewCount: questions.filter(q => q.status === 'needs_review').length,
      totalSubjects: store.subjects.length,
      totalDocuments: store.source_documents.length,
      totalBlueprints: store.exam_blueprints.length,
      flaggedCount: store.question_quality_flags.filter(f => !f.is_resolved).length,
    });
    getAdminAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="ภาพรวมระบบ (System Overview)"
        subtitle="ศูนย์ควบคุมการจัดการเนื้อหา คลังคำถาม และสถานะการประมวลผล AI Pipeline ทั่วทั้งระบบ"
        badges={
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[var(--success)] border border-emerald-200">
            System Operational
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/questions">
                <Database className="h-3.5 w-3.5 mr-1" />
                <span>คลังคำถาม</span>
              </Link>
            </Button>
            <Button asChild variant="primary" size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/admin/generation-runs">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                <span>รัน AI Pipeline</span>
              </Link>
            </Button>
          </div>
        }
      />

      {/* Operational Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-xs text-[var(--foreground-muted)] font-medium">คำถามทั้งหมดในคลัง</div>
          <div className="text-2xl font-bold text-[var(--foreground)] mt-1">{stats.totalQuestions} ข้อ</div>
          <div className="text-[11px] text-[var(--primary)] font-semibold mt-0.5">
            {stats.publishedCount} ข้อ เผยแพร่แล้ว (Published)
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-[var(--foreground-muted)] font-medium">รอการตรวจสอบ (Review Queue)</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">{stats.reviewCount + stats.draftCount} ข้อ</div>
          <div className="text-[11px] text-[var(--foreground-muted)]">AI Draft {stats.draftCount} • Review {stats.reviewCount}</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-[var(--foreground-muted)] font-medium">เอกสารสไลด์ในคลัง (PDFs)</div>
          <div className="text-2xl font-bold text-[var(--foreground)] mt-1">{stats.totalDocuments} ฉบับ</div>
          <div className="text-[11px] text-[var(--success)] font-medium">✓ OCR Verified Ready</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-[var(--foreground-muted)] font-medium">Exam Blueprints</div>
          <div className="text-2xl font-bold text-[var(--foreground)] mt-1">{stats.totalBlueprints} พิมพ์เขียว</div>
          <div className="text-[11px] text-[var(--foreground-muted)]">พร้อมจำลองการสอบ</div>
        </Card>
      </div>

      {/* Admin Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 flex flex-col justify-between hover:border-[var(--border-strong)] transition-all">
          <div className="space-y-2">
            <div className="h-9 w-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm text-[var(--foreground)]">จัดการคลังข้อสอบ (Question Bank)</h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              ค้นหา ตรวจสอบ แก้ไข อนุมัติ และ Batch Publish / Retire ข้อสอบ
            </p>
          </div>
          <Button asChild variant="primary" size="sm" className="mt-4 w-full">
            <Link href="/admin/questions">
              <span>เปิดคลังคำถาม</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </Card>

        <Card className="p-5 flex flex-col justify-between hover:border-[var(--border-strong)] transition-all">
          <div className="space-y-2">
            <div className="h-9 w-9 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm text-[var(--foreground)]">AI Generation Pipeline</h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              ประมวลผลข้อสอบอัตโนมัติจาก Slide/PDF และติดตาม Coverage เทียบ 500 ข้อ
            </p>
          </div>
          <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
            <Link href="/admin/generation-runs">
              <span>จัดการ Pipeline</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </Card>

        <Card className="p-5 flex flex-col justify-between hover:border-[var(--border-strong)] transition-all">
          <div className="space-y-2">
            <div className="h-9 w-9 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Sliders className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm text-[var(--foreground)]">Exam Blueprints</h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              กำหนดเกณฑ์จำลองสอบ สัดส่วนความยาก และตรวจ Quota ความพอเพียง
            </p>
          </div>
          <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
            <Link href="/admin/blueprints">
              <span>จัดการ Blueprints</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </Card>
      </div>

      {/* Audit Log Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-[var(--primary)]" />
            <span>บันทึกการทำงานของระบบ (Admin Audit Logs)</span>
          </CardTitle>
          <Link href="/admin/audit-logs" className="text-xs text-[var(--primary)] hover:underline">
            ดูทั้งหมด ({logs.length})
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-t border-[var(--border)]">
              <thead className="bg-[var(--surface-subtle)] text-[var(--foreground-muted)] uppercase border-b border-[var(--border)]">
                <tr>
                  <th className="px-3 py-2.5">วันเวลา</th>
                  <th className="px-3 py-2.5">การกระทำ (Action)</th>
                  <th className="px-3 py-2.5">เอนทิตี (Entity)</th>
                  <th className="px-3 py-2.5">รหัสเป้าหมาย</th>
                  <th className="px-3 py-2.5">รายละเอียด</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {logs.slice(0, 5).map(log => (
                  <tr key={log.id} className="hover:bg-[var(--surface-subtle)]">
                    <td className="px-3 py-2.5 font-mono text-[var(--foreground-muted)] whitespace-nowrap">
                      {formatThaiDate(log.created_at)}
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-[var(--foreground)] whitespace-nowrap">
                      {log.action}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{log.target_entity}</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-[var(--foreground-muted)] whitespace-nowrap">
                      {log.target_id}
                    </td>
                    <td className="px-3 py-2.5 text-[var(--foreground-muted)] truncate max-w-xs">
                      {JSON.stringify(log.details)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
