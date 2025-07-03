'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Database, Code2, Smartphone, Star, GitFork } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturedProjects() {
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

  const featuredProjects = [
    {
      id: 1,
      title: "NeuroWeb",
      description: "Advanced neural network web application with TypeScript showcasing cutting-edge AI/ML implementations.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      category: "ai",
      technologies: ["TypeScript", "Neural Networks", "Machine Learning", "Web APIs"],
      github: "https://github.com/fivetran-tangyetong/NeuroWeb",
      live: "#",
      status: "private",
      icon: Database,
      stats: { stars: 0, forks: 0 }
    },
    {
      id: 2,
      title: "Math Tutor",
      description: "Interactive math tutoring application with personalized learning paths and real-time problem solving.",
      image: "https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg",
      category: "web",
      technologies: ["TypeScript", "AI/ML", "Educational Tech", "Interactive UI"],
      github: "https://github.com/fivetran-tangyetong/math_tutor",
      live: "https://math-tutor-demo.vercel.app",
      status: "public",
      icon: Code2,
      stats: { stars: 2, forks: 0 }
    },
    {
      id: 3,
      title: "Catalyst - MCP A2A Hackathon",
      description: "Award-winning hackathon project for automated data processing and analysis with enterprise-scale solutions.",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
      category: "data",
      technologies: ["Python", "Data Processing", "Analytics", "Automation"],
      github: "https://github.com/fivetran-tangyetong/Catalyst",
      live: "#",
      status: "public",
      icon: Database,
      stats: { stars: 1, forks: 0 }
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-secondary/20">
      <div className="container-width section-padding">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcase of innovative solutions in data engineering, AI/ML, and full-stack development
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <Card key={project.id} className={`group hover:shadow-2xl transition-all duration-500 overflow-hidden ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 200}ms` }}>
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
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
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
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Explore my complete portfolio including mobile apps, blockchain projects, and more
            </p>
            <Link href="/projects">
              <Button size="lg">
                View All Projects
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}