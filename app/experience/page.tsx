import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import with loading fallback
const ExperienceDetail = dynamic(() => import('@/components/pages/experience-detail').then(mod => ({ default: mod.ExperienceDetail })), {
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading experience...</p>
      </div>
    </div>
  ),
  ssr: false // Disable SSR for better performance with heavy animations
});

export const metadata = {
  title: 'Professional Experience - Tang Yetong',
  description: 'Detailed professional experience including roles at Fivetran, GovTech Singapore, and other technology companies.',
};

export default function ExperiencePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading experience...</p>
        </div>
      </div>
    }>
      <ExperienceDetail />
    </Suspense>
  );
}