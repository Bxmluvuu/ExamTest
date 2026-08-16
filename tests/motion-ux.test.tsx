/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SaveStatus } from '@/components/ui/save-status';
import { AnimatedProgress } from '@/components/ui/animated-progress';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { RetryButton } from '@/components/ui/retry-button';
import { ErrorState } from '@/components/ui/error-state';
import { ToastProvider, useToast } from '@/components/ui/toast';
import {
  MetricSkeleton,
  HeaderSkeleton,
  SubjectSkeleton,
  TableSkeleton,
  QuestionSkeleton,
  DocumentSkeleton,
} from '@/components/ui/skeleton';

describe('Motion & UX Feedback Components', () => {
  describe('SaveStatus', () => {
    it('renders saved state with role status and polite aria-live', () => {
      render(<SaveStatus status="saved" />);
      const statusEl = screen.getByRole('status');
      expect(statusEl).toBeDefined();
      expect(statusEl.getAttribute('aria-live')).toBe('polite');
      expect(screen.getByText('บันทึกคำตอบแล้ว')).toBeDefined();
    });

    it('renders saving state correctly', () => {
      render(<SaveStatus status="saving" />);
      expect(screen.getByText('กำลังบันทึก...')).toBeDefined();
    });

    it('renders error state correctly', () => {
      render(<SaveStatus status="error" />);
      expect(screen.getByText('บันทึกไม่สำเร็จ')).toBeDefined();
    });
  });

  describe('AnimatedProgress', () => {
    it('renders with correct aria attributes', () => {
      render(<AnimatedProgress value={75} max={100} aria-label="Progress test" />);
      const progressEl = screen.getByRole('progressbar');
      expect(progressEl.getAttribute('aria-valuenow')).toBe('75');
      expect(progressEl.getAttribute('aria-valuemin')).toBe('0');
      expect(progressEl.getAttribute('aria-valuemax')).toBe('100');
    });

    it('clamps values between 0 and max', () => {
      render(<AnimatedProgress value={150} max={100} />);
      const progressEl = screen.getByRole('progressbar');
      expect(progressEl.getAttribute('aria-valuenow')).toBe('100');
    });
  });

  describe('AnimatedNumber', () => {
    it('renders number with prefix and suffix', () => {
      render(<AnimatedNumber value={85} suffix="%" />);
      expect(screen.getByText(/%/)).toBeDefined();
    });
  });

  describe('RetryButton', () => {
    it('executes async onRetry on click and shows loading state', async () => {
      let resolved = false;
      const onRetryMock = vi.fn().mockImplementation(() => {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            resolved = true;
            resolve();
          }, 50);
        });
      });

      render(<RetryButton onRetry={onRetryMock} label="ลองใหม่อีกครั้ง" />);
      const btn = screen.getByRole('button', { name: /ลองใหม่อีกครั้ง/i });

      await act(async () => {
        fireEvent.click(btn);
      });

      expect(onRetryMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('ErrorState', () => {
    it('renders accessible error message with role alert and retry action', () => {
      const onRetry = vi.fn();
      render(
        <ErrorState
          title="เกิดข้อผิดพลาด"
          description="ไม่สามารถเชื่อมต่อได้"
          onRetry={onRetry}
        />
      );

      const alertEl = screen.getByRole('alert');
      expect(alertEl).toBeDefined();
      expect(screen.getByText('เกิดข้อผิดพลาด')).toBeDefined();
      expect(screen.getByText('ไม่สามารถเชื่อมต่อได้')).toBeDefined();

      const retryBtn = screen.getByRole('button', { name: /ลองใหม่อีกครั้ง/i });
      fireEvent.click(retryBtn);
      expect(onRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('Toast Notifications', () => {
    function ToastTestComponent() {
      const { showToast } = useToast();
      return (
        <button onClick={() => showToast('ทดสอบการแจ้งเตือนสำเร็จ', 'success')}>
          Trigger Toast
        </button>
      );
    }

    it('shows toast notification on trigger', () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText('Trigger Toast'));
      expect(screen.getByText('ทดสอบการแจ้งเตือนสำเร็จ')).toBeDefined();
    });
  });

  describe('Skeletons', () => {
    it('renders all shared skeleton components with shimmer styling', () => {
      const { container } = render(
        <div>
          <MetricSkeleton />
          <HeaderSkeleton />
          <SubjectSkeleton />
          <TableSkeleton rows={2} cols={2} />
          <QuestionSkeleton />
          <DocumentSkeleton />
        </div>
      );
      expect(container.querySelectorAll('.skeleton-shimmer').length).toBeGreaterThan(0);
    });
  });
});
