'use client';

import * as React from 'react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCurrentSessionUser } from '@/lib/db-adapter';
import { Settings, ShieldAlert, CheckCircle2, Key, Database, Sparkles } from 'lucide-react';
import type { Profile } from '@/lib/types/database';

export default function AdminSettingsPage() {
  const [profile, setProfile] = React.useState<Profile>(() => getCurrentSessionUser());
  const [model, setModel] = React.useState('gpt-4o-mini');
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    setProfile(getCurrentSessionUser());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <AdminPageHeader
        breadcrumbs={[{ label: 'ระบบ' }, { label: 'ตั้งค่าระบบ' }]}
        title="การตั้งค่าระบบผู้ดูแล (Admin Console Settings)"
        subtitle="จัดการการเชื่อมต่อ AI Provider, Database, และพารามิเตอร์การทำงานของระบบ"
      />

      {isSaved && (
        <div className="p-3.5 rounded-lg bg-green-50 text-green-800 border border-green-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
          <span>บันทึกการตั้งค่าระบบเรียบร้อยแล้ว</span>
        </div>
      )}

      {/* AI Pipeline Configuration */}
      <Card>
        <CardHeader className="pb-3 border-b border-[var(--border)]">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span>การกำหนดค่า AI Provider & Pipeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">โมเดล AI สำหรับประมวลผลคำถาม (Default LLM)</label>
              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                className="h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs text-[var(--foreground)]"
              >
                <option value="gpt-4o-mini">gpt-4o-mini (Default Fast & Accurate)</option>
                <option value="gpt-4o">gpt-4o (High-Precision Reasoning)</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro (Long Context)</option>
                <option value="claude-3-5-sonnet">claude-3-5-sonnet</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">ความปลอดภัยของคำถาม AI</label>
              <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-200 text-xs text-purple-900 space-y-1">
                <p className="font-semibold">✓ Mandatory Human Verification Enforcement:</p>
                <p className="text-[11px]">
                  ทุกข้อสอบที่ถูกสร้างโดย AI จะถูกจัดเก็บในสถานะ <strong>Draft</strong> เสมอ และไม่มีทางถูกปล่อยสู่ผู้เรียนโดยตรงจนกว่าผู้ดูแลจะกด Approve / Publish
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex justify-end">
              <Button type="submit" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700">
                บันทึกการตั้งค่า
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
