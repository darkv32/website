'use client';

import { useEffect, useRef, useState } from 'react';

import { Briefcase, Calendar, MapPin, Award, Database, Building, Smartphone, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExperienceCard } from '@/components/blog/experience-card';

export function FeaturedExperience() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);



  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      

      
      {/* Interactive background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles that respond to card hover */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full transition-all duration-500 ${
              hoveredCard ? 'opacity-30 scale-125' : 'opacity-15 scale-100'
            }`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 12}%`,
              background: `radial-gradient(circle, rgba(59, 130, 246, ${hoveredCard ? 0.4 : 0.2}), transparent 60%)`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + i * 0.3}s`,
            }}
          />
        ))}
        
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-blue-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-indigo-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        
        {/* Additional floating orbs */}
        <div className="absolute top-1/6 left-1/6 w-32 h-32 bg-cyan-500/2 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/6 right-1/6 w-40 h-40 bg-sky-500/2 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '3s' }} />
        <div className="absolute top-2/3 right-1/6 w-36 h-36 bg-slate-500/2 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '0.5s' }} />
      </div>

      {/* Professional grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-2 animate-grid-flow" />

      {/* Subtle lines and shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/8 to-transparent animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        
        {/* Professional geometric elements */}
        <div className="absolute top-1/5 right-1/5 w-8 h-8 border border-blue-500/10 rotate-45 animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/5 left-1/5 w-12 h-12 border border-indigo-500/10 rounded-full animate-pulse" style={{ animationDuration: '7s', animationDelay: '1.5s' }} />
        <div className="absolute top-3/4 left-1/3 w-6 h-6 border border-cyan-500/10 rotate-12 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2.5s' }} />
      </div>

      {/* Mouse-following gradient */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.03), transparent 50%)`
        }}
      />
      
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
              <ExperienceCard
                key={exp.title + exp.company}
                experience={exp}
                animationDelay={`${index * 200}ms`}
              />
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