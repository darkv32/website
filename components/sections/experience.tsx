'use client';

import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, Award, Building, Code, Database, Smartphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExperienceCard } from '@/components/blog/experience-card';

export function Experience() {
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
        "Optimized data pipeline performance for enterprise clients",
        "Developed analytics dashboards for internal teams",
        "Contributed to data quality monitoring systems"
      ],
      technologies: ["Python", "SQL", "Data Pipelines", "Analytics", "ETL"],
      icon: Database,
      color: "text-blue-500"
    },
    {
      title: "Software Engineer Internship",
      company: "GovTech Singapore",
      location: "Singapore · Hybrid",
      period: "May 2023 - Aug 2023",
      duration: "4 mos",
      type: "Full-time",
      description: "Developed government digital services and applications. Worked on citizen-facing applications and internal government systems.",
      achievements: [
        "Built scalable web applications for government services",
        "Implemented AWS cloud solutions for high availability",
        "Collaborated with cross-functional teams on digital transformation"
      ],
      technologies: ["Kotlin", "React.js", "AWS", "Government Tech"],
      icon: Building,
      color: "text-green-500"
    },
    {
      title: "Contract Software Engineer",
      company: "RFCOM Technologies Pte. Ltd.",
      location: "Singapore",
      period: "Apr 2022 - Dec 2022",
      duration: "9 mos",
      type: "Part-time",
      description: "Developed Android applications with Bluetooth Low Energy integration for enterprise clients in hospitality industry.",
      achievements: [
        "Created luggage management system for hotels",
        "Implemented BLE technology for real-time tracking",
        "Deployed solutions to Pan Pacific Hotel and other clients"
      ],
      technologies: ["Kotlin", "Android", "Bluetooth LE", "Enterprise"],
      icon: Smartphone,
      color: "text-orange-500"
    },
    {
      title: "Intern",
      company: "Summer of Bitcoin",
      location: "Singapore",
      period: "Jun 2022 - Aug 2022",
      duration: "3 mos",
      type: "Part-time",
      description: "Contributed to Bitcoin development ecosystem and open-source projects. Worked on cryptocurrency wallet applications and blockchain technology.",
      achievements: [
        "Contributed to Bitcoin development kit (BDK)",
        "Developed cryptocurrency wallet features",
        "Participated in blockchain research and development"
      ],
      technologies: ["Kotlin", "Bitcoin", "Blockchain", "Cryptocurrency"],
      icon: Code,
      color: "text-yellow-500"
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
        "Enhanced website performance and user experience",
        "Managed SQL database operations with real-world data",
        "Designed systems for public-facing applications"
      ],
      technologies: ["Web Development", "SQL", "Database Management"],
      icon: Code,
      color: "text-purple-500"
    }
  ];

  const achievements = [
    {
      title: "Arctic Code Vault Contributor",
      organization: "GitHub",
      year: "2024",
      icon: Award,
      description: "Code preserved in the Arctic Code Vault"
    },
    {
      title: "NUS Hackers Committee Member",
      organization: "National University of Singapore",
      year: "2022 - Present",
      icon: Award,
      description: "Active contributor to university tech community"
    },
    {
      title: "Multiple GitHub Achievements",
      organization: "GitHub",
      year: "2024",
      icon: Award,
      description: "Pair Extraordinaire, YOLO, Quickdraw, Pull Shark"
    }
  ];

  const organizations = [
    "NUS Hackers", "Fivetran", "AppVenture NUSH", 
    "NUS CS2103 AY2324S2", "AY2324S2-CS2103T-W12-3"
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container-width section-padding">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My journey through data engineering, software development, and technology innovation
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"></div>

              {experiences.map((exp, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot with Icon */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 bg-background border-4 border-primary rounded-full z-10 flex items-center justify-center">
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
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Education</h3>
            <div className="max-w-2xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-primary/40 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">National University of Singapore</h4>
                      <p className="text-primary font-medium mb-2">Undergraduate, Computer Science</p>
                      <div className="flex items-center space-x-4 text-muted-foreground text-sm mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Jan 2022 - Aug 2026</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>Singapore</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Pursuing Computer Science degree with focus on software engineering, 
                        data structures, algorithms, and system design.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Organizations */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Organizations & Communities</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {organizations.map((org, index) => (
                <Badge 
                  key={org} 
                  variant="secondary" 
                  className={`text-sm px-4 py-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {org}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8">Achievements & Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`transition-all duration-500 hover:shadow-lg border-2 border-primary/40 shadow-lg ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${(index + 3) * 200}ms` }}>
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-1">{achievement.title}</h4>
                    <p className="text-muted-foreground text-sm mb-1">{achievement.organization}</p>
                    <p className="text-primary text-sm font-medium mb-2">{achievement.year}</p>
                    <p className="text-muted-foreground text-xs">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}