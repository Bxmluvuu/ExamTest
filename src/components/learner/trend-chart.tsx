'use client';

import * as React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface TrendPoint {
  date: string;
  score_percentage: number;
  mode: string;
  subject_name: string;
  attempt_id: string;
}

export function TrendChart({ data }: { data: TrendPoint[] }) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[var(--primary)]" />
            <span>แนวโน้มคะแนนสอบ (Score Trend)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-56 flex flex-col items-center justify-center text-center p-6">
          <AlertCircle className="h-8 w-8 text-[var(--foreground-muted)] mb-2" />
          <p className="text-sm font-medium text-[var(--foreground)]">ยังไม่มีข้อมูลการสอบ</p>
          <p className="text-xs text-[var(--foreground-muted)] mt-1 max-w-xs">
            เมื่อคุณทำแบบฝึกหัดหรือข้อสอบจำลอง กราฟแนวโน้มความแม่นยำจะปรากฏที่นี่
          </p>
        </CardContent>
      </Card>
    );
  }

  const latestScore = data[data.length - 1]?.score_percentage || 0;
  const firstScore = data[0]?.score_percentage || 0;
  const scoreDiff = latestScore - firstScore;

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[var(--primary)]" />
            <span>แนวโน้มคะแนนสอบ (Score Trend)</span>
          </CardTitle>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
            ผลการสอบ {data.length} ครั้งล่าสุด
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-[var(--foreground)]">{latestScore}% ล่าสุด</div>
          <div className="text-[11px] text-[var(--foreground-muted)]">
            {scoreDiff >= 0 ? `+${scoreDiff.toFixed(1)}% จากครั้งแรก` : `${scoreDiff.toFixed(1)}% จากครั้งแรก`}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="h-56 w-full" aria-label="Score Trend Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: 'var(--foreground-muted)' }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: 'var(--foreground-muted)' }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={false}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload as TrendPoint;
                    return (
                      <div className="bg-[var(--surface)] p-2.5 rounded shadow-md border border-[var(--border)] text-xs space-y-1">
                        <div className="font-semibold text-[var(--foreground)]">{d.subject_name}</div>
                        <div className="text-[var(--foreground-muted)]">โหมด: {d.mode} | วันที่: {d.date}</div>
                        <div className="text-[var(--primary)] font-bold text-sm">คะแนน: {d.score_percentage}%</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score_percentage"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: 'var(--primary)', strokeWidth: 1, stroke: '#ffffff' }}
                activeDot={{ r: 5, fill: 'var(--primary-hover)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Text summary for accessibility */}
        <div className="mt-2 text-xs text-[var(--foreground-muted)] bg-[var(--surface-subtle)] p-2 rounded border border-[var(--border)]">
          <strong>สรุปสถิติ:</strong> คะแนนล่าสุดของคุณอยู่ที่ <strong>{latestScore}%</strong> จากการสอบวิชา {data[data.length - 1]?.subject_name}
        </div>
      </CardContent>
    </Card>
  );
}
