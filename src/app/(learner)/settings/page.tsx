'use client';

import * as React from 'react';
import Link from 'next/link';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordStrengthIndicator } from '@/components/auth/password-strength-indicator';
import {
  changePasswordAction,
  revokeSessionAction,
  revokeAllOtherSessionsAction,
  resendVerificationEmailAction,
} from '@/lib/auth/auth-actions';
import { validatePasswordStrength } from '@/lib/auth/password';
import {
  getCurrentSessionUser,
  getUserSessions,
  updateProfile,
} from '@/lib/db-adapter';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Laptop,
  Smartphone,
  LogOut,
  AlertCircle,
  MailCheck,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { useUser } from '@/lib/auth/user-context';
import { cn, formatThaiDate } from '@/lib/utils';
import type { Profile, UserSession } from '@/lib/types/database';

export default function LearnerSettingsPage() {
  const { profile: contextProfile, setProfile: setContextProfile } = useUser();
  const [profile, setProfile] = React.useState<Profile>(() => contextProfile || getCurrentSessionUser());
  const [activeTab, setActiveTab] = React.useState<'profile' | 'security' | 'sessions'>('profile');

  // Profile tab state
  const [fullName, setFullName] = React.useState(contextProfile?.full_name || '');
  const [isProfileSaved, setIsProfileSaved] = React.useState(false);
  const [verifyEmailSent, setVerifyEmailSent] = React.useState(false);

  // Security tab state
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isPasswordSaved, setIsPasswordSaved] = React.useState(false);
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);

  // Sessions tab state
  const [sessions, setSessions] = React.useState<UserSession[]>([]);
  const [isRevoking, setIsRevoking] = React.useState(false);
  const [sessionSuccessMsg, setSessionSuccessMsg] = React.useState('');

  const refreshSessions = React.useCallback(() => {
    const u = contextProfile || getCurrentSessionUser();
    getUserSessions(u.id).then(setSessions);
  }, [contextProfile]);

  React.useEffect(() => {
    const u = contextProfile || getCurrentSessionUser();
    setProfile(u);
    setFullName(u.full_name || '');
    refreshSessions();
  }, [contextProfile, refreshSessions]);

  // Profile Save Handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profile.id, { full_name: fullName });
    const updated = { ...profile, full_name: fullName };
    setProfile(updated);
    setContextProfile(updated);
    setIsProfileSaved(true);
    setTimeout(() => setIsProfileSaved(false), 2500);
  };

  // Resend Email Verification Handler
  const handleResendEmail = async () => {
    await resendVerificationEmailAction(profile.id);
    setVerifyEmailSent(true);
    setTimeout(() => setVerifyEmailSent(false), 4000);
  };

  // Change Password Handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setIsPasswordSaved(false);

    if (newPassword !== confirmPassword) {
      setPasswordError('รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    const strength = validatePasswordStrength(newPassword);
    if (!strength.isValid) {
      setPasswordError(`รหัสผ่านใหม่ไม่ปลอดภัย: ${strength.feedback.join(', ')}`);
      return;
    }

    setIsChangingPassword(true);
    const res = await changePasswordAction({
      userId: profile.id,
      currentPassword,
      newPassword,
      confirmPassword,
    });
    setIsChangingPassword(false);

    if (res.success) {
      setIsPasswordSaved(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setIsPasswordSaved(false), 3000);
    } else {
      setPasswordError(res.error || 'ไม่สามารถเปลี่ยนรหัสผ่านได้');
    }
  };

  // Revoke Single Session Handler
  const handleRevokeSession = async (sessionId: string) => {
    await revokeSessionAction(sessionId, profile.id);
    refreshSessions();
  };

  // Revoke All Other Sessions Handler
  const handleRevokeAllOtherSessions = async () => {
    setIsRevoking(true);
    const currentSessId = sessions[0]?.id || 'sess-001';
    await revokeAllOtherSessionsAction(profile.id, currentSessId);
    setIsRevoking(false);
    setSessionSuccessMsg('ออกจากระบบอุปกรณ์อื่นทั้งหมดเรียบร้อยแล้ว');
    refreshSessions();
    setTimeout(() => setSessionSuccessMsg(''), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <LearnerPageHeader
        title="การตั้งค่าบัญชีและความปลอดภัย (Account Settings)"
        description="จัดการข้อมูลส่วนตัว ความปลอดภัยของรหัสผ่าน และอุปกรณ์ที่เข้าสู่ระบบ"
      />

      {/* Segmented Control Tabs */}
      <div className="border-b border-[var(--border)]">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto text-sm font-medium">
          {[
            { key: 'profile', label: 'ข้อมูลโปรไฟล์', icon: User },
            { key: 'security', label: 'ความปลอดภัย & รหัสผ่าน', icon: KeyRound },
            { key: 'sessions', label: `อุปกรณ์ที่ใช้งาน (${sessions.length})`, icon: Laptop },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={cn(
                  'flex items-center gap-2 py-3 px-1 border-b-2 font-medium transition-colors cursor-pointer select-none whitespace-nowrap',
                  isActive
                    ? 'border-[var(--primary)] text-[var(--primary)] font-semibold'
                    : 'border-transparent text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: ข้อมูลโปรไฟล์ (Profile) */}
      {activeTab === 'profile' && (
        <div className="space-y-4">
          {isProfileSaved && (
            <div className="p-3.5 rounded-lg bg-green-50 text-green-800 border border-green-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
              <span>บันทึกข้อมูลการตั้งค่าเรียบร้อยแล้ว</span>
            </div>
          )}

          {verifyEmailSent && (
            <div className="p-3.5 rounded-lg bg-blue-50 text-[var(--primary)] border border-blue-200 text-xs flex items-center gap-2">
              <MailCheck className="h-4 w-4 text-[var(--primary)] shrink-0" />
              <span>ส่งคำขอยืนยันไปยังอีเมลของคุณเรียบร้อยแล้ว</span>
            </div>
          )}

          {/* Email Verification Banner if Unverified */}
          {!profile.is_email_verified && (
            <Card className="border-amber-300 bg-amber-50/50">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-amber-900">ที่อยู่อีเมลยังไม่ได้รับการยืนยัน</div>
                    <div className="text-amber-700 text-[11px]">
                      ยืนยันอีเมลของคุณเพื่อเปิดใช้งานรายงานผลการสอบและรับการแจ้งเตือน
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    onClick={handleResendEmail}
                    variant="outline"
                    size="sm"
                    className="text-xs border-amber-300 hover:bg-amber-100 text-amber-900"
                  >
                    ส่งอีเมลยืนยัน
                  </Button>
                  <Button asChild variant="primary" size="sm" className="text-xs bg-amber-600 hover:bg-amber-700">
                    <Link href="/verify-email">ยืนยันตอนนี้</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-3 border-b border-[var(--border)]">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-[var(--primary)]" />
                <span>ข้อมูลโปรไฟล์ (Profile Details)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <Input
                  label="ชื่อ-นามสกุล (Full Name)"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="สมชาย รักเรียน"
                  required
                />

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-[var(--foreground)]">อีเมล (Email)</label>
                    {profile.is_email_verified ? (
                      <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        <span>ยืนยันแล้ว (Verified)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <span>ยังไม่ยืนยัน</span>
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-2 text-xs text-[var(--foreground-muted)] cursor-not-allowed"
                  />
                  <p className="text-[11px] text-[var(--foreground-muted)] mt-1">อีเมลใช้สำหรับเข้าสู่ระบบและผูกโยงข้อมูลการสอบ</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--foreground)] mb-1">บทบาทในระบบ (Role)</label>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
                    <span>{profile.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : 'ผู้เรียน (Student)'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex justify-end">
                  <Button type="submit" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700">
                    บันทึกข้อมูลส่วนตัว
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: ความปลอดภัย & เปลี่ยนรหัสผ่าน (Security) */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          {isPasswordSaved && (
            <div className="p-3.5 rounded-lg bg-green-50 text-green-800 border border-green-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
              <span>เปลี่ยนรหัสผ่านสำเร็จเรียบร้อยแล้ว</span>
            </div>
          )}

          {passwordError && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{passwordError}</div>
            </div>
          )}

          <Card>
            <CardHeader className="pb-3 border-b border-[var(--border)]">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4 text-[var(--primary)]" />
                <span>เปลี่ยนรหัสผ่าน (Change Password)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                    รหัสผ่านปัจจุบัน (Current Password)
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="กรอกรหัสผ่านปัจจุบันเพื่อยืนยันตัวตน"
                    className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs text-[var(--foreground)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                    รหัสผ่านใหม่ (New Password)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="กำหนดรหัสผ่านใหม่อย่างน้อย 8 ตัวอักษร"
                    className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs text-[var(--foreground)]"
                    required
                  />
                  <PasswordStrengthIndicator password={newPassword} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                    ยืนยันรหัสผ่านใหม่ (Confirm New Password)
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                    className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs text-[var(--foreground)]"
                    required
                  />
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="bg-blue-600 hover:bg-blue-700"
                    isLoading={isChangingPassword}
                  >
                    อัปเดตรหัสผ่านใหม่
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 3: อุปกรณ์ที่เข้าสู่ระบบ (Active Sessions) */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          {sessionSuccessMsg && (
            <div className="p-3.5 rounded-lg bg-green-50 text-green-800 border border-green-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
              <span>{sessionSuccessMsg}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">รายการอุปกรณ์และเซสชันที่ใช้งานอยู่</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                ตรวจสอบประวัติการเข้าสู่ระบบและสั่งออกจากระบบบนอุปกรณ์อื่นเพื่อความปลอดภัย
              </p>
            </div>
            {sessions.length > 1 && (
              <Button
                onClick={handleRevokeAllOtherSessions}
                variant="outline"
                size="sm"
                className="text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                isLoading={isRevoking}
              >
                <LogOut className="h-3.5 w-3.5 mr-1" />
                <span>ออกจากระบบอุปกรณ์อื่นทั้งหมด</span>
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {sessions.length === 0 ? (
              <Card className="p-5 border-blue-200 bg-blue-50/20">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] shrink-0">
                      <Laptop className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-[var(--foreground)]">
                          อุปกรณ์ปัจจุบัน (Web Browser)
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[var(--success)] border border-emerald-200">
                          กำลังใช้งาน (Active Now)
                        </span>
                      </div>
                      <div className="text-xs text-[var(--foreground-muted)] mt-0.5">
                        เบราว์เซอร์: Chrome / Safari • IP: <code>กำลังเชื่อมต่อ</code>
                      </div>
                      <div className="text-[11px] text-[var(--foreground-muted)]">
                        เข้าใช้งานล่าสุด: ออนไลน์ในขณะนี้
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              sessions.map((sess, idx) => {
                const isCurrent = idx === 0;
                const isMobile = sess.device_name.includes('iPhone') || sess.device_name.includes('Mobile') || sess.device_name.includes('Android');

                return (
                  <Card key={sess.id} className={cn('p-4', isCurrent && 'border-blue-200 bg-blue-50/20')}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] shrink-0">
                          {isMobile ? <Smartphone className="h-5 w-5" /> : <Laptop className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-[var(--foreground)]">
                              {sess.device_name}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[var(--success)] border border-emerald-200">
                                อุปกรณ์ปัจจุบัน (Current Device)
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[var(--foreground-muted)] mt-0.5">
                            เบราว์เซอร์: {sess.browser} • IP: <code>{sess.ip_address}</code>
                          </div>
                          <div className="text-[11px] text-[var(--foreground-muted)]">
                            เข้าใช้งานล่าสุด: {formatThaiDate(sess.last_active_at)}
                          </div>
                        </div>
                      </div>

                      {!isCurrent && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevokeSession(sess.id)}
                          className="text-xs text-rose-600 hover:bg-rose-50 h-8"
                        >
                          <LogOut className="h-3.5 w-3.5 mr-1" />
                          <span>ออกจากระบบ</span>
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
