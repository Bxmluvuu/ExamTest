import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'ไม่มีสิทธิ์เข้าถึง (403 Forbidden)',
  description: 'คุณไม่มีสิทธิ์ในการเข้าถึงพื้นที่ผู้ดูแลระบบ (Admin Console)',
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
      <Card className="w-full max-w-md border-[var(--border)] shadow-md text-center">
        <CardHeader className="space-y-3 pb-4">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight text-[var(--foreground)]">
            ไม่มีสิทธิ์เข้าถึงพื้นที่นี้ (403 Forbidden)
          </CardTitle>
          <CardDescription className="text-xs text-[var(--foreground-muted)] max-w-xs mx-auto">
            พื้นที่นี้สงวนไว้สำหรับผู้ดูแลระบบ (Admin) เท่านั้น บัญชีผู้เรียนของคุณไม่ได้รับอนุญาตให้เข้าใช้งานส่วนจัดการนี้
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="p-3.5 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] text-xs text-left space-y-1.5">
            <div className="font-semibold text-[var(--foreground)]">คำแนะนำ:</div>
            <p className="text-[var(--foreground-muted)]">
              • หากคุณเป็นผู้เรียน กรุณากลับไปยังพื้นที่การเรียนของคุณ
            </p>
            <p className="text-[var(--foreground-muted)]">
              • หากคุณเป็นอาจารย์หรือผู้ดูแลระบบ กรุณาเข้าสู่ระบบด้วยบัญชี Admin
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
          <Button asChild variant="primary" size="md" className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              <span>กลับสู่แดชบอร์ดผู้เรียน (Learner Dashboard)</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="md" className="w-full">
            <Link href="/login">
              <LogIn className="h-4 w-4 mr-1.5" />
              <span>สลับบัญชี / เข้าสู่ระบบใหม่</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
