'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <Card className="w-full border-[var(--border)] shadow-md">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-xl font-bold">รีเซ็ตรหัสผ่าน</CardTitle>
        <CardDescription className="text-xs">
          กรอกอีเมลที่ใช้สมัครเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่
        </CardDescription>
      </CardHeader>

      {isSent ? (
        <CardContent className="space-y-4 text-center py-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-[var(--foreground)]">
            ระบบได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง {email} แล้ว
          </p>
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/login">กลับหน้าเข้าสู่ระบบ</Link>
          </Button>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-3">
            <Input
              label="อีเมลที่ลงทะเบียน"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
            <Button type="submit" variant="primary" size="md" className="w-full">
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </Button>
          </CardContent>
          <CardFooter className="justify-center border-t border-[var(--border)] pt-4 text-xs">
            <Link href="/login" className="flex items-center gap-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>กลับไปหน้าเข้าสู่ระบบ</span>
            </Link>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
