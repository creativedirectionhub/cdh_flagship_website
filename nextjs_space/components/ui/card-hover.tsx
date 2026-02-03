'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardHoverProps {
  children: ReactNode;
  className?: string;
}

export function CardHover({ children, className }: CardHoverProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl bg-white p-6 shadow-sm transition-shadow',
        className
      )}
      whileHover={{
        y: -4,
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
