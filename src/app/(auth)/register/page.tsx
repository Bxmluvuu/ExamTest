'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PasswordStrengthIndicator } from '@/components/auth/password-strength-indicator';
import { registerWithCredentialsAction } from '@/lib/auth/auth-actions';
import { validatePasswordStrength } from '@/lib/auth/password';
import { GraduationCap, ArrowRight, User, Mail, Lock, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [agreeTerms, setAgreeTerms] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('รหัสผ่านทั้งสองช่องไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
      setIsLoading(false);
      return;
    }

    const strength = validatePasswordStrength(password);
    if (!strength.isValid) {
      setError(`รหัสผ่านยังไม่ปลอดภัยเพียงพอ: ${strength.feedback.join(', ')}`);
      setIsLoading(false);
      return;
    }

    try {
      const res = await registerWithCredentialsAction({
        email,
        fullName,
        password,
        confirmPassword,
      });

      if (res && !res.success) {
        setError(res.error || 'การลงทะเบียนไม่สำเร็จ');
        setIsLoading(false);
      }
    } catch (err: any) {
      if (err?.message?.includes('NEXT_REDIRECT') || err?.digest?.includes('NEXT_REDIRECT')) {
        return;
      }
      setError('เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
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
          สร้างบัญชีผู้เรียนใหม่
        </CardTitle>
        <CardDescription className="text-xs">
          สมัครสมาชิกเพื่อเข้าถึงสไลด์และทำแบบฝึกหัดตาม Exam Blueprint
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleRegister}>
        <CardContent className="space-y-3.5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              ชื่อ-นามสกุล (Full Name)
            </label>
            <div className="relative">
              <User className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="สมชาย รักเรียน"
                className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
                required
              />
            </div>
          </div>

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
                placeholder="student@example.com"
                className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              รหัสผ่าน (Password)
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="กำหนดรหัสผ่านอย่างน้อย 8 ตัวอักษร"
                className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
                required
              />
            </div>
            {/* Real-time Password Strength Meter */}
            <PasswordStrengthIndicator password={password} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              ยืนยันรหัสผ่าน (Confirm Password)
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="กรอกรหัสผ่านซ้ำอีกครั้ง"
                className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
                required
              />
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 text-xs text-[var(--foreground-secondary)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-[var(--border-strong)] text-[var(--primary)] focus:ring-[var(--primary)]"
                required
              />
              <span>
                ฉันยอมรับ <span className="text-[var(--primary)] underline">ข้อกำหนดการใช้งาน</span> และ{' '}
                <span className="text-[var(--primary)] underline">นโยบายความเป็นส่วนตัว</span>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 font-semibold"
            isLoading={isLoading}
            disabled={!agreeTerms}
          >
            <span>สมัครสมาชิกและเริ่มเรียน</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[var(--border)] pt-4 text-xs text-[var(--foreground-muted)]">
          <span>มีบัญชีอยู่แล้ว? </span>
          <Link href="/login" className="ml-1 text-[var(--primary)] font-semibold hover:underline">
            เข้าสู่ระบบ
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
