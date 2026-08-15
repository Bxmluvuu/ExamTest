'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { loginWithCredentialsAction, quickDemoLoginAction } from '@/lib/auth/auth-actions';
import { GraduationCap, ArrowRight, ShieldCheck, AlertCircle, Lock, Mail } from 'lucide-react';

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
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isLocked, setIsLocked] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await loginWithCredentialsAction({
        email,
        password,
        rememberMe,
        nextUrl: nextParam || undefined,
      });

      if (res && !res.success) {
        setError(res.error || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        setIsLocked(Boolean(res.isLocked));
        setIsLoading(false);
      }
    } catch (err: any) {
      // Next.js redirect throws a NEXT_REDIRECT digest error which is expected on successful redirect
      if (err?.message?.includes('NEXT_REDIRECT') || err?.digest?.includes('NEXT_REDIRECT')) {
        return;
      }
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (role: 'student' | 'admin') => {
    setIsLoading(true);
    try {
      await quickDemoLoginAction(role, nextParam || undefined);
    } catch (err: any) {
      if (err?.message?.includes('NEXT_REDIRECT') || err?.digest?.includes('NEXT_REDIRECT')) {
        return;
      }
      setIsLoading(false);
    }
  };

  const handleGoogleOAuth = () => {
    // Simulated Google OAuth provider flow
    setIsLoading(true);
    setTimeout(() => {
      quickDemoLoginAction('student', nextParam || undefined);
    }, 600);
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
          ระบบคลังข้อสอบ สไลด์ PDF และประเมินผลความรู้ตาม Exam Blueprint
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleLogin}>
        <CardContent className="space-y-3.5">
          {error && (
            <div className={`p-3 rounded-lg text-xs border flex items-start gap-2 ${
              isLocked
                ? 'bg-red-50 text-red-800 border-red-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              {isLocked ? (
                <Lock className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              อีเมล (Email Address)
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
                required
                disabled={isLoading || isLocked}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[var(--foreground)]">
                รหัสผ่าน (Password)
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[var(--primary)] hover:underline font-medium"
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>
            <div className="relative">
              <Lock className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่านของคุณ"
                className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
                required
                disabled={isLoading || isLocked}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-[var(--foreground-secondary)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded border-[var(--border-strong)] text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span>จดจำการเข้าสู่ระบบบนอุปกรณ์นี้ (30 วัน)</span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
            isLoading={isLoading}
            disabled={isLocked}
          >
            <span>เข้าสู่ระบบ</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>

          {/* Google OAuth Option */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[var(--surface)] px-2 text-[var(--foreground-muted)] font-semibold">
                หรือเข้าสู่ระบบด้วย
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleOAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-xs font-medium text-[var(--foreground)] transition-colors cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>ดำเนินการต่อด้วย Google</span>
          </button>

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
            สมัครสมาชิกใหม่
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
