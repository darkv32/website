'use client';

import { useEffect, useRef, useState } from 'react';

import { Mail, Phone, MapPin, Github, Linkedin, Globe, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactCard } from '@/components/blog/contact-card';

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);



  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);



  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "ytyt0792@gmail.com",
      href: "mailto:ytyt0792@gmail.com",
      description: "Primary contact method"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Singapore",
      href: "https://maps.google.com/?q=Singapore",
      description: "Available for local opportunities"
    },
    {
      icon: Clock,
      title: "Timezone",
      value: "SGT (UTC+8)",
      href: "#",
      description: "Singapore Standard Time"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/fivetran-tangyetong",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
      description: "25+ repositories"
    },
    {
      icon: Linkedin,
      name: "LinkedIn", 
      href: "https://www.linkedin.com/in/tang-yetong/",
      color: "hover:text-blue-600",
      description: "Professional network"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 bg-secondary/10">
      {/* Top gradient overlay to blend with blog section */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
    
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-2" />
      
      <div className="container-width section-padding relative z-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let&apos;s Connect</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in data engineering, mobile development, or collaboration opportunities? 
              I&apos;d love to hear from you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Contact Info & Social */}
            <div className={`space-y-8 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              {/* Contact Information */}
              <Card className="card-enhanced-light card-contact-light shadow-md">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {contactInfo.map((info, idx) => (
                      <ContactCard key={info.title} contact={info} animationDelay={`${idx * 100}ms`} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="card-enhanced-light card-contact-light shadow-md">
                <CardHeader>
                  <CardTitle>Connect with Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {socialLinks.map((social, idx) => (
                      <ContactCard key={social.name} contact={social} animationDelay={`${idx * 100}ms`} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Professional Availability */}
              {/* <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Professional Availability</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Time</span>
                      <Badge variant="secondary">Within 24 hours</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Current Role</span>
                      <Badge className="bg-blue-500">Data Analyst @ Fivetran</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Open to</span>
                      <div className="flex space-x-1">
                        <Badge variant="outline" className="text-xs">Consulting</Badge>
                        <Badge variant="outline" className="text-xs">Full-time</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4">
                    Currently based in Singapore and open to remote opportunities in data engineering, 
                    mobile development, and full-stack projects.
                  </p>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}