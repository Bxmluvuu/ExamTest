'use client';

import * as React from 'react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getAdminAuditLogs, getAuthAuditLogs } from '@/lib/db-adapter';
import { formatThaiDate, cn } from '@/lib/utils';
import { FileSpreadsheet, ShieldAlert, Search, Key, UserCheck, Lock } from 'lucide-react';
import type { AdminAuditLog, AuthAuditLog } from '@/lib/types/database';

export default function AdminAuditLogsPage() {
  const [activeTab, setActiveTab] = React.useState<'content' | 'auth'>('content');
  const [adminLogs, setAdminLogs] = React.useState<AdminAuditLog[]>([]);
  const [authLogs, setAuthLogs] = React.useState<AuthAuditLog[]>([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    getAdminAuditLogs().then(setAdminLogs);
    getAuthAuditLogs().then(setAuthLogs);
  }, []);

  const filteredAdmin = adminLogs.filter(l => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      l.action.toLowerCase().includes(s) ||
      l.target_entity.toLowerCase().includes(s) ||
      l.target_id.toLowerCase().includes(s)
    );
  });

  const filteredAuth = authLogs.filter(l => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      l.event_type.toLowerCase().includes(s) ||
      (l.email && l.email.toLowerCase().includes(s)) ||
      (l.ip_address && l.ip_address.toLowerCase().includes(s))
    );
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[{ label: 'ระบบ' }, { label: 'Audit Logs' }]}
        title="บันทึกประวัติการทำงานและความปลอดภัย (Audit Logs)"
        subtitle="บันทึกกิจกรรมการสร้าง อนุมัติ แก้ไข และเหตุการณ์ด้านความปลอดภัยของระบบทั้งหมด"
        badges={
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200">
            {adminLogs.length + authLogs.length} บันทึกทั้งหมด
          </span>
        }
      />

      {/* Segmented Control Tabs */}
      <div className="border-b border-[var(--border)]">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto text-sm font-medium">
          <button
            onClick={() => setActiveTab('content')}
            className={cn(
              'flex items-center gap-2 py-3 px-1 border-b-2 font-medium transition-colors cursor-pointer select-none whitespace-nowrap',
              activeTab === 'content'
                ? 'border-[var(--primary)] text-[var(--primary)] font-semibold'
                : 'border-transparent text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
            )}
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>การจัดการเนื้อหาและข้อสอบ ({adminLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('auth')}
            className={cn(
              'flex items-center gap-2 py-3 px-1 border-b-2 font-medium transition-colors cursor-pointer select-none whitespace-nowrap',
              activeTab === 'auth'
                ? 'border-[var(--primary)] text-[var(--primary)] font-semibold'
                : 'border-transparent text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
            )}
          >
            <ShieldAlert className="h-4 w-4 text-purple-600" />
            <span>ความปลอดภัย & การเข้าสู่ระบบ ({authLogs.length})</span>
          </button>
        </div>
      </div>

      {/* Search Filter Bar */}
      <Card className="p-3">
        <div className="relative">
          <Search className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
          <input
            type="text"
            placeholder={
              activeTab === 'content'
                ? 'ค้นหาตาม Action, Entity หรือรหัสเป้าหมาย...'
                : 'ค้นหาตาม Event Type, Email หรือ IP Address...'
            }
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
          />
        </div>
      </Card>

      {/* Content Logs Tab */}
      {activeTab === 'content' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">รายการบันทึกการจัดการเนื้อหา ({filteredAdmin.length} รายการ)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-t border-[var(--border)]">
                <thead className="bg-[var(--surface-subtle)] text-[var(--foreground-muted)] uppercase border-b border-[var(--border)]">
                  <tr>
                    <th className="p-3">วันเวลา</th>
                    <th className="p-3">ผู้ปฏิบัติงาน</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Entity</th>
                    <th className="p-3">Target ID</th>
                    <th className="p-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredAdmin.map(log => (
                    <tr key={log.id} className="hover:bg-[var(--surface-subtle)]">
                      <td className="p-3 font-mono text-[var(--foreground-muted)] whitespace-nowrap">
                        {formatThaiDate(log.created_at)}
                      </td>
                      <td className="p-3 font-medium whitespace-nowrap">
                        {log.admin_email || 'admin@example.com'}
                      </td>
                      <td className="p-3 font-semibold text-[var(--foreground)] whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200 font-mono text-[11px]">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">{log.target_entity}</td>
                      <td className="p-3 font-mono text-[11px] text-[var(--foreground-muted)] whitespace-nowrap">
                        {log.target_id}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-[var(--foreground-muted)] max-w-xs truncate">
                        {JSON.stringify(log.details)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auth Security Logs Tab */}
      {activeTab === 'auth' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">รายการบันทึกความปลอดภัยและการยืนยันตัวตน ({filteredAuth.length} รายการ)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-t border-[var(--border)]">
                <thead className="bg-[var(--surface-subtle)] text-[var(--foreground-muted)] uppercase border-b border-[var(--border)]">
                  <tr>
                    <th className="p-3">วันเวลา</th>
                    <th className="p-3">เหตุการณ์ (Event)</th>
                    <th className="p-3">อีเมลเป้าหมาย</th>
                    <th className="p-3">IP Address</th>
                    <th className="p-3">User Agent</th>
                    <th className="p-3">Metadata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredAuth.map(log => {
                    const isSuccess = log.event_type.includes('success');
                    const isFailure = log.event_type.includes('failed') || log.event_type.includes('locked');

                    return (
                      <tr key={log.id} className="hover:bg-[var(--surface-subtle)]">
                        <td className="p-3 font-mono text-[var(--foreground-muted)] whitespace-nowrap">
                          {formatThaiDate(log.created_at)}
                        </td>
                        <td className="p-3 font-semibold whitespace-nowrap">
                          <span className={cn(
                            'px-2 py-0.5 rounded font-mono text-[11px] border',
                            isSuccess && 'bg-emerald-50 text-emerald-700 border-emerald-200',
                            isFailure && 'bg-rose-50 text-rose-700 border-rose-200',
                            !isSuccess && !isFailure && 'bg-purple-50 text-purple-700 border-purple-200'
                          )}>
                            {log.event_type}
                          </span>
                        </td>
                        <td className="p-3 font-medium whitespace-nowrap">
                          {log.email || '-'}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-[var(--foreground-muted)] whitespace-nowrap">
                          {log.ip_address || '127.0.0.1'}
                        </td>
                        <td className="p-3 text-[11px] text-[var(--foreground-muted)] max-w-[200px] truncate">
                          {log.user_agent || 'Browser'}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-[var(--foreground-muted)] max-w-xs truncate">
                          {JSON.stringify(log.metadata)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
