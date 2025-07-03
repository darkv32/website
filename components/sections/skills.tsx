'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Database, Globe, Smartphone, Cloud, Palette, Brain, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export function Skills() {
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

  const skillCategories = [
    {
      title: "Data Engineering & Analytics",
      icon: Database,
      color: "text-blue-500",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 92 },
        { name: "Data Pipelines", level: 88 },
        { name: "ETL/ELT", level: 85 }
      ]
    },
    {
      title: "Mobile Development", 
      icon: Smartphone,
      color: "text-green-500",
      skills: [
        { name: "Kotlin", level: 92 },
        { name: "Android", level: 90 },
        { name: "React Native", level: 82 },
        { name: "Bluetooth LE", level: 88 }
      ]
    },
    {
      title: "Web Development",
      icon: Globe,
      color: "text-purple-500",
      skills: [
        { name: "TypeScript", level: 90 },
        { name: "React/Next.js", level: 88 },
        { name: "Node.js", level: 85 },
        { name: "JavaScript", level: 92 }
      ]
    },
    {
      title: "Backend & APIs",
      icon: Code,
      color: "text-orange-500",
      skills: [
        { name: "REST APIs", level: 90 },
        { name: "Express.js", level: 85 },
        { name: "WebSocket", level: 80 },
        { name: "Microservices", level: 78 }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "text-cyan-500",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 80 },
        { name: "CI/CD", level: 78 },
        { name: "Kubernetes", level: 70 }
      ]
    },
    {
      title: "Blockchain & Crypto",
      icon: Shield,
      color: "text-yellow-500",
      skills: [
        { name: "Bitcoin Development", level: 82 },
        { name: "DeFi Protocols", level: 75 },
        { name: "Smart Contracts", level: 70 },
        { name: "Wallet Integration", level: 85 }
      ]
    },
    {
      title: "AI/ML & Data Science",
      icon: Brain,
      color: "text-pink-500",
      skills: [
        { name: "Machine Learning", level: 78 },
        { name: "Neural Networks", level: 75 },
        { name: "Data Analysis", level: 88 },
        { name: "Statistical Modeling", level: 80 }
      ]
    },
    {
      title: "Tools & Design",
      icon: Palette,
      color: "text-indigo-500",
      skills: [
        { name: "Git/GitHub", level: 95 },
        { name: "Figma", level: 80 },
        { name: "Testing", level: 85 },
        { name: "Agile/Scrum", level: 88 }
      ]
    }
  ];

  const professionalHighlights = [
    {
      title: "Fivetran Experience",
      description: "Data pipeline optimization and enterprise analytics",
      icon: Database,
      color: "text-blue-500"
    },
    {
      title: "GovTech Projects",
      description: "Government digital services and AWS cloud solutions",
      icon: Cloud,
      color: "text-green-500"
    },
    {
      title: "Enterprise Mobile Apps",
      description: "Bluetooth LE solutions for hospitality industry",
      icon: Smartphone,
      color: "text-orange-500"
    },
    {
      title: "Open Source Contributor",
      description: "Bitcoin development and community projects",
      icon: Shield,
      color: "text-yellow-500"
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container-width section-padding">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to build scalable data solutions and applications
            </p>
          </div>

          {/* Professional Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {professionalHighlights.map((highlight, index) => (
              <Card key={highlight.title} className={`text-center hover:shadow-lg transition-all duration-300 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className={`p-3 rounded-full w-fit mx-auto mb-4 bg-secondary ${highlight.color}`}>
                    <highlight.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2">{highlight.title}</h4>
                  <p className="text-muted-foreground text-sm">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {skillCategories.map((category, index) => (
              <Card key={category.title} className={`hover:shadow-lg transition-all duration-300 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-sm">
                    <div className={`p-2 rounded-lg bg-secondary ${category.color}`}>
                      <category.icon className="h-4 w-4" />
                    </div>
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={isVisible ? skill.level : 0} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Experience Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '900ms' }}>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Technologies</div>
            </div>
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <div className="text-3xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1100ms' }}>
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-muted-foreground">Organizations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}