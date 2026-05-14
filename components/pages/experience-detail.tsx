'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Briefcase, Calendar, MapPin, Award, Building, Code, Database, Smartphone, ExternalLink, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/page-layout';
import { ExperienceCard } from '@/components/blog/experience-card';

// Move static data outside component to prevent re-creation
const experiences = [
  {
    title: "Data Analyst Intern",
    company: "Fivetran",
    location: "Oakland, California, United States",
    period: "Sep 2024 - Present",
    duration: "11 mos",
    type: "Full-time",
    description: "Working on data pipeline optimization and analytics at a leading data integration platform. Contributing to enterprise-scale data solutions serving thousands of customers.",
    achievements: [
      "Optimized data pipeline performance for enterprise clients, reducing processing time by 30%",
      "Developed analytics dashboards for internal teams using Python and SQL",
      "Contributed to data quality monitoring systems with automated alerting",
      "Collaborated with cross-functional teams on product feature development",
      "Implemented data validation frameworks for improved data integrity"
    ],
    technologies: ["Python", "SQL", "Data Pipelines", "Analytics", "ETL", "PostgreSQL", "Airflow"],
    icon: Database,
    color: "text-blue-500",
    companyInfo: {
      industry: "Data Integration",
      size: "1000+ employees",
      founded: "2012"
    }
  },
  {
    title: "Software Engineer Internship",
    company: "GovTech Singapore",
    location: "Singapore · Hybrid",
    period: "May 2023 - Aug 2023",
    duration: "4 mos",
    type: "Full-time",
    description: "Developed government digital services and applications. Worked on citizen-facing applications and internal government systems with focus on scalability and security.",
    achievements: [
      "Built scalable web applications for government services using React and Node.js",
      "Implemented AWS cloud solutions for high availability and disaster recovery",
      "Collaborated with cross-functional teams on digital transformation initiatives",
      "Developed data analytics solutions using AWS CloudWatch for operational insights",
      "Contributed to user acceptance testing and quality assurance processes"
    ],
    technologies: ["Kotlin", "React.js", "AWS", "CloudWatch", "Node.js", "Government Tech"],
    icon: Building,
    color: "text-green-500",
    companyInfo: {
      industry: "Government Technology",
      size: "3000+ employees",
      founded: "2016"
    }
  },
  {
    title: "Contract Software Engineer",
    company: "RFCOM Technologies Pte. Ltd.",
    location: "Singapore",
    period: "Apr 2022 - Dec 2022",
    duration: "9 mos",
    type: "Part-time",
    description: "Developed Android applications with Bluetooth Low Energy integration for enterprise clients in hospitality industry. Created innovative solutions for hotel management systems.",
    achievements: [
      "Created luggage management system for hotels using Android and Kotlin",
      "Implemented BLE technology for real-time tracking and inventory management",
      "Deployed solutions to Pan Pacific Hotel and other major hospitality clients",
      "Developed custom UI components for enhanced user experience",
      "Maintained 99.9% uptime for production applications"
    ],
    technologies: ["Kotlin", "Android", "Bluetooth LE", "Enterprise", "SQLite", "Material Design"],
    icon: Smartphone,
    color: "text-orange-500",
    companyInfo: {
      industry: "IoT Solutions",
      size: "50+ employees",
      founded: "2015"
    }
  },
  {
    title: "Intern",
    company: "Summer of Bitcoin",
    location: "Singapore",
    period: "Jun 2022 - Aug 2022",
    duration: "3 mos",
    type: "Part-time",
    description: "Contributed to Bitcoin development ecosystem and open-source projects. Worked on cryptocurrency wallet applications and blockchain technology research.",
    achievements: [
      "Contributed to Bitcoin development kit (BDK) with Kotlin bindings",
      "Developed cryptocurrency wallet features using BDK-Kotlin library",
      "Participated in blockchain research and development initiatives",
      "Created technical documentation and tutorials for developer community",
      "Mentored by industry experts in Bitcoin protocol development"
    ],
    technologies: ["Kotlin", "Bitcoin", "Blockchain", "Cryptocurrency", "BDK", "Rust"],
    icon: Code,
    color: "text-yellow-500",
    companyInfo: {
      industry: "Blockchain Education",
      size: "Global Program",
      founded: "2021"
    }
  },
  {
    title: "Software Engineer Intern",
    company: "Travel Prologue Pte Ltd",
    location: "Singapore",
    period: "Jan 2020 - Mar 2020",
    duration: "3 mos",
    type: "Internship",
    description: "Resolved bugs and added features to existing website infrastructure. Assisted in SQL database population and system design for public-facing applications.",
    achievements: [
      "Enhanced website performance and user experience through optimization",
      "Managed SQL database operations with real-world travel data",
      "Designed systems for public-facing travel booking applications",
      "Implemented responsive design improvements for mobile users",
      "Collaborated with design team on UI/UX enhancements"
    ],
    technologies: ["Web Development", "SQL", "Database Management", "JavaScript", "HTML/CSS"],
    icon: Code,
    color: "text-purple-500",
    companyInfo: {
      industry: "Travel Technology",
      size: "20+ employees",
      founded: "2018"
    }
  }
];

