'use client';

import { GraduationCap, Heart, Target, Users, Code, Database, Smartphone, Award, Sparkles, Zap, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/ui/page-layout';
import { StructuredData } from '@/components/seo/structured-data';
import { BreadcrumbData } from '@/components/seo/structured-data';

interface AboutDetailProps {
  personData: any;
  breadcrumbItems: any[];
}

export function AboutDetail({ personData, breadcrumbItems }: AboutDetailProps) {
  const backgroundIcons = [
    { Icon: Target, className: "top-20 left-10 opacity-20" },
    { Icon: Users, className: "bottom-40 left-20 opacity-15" },
    { Icon: Heart, className: "top-40 right-20 opacity-20" },
    { Icon: Sparkles, className: "bottom-20 right-10 opacity-15" },
  ];

  const values = [
    {
      icon: Target,
      title: "Data-Driven Excellence",
      description: "Delivering high-quality data solutions that drive business insights and decision-making.",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Collaborative Innovation",
      description: "Teamwork and cross-functional collaboration to solve complex engineering challenges.",
      color: "text-green-500"
    },
    {
      icon: Heart,
      title: "Continuous Learning",
      description: "Staying current with emerging technologies and contributing to the tech community.",
      color: "text-purple-500"
    }
  ];

  return (
    <>
      <PageLayout
        title="About Me"
        description="Data Analyst at Fivetran with a passion for building scalable solutions and driving innovation through technology."
        badge="About Me"
        showBackButton
        backgroundIcons={backgroundIcons}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20 relative z-10">
          {/* Enhanced Biography */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <div className="p-3 bg-primary/10 rounded-full animate-pulse">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Hello! I&apos;m Tang Yetong</h3>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              {[
                {
                  text: <>I&apos;m currently a <span className="text-primary font-semibold">Data Analyst at Fivetran</span>, where I work on optimizing data pipelines and building analytics solutions for enterprise clients. My journey in technology spans across data engineering, mobile development, and full-stack web applications.</>,
                  delay: '0.5s'
                },
                {
                  text: <>With experience at <span className="text-primary font-semibold">GovTech Singapore</span>, I&apos;ve contributed to government digital transformation initiatives, building citizen-facing applications and implementing cloud solutions on AWS. My work has directly impacted how citizens interact with government services.</>,
                  delay: '0.7s'
                },
                {
                  text: <>I specialize in <span className="text-primary font-semibold">Android development</span> with Bluetooth Low Energy integration, having built enterprise solutions for the hospitality industry at RFCOM Technologies. I&apos;m also passionate about blockchain technology, contributing to Bitcoin development projects and cryptocurrency wallet applications.</>,
                  delay: '0.9s'
                },
                {
                  text: <>As an active member of the <span className="text-primary font-semibold">NUS Hackers community</span>, I contribute to open-source projects and help foster Singapore&apos;s vibrant tech ecosystem. I believe in continuous learning and sharing knowledge with fellow developers.</>,
                  delay: '1.1s'
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="p-6 bg-card/40 backdrop-blur-md rounded-2xl border border-primary/10 shadow-xl hover:border-primary/30 transition-all duration-300 hover:bg-card/60 animate-slide-in-left"
                  style={{ animationDelay: item.delay }}
                >
                  <p className="text-sm md:text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Education & Expertise */}
          <div className="space-y-8">
            {/* Education */}
            <Card className="bg-card/40 backdrop-blur-md border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-500 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h4 className="font-bold text-xl tracking-tight">National University of Singapore</h4>
                      <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase">Computer Science</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-xs mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Jan 2022 - Aug 2026</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>Singapore</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      Pursuing Computer Science degree with focus on software engineering, data structures, algorithms, and system design. Active member of NUS Hackers community.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Software Engineering", "Data Structures", "Algorithms", "System Design", "NUS Hackers"].map((subject) => (
                        <Badge key={subject} variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] font-medium px-2 py-0.5">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Focus */}
            <Card className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-8">
                <h4 className="font-bold text-lg mb-6 flex items-center tracking-tight">
                  <Award className="h-5 w-5 mr-3 text-primary" />
                  Current Focus
                </h4>
                <div className="grid gap-4">
                  {[
                    { text: "Data Analytics at Fivetran", color: "blue", delay: 0 },
                    { text: "Open Source Contributions", color: "indigo", delay: 0.2 },
                    { text: "NUS Hackers Community", color: "sky", delay: 0.4 }
                  ].map((item, index) => (
                    <div 
                      key={item.text}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-primary/5 border border-primary/5 hover:border-primary/20 transition-all group"
                      style={{ animationDelay: `${0.7 + item.delay}s` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm font-medium tracking-tight group-hover:text-primary transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Expertise Areas */}
        <div className="mb-24 relative z-10">
          <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Areas of Expertise</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized skills and technologies I&apos;ve mastered across different domains
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Data Engineering",
                description: "Building scalable data pipelines and analytics solutions at Fivetran",
                technologies: ["Python", "SQL", "ETL", "Data Pipelines"],
              },
              {
                icon: Smartphone,
                title: "Mobile Development",
                description: "Android applications with Bluetooth LE and enterprise integrations",
                technologies: ["Kotlin", "Android", "React Native", "BLE"],
              },
              {
                icon: Code,
                title: "Full Stack Development",
                description: "Web applications and government digital services",
                technologies: ["TypeScript", "React", "Node.js", "AWS"],
              }
            ].map((area, index) => (
              <Card 
                key={area.title} 
                className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all group animate-slide-up" 
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="p-4 bg-primary/5 rounded-2xl w-fit mb-6 group-hover:bg-primary/10 transition-colors">
                    <area.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-xl mb-2 tracking-tight">{area.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] font-medium px-2 py-0.5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Values Section */}
        <div className="mb-24 relative z-10">
          <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Core Values</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide my work and professional growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all group animate-slide-up" 
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-10 text-center">
                  <div className="p-5 bg-primary/5 rounded-full w-20 h-20 mx-auto mb-8 flex items-center justify-center group-hover:bg-primary/10 transition-all">
                    <value.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="font-bold text-xl mb-4 tracking-tight">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageLayout>
      
      {/* Structured Data */}
      <StructuredData data={personData} />
      <BreadcrumbData items={breadcrumbItems} />
    </>
  );
}
