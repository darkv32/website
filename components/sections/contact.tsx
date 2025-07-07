'use client';

import { useEffect, useRef, useState } from 'react';

import { Mail, Phone, MapPin, Github, Linkedin, Globe, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <section id="contact" ref={sectionRef} className="relative py-20 bg-secondary/10 page-contact-light">
      {/* Top gradient overlay to blend with blog section */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
      
      {/* Connection-themed background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating connection orbs */}
        <div className="absolute top-1/6 left-1/6 w-48 h-48 bg-emerald-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/6 right-1/6 w-56 h-56 bg-teal-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/6 w-40 h-40 bg-green-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/6 w-32 h-32 bg-cyan-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '3s' }} />
      </div>

      {/* Connection grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-2 animate-grid-flow" />

      {/* Connection lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/12 to-transparent animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/12 to-transparent animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s' }} />
        
        {/* Connection geometric elements */}
        <div className="absolute top-1/5 right-1/5 w-12 h-12 border border-emerald-500/15 rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/5 left-1/5 w-8 h-8 border border-teal-500/15 rotate-45 animate-pulse" style={{ animationDuration: '8s', animationDelay: '1.5s' }} />
        <div className="absolute top-3/4 left-1/3 w-16 h-16 border border-green-500/15 rounded-full animate-pulse" style={{ animationDuration: '7s', animationDelay: '2.5s' }} />
        <div className="absolute top-1/3 right-1/4 w-10 h-10 border border-cyan-500/15 rotate-12 animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }} />
      </div>

      {/* Floating connection symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/6 right-1/4 text-xs text-emerald-500/10 font-mono animate-pulse" style={{ animationDuration: '8s' }}>@</div>
        <div className="absolute bottom-1/6 left-1/4 text-xs text-teal-500/10 font-mono animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}>→</div>
        <div className="absolute top-2/3 right-1/6 text-xs text-green-500/10 font-mono animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}>✉</div>
      </div>
      

      
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
              <Card className="card-enhanced-light card-contact-light">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.title}
                      href={info.href}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{info.title}</div>
                        <div className="text-muted-foreground text-sm">{info.value}</div>
                        <div className="text-muted-foreground text-xs">{info.description}</div>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="card-enhanced-light card-contact-light">
                <CardHeader>
                  <CardTitle>Connect with Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                      >
                        <div className={`p-2 bg-secondary/50 rounded-lg transition-all duration-300 ${social.color}`}>
                          <social.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{social.name}</div>
                          <div className="text-muted-foreground text-sm">{social.description}</div>
                        </div>
                      </a>
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