import { toast } from '@/hooks/use-toast';

/** Copies `text` and tells the visitor how it went. */
export async function copyText(text: string, copied: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast({ title: copied });
  } catch {
    toast({ title: 'Could not copy' });
  }
}
