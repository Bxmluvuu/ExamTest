'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { verifyEmailAction, resendVerificationEmailAction } from '@/lib/auth/auth-actions';
import { getCurrentSessionUser } from '@/lib/db-adapter';
import { MailCheck, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <React.Suspense fallback={<div className="text-center text-xs text-[var(--foreground-muted)]">กำลังเตรียมหน้ายืนยันอีเมล...</div>}>
      <VerifyEmailForm />
    </React.Suspense>
  );
}

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token');
  const isSentParam = searchParams.get('sent');

  const [tokenInput, setTokenInput] = React.useState(tokenParam || '');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState('');
  const [resendStatus, setResendStatus] = React.useState('');

  const handleVerify = async (tokenToVerify?: string) => {
    const target = tokenToVerify || tokenInput;
    if (!target) {
      setError('กรุณากรอกรหัสหรือโทเค็นยืนยัน');
      return;
    }

    setIsLoading(true);
    setError('');

    const res = await verifyEmailAction(target);
    setIsLoading(false);

    if (res.success) {
      setIsSuccess(true);
    } else {
      setError(res.error || 'โทเค็นยืนยันไม่ถูกต้องหรือหมดอายุ');
    }
  };

  const handleResend = async () => {
    const user = getCurrentSessionUser();
    setIsLoading(true);
    const res = await resendVerificationEmailAction(user.id);
    setIsLoading(false);

    if (res.success) {
      setResendStatus('ส่งลิงก์ยืนยันใหม่ไปยังอีเมลของคุณเรียบร้อยแล้ว');
      if (res.data?.token) {
        setTokenInput(res.data.token);
      }
      setTimeout(() => setResendStatus(''), 4000);
    } else {
      setError('ไม่สามารถส่งคำขอใหม่ได้ กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <Card className="w-full border-[var(--border)] shadow-md">
      <CardHeader className="text-center space-y-2 pb-4">
        <div className="mx-auto h-12 w-12 rounded-xl bg-blue-50 text-[var(--primary)] flex items-center justify-center border border-blue-200 shadow-xs">
          <MailCheck className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-[var(--foreground)]">
          ยืนยันที่อยู่อีเมล (Email Verification)
        </CardTitle>
        <CardDescription className="text-xs">
          ยืนยันอีเมลของคุณเพื่อเปิดใช้งานระบบการสอบและรับรายงานผลเต็มรูปแบบ
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isSuccess ? (
          <div className="space-y-4 text-center py-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[var(--foreground)]">ยืนยันอีเมลสำเร็จเรียบร้อย!</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                บัญชีของคุณได้รับการยืนยันความถูกต้องแล้ว สามารถเข้าใช้งานคลังข้อสอบและทำแบบฝึกหัดได้เต็มรูปแบบ
              </p>
            </div>
            <Button asChild variant="primary" size="md" className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard">
                <span>ไปที่แดชบอร์ดการเรียน</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{error}</div>
              </div>
            )}

            {resendStatus && (
              <div className="p-3 rounded-lg bg-green-50 text-green-700 border border-green-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <span>{resendStatus}</span>
              </div>
            )}

            {isSentParam && (
              <div className="p-3 rounded-lg bg-blue-50 text-[var(--primary)] border border-blue-200 text-xs">
                เราได้ส่งลิงก์ยืนยันไปยังอีเมลของคุณแล้ว กรุณากดลิงก์ในอีเมลหรือกรอกโทเค็นด้านล่าง
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                รหัสหรือโทเค็นยืนยันอีเมล (Verification Token)
              </label>
              <input
                type="text"
                value={tokenInput}
                onChange={e => setTokenInput(e.target.value)}
                placeholder="เช่น vfy_1234567890..."
                className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs text-[var(--foreground)] font-mono"
              />
            </div>

            <Button
              type="button"
              onClick={() => handleVerify()}
              variant="primary"
              size="md"
              className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
              isLoading={isLoading}
            >
              <span>ยืนยันอีเมลทันที</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>

            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="text-[var(--primary)] hover:underline font-medium flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" />
                <span>ส่งอีเมลยืนยันอีกครั้ง</span>
              </button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-center border-t border-[var(--border)] pt-4 text-xs">
        <Link href="/dashboard" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
          กลับสู่แดชบอร์ด
        </Link>
      </CardFooter>
    </Card>
  );
}
