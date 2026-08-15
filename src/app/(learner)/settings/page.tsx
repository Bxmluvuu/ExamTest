'use client';

import * as React from 'react';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCurrentSessionUser } from '@/lib/db-adapter';
import { User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Profile } from '@/lib/types/database';

export default function LearnerSettingsPage() {
  const [profile, setProfile] = React.useState<Profile>(() => getCurrentSessionUser());
  const [fullName, setFullName] = React.useState('');
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    const u = getCurrentSessionUser();
    setProfile(u);
    setFullName(u.full_name || '');
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({ ...prev, full_name: fullName }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <LearnerPageHeader
        title="ตั้งค่าบัญชีผู้เรียน (Account Settings)"
        description="จัดการข้อมูลส่วนตัวและการตั้งค่าการเรียนของคุณ"
      />

      {isSaved && (
        <div className="p-3.5 rounded-lg bg-green-50 text-green-800 border border-green-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
          <span>บันทึกข้อมูลการตั้งค่าเรียบร้อยแล้ว</span>
        </div>
      )}

      <Card>
        <CardHeader className="pb-3 border-b border-[var(--border)]">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-[var(--primary)]" />
            <span>ข้อมูลโปรไฟล์ (Profile Details)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="ชื่อ-นามสกุล"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="สมชาย รักเรียน"
              required
            />

            <div>
              <label className="block text-xs font-medium text-[var(--foreground)] mb-1">อีเมล</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-2 text-xs text-[var(--foreground-muted)] cursor-not-allowed"
              />
              <p className="text-[11px] text-[var(--foreground-muted)] mt-1">อีเมลผูกกับระบบยืนยันตัวตน</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--foreground)] mb-1">บทบาทในระบบ (Role)</label>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)]">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
                <span>{profile.role === 'admin' ? 'อาจารย์ / ผู้ดูแลระบบ (Admin)' : 'ผู้เรียน (Student)'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex justify-end">
              <Button type="submit" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700">
                บันทึกการเปลี่ยนแปลง
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
