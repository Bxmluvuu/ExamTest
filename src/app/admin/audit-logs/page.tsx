'use client';

import * as React from 'react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getAdminAuditLogs } from '@/lib/db-adapter';
import { formatThaiDate } from '@/lib/utils';
import { FileSpreadsheet, Search } from 'lucide-react';
import type { AdminAuditLog } from '@/lib/types/database';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = React.useState<AdminAuditLog[]>([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    getAdminAuditLogs().then(setLogs);
  }, []);

  const filtered = logs.filter(l => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      l.action.toLowerCase().includes(s) ||
      l.target_entity.toLowerCase().includes(s) ||
      l.target_id.toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[{ label: 'ระบบ' }, { label: 'Audit Logs' }]}
        title="บันทึกประวัติการทำงาน (Admin Audit Logs)"
        subtitle="บันทึกกิจกรรมการสร้าง อนุมัติ แก้ไข และลบข้อมูลของระบบทั้งหมดเพื่อความโปร่งใส"
        badges={
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200">
            {logs.length} บันทึก
          </span>
        }
      />

      <Card className="p-3">
        <div className="relative">
          <Search className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="ค้นหาตาม Action, Entity หรือรหัสเป้าหมาย..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
          />
        </div>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">รายการบันทึก ({filtered.length} รายการ)</CardTitle>
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
                {filtered.map(log => (
                  <tr key={log.id} className="hover:bg-[var(--surface-subtle)]">
                    <td className="p-3 font-mono text-[var(--foreground-muted)] whitespace-nowrap">
                      {formatThaiDate(log.created_at)}
                    </td>
                    <td className="p-3 font-medium whitespace-nowrap">
                      {log.admin_email || 'admin@example.com'}
                    </td>
                    <td className="p-3 font-semibold text-[var(--foreground)] whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200">
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
    </div>
  );
}
