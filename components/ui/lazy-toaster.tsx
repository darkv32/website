'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useToast } from '@/hooks/use-toast';

const Toaster = dynamic(() => import('@/components/ui/toaster').then((m) => m.Toaster));

/**
 * Mounts the toast UI, and the Radix code behind it, the first time a toast is raised, so pages that
 * may never show one do not download it. The toast store lives outside React, so a toast raised
 * before the chunk arrives is still there when the Toaster mounts.
 */
export function LazyToaster() {
  const { toasts } = useToast();
  const [needed, setNeeded] = useState(false);
  if (toasts.length > 0 && !needed) setNeeded(true);
  return needed ? <Toaster /> : null;
}
