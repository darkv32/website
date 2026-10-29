import { ContactBand } from '@/components/field/contact-band';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Contact - Tang Yetong',
  description: 'Say hi to Tang Yetong: email, GitHub, LinkedIn and resume, plus a draft composer that opens in your mail app.',
  keywords: ['Tang Yetong', 'Contact', 'Email', 'GitHub', 'LinkedIn'],
  url: '/contact',
});

export default function ContactPage() {
  return <ContactBand asPage />;
}
