'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Heart, Target, Users, Code, Database, Smartphone, Award, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function About() {
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

  const values = [
    {
      icon: Target,
      title: "Data-Driven Excellence",
      description: "Committed to delivering high-quality data solutions that drive business insights and decision-making.",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Collaborative Innovation",
      description: "Believe in the power of teamwork and cross-functional collaboration to solve complex engineering challenges.",
      color: "text-green-500"
    },
    {
      icon: Heart,
      title: "Continuous Learning",
      description: "Passionate about staying current with emerging technologies and contributing to the tech community.",
      color: "text-purple-500"
    }
  ];

  const expertise = [
    {
      icon: Database,
      title: "Data Engineering",
      description: "Building scalable data pipelines and analytics solutions at Fivetran",
      technologies: ["Python", "SQL", "ETL", "Data Pipelines"],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Android applications with Bluetooth LE and enterprise integrations",
      technologies: ["Kotlin", "Android", "React Native", "BLE"],
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Code,
      title: "Full Stack Development",
      description: "Web applications and government digital services",
      technologies: ["TypeScript", "React", "Node.js", "AWS"],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container-width section-padding relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <Badge variant="outline" className="text-sm">About Me</Badge>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Data Analyst at Fivetran with a passion for building scalable solutions and driving innovation through technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Enhanced Biography */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">Hello! I&apos;m Tang Yetong</h3>
              </div>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                  <p>
                    I&apos;m currently a <span className="text-primary font-semibold">Data Analyst at Fivetran</span>, 
                    where I work on optimizing data pipelines and building analytics solutions for enterprise clients. 
                    My journey in technology spans across data engineering, mobile development, and full-stack web applications.
                  </p>
                </div>
                
                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                  <p>
                    With experience at <span className="text-primary font-semibold">GovTech Singapore</span>, 
                    I&apos;ve contributed to government digital transformation initiatives, building citizen-facing applications 
                    and implementing cloud solutions on AWS. My work has directly impacted how citizens interact with 
                    government services.
                  </p>
                </div>
                
                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                  <p>
                    I specialize in <span className="text-primary font-semibold">Android development</span> with 
                    Bluetooth Low Energy integration, having built enterprise solutions for the hospitality industry 
                    at RFCOM Technologies. I&apos;m also passionate about blockchain technology, contributing to Bitcoin 
                    development projects and cryptocurrency wallet applications.
                  </p>
                </div>
                
                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                  <p>
                    As an active member of the <span className="text-primary font-semibold">NUS Hackers community</span>, 
                    I contribute to open-source projects and help foster Singapore&apos;s vibrant tech ecosystem. 
                    I believe in continuous learning and sharing knowledge with fellow developers.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Education & Expertise */}
            <div className="space-y-8">
              {/* Education */}
              <Card className="backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3">Education</h4>
                      <div className="space-y-3 text-muted-foreground">
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <p className="font-semibold text-foreground">National University of Singapore</p>
                          <p className="text-sm">Undergraduate, Computer Science</p>
                          <p className="text-sm text-primary">Jan 2022 - Aug 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Focus */}
              <Card className="backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <h4 className="font-bold text-lg mb-6 flex items-center">
                    <Award className="h-6 w-6 mr-3 text-primary" />
                    Current Focus
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Data Analytics at Fivetran</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Open Source Contributions</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">NUS Hackers Community</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* GitHub Achievements */}
              <Card className="backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <h4 className="font-bold text-lg mb-4 flex items-center">
                    <TrendingUp className="h-6 w-6 mr-3 text-primary" />
                    GitHub Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Arctic Code Vault', 'Pair Extraordinaire', 'YOLO', 'Quickdraw', 'Pull Shark'].map((achievement) => (
                      <Badge key={achievement} variant="secondary" className="text-xs backdrop-blur-sm border border-border/50">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Expertise Areas */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Areas of Expertise</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized skills and technologies I&apos;ve mastered across different domains
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {expertise.map((area, index) => (
                <Card 
                  key={area.title} 
                  className={`transition-all duration-500 hover:shadow-xl backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:scale-105 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} 
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`p-4 rounded-xl ${area.bgColor}`}>
                        <area.icon className={`h-8 w-8 ${area.color}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2">{area.title}</h4>
                        <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs backdrop-blur-sm border border-border/50">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Core Values */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Core Values</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide my work and drive my passion for technology
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={value.title} 
                  className={`transition-all duration-500 hover:shadow-xl backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:scale-105 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} 
                  style={{ animationDelay: `${(index + 3) * 200}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6 ${value.color} bg-opacity-20`}>
                      <value.icon className="h-10 w-10" />
                    </div>
                    <h4 className="font-bold text-xl mb-3">{value.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
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