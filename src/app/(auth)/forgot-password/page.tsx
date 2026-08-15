'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { requestPasswordResetAction } from '@/lib/auth/auth-actions';
import { CheckCircle2, ArrowLeft, Mail, AlertCircle, KeyRound, ExternalLink } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const [error, setError] = React.useState('');
  const [generatedResetToken, setGeneratedResetToken] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await requestPasswordResetAction(email);
    setIsLoading(false);

    if (res.success) {
      setIsSent(true);
      if (res.data?.resetToken) {
        setGeneratedResetToken(res.data.resetToken);
      }
    } else {
      setError(res.error || 'เกิดข้อผิดพลาดในการส่งคำขอ');
    }
  };

  return (
    <Card className="w-full border-[var(--border)] shadow-md">
      <CardHeader className="text-center space-y-2 pb-4">
        <div className="mx-auto h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shadow-xs">
          <KeyRound className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-[var(--foreground)]">
          รีเซ็ตรหัสผ่าน (Forgot Password)
        </CardTitle>
        <CardDescription className="text-xs">
          กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่
        </CardDescription>
      </CardHeader>

      {isSent ? (
        <CardContent className="space-y-4 text-center py-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              ส่งคำขอรีเซ็ตรหัสผ่านแล้ว!
            </p>
            <p className="text-xs text-[var(--foreground-muted)] max-w-xs mx-auto">
              หากอีเมล <strong>{email}</strong> มีอยู่ในระบบ คุณจะได้รับลิงก์สำหรับตั้งรหัสผ่านใหม่ทางอีเมล
            </p>
          </div>

          {/* Dev/Demo direct reset link */}
          {generatedResetToken && (
            <div className="p-3 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] text-xs text-left space-y-2">
              <div className="text-[11px] font-semibold text-[var(--primary)] uppercase">
                ลิงก์รีเซ็ตรหัสผ่านสำหรับทดสอบ (Demo Reset Link):
              </div>
              <Button asChild variant="primary" size="sm" className="w-full text-xs">
                <Link href={`/reset-password?token=${generatedResetToken}`}>
                  <span>เปิดหน้ารีเซ็ตรหัสผ่าน</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          )}

          <div className="pt-2">
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/login">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                <span>กลับหน้าเข้าสู่ระบบ</span>
              </Link>
            </Button>
          </div>
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
                อีเมลที่ลงทะเบียน
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
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
              isLoading={isLoading}
            >
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </Button>
          </CardContent>

          <CardFooter className="justify-center border-t border-[var(--border)] pt-4 text-xs">
            <Link
              href="/login"
              className="flex items-center gap-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>กลับไปหน้าเข้าสู่ระบบ</span>
            </Link>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
