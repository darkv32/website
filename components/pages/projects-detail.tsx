'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Filter, Grid, List, Star, GitFork, Database, Smartphone, Globe, Code2, Calendar, Eye, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageLayout } from '@/components/ui/page-layout';
import Link from 'next/link';

export function ProjectsDetail() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "NeuroWeb",
      description: "Advanced neural network web application with TypeScript. Private repository showcasing cutting-edge AI/ML implementations.",
      longDescription: "Comprehensive neural network platform built with modern TypeScript architecture. Features advanced machine learning algorithms, real-time data processing, and interactive visualizations for neural network training and analysis. Includes custom neural network architectures, data preprocessing pipelines, and performance optimization techniques.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      category: "ai",
      technologies: ["TypeScript", "Neural Networks", "Machine Learning", "Web APIs", "TensorFlow.js", "D3.js"],
      github: "https://github.com/fivetran-tangyetong/NeuroWeb",
      live: "#",
      featured: true,
      status: "private",
      icon: Database,
      lastUpdated: "15 hours ago",
      stats: { stars: 0, forks: 0, watchers: 1 },
      complexity: "Advanced",
      impact: "High"
    },
    {
      id: 2,
      title: "Math Tutor",
      description: "Interactive math tutoring application built with Bolt.new. Features personalized learning paths and real-time problem solving.",
      longDescription: "AI-powered math tutoring platform with adaptive learning algorithms, step-by-step problem solving, and personalized curriculum generation. Built using modern web technologies for optimal user experience. Includes progress tracking, difficulty adjustment, and comprehensive analytics.",
      image: "https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg",
      category: "web",
      technologies: ["TypeScript", "AI/ML", "Educational Tech", "Interactive UI", "React", "Node.js"],
      github: "https://github.com/fivetran-tangyetong/math_tutor",
      live: "https://math-tutor-demo.vercel.app",
      featured: true,
      status: "public",
      icon: Code2,
      lastUpdated: "16 hours ago",
      stats: { stars: 2, forks: 0, watchers: 1 },
      complexity: "Intermediate",
      impact: "Medium"
    },
    {
      id: 3,
      title: "Catalyst - MCP A2A Hackathon",
      description: "Hackathon project for MCP A2A challenge. Python-based solution for automated data processing and analysis.",
      longDescription: "Award-winning hackathon project that automates complex data processing workflows. Features real-time analytics, machine learning integration, and scalable architecture for enterprise-level data operations. Includes automated report generation and intelligent data insights.",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
      category: "data",
      technologies: ["Python", "Data Processing", "Analytics", "Automation", "Pandas", "NumPy"],
      github: "https://github.com/fivetran-tangyetong/Catalyst",
      live: "#",
      featured: true,
      status: "public",
      icon: Database,
      lastUpdated: "May 2, 2024",
      stats: { stars: 1, forks: 0, watchers: 1 },
      complexity: "Advanced",
      impact: "High"
    },
    {
      id: 4,
      title: "RFCom WSS Mobile App",
      description: "React Native application for Android & iOS with WebSocket integration for RFCom WSS protocol communication.",
      longDescription: "Cross-platform mobile application enabling real-time communication through WebSocket protocols. Features secure data transmission, offline capabilities, and enterprise-grade security for business communications. Includes push notifications and background sync.",
      image: "https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg",
      category: "mobile",
      technologies: ["React Native", "Kotlin", "WebSocket", "Cross-platform", "Redux", "AsyncStorage"],
      github: "https://github.com/fivetran-tangyetong/RFCom_WSS",
      live: "#",
      featured: false,
      status: "private",
      icon: Smartphone,
      lastUpdated: "Sep 14, 2024",
      stats: { stars: 0, forks: 0, watchers: 1 },
      complexity: "Advanced",
      impact: "High"
    },
    {
      id: 5,
      title: "PumpFun Bundler",
      description: "Open-source bundler for Pump.Fun platform. Enables token creation and bundling with automated buy operations.",
      longDescription: "Cryptocurrency trading automation tool that streamlines token creation and bundling processes. Features automated trading strategies, risk management, and integration with DeFi protocols. Includes real-time market analysis and portfolio optimization.",
      image: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg",
      category: "blockchain",
      technologies: ["TypeScript", "Blockchain", "DeFi", "Automation", "Web3.js", "Solana"],
      github: "https://github.com/fivetran-tangyetong/pumpfun-bundler",
      live: "#",
      featured: false,
      status: "public",
      icon: Code2,
      lastUpdated: "Aug 16, 2024",
      stats: { stars: 5, forks: 2, watchers: 3 },
      complexity: "Advanced",
      impact: "Medium"
    },
    {
      id: 6,
      title: "NUS Cuesports Management",
      description: "Python-based management system for NUS Cuesports club with automated scheduling and member management.",
      longDescription: "Comprehensive club management platform with member registration, tournament scheduling, score tracking, and automated reporting. Includes integration with Google Sheets for data synchronization and email notifications for events.",
      image: "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg",
      category: "web",
      technologies: ["Python", "Google Sheets API", "Automation", "Club Management", "Flask", "SQLite"],
      github: "https://github.com/fivetran-tangyetong/nus_cuesports_sheets",
      live: "#",
      featured: false,
      status: "public",
      icon: Database,
      lastUpdated: "Feb 2, 2024",
      stats: { stars: 2, forks: 0, watchers: 1 },
      complexity: "Intermediate",
      impact: "Medium"
    },
    {
      id: 7,
      title: "BLE Jetpack Compose",
      description: "Android Bluetooth Low Energy implementation using Jetpack Compose for modern UI development.",
      longDescription: "Modern Android application demonstrating Bluetooth Low Energy integration with Jetpack Compose UI framework. Features device discovery, connection management, and real-time data transmission with beautiful, responsive UI components.",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
      category: "mobile",
      technologies: ["Kotlin", "Jetpack Compose", "Bluetooth LE", "Android", "MVVM", "Coroutines"],
      github: "https://github.com/fivetran-tangyetong/BLE_jetpack",
      live: "#",
      featured: false,
      status: "public",
      icon: Smartphone,
      lastUpdated: "Oct 24, 2023",
      stats: { stars: 3, forks: 1, watchers: 2 },
      complexity: "Intermediate",
      impact: "Medium"
    },
    {
      id: 8,
      title: "GovTech URL Shortener",
      description: "Technical assessment project for GovTech 2023. Scalable URL shortening service with analytics.",
      longDescription: "Enterprise-grade URL shortening service built for government applications. Features analytics dashboard, custom domains, access controls, and compliance with government security standards. Includes rate limiting and abuse prevention.",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
      category: "web",
      technologies: ["JavaScript", "Node.js", "Database", "Government Tech", "Express", "MongoDB"],
      github: "https://github.com/fivetran-tangyetong/govtech2023technical",
      live: "#",
      featured: false,
      status: "public",
      icon: Globe,
      lastUpdated: "Feb 22, 2023",
      stats: { stars: 1, forks: 0, watchers: 1 },
      complexity: "Intermediate",
      impact: "Medium"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Projects', icon: Code2, count: projects.length },
    { value: 'web', label: 'Web Apps', icon: Globe, count: projects.filter(p => p.category === 'web').length },
    { value: 'mobile', label: 'Mobile Apps', icon: Smartphone, count: projects.filter(p => p.category === 'mobile').length },
    { value: 'data', label: 'Data Engineering', icon: Database, count: projects.filter(p => p.category === 'data').length },
    { value: 'ai', label: 'AI/ML', icon: Database, count: projects.filter(p => p.category === 'ai').length },
    { value: 'blockchain', label: 'Blockchain', icon: Code2, count: projects.filter(p => p.category === 'blockchain').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);
  const totalStars = projects.reduce((sum, project) => sum + project.stats.stars, 0);
  const totalForks = projects.reduce((sum, project) => sum + project.stats.forks, 0);

  return (
    <PageLayout
      title="Projects Portfolio"
      description="A comprehensive showcase of my work in data engineering, mobile development, blockchain technology, and full-stack applications."
      badge="Portfolio"
      showBackButton
    >
      {/* GitHub Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <Card className="card-enhanced text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{projects.length}</div>
            <div className="text-muted-foreground">Total Projects</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{totalStars}</div>
            <div className="text-muted-foreground">GitHub Stars</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{totalForks}</div>
            <div className="text-muted-foreground">Forks</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{featuredProjects.length}</div>
            <div className="text-muted-foreground">Featured</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="page-section-alt">
        <div className="page-section-content">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={category.value}
                className={`card-enhanced cursor-pointer animate-slide-up ${
                  filter === category.value ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setFilter(category.value)}
              >
                <CardContent className="p-4 text-center">
                  <category.icon className={`h-6 w-6 mx-auto mb-2 ${
                    filter === category.value ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <div className={`font-medium text-sm ${
                    filter === category.value ? 'text-primary' : 'text-foreground'
                  }`}>
                    {category.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {category.count} project{category.count !== 1 ? 's' : ''}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="page-section">
        <div className="page-section-content">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="card-enhanced group overflow-hidden animate-slide-up" 
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <Badge className={project.status === 'private' ? 'bg-red-500' : 'bg-green-500'}>
                      {project.status}
                    </Badge>
                    <Badge className="bg-primary">Featured</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <project.icon className="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-4 text-white text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-4 w-4" />
                        <span>{project.stats.forks}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.stats.watchers}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate group-hover:text-primary transition-colors">{project.title}</span>
                  </CardTitle>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Updated {project.lastUpdated}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">{project.complexity}</Badge>
                      <Badge variant="outline" className="text-xs">{project.impact} Impact</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.longDescription}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="badge-enhanced text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.live !== '#' && (
                      <Button size="sm" className="flex-1" asChild>
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
      </div>

      {/* All Projects */}
      <div className="page-section-alt">
        <div className="page-section-content">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold animate-fade-in" style={{ animationDelay: '0.3s' }}>
              All Projects
            </h2>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {/* Search */}
              <div className="relative">
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-enhanced w-full sm:w-64"
                />
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
              <Card 
                key={project.id} 
                className={`card-enhanced group animate-slide-up ${
                  viewMode === 'list' ? 'md:flex md:items-center' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${viewMode === 'list' ? 'md:w-1/3' : ''} aspect-video overflow-hidden relative ${viewMode === 'grid' ? 'rounded-t-lg' : 'md:rounded-l-lg md:rounded-t-none'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 flex items-center space-x-1">
                    <Badge className={project.status === 'private' ? 'bg-red-500 text-xs' : 'bg-green-500 text-xs'}>
                      {project.status}
                    </Badge>
                    {project.featured && (
                      <Badge className="bg-primary text-xs">Featured</Badge>
                    )}
                  </div>
                  <div className="absolute top-2 right-2">
                    <project.icon className="h-5 w-5 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center space-x-3 text-white text-xs">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-3 w-3" />
                        <span>{project.stats.forks}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={viewMode === 'list' ? 'md:w-2/3 p-6' : ''}>
                  <CardHeader className={viewMode === 'list' ? 'p-0 pb-4' : ''}>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="truncate group-hover:text-primary transition-colors">{project.title}</span>
                    </CardTitle>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Updated {project.lastUpdated}</span>
                      <div className="flex items-center space-x-1">
                        <Badge variant="outline" className="text-xs">{project.complexity}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className={`space-y-3 ${viewMode === 'list' ? 'p-0' : ''}`}>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="badge-enhanced text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="badge-enhanced text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </a>
                      </Button>
                      {project.live !== '#' && (
                        <Button size="sm" className="flex-1" asChild>
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
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground mb-4">No projects found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="page-section">
        <div className="page-section-content text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Interested in Collaboration?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            I&apos;m always open to discussing new projects, creative ideas, and opportunities to 
            create amazing solutions together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Link href="/contact">
              <Button size="lg" className="btn-primary-enhanced">
                Start a Project
              </Button>
            </Link>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/fivetran-tangyetong" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}