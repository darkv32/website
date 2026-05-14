'use client';

import { Mail, MapPin, Clock, Github, Linkedin, Globe, ExternalLink, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageLayout } from '@/components/ui/page-layout';
import { StructuredData } from '@/components/seo/structured-data';
import { BreadcrumbData } from '@/components/seo/structured-data';
import { SITE_CONFIG } from '@/lib/config';

interface ContactDetailProps {
  contactData: any;
  breadcrumbItems: any[];
}

export function ContactDetail({ contactData, breadcrumbItems }: ContactDetailProps) {
  const backgroundIcons = [
    { Icon: Mail, className: "top-20 right-10 opacity-20" },
    { Icon: Globe, className: "bottom-40 left-10 opacity-15" },
    { Icon: Linkedin, className: "top-1/3 left-1/4 opacity-10" },
    { Icon: Clock, className: "bottom-20 right-1/4 opacity-15" },
  ];

  return (
    <>
      <PageLayout
        title="Contact"
        description="Interested in data engineering, mobile development, or collaboration opportunities? I'd love to hear from you."
        badge="Get In Touch"
        showBackButton
        backgroundIcons={backgroundIcons}
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Primary Contact Info */}
            <Card className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all group overflow-hidden md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
              <CardContent className="p-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {[
                    { icon: Mail, label: "Email", value: SITE_CONFIG.site.email },
                    { icon: MapPin, label: "Location", value: SITE_CONFIG.site.location },
                    { icon: Clock, label: "Timezone", value: "SGT (UTC+8)" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left group/item">
                      <div className="p-3 bg-primary/5 rounded-xl mb-4 group-hover/item:bg-primary/10 transition-colors">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{item.label}</span>
                      <span className="text-sm font-semibold tracking-tight">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all group">
              <CardContent className="p-8">
                <h4 className="font-bold text-lg mb-6 tracking-tight flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-primary" />
                  Social Presence
                </h4>
                <div className="space-y-3">
                  {[
                    { icon: Github, label: "GitHub", href: SITE_CONFIG.social.github },
                    { icon: Linkedin, label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.href}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/5 hover:border-primary/20 hover:bg-primary/10 transition-all group/link"
                    >
                      <div className="flex items-center gap-3">
                        <social.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{social.label}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover/link:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all group">
              <CardContent className="p-8 flex flex-col items-center text-center justify-center h-full">
                <div className="p-4 bg-primary/10 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-lg mb-2 tracking-tight">Response Time</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I typically respond within 24 hours during business days. 
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
