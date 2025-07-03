'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowDown, Download, Github, Linkedin, Mail, Globe, Code2, Database, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const roles = [
    "Data Analyst @ Fivetran",
    "Full Stack Developer", 
    "Android Engineer",
    "Blockchain Developer"
  ];

  const achievements = [
    { number: "5+", label: "Years Experience", icon: Target },
    { number: "25+", label: "Projects", icon: Code2 },
    { number: "6", label: "Organizations", icon: TrendingUp },
    { number: "16", label: "Followers", icon: Sparkles }
  ];

  const socialLinks = [
    { href: "https://github.com/fivetran-tangyetong", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/tang-yetong/", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:ytyt0792@gmail.com", icon: Mail, label: "Email" },
    { href: "https://darkvoid32.github.io/", icon: Globe, label: "Blog" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getWindowDimensions = () => {
    if (typeof window !== 'undefined') {
      return { width: window.innerWidth, height: window.innerHeight };
    }
    // Fallback for SSR
    return { width: 1920, height: 1080 };
  };

  const { width, height } = getWindowDimensions();

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Animated Gradient Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${(mousePosition.x - width / 2) * 0.02}px, ${(mousePosition.y - height / 2) * 0.02}px)`
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"
        style={{
          transform: `translate(${(mousePosition.x - width / 2) * -0.02}px, ${(mousePosition.y - height / 2) * -0.02}px)`
        }}
      />
      
      {/* Floating Tech Icons with Enhanced Animation */}
      <div className="absolute top-20 left-10 opacity-30 animate-float delay-300">
        <div className="p-3 bg-primary/10 rounded-xl backdrop-blur-sm border border-primary/20">
          <Database className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="absolute top-32 right-20 opacity-30 animate-float delay-700">
        <div className="p-3 bg-secondary/10 rounded-xl backdrop-blur-sm border border-secondary/20">
          <Code2 className="h-6 w-6 text-secondary" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 opacity-30 animate-float delay-500">
        <div className="p-3 bg-accent/10 rounded-xl backdrop-blur-sm border border-accent/20">
          <Zap className="h-6 w-6 text-accent" />
        </div>
      </div>

      {/* Main Content */}
      <div className={`container-width section-padding relative z-10 text-center transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        
        {/* Enhanced Profile Section */}
        <div className="mb-12">
          <div className="relative w-48 h-48 mx-auto mb-8 group">
            {/* Glowing Ring Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
            
            {/* Main Avatar */}
            <div className="relative w-full h-full bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-full flex items-center justify-center shadow-2xl border-4 border-background group-hover:scale-105 transition-transform duration-500">
              <span className="text-6xl font-bold text-primary-foreground">TY</span>
            </div>
            
            {/* Status Indicator */}
            <div className="absolute -bottom-3 -right-3 flex items-center space-x-2 bg-background/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Available</span>
            </div>
          </div>
        </div>

        {/* Enhanced Main Heading */}
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
            Tang Yetong
          </h1>
          
          {/* Dynamic Role Display with Enhanced Animation */}
          <div className="h-20 flex items-center justify-center mb-8">
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium transition-all duration-700">
                {roles[currentRole]}
              </h2>
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
            </div>
          </div>

          {/* Enhanced Professional Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: Database, label: "Data Engineering" },
              { icon: Code2, label: "Full Stack" },
              { icon: Zap, label: "Android Development" },
              { icon: Sparkles, label: "Blockchain" }
            ].map((tag, index) => (
              <Badge 
                key={tag.label}
                variant="secondary" 
                className="text-sm px-4 py-2 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <tag.icon className="h-3 w-3 mr-2" />
                {tag.label}
              </Badge>
            ))}
          </div>

          {/* Enhanced Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Data Analyst at <span className="text-primary font-semibold">Fivetran</span> with expertise in 
            building scalable data pipelines, Android applications, and full-stack web solutions. 
            Passionate about clean code, innovative technologies, and solving complex engineering challenges.
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
          >
            <Download className="mr-3 h-5 w-5 group-hover:animate-bounce" />
            Download Resume
          </Button>
          
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <Button 
                key={social.label}
                variant="outline" 
                size="lg" 
                className="p-4 rounded-full hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-border/50 hover:border-primary/50" 
                asChild
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.label}</span>
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.label}
              className="text-center hover:shadow-xl transition-all duration-500 group backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <achievement.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{achievement.number}</div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Scroll Indicator */}
        <Button
          variant="ghost"
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-smooth hover:animate-none backdrop-blur-sm border border-border/50 hover:border-primary/50"
        >
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">Scroll to next section</span>
        </Button>
      </div>
    </section>
  );
}