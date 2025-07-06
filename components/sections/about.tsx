'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Heart, Target, Users, Code, Database, Smartphone, Award, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <section id="about" ref={sectionRef} className="relative overflow-hidden">
      {/* Enhanced gradient overlay with animation */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/0 via-background/50 to-background z-10 animate-pulse" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>

      {/* Mouse-following gradient */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.1), transparent 40%)`
        }}
      />
      
      {/* Main background with enhanced gradient transition */}
      <div className="pt-8 pb-24 bg-gradient-to-br from-background via-background to-background relative">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-grid-flow" />
        
        <div className="container-width section-padding relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            {/* Enhanced Section Header with floating animation */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
                <Sparkles className="h-6 w-6 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                <Badge variant="outline" className="text-sm backdrop-blur-sm border border-border/50">About Me</Badge>
                <Sparkles className="h-6 w-6 text-primary animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-gradient-x">
                About Me
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
                Data Analyst at Fivetran with a passion for building scalable solutions and driving innovation through technology
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
              {/* Enhanced Biography with staggered animations */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-8 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                  <div className="p-3 bg-primary/10 rounded-full animate-pulse">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">Hello! I&apos;m Tang Yetong</h3>
                </div>
                
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <div 
                    className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 animate-slide-in-left"
                    style={{ animationDelay: '0.5s' }}
                  >
                    <p>
                      I&apos;m currently a <span className="text-primary font-semibold">Data Analyst at Fivetran</span>, 
                      where I work on optimizing data pipelines and building analytics solutions for enterprise clients. 
                      My journey in technology spans across data engineering, mobile development, and full-stack web applications.
                    </p>
                  </div>
                  
                  <div 
                    className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 animate-slide-in-left"
                    style={{ animationDelay: '0.7s' }}
                  >
                    <p>
                      With experience at <span className="text-primary font-semibold">GovTech Singapore</span>, 
                      I&apos;ve contributed to government digital transformation initiatives, building citizen-facing applications 
                      and implementing cloud solutions on AWS. My work has directly impacted how citizens interact with 
                      government services.
                    </p>
                  </div>
                  
                  <div 
                    className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 animate-slide-in-left"
                    style={{ animationDelay: '0.9s' }}
                  >
                    <p>
                      I specialize in <span className="text-primary font-semibold">Android development</span> with 
                      Bluetooth Low Energy integration, having built enterprise solutions for the hospitality industry 
                      at RFCOM Technologies. I&apos;m also passionate about blockchain technology, contributing to Bitcoin 
                      development projects and cryptocurrency wallet applications.
                    </p>
                  </div>
                  
                  <div 
                    className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 animate-slide-in-left"
                    style={{ animationDelay: '1.1s' }}
                  >
                    <p>
                      As an active member of the <span className="text-primary font-semibold">NUS Hackers community</span>, 
                      I contribute to open-source projects and help foster Singapore&apos;s vibrant tech ecosystem. 
                      I believe in continuous learning and sharing knowledge with fellow developers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Education & Expertise with hover effects */}
              <div className="space-y-8">
                {/* Education */}
                <Card className="backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/90 hover:scale-[1.02] animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-xl animate-pulse">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3">Education</h4>
                        <div className="space-y-3 text-muted-foreground">
                          <div className="p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors duration-300">
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
                <Card className="backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/90 hover:scale-[1.02] animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                  <CardContent className="p-8">
                    <h4 className="font-bold text-lg mb-6 flex items-center">
                      <Award className="h-6 w-6 mr-3 text-primary animate-pulse" />
                      Current Focus
                    </h4>
                    <div className="space-y-4">
                      {[
                        { text: "Data Analytics at Fivetran", color: "green", delay: 0 },
                        { text: "Open Source Contributions", color: "blue", delay: 0.2 },
                        { text: "NUS Hackers Community", color: "purple", delay: 0.4 }
                      ].map((item, index) => (
                        <div 
                          key={item.text}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 animate-slide-in-right ${
                            item.color === 'green' ? 'bg-green-500/10 hover:bg-green-500/20' :
                            item.color === 'blue' ? 'bg-blue-500/10 hover:bg-blue-500/20' :
                            item.color === 'purple' ? 'bg-purple-500/10 hover:bg-purple-500/20' : ''
                          }`}
                          style={{ animationDelay: `${0.7 + item.delay}s` }}
                        >
                          <div className={`w-3 h-3 rounded-full ${index === 0 ? 'animate-pulse' : ''} ${
                            item.color === 'green' ? 'bg-green-500' :
                            item.color === 'blue' ? 'bg-blue-500' :
                            item.color === 'purple' ? 'bg-purple-500' : ''
                          }`}></div>
                          <span className="text-sm font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* GitHub Achievements */}
                {/* <Card className="backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/90 hover:scale-[1.02] animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
                  <CardContent className="p-8">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <TrendingUp className="h-6 w-6 mr-3 text-primary animate-pulse" />
                      GitHub Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Arctic Code Vault', 'Pair Extraordinaire', 'YOLO', 'Quickdraw', 'Pull Shark'].map((achievement, index) => (
                        <Badge 
                          key={achievement} 
                          variant="secondary" 
                          className="text-xs backdrop-blur-sm border border-border/50 hover:scale-110 transition-transform duration-200 animate-fade-in"
                          style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                        >
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>

            {/* Enhanced Expertise Areas with staggered animations */}
            <div className="mb-16">
              <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-3xl font-bold mb-4">Areas of Expertise</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Specialized skills and technologies I&apos;ve mastered across different domains
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {expertise.map((area, index) => (
                  <Card 
                    key={area.title} 
                    className={`transition-all duration-500 hover:shadow-xl backdrop-blur-sm border border-border/30 hover:border-primary/50 hover:scale-105 bg-card/90 animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <CardContent className="p-8 group">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className={`p-4 rounded-xl ${area.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                          <area.icon className={`h-8 w-8 ${area.color} group-hover:animate-pulse`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">{area.title}</h4>
                          <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {area.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={tech} 
                            variant="outline" 
                            className="text-xs backdrop-blur-sm border border-border/50 hover:scale-105 transition-transform duration-200 hover:border-primary/50"
                            style={{ animationDelay: `${(index * 200) + (techIndex * 50)}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Core Values with enhanced animations */}
            <div>
              <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-3xl font-bold mb-4">Core Values</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide my work and drive my passion for technology
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <Card 
                    key={value.title} 
                    className={`transition-all duration-500 hover:shadow-xl backdrop-blur-sm border border-border/30 hover:border-primary/50 hover:scale-105 bg-card/90 animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
                    style={{ animationDelay: `${(index + 3) * 200}ms` }}
                  >
                    <CardContent className="p-8 text-center group">
                      <div className={`p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6 ${value.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse`}>
                        <value.icon className="h-10 w-10" />
                      </div>
                      <h4 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">{value.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes grid-flow {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
}