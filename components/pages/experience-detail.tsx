'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Briefcase, Calendar, MapPin, Award, Building, Code, Database, Smartphone, ExternalLink, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/page-layout';

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
        <Card className="card-enhanced border-l-4 border-l-primary group hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50 hover:bg-card/90">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.title}</h3>
                <p className="text-primary font-semibold text-base">{exp.company}</p>
                <div className="text-muted-foreground text-xs mt-1">
                  {exp.companyInfo.industry} • {exp.companyInfo.size} • Founded {exp.companyInfo.founded}
                </div>
              </div>
              <Badge variant="secondary" className="badge-enhanced shrink-0 text-xs">{exp.type}</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{exp.period}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">({exp.duration})</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{exp.location}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-sm">{exp.description}</p>

            {/* Key Achievements */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center text-sm">
                <Award className="h-3 w-3 mr-2 text-primary" />
                Key Achievements
              </h4>
              <ul className="space-y-1">
                {exp.achievements.map((achievement: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                    <span className="text-muted-foreground text-xs">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Technologies Used</h4>
              <div className="flex flex-wrap gap-1">
                {exp.technologies.map((tech: string) => (
                  <Badge 
                    key={tech} 
                    variant="outline" 
                    className="badge-enhanced text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';

const ExperienceDetailComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Optimize useEffect to only run once
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoize expensive computations
  const skillsEntries = useMemo(() => Object.entries(skills), []);

  return (
    <PageLayout
      title="Professional Experience"
      description="My journey through data engineering, software development, and technology innovation across leading companies and organizations."
      badge="Experience"
      showBackButton
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating Orbs - Performance optimized with CSS transforms - Increased movement */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/15 rounded-full blur-xl animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-500/15 rounded-full blur-xl animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }}></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-purple-500/15 rounded-full blur-xl animate-float" style={{ animationDelay: '4s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-orange-500/15 rounded-full blur-xl animate-float" style={{ animationDelay: '1s', animationDuration: '6.5s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-indigo-500/15 rounded-full blur-xl animate-float" style={{ animationDelay: '3s', animationDuration: '7.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-pink-500/15 rounded-full blur-xl animate-float" style={{ animationDelay: '5s', animationDuration: '9s' }}></div>
        <div className="absolute top-2/3 left-1/6 w-18 h-18 bg-cyan-500/15 rounded-full blur-xl animate-float" style={{ animationDelay: '6s', animationDuration: '8.5s' }}></div>
        <div className="absolute bottom-2/3 right-1/6 w-14 h-14 bg-yellow-500/15 rounded-full blur-xl animate-float" style={{ animationDelay: '7s', animationDuration: '10s' }}></div>
        
        {/* Geometric Shapes - Static with hover effects for performance */}
        <div className="absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-500/25 to-purple-500/25 rounded-lg rotate-45 transition-transform duration-3000 hover:scale-110"></div>
        <div className="absolute bottom-60 right-1/3 w-12 h-12 bg-gradient-to-br from-green-500/25 to-blue-500/25 rounded-full transition-transform duration-3000 hover:scale-110"></div>
        <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-gradient-to-br from-yellow-500/25 to-orange-500/25 rounded-md rotate-12 transition-transform duration-3000 hover:scale-110"></div>
        <div className="absolute bottom-1/4 right-1/6 w-10 h-10 bg-gradient-to-br from-purple-500/25 to-pink-500/25 rounded-lg transition-transform duration-3000 hover:scale-110"></div>
        <div className="absolute top-1/4 right-1/6 w-6 h-6 bg-gradient-to-br from-indigo-500/25 to-cyan-500/25 rounded-sm rotate-30 transition-transform duration-3000 hover:scale-110"></div>
        <div className="absolute bottom-1/3 left-1/3 w-9 h-9 bg-gradient-to-br from-emerald-500/25 to-teal-500/25 rounded-md transition-transform duration-3000 hover:scale-110"></div>
        
        {/* Gradient Lines - Static with subtle pulse */}
        <div className="absolute top-1/3 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-transparent via-green-500/30 to-transparent animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
                  <div className="absolute top-1/4 right-0 w-1 h-20 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-0 w-1 h-28 bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
          
          {/* Subtle Grid Pattern - Static for performance */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Performance-optimized particle effect */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/25 rounded-full animate-float"
              style={{
                left: `${8 + i * 8}%`,
                top: `${5 + i * 10}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${3 + i * 1.8}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats - More compact */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 relative z-10">
        <Card className="card-enhanced text-center hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50 hover:bg-card/90">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced text-center hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50 hover:bg-card/90">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">5</div>
            <div className="text-sm text-muted-foreground">Companies</div>
          </CardContent>
        </Card>
      </div>

      {/* Experience Timeline - More compact */}
      <div className="page-section relative z-10">
        {/* Section-specific background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-500/6 rounded-full blur-lg animate-float" style={{ animationDelay: '2s', animationDuration: '14s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-purple-500/6 rounded-full blur-lg animate-float" style={{ animationDelay: '6s', animationDuration: '16s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-green-500/6 rounded-full blur-lg animate-float" style={{ animationDelay: '4s', animationDuration: '18s' }}></div>
        </div>
        
        <div className="page-section-content">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

            {experiences.map((exp, index) => (
              <TimelineItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Education Section - More compact */}
      <div className="page-section-alt relative z-10">
        {/* Section-specific background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/6 w-24 h-24 bg-indigo-500/6 rounded-full blur-lg animate-float" style={{ animationDelay: '1s', animationDuration: '15s' }}></div>
          <div className="absolute bottom-1/3 right-1/6 w-18 h-18 bg-orange-500/6 rounded-full blur-lg animate-float" style={{ animationDelay: '5s', animationDuration: '17s' }}></div>
          <div className="absolute top-2/3 left-2/3 w-14 h-14 bg-pink-500/6 rounded-full blur-lg animate-float" style={{ animationDelay: '3s', animationDuration: '19s' }}></div>
        </div>
        
        <div className="page-section-content">
          <h2 className="text-2xl font-bold text-center mb-8">
            Education
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card className="card-enhanced border-l-4 border-l-primary hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50 hover:bg-card/90">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">National University of Singapore</h3>
                    <p className="text-primary font-semibold text-base mb-2">Undergraduate, Computer Science</p>
                    <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Jan 2022 - Aug 2026</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Singapore</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
                      Pursuing Computer Science degree with focus on software engineering, data structures, 
                      algorithms, and system design. Active member of NUS Hackers community.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Computer Science", "Software Engineering", "Data Structures", "Algorithms", "System Design"].map((subject) => (
                        <Badge 
                          key={subject} 
                          variant="outline" 
                          className="badge-enhanced text-xs"
                        >
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
      </div>

      {/* Skills Overview - More compact */}
      <div className="page-section relative z-10">
        {/* Section-specific background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-22 h-22 bg-yellow-500/6 rounded-full blur-lg animate-float" style={{ animationDelay: '2s', animationDuration: '20s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-cyan-500/6 rounded-full blur-lg animate-float" style={{ animationDelay: '7s', animationDuration: '22s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-emerald-500/6 rounded-full blur-lg animate-float" style={{ animationDelay: '4s', animationDuration: '24s' }}></div>
        </div>
        
        <div className="page-section-content">
          <h2 className="text-2xl font-bold text-center mb-8">
            Core Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {skillsEntries.map(([category, skillList], index) => (
              <Card 
                key={category} 
                className="card-enhanced hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50 hover:bg-card/90" 
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">{category}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1">
                    {skillList.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="badge-enhanced text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="btn-primary-enhanced">
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// Export with React.memo for performance optimization
export const ExperienceDetail = React.memo(ExperienceDetailComponent);