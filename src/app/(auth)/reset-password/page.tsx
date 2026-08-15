'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('รหัสผ่านทั้งสองช่องไม่ตรงกัน');
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      router.push('/login');
    }, 1200);
  };

  return (
    <Card className="w-full border-[var(--border)] shadow-md">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-xl font-bold">ตั้งรหัสผ่านใหม่</CardTitle>
        <CardDescription className="text-xs">
          กรุณากรอกรหัสผ่านใหม่ที่คุณต้องการใช้งาน
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3.5">
          {isSuccess && (
            <div className="p-2.5 rounded bg-green-50 text-green-700 text-xs border border-green-200">
              ตั้งรหัสผ่านใหม่สำเร็จ กำลังพาท่านไปหน้าเข้าสู่ระบบ...
            </div>
          )}
          <Input
            label="รหัสผ่านใหม่ (New Password)"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Input
            label="ยืนยันรหัสผ่านใหม่ (Confirm Password)"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" size="md" className="w-full">
            บันทึกรหัสผ่านใหม่
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
