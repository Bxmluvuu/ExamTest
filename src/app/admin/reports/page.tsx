'use client';

import * as React from 'react';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDataStore } from '@/lib/db-adapter';
import { Flag, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatThaiDate } from '@/lib/utils';
import type { QuestionQualityFlag, Question } from '@/lib/types/database';

export default function AdminReportsPage() {
  const [flags, setFlags] = React.useState<Array<QuestionQualityFlag & { question?: Question }>>([]);

  const refreshData = React.useCallback(() => {
    const store = getDataStore();
    const enriched = store.question_quality_flags.map(f => ({
      ...f,
      question: store.questions.find(q => q.id === f.question_id),
    }));
    setFlags(enriched);
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleResolveFlag = (flagId: string) => {
    const store = getDataStore();
    const target = store.question_quality_flags.find(f => f.id === flagId);
    if (target) {
      target.is_resolved = true;
      refreshData();
    }
  };

  const unresolvedCount = flags.filter(f => !f.is_resolved).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[{ label: 'ข้อสอบ' }, { label: 'รายงานคุณภาพ' }]}
        title="รายงานคุณภาพและข้อสอบที่ถูกแจ้งเตือน (Quality Flags & Reports)"
        subtitle="ตรวจสอบข้อสอบที่ AI สร้างขึ้นและต้องผ่านการตรวจสอบ หรือข้อสอบที่มี Flag ทางคุณภาพ"
        badges={
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
            unresolvedCount > 0
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            {unresolvedCount} รายการรอแก้ไข
          </span>
        }
      />

      {flags.length === 0 ? (
        <Card className="p-8 text-center">
          <CheckCircle2 className="h-10 w-10 text-[var(--success)] mx-auto mb-2" />
          <h3 className="font-semibold text-sm text-[var(--foreground)]">ไม่พบข้อสอบที่ถูกติด Flag</h3>
          <p className="text-xs text-[var(--foreground-muted)] mt-1">คลังคำถามทั้งหมดผ่านเกณฑ์ความสมบูรณ์และไม่มีรายงานปัญหา</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {flags.map(f => (
            <Card key={f.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    f.severity === 'high'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {f.severity} Priority
                  </span>
                  <span className="text-xs font-semibold text-[var(--foreground)]">{f.flag_type}</span>
                </div>

                <div className="flex items-center gap-2">
                  {f.is_resolved ? (
                    <span className="text-xs text-[var(--success)] font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>ตรวจสอบแล้ว</span>
                    </span>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleResolveFlag(f.id)}
                    >
                      <span>ทำเครื่องหมายว่าตรวจแล้ว</span>
                    </Button>
                  )}
                </div>
              </div>

              <div className="text-xs text-[var(--foreground)] bg-[var(--surface-subtle)] p-3 rounded border border-[var(--border)]">
                <div className="font-medium text-[var(--foreground-muted)] mb-1">รายละเอียดปัญหา:</div>
                <p>{f.description}</p>
              </div>

              {f.question && (
                <div className="text-xs text-[var(--foreground-muted)] flex items-center justify-between pt-1">
                  <span className="truncate max-w-lg">โจทย์: <strong>{f.question.question_text}</strong></span>
                  <Link
                    href={`/admin/questions`}
                    className="text-[var(--primary)] hover:underline font-medium inline-flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>ไปยังคลังคำถาม</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
