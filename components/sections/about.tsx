'use client';

import { useEffect, useRef, useState } from 'react';

import { GraduationCap, Heart, Target, Users, Code, Database, Smartphone, Award, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AboutCard } from '@/components/blog/about-card';

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
    <section id="about" ref={sectionRef} className="relative page-about-light">
      {/* Enhanced gradient overlay with animation */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/0 via-background/50 to-background z-10 animate-pulse" />

      {/* Simple background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-3" />
      
      {/* Main background with enhanced gradient transition */}
      <div className="pt-8 pb-24 bg-gradient-to-br from-background via-background to-background relative">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-3 animate-grid-flow" />
        
        <div className="container-width section-padding relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <Badge variant="outline" className="text-sm backdrop-blur-sm border border-border/50">About Me</Badge>
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-white from-gray-800 via-gray-700 to-gray-800">
                About Me
              </h2>
              <p className="text-xl text-muted-foreground dark:text-muted-foreground text-gray-700 max-w-3xl mx-auto leading-relaxed">
                <span className="dark:hidden">Passionate Data Analyst at Fivetran, crafting innovative solutions and driving technological advancement through scalable engineering and collaborative problem-solving.</span>
                <span className="hidden dark:inline">Data Analyst at Fivetran with a passion for building scalable solutions and driving innovation through technology</span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
              {/* Enhanced Biography with staggered animations */}
              <div className="space-y-6 card-section-light card-about-light">
                <div className="flex items-center space-x-3 mb-8 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                  <div className="p-3 bg-primary/10 rounded-full animate-pulse">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">Hello! I&apos;m Tang Yetong</h3>
                </div>
                
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <div className="p-6 bg-card/95 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-border/60 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-secondary/10 hover:bg-gradient-to-br hover:from-primary/10 hover:via-background hover:to-secondary/20 hover:border-l-primary/80 cursor-pointer group">
                    <p className="group-hover:text-foreground transition-colors duration-300">
                      I&apos;m currently a <span className="text-primary font-semibold group-hover:text-primary/80 transition-colors duration-300">Data Analyst at Fivetran</span>, 
                      where I work on optimizing data pipelines and building analytics solutions for enterprise clients. 
                      My journey in technology spans across data engineering, mobile development, and full-stack web applications.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-card/95 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-border/60 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-secondary/10 hover:bg-gradient-to-br hover:from-primary/10 hover:via-background hover:to-secondary/20 hover:border-l-primary/80 cursor-pointer group">
                    <p className="group-hover:text-foreground transition-colors duration-300">
                      With experience at <span className="text-primary font-semibold group-hover:text-primary/80 transition-colors duration-300">GovTech Singapore</span>, 
                      I&apos;ve contributed to government digital transformation initiatives, building citizen-facing applications 
                      and implementing cloud solutions on AWS. My work has directly impacted how citizens interact with 
                      government services.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-card/95 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-border/60 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-secondary/10 hover:bg-gradient-to-br hover:from-primary/10 hover:via-background hover:to-secondary/20 hover:border-l-primary/80 cursor-pointer group">
                    <p className="group-hover:text-foreground transition-colors duration-300">
                      I specialize in <span className="text-primary font-semibold group-hover:text-primary/80 transition-colors duration-300">Android development</span> with 
                      Bluetooth Low Energy integration, having built enterprise solutions for the hospitality industry 
                      at RFCOM Technologies. I&apos;m also passionate about blockchain technology, contributing to Bitcoin 
                      development projects and cryptocurrency wallet applications.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-card/95 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-border/60 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-secondary/10 hover:bg-gradient-to-br hover:from-primary/10 hover:via-background hover:to-secondary/20 hover:border-l-primary/80 cursor-pointer group">
                    <p className="group-hover:text-foreground transition-colors duration-300">
                      As an active member of the <span className="text-primary font-semibold group-hover:text-primary/80 transition-colors duration-300">NUS Hackers community</span>, 
                      I contribute to open-source projects and help foster Singapore&apos;s vibrant tech ecosystem. 
                      I believe in continuous learning and sharing knowledge with fellow developers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Education & Expertise with hover effects */}
              <div className="space-y-8">
                {/* Education */}
                <Card className="card-enhanced-light card-about-light border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-secondary/10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-bold text-xl mr-3">National University of Singapore</h4>
                          <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold text-xs px-3 py-1 ml-2">Computer Science</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-3">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">Undergraduate</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            <span>Jan 2022 - Aug 2026</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Zap className="h-4 w-4 text-primary" />
                            <span>Singapore</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
                          Pursuing Computer Science degree with focus on software engineering, data structures, algorithms, and system design. Active member of NUS Hackers community.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {["Software Engineering", "Data Structures", "Algorithms", "System Design", "NUS Hackers"].map((subject) => (
                            <Badge key={subject} variant="outline" className="badge-enhanced text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Focus */}
                <Card className="card-enhanced-light card-about-light animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
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
                  <AboutCard
                    key={area.title}
                    about={area}
                    animationDelay={`${index * 200}ms`}
                  />
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
                  <AboutCard
                    key={value.title}
                    about={value}
                    animationDelay={`${(index + 3) * 200}ms`}
                  />
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