'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Database, Globe, Smartphone, Cloud, Brain, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturedSkills() {
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

  const topSkillCategories = [
    {
      title: "Data Engineering & Analytics",
      icon: Database,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Building scalable data pipelines and analytics solutions",
      topSkills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 92 },
        { name: "Data Pipelines", level: 88 }
      ]
    },
    {
      title: "Mobile Development", 
      icon: Smartphone,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Native and cross-platform mobile applications",
      topSkills: [
        { name: "Kotlin", level: 92 },
        { name: "Android", level: 90 },
        { name: "React Native", level: 82 }
      ]
    },
    {
      title: "Web Development",
      icon: Globe,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Full-stack web applications and modern frameworks",
      topSkills: [
        { name: "TypeScript", level: 90 },
        { name: "React/Next.js", level: 88 },
        { name: "Node.js", level: 85 }
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
      title: "AI/ML Research",
      description: "Neural networks and machine learning applications",
      icon: Brain,
      color: "text-pink-500"
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="relative py-20">
      {/* Top gradient overlay to blend with projects section */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
      
      <div className="container-width section-padding relative z-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Core Skills & Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key technical competencies that drive innovation and deliver results
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

          {/* Top Skills Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {topSkillCategories.map((category, index) => (
              <Card key={category.title} className={`hover:shadow-xl transition-all duration-300 group ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${category.bgColor} group-hover:scale-110 transition-transform`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div>
                      <span className="text-lg">{category.title}</span>
                      <p className="text-sm text-muted-foreground font-normal">{category.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.topSkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-12">
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '700ms' }}>
              <div className="text-3xl font-bold text-primary mb-2">40+</div>
              <div className="text-muted-foreground">Technologies</div>
            </div>
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <div className="text-3xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '900ms' }}>
              <div className="text-3xl font-bold text-primary mb-2">8</div>
              <div className="text-muted-foreground">Skill Categories</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Explore detailed skill breakdowns, proficiency levels, and technology stack
            </p>
            <Link href="/skills">
              <Button size="lg">
                View Complete Skills
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}