const organizations = [
  { name: "NUS Hackers", role: "Committee Member", period: "2022 - Present" },
  { name: "Fivetran", role: "Data Analyst Intern", period: "2024 - Present" },
  { name: "AppVenture NUSH", role: "Contributor", period: "2023" },
  { name: "NUS CS2103 AY2324S2", role: "Student", period: "2024" },
  { name: "AY2324S2-CS2103T-W12-3", role: "Team Member", period: "2024" }
];

const skills = {
  "Data Engineering": ["Python", "SQL", "ETL/ELT", "Data Pipelines", "Analytics"],
  "Mobile Development": ["Kotlin", "Android", "React Native", "Bluetooth LE"],
  "Web Development": ["TypeScript", "React", "Node.js", "JavaScript"],
  "Cloud & DevOps": ["AWS", "CloudWatch", "Docker", "CI/CD"],
  "Blockchain": ["Bitcoin", "BDK-Kotlin", "Cryptocurrency", "Wallet Development"]
};

// Optimized Timeline Item Component
const TimelineItem = React.memo(({ exp, index }: { exp: any; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={itemRef}
      className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Timeline Dot with Icon */}
      <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 bg-background border-4 border-primary rounded-full z-10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        <exp.icon className={`h-5 w-5 ${exp.color}`} />
      </div>

      {/* Content */}
      <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
        <ExperienceCard
          experience={exp}
          animationDelay={`${index * 100}ms`}
        />
      </div>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';

const ExperienceDetailComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const skillsEntries = useMemo(() => Object.entries(skills), []);

  const backgroundIcons = [
    { Icon: Briefcase, className: "top-20 right-10 opacity-20" },
    { Icon: Building, className: "bottom-40 left-10 opacity-15" },
    { Icon: Code, className: "top-1/2 left-1/4 opacity-10" },
    { Icon: Database, className: "bottom-20 right-1/4 opacity-15" },
  ];

  return (
    <PageLayout
      title="Professional Experience"
      description="My journey through data engineering, software development, and technology innovation across leading companies and organizations."
      badge="Experience"
      showBackButton
      backgroundIcons={backgroundIcons}
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 relative z-10 mb-16">
        {[
          { label: "Years Experience", value: "5+" },
          { label: "Companies", value: "5" }
        ].map((stat, i) => (
          <Card key={i} className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all text-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative z-10">
              <div className="text-3xl font-bold text-primary mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Experience Timeline */}
      <div className="relative z-10 mb-24">
        <div className="relative">
          {/* Futuristic Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent"></div>

          {experiences.map((exp, index) => (
            <TimelineItem key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="relative z-10 mb-24">
        <h2 className="text-2xl font-bold text-center mb-12 tracking-tight">Education</h2>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 tracking-tight">National University of Singapore</h3>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-primary font-semibold text-sm">Undergraduate, Computer Science</span>
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase">Jan 2022 - Aug 2026</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Pursuing Computer Science degree with focus on software engineering, data structures, 
                    algorithms, and system design. Active member of NUS Hackers community.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Software Engineering", "Data Structures", "Algorithms", "System Design"].map((subject) => (
                      <Badge key={subject} variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] font-medium px-2 py-0.5">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-center mb-12 tracking-tight">Core Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillsEntries.map(([category, skillList], index) => (
            <Card key={category} className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all group">
              <CardHeader className="pb-3">
                <CardTitle className="text-base tracking-tight group-hover:text-primary transition-colors">{category}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {skillList.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] font-medium px-2 py-0.5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button 
            size="lg" 
            className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

// Export with React.memo for performance optimization
export const ExperienceDetail = React.memo(ExperienceDetailComponent);