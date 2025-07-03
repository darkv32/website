'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Filter, Grid, List, Star, GitFork, Database, Smartphone, Globe, Code2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

  const projects = [
    {
      id: 1,
      title: "NeuroWeb",
      description: "Advanced neural network web application with TypeScript. Private repository showcasing cutting-edge AI/ML implementations.",
      longDescription: "Comprehensive neural network platform built with modern TypeScript architecture. Features advanced machine learning algorithms, real-time data processing, and interactive visualizations for neural network training and analysis.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      category: "ai",
      technologies: ["TypeScript", "Neural Networks", "Machine Learning", "Web APIs"],
      github: "https://github.com/fivetran-tangyetong/NeuroWeb",
      live: "#",
      featured: true,
      status: "private",
      icon: Database,
      lastUpdated: "15 hours ago"
    },
    {
      id: 2,
      title: "Math Tutor",
      description: "Interactive math tutoring application built with Bolt.new. Features personalized learning paths and real-time problem solving.",
      longDescription: "AI-powered math tutoring platform with adaptive learning algorithms, step-by-step problem solving, and personalized curriculum generation. Built using modern web technologies for optimal user experience.",
      image: "https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg",
      category: "web",
      technologies: ["TypeScript", "AI/ML", "Educational Tech", "Interactive UI"],
      github: "https://github.com/fivetran-tangyetong/math_tutor",
      live: "https://math-tutor-demo.vercel.app",
      featured: true,
      status: "public",
      icon: Code2,
      lastUpdated: "16 hours ago"
    },
    {
      id: 3,
      title: "Catalyst - MCP A2A Hackathon",
      description: "Hackathon project for MCP A2A challenge. Python-based solution for automated data processing and analysis.",
      longDescription: "Award-winning hackathon project that automates complex data processing workflows. Features real-time analytics, machine learning integration, and scalable architecture for enterprise-level data operations.",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
      category: "data",
      technologies: ["Python", "Data Processing", "Analytics", "Automation"],
      github: "https://github.com/fivetran-tangyetong/Catalyst",
      live: "#",
      featured: true,
      status: "public",
      icon: Database,
      lastUpdated: "May 2, 2024"
    },
    {
      id: 4,
      title: "RFCom WSS Mobile App",
      description: "React Native application for Android & iOS with WebSocket integration for RFCom WSS protocol communication.",
      longDescription: "Cross-platform mobile application enabling real-time communication through WebSocket protocols. Features secure data transmission, offline capabilities, and enterprise-grade security for business communications.",
      image: "https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg",
      category: "mobile",
      technologies: ["React Native", "Kotlin", "WebSocket", "Cross-platform"],
      github: "https://github.com/fivetran-tangyetong/RFCom_WSS",
      live: "#",
      featured: false,
      status: "private",
      icon: Smartphone,
      lastUpdated: "Sep 14, 2024"
    },
    {
      id: 5,
      title: "PumpFun Bundler",
      description: "Open-source bundler for Pump.Fun platform. Enables token creation and bundling with automated buy operations.",
      longDescription: "Cryptocurrency trading automation tool that streamlines token creation and bundling processes. Features automated trading strategies, risk management, and integration with DeFi protocols.",
      image: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg",
      category: "blockchain",
      technologies: ["TypeScript", "Blockchain", "DeFi", "Automation"],
      github: "https://github.com/fivetran-tangyetong/pumpfun-bundler",
      live: "#",
      featured: false,
      status: "public",
      icon: Code2,
      lastUpdated: "Aug 16, 2024"
    },
    {
      id: 6,
      title: "NUS Cuesports Management",
      description: "Python-based management system for NUS Cuesports club with automated scheduling and member management.",
      longDescription: "Comprehensive club management platform with member registration, tournament scheduling, score tracking, and automated reporting. Includes integration with Google Sheets for data synchronization.",
      image: "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg",
      category: "web",
      technologies: ["Python", "Google Sheets API", "Automation", "Club Management"],
      github: "https://github.com/fivetran-tangyetong/nus_cuesports_sheets",
      live: "#",
      featured: false,
      status: "public",
      icon: Database,
      lastUpdated: "Feb 2, 2024"
    },
    {
      id: 7,
      title: "BLE Jetpack Compose",
      description: "Android Bluetooth Low Energy implementation using Jetpack Compose for modern UI development.",
      longDescription: "Modern Android application demonstrating Bluetooth Low Energy integration with Jetpack Compose UI framework. Features device discovery, connection management, and real-time data transmission.",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
      category: "mobile",
      technologies: ["Kotlin", "Jetpack Compose", "Bluetooth LE", "Android"],
      github: "https://github.com/fivetran-tangyetong/BLE_jetpack",
      live: "#",
      featured: false,
      status: "public",
      icon: Smartphone,
      lastUpdated: "Oct 24, 2023"
    },
    {
      id: 8,
      title: "GovTech URL Shortener",
      description: "Technical assessment project for GovTech 2023. Scalable URL shortening service with analytics.",
      longDescription: "Enterprise-grade URL shortening service built for government applications. Features analytics dashboard, custom domains, access controls, and compliance with government security standards.",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
      category: "web",
      technologies: ["JavaScript", "Node.js", "Database", "Government Tech"],
      github: "https://github.com/fivetran-tangyetong/govtech2023technical",
      live: "#",
      featured: false,
      status: "public",
      icon: Globe,
      lastUpdated: "Feb 22, 2023"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Projects', icon: Code2 },
    { value: 'web', label: 'Web Apps', icon: Globe },
    { value: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { value: 'data', label: 'Data Engineering', icon: Database },
    { value: 'ai', label: 'AI/ML', icon: Database },
    { value: 'blockchain', label: 'Blockchain', icon: Code2 }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-secondary/20">
      <div className="container-width section-padding">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work in data engineering, mobile development, and full-stack applications
            </p>
          </div>

          {/* GitHub Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-background/50 rounded-lg backdrop-blur-sm border">
              <div className="text-2xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg backdrop-blur-sm border">
              <div className="text-2xl font-bold text-primary">16</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg backdrop-blur-sm border">
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Organizations</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg backdrop-blur-sm border">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">Featured Projects</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <Card key={project.id} className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <Badge className={project.status === 'private' ? 'bg-red-500' : 'bg-green-500'}>
                        {project.status}
                      </Badge>
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <project.icon className="h-6 w-6 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{project.title}</span>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">Updated {project.lastUpdated}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{project.longDescription}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3 pt-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      {project.live !== '#' && (
                        <Button size="sm" asChild>
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Projects */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h3 className="text-2xl font-semibold">All Projects</h3>
              
              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-1 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex rounded-md border border-border overflow-hidden">
                  <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Projects Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {filteredProjects.map((project, index) => (
                <Card key={project.id} className={`group hover:shadow-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'md:flex md:items-center' : ''
                } ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                  <div className={`${viewMode === 'list' ? 'md:w-1/3' : ''} aspect-video overflow-hidden relative ${viewMode === 'grid' ? 'rounded-t-lg' : 'md:rounded-l-lg md:rounded-t-none'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={project.status === 'private' ? 'bg-red-500 text-xs' : 'bg-green-500 text-xs'}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <project.icon className="h-5 w-5 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <div className={viewMode === 'list' ? 'md:w-2/3 p-6' : ''}>
                    <CardHeader className={viewMode === 'list' ? 'p-0 pb-4' : ''}>
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="truncate">{project.title}</span>
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">Updated {project.lastUpdated}</p>
                    </CardHeader>
                    <CardContent className={`space-y-3 ${viewMode === 'list' ? 'p-0' : ''}`}>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </a>
                        </Button>
                        {project.live !== '#' && (
                          <Button size="sm" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}