import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

export interface ProjectCardProps {
  project: {
    id?: string | number;
    title: string;
    description: string;
    image?: string;
    category?: string;
    technologies: string[];
    github?: string;
    live?: string;
    status?: string;
    icon?: React.ElementType;
    stats?: { stars: number; forks: number };
  };
  animationDelay?: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  animationDelay = '0ms',
  className = '',
}) => {
  const Icon = project.icon;
  return (
    <Card
      className={`group hover:shadow-2xl transition-all duration-500 overflow-hidden ${className}`}
      style={{ animationDelay }}
    >
      {project.image && (
        <div className="aspect-video overflow-hidden relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            {project.status && (
              <Badge className={project.status === 'private' ? 'bg-red-500' : 'bg-green-500'}>
                {project.status}
              </Badge>
            )}
            <Badge className="bg-primary">Featured</Badge>
          </div>
          {Icon && (
            <div className="absolute top-4 right-4">
              <Icon className="h-6 w-6 text-white drop-shadow-lg" />
            </div>
          )}
          {project.stats && (
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
          )}
        </div>
      )}
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
          {project.github && (
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {project.live && project.live !== '#' && (
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
  );
}; 