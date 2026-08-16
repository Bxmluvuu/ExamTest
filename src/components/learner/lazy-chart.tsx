'use client';

import dynamic from 'next/dynamic';
import { ChartSkeleton } from '@/components/ui/skeleton';

export const LazyTrendChart = dynamic(
  () => import('@/components/learner/trend-chart').then(mod => mod.TrendChart),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);
