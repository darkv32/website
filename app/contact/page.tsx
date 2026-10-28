import { ContactBand } from '@/components/field/contact-band';
import { BreadcrumbData, StructuredData } from '@/components/seo/structured-data';
import { generateMetadata } from '@/lib/seo';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

export const metadata = generateMetadata({
  title: 'Contact Tang Yetong - Get In Touch',
  description: 'Get in touch with Tang Yetong for collaboration opportunities, technical discussions, or questions about data engineering, mobile development, and blockchain technology.',
  keywords: [
    'Contact Tang Yetong', 'Get In Touch', 'Collaboration', 'Data Engineering',
    'Mobile Development', 'Blockchain', 'Technical Discussion', 'Singapore',
    'Fivetran', 'Professional Contact', 'Tech Consultation'
  ],
  url: '/contact',
});

export default function ContactPage() {
  const contactData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Tang Yetong',
    description: 'Contact information and form for Tang Yetong',
    url: getFullUrl('/contact'),
    mainEntity: {
      '@type': 'Person',
      name: SITE_CONFIG.site.name,
      email: SITE_CONFIG.site.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_CONFIG.site.location,
      },
    },
  };

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ];

  return (
    <>
      <ContactBand />

      {/* Structured Data */}
      <StructuredData data={contactData} />
      <BreadcrumbData items={breadcrumbItems} />
    </>
  );
}
