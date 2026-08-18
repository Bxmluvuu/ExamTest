'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export interface QuestionTransitionProps {
  questionKey: string | number;
  children: React.ReactNode;
  className?: string;
}

/**
 * QuestionTransition provides an ultra-fast, subtle 120ms fade transition
 * between questions in focus mode to make question switching feel responsive without being distracting.
 */
export function QuestionTransition({
  questionKey,
  children,
  className,
}: QuestionTransitionProps) {
  const reducedMotion = useReducedMotion();
  const [displayedKey, setDisplayedKey] = React.useState(questionKey);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    if (questionKey !== displayedKey) {
      if (reducedMotion) {
        setDisplayedKey(questionKey);
      } else {
        setAnimating(true);
        const timer = setTimeout(() => {
          setDisplayedKey(questionKey);
          setAnimating(false);
        }, 60);
        return () => clearTimeout(timer);
      }
    }
  }, [questionKey, displayedKey, reducedMotion]);

  return (
    <div
      key={displayedKey}
      className={cn(
        'transition-opacity duration-150 ease-out',
        animating ? 'opacity-50' : 'opacity-100',
        className
      )}
    >
      {children}
    </div>
  );
}
