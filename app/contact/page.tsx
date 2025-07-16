import { Mail, MapPin, Clock, Github, Linkedin, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/ui/page-layout';
import { generateMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/seo/structured-data';
import { BreadcrumbData } from '@/components/seo/structured-data';
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
      <PageLayout
        title="Contact"
        description="Interested in data engineering, mobile development, or collaboration opportunities? I'd love to hear from you."
        badge="Get In Touch"
        showBackButton
      >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg rotate-45 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-60 right-1/3 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full animate-float" style={{ animationDelay: '5s' }}></div>
        
        {/* Gradient Lines */}
        <div className="absolute top-1/3 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 pb-16">
        {/* Contact Information */}
        <div className="space-y-8">
          {/* Personal Info */}
          <Card className="card-enhanced border-2 border-primary/30 animate-slide-in-right hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50 hover:bg-card/90" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-colors duration-300">
                  <Mail className="h-6 w-6 text-primary" />
                  <span className="font-semibold">{SITE_CONFIG.site.email}</span>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span className="font-semibold">{SITE_CONFIG.site.location}</span>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-colors duration-300">
                  <Clock className="h-6 w-6 text-primary" />
                  <span className="font-semibold">SGT (UTC+8)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="card-enhanced border-2 border-primary/30 animate-slide-in-right hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50 hover:bg-card/90" style={{ animationDelay: '0.7s' }}>
            <CardContent className="p-8">
              <h4 className="font-bold text-lg mb-6">Connect With Me</h4>
              <div className="space-y-4">
                <a 
                  href={SITE_CONFIG.social.github}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Github className="h-6 w-6 text-primary group-hover:animate-pulse" />
                  <span className="font-semibold group-hover:text-primary transition-colors">GitHub</span>
                </a>
                <a 
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Linkedin className="h-6 w-6 text-primary group-hover:animate-pulse" />
                  <span className="font-semibold group-hover:text-primary transition-colors">LinkedIn</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="card-enhanced border-2 border-primary/30 animate-slide-in-right hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50 hover:bg-card/90" style={{ animationDelay: '0.9s' }}>
            <CardContent className="p-8 text-center">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">Response Time</h4>
              <p className="text-muted-foreground text-sm">
                I typically respond within 24 hours during business days. 
                For urgent matters, please mention it in your message.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      </PageLayout>
      
      {/* Structured Data */}
      <StructuredData data={contactData} />
      <BreadcrumbData items={breadcrumbItems} />
    </>
  );
} 