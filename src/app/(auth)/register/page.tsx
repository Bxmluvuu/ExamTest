'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { loginWithUserIdAction } from '@/lib/auth/auth-actions';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginWithUserIdAction('u-student-001', '/dashboard');
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
          สร้างบัญชีผู้เรียนใหม่
        </CardTitle>
        <CardDescription className="text-xs">
          สมัครสมาชิกเพื่อเข้าถึงสไลด์และทำแบบฝึกหัดตาม Blueprint
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleRegister}>
        <CardContent className="space-y-3.5">
          <Input
            label="ชื่อ-นามสกุล (Full Name)"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="สมชาย รักเรียน"
            required
          />
          <Input
            label="อีเมล (Email)"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="student@example.com"
            required
          />
          <Input
            label="รหัสผ่าน (Password)"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="กำหนดรหัสผ่านอย่างน้อย 8 ตัวอักษร"
            required
          />

          <Button type="submit" variant="primary" size="md" className="w-full mt-2" isLoading={isLoading}>
            <span>สมัครสมาชิก</span>
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
