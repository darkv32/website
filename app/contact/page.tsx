import { ContactBand } from '@/components/field/contact-band';
import { Composer, TimeStrip } from '@/components/field/contact-extras';
import { StructuredData } from '@/components/seo/structured-data';
import { createMetadata, generatePageData } from '@/lib/seo';

const description = 'Say hi to Tang Yetong: email, GitHub, LinkedIn and resume, plus a draft composer that opens in your mail app.';

export const metadata = createMetadata({
  title: 'Contact - Tang Yetong',
  description,
  keywords: ['Tang Yetong', 'Contact', 'Email', 'GitHub', 'LinkedIn'],
  url: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <StructuredData data={generatePageData({ type: 'ContactPage', path: '/contact', name: 'Contact', description })} />
      <ContactBand asPage>
        <TimeStrip />
        <Composer />
      </ContactBand>
    </>
  );
}
