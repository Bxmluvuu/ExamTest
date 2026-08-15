'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { quickDemoLoginAction, loginWithUserIdAction } from '@/lib/auth/auth-actions';
import { GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="text-center text-xs text-[var(--foreground-muted)]">กำลังโหลดหน้าเข้าสู่ระบบ...</div>}>
      <LoginForm />
    </React.Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next');

  const [email, setEmail] = React.useState('student@example.com');
  const [password, setPassword] = React.useState('password123');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const isAdmin = email.toLowerCase().includes('admin');
    const targetUserId = isAdmin ? 'u-admin-001' : 'u-student-001';

    try {
      await loginWithUserIdAction(targetUserId, nextParam || undefined);
    } catch {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (role: 'student' | 'admin') => {
    setIsLoading(true);
    try {
      await quickDemoLoginAction(role, nextParam || undefined);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full border-[var(--border)] shadow-md">
      <CardHeader className="space-y-2 text-center pb-4">
        <div className="mx-auto h-12 w-12 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-xs">
          <GraduationCap className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-[var(--foreground)]">
          เข้าสู่ระบบ ExamPlatform
        </CardTitle>
        <CardDescription className="text-xs">
          คลังเนื้อหา สไลด์ PDF และระบบสอบวัดผลตาม Exam Blueprint
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleLogin}>
        <CardContent className="space-y-3.5">
          {error && (
            <div className="p-2.5 rounded bg-red-50 text-red-700 text-xs border border-red-200">
              {error}
            </div>
          )}

          <Input
            label="อีเมล (Email)"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-[var(--foreground)]">รหัสผ่าน (Password)</label>
              <Link href="/forgot-password" className="text-xs text-[var(--primary)] hover:underline">
                ลืมรหัสผ่าน?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)]"
              required
            />
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full" isLoading={isLoading}>
            <span>เข้าสู่ระบบ</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>

          {/* Quick Demo Access Bar */}
          <div className="pt-3 border-t border-[var(--border)] space-y-2">
            <div className="text-[11px] font-semibold text-[var(--foreground-muted)] uppercase text-center">
              ทดสอบระบบด้วยบัญชีตัวอย่าง
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] hover:bg-[var(--surface-strong)] text-xs text-center font-medium cursor-pointer transition-colors"
              >
                👤 เข้าเป็น Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-800 text-xs text-center font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>เข้าเป็น Admin</span>
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[var(--border)] pt-4 text-xs text-[var(--foreground-muted)]">
          <span>ยังไม่มีบัญชีผู้ใช้งาน? </span>
          <Link href="/register" className="ml-1 text-[var(--primary)] font-semibold hover:underline">
            สมัครสมาชิก
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
