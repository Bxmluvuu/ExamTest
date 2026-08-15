'use client';

import * as React from 'react';
import { validatePasswordStrength, type PasswordValidationResult } from '@/lib/auth/password';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PasswordStrengthIndicator({ password }: { password: string }) {
  if (!password) return null;

  const result = validatePasswordStrength(password);
  const { criteria, score } = result;

  const strengthLabels = ['ง่ายมาก', 'ค่อนข้างง่าย', 'ปานกลาง', 'ปลอดภัย', 'ปลอดภัยมาก'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-emerald-500',
  ];
  const strengthTextColors = [
    'text-red-600',
    'text-orange-600',
    'text-yellow-600',
    'text-blue-600',
    'text-emerald-600',
  ];

  const checklist = [
    { label: 'ความยาวอย่างน้อย 8 ตัวอักษร', valid: criteria.minLength },
    { label: 'มีตัวพิมพ์ใหญ่ (A-Z)', valid: criteria.hasUppercase },
    { label: 'มีตัวพิมพ์เล็ก (a-z)', valid: criteria.hasLowercase },
    { label: 'มีตัวเลข (0-9)', valid: criteria.hasNumber },
    { label: 'มีอักขระพิเศษ (!@#$%^&*)', valid: criteria.hasSpecial },
  ];

  return (
    <div className="space-y-2 pt-1">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] font-medium">
          <span className="text-[var(--foreground-muted)]">ระดับความปลอดภัย:</span>
          <span className={cn('font-semibold', strengthTextColors[score])}>
            {strengthLabels[score]}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1 h-1.5 w-full bg-[var(--surface-subtle)] rounded-full overflow-hidden">
          {[0, 1, 2, 3].map(step => (
            <div
              key={step}
              className={cn(
                'h-full rounded-full transition-all duration-300',
                score > step ? strengthColors[score] : 'bg-transparent'
              )}
            />
          ))}
        </div>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 text-[11px]">
        {checklist.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              'flex items-center gap-1.5 transition-colors',
              item.valid ? 'text-emerald-600 font-medium' : 'text-[var(--foreground-muted)]'
            )}
          >
            {item.valid ? (
              <Check className="h-3 w-3 text-emerald-600 shrink-0" />
            ) : (
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 ml-1 mr-0.5 shrink-0" />
            )}
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
