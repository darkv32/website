'use client';

import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, Award, Database, Building, Smartphone, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturedExperience() {
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

  const featuredExperiences = [
    {
      title: "Data Analyst Intern",
      company: "Fivetran",
      location: "Oakland, California, United States",
      period: "Sep 2024 - Present",
      type: "Full-time",
      description: "Working on data pipeline optimization and analytics at a leading data integration platform serving thousands of customers.",
      achievements: [
        "Optimized data pipeline performance for enterprise clients",
        "Developed analytics dashboards for internal teams",
        "Contributed to data quality monitoring systems"
      ],
      technologies: ["Python", "SQL", "Data Pipelines", "Analytics"],
      icon: Database,
      color: "text-blue-500",
      featured: true
    },
    {
      title: "Software Engineer Internship",
      company: "GovTech Singapore",
      location: "Singapore",
      period: "May 2023 - Aug 2023",
      type: "Full-time",
      description: "Developed government digital services and applications with focus on citizen-facing solutions.",
      achievements: [
        "Built scalable web applications for government services",
        "Implemented AWS cloud solutions for high availability",
        "Collaborated on digital transformation initiatives"
      ],
      technologies: ["Kotlin", "React.js", "AWS", "Government Tech"],
      icon: Building,
      color: "text-green-500",
      featured: true
    },
    {
      title: "Contract Software Engineer",
      company: "RFCOM Technologies",
      location: "Singapore",
      period: "Apr 2022 - Dec 2022",
      type: "Part-time",
      description: "Developed Android applications with Bluetooth LE integration for hospitality industry clients.",
      achievements: [
        "Created luggage management system for hotels",
        "Implemented BLE technology for real-time tracking",
        "Deployed to Pan Pacific Hotel and other clients"
      ],
      technologies: ["Kotlin", "Android", "Bluetooth LE", "Enterprise"],
      icon: Smartphone,
      color: "text-orange-500",
      featured: true
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="relative py-20">
      {/* Top gradient overlay to blend with about section */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
      
      <div className="container-width section-padding relative z-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key highlights from my journey in data engineering, government technology, and mobile development
            </p>
          </div>

          {/* Featured Experiences */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {featuredExperiences.map((exp, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 200}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <exp.icon className={`h-6 w-6 ${exp.color}`} />
                      </div>
                      <div>
                        <h3 className="font-bold group-hover:text-primary transition-colors">{exp.title}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">{exp.type}</Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>

                  {/* Key Achievements */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center text-sm">
                      <Award className="h-4 w-4 mr-1 text-primary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                          <span className="text-muted-foreground text-xs">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Explore my complete professional journey, education, and achievements
            </p>
            <Link href="/experience">
              <Button size="lg">
                View Complete Experience
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}