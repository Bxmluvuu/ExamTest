'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PasswordStrengthIndicator } from '@/components/auth/password-strength-indicator';
import { resetPasswordAction } from '@/lib/auth/auth-actions';
import { validatePasswordStrength } from '@/lib/auth/password';
import { KeyRound, Lock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={<div className="text-center text-xs text-[var(--foreground-muted)]">กำลังเตรียมหน้ารีเซ็ตรหัสผ่าน...</div>}>
      <ResetPasswordForm />
    </React.Suspense>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!token) {
      setError('ไม่พบรหัสโทเค็นสำหรับรีเซ็ตรหัสผ่าน กรุณาขอลิงก์ใหม่จากหน้าลืมรหัสผ่าน');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('รหัสผ่านทั้งสองช่องไม่ตรงกัน');
      setIsLoading(false);
      return;
    }

    const strength = validatePasswordStrength(newPassword);
    if (!strength.isValid) {
      setError(`รหัสผ่านใหม่ยังไม่ปลอดภัย: ${strength.feedback.join(', ')}`);
      setIsLoading(false);
      return;
    }

    const res = await resetPasswordAction({
      token,
      newPassword,
      confirmPassword,
    });

    setIsLoading(false);

    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setError(res.error || 'ไม่สามารถรีเซ็ตรหัสผ่านได้ โทเค็นอาจหมดอายุหรือถูกใช้ไปแล้ว');
    }
  };

  return (
    <Card className="w-full border-[var(--border)] shadow-md">
      <CardHeader className="text-center space-y-2 pb-4">
        <div className="mx-auto h-12 w-12 rounded-xl bg-blue-50 text-[var(--primary)] flex items-center justify-center border border-blue-200 shadow-xs">
          <KeyRound className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-[var(--foreground)]">
          ตั้งรหัสผ่านใหม่ (Reset Password)
        </CardTitle>
        <CardDescription className="text-xs">
          กรุณากำหนดรหัสผ่านใหม่ที่มีความปลอดภัยสูงสำหรับบัญชีของคุณ
        </CardDescription>
      </CardHeader>

      {isSuccess ? (
        <CardContent className="space-y-4 text-center py-6">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[var(--foreground)]">ตั้งรหัสผ่านใหม่สำเร็จ!</h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              ระบบกำลังพาท่านไปหน้าเข้าสู่ระบบโดยอัตโนมัติ...
            </p>
          </div>
          <Button asChild variant="primary" size="md" className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/login">
              <span>เข้าสู่ระบบทันที</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-3.5">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{error}</div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                รหัสผ่านใหม่ (New Password)
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="กำหนดรหัสผ่านใหม่"
                  className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
                  required
                />
              </div>
              <PasswordStrengthIndicator password={newPassword} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                ยืนยันรหัสผ่านใหม่ (Confirm New Password)
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                  className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full bg-blue-600 hover:bg-blue-700 font-semibold mt-2"
              isLoading={isLoading}
            >
              บันทึกรหัสผ่านใหม่
            </Button>
          </CardContent>

          <CardFooter className="justify-center border-t border-[var(--border)] pt-4 text-xs">
            <Link href="/login" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
              ยกเลิกและกลับไปหน้าเข้าสู่ระบบ
            </Link>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
