import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Award } from 'lucide-react';

export interface ExperienceCardProps {
  experience: {
    title: string;
    company: string;
    location: string;
    period: string;
    duration?: string;
    type: string;
    description: string;
    achievements: string[];
    technologies: string[];
    icon?: React.ElementType;
    color?: string;
    featured?: boolean;
    companyInfo?: {
      industry?: string;
      size?: string;
      founded?: string;
    };
  };
  animationDelay?: string;
  className?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  animationDelay = '0ms',
  className = '',
}) => {
  const Icon = experience.icon;
  return (
    <Card
      className={`group hover:shadow-3xl hover:scale-105 transition-all duration-300 border-l-4 border-l-primary border-2 border-primary/40 shadow-lg ${className}`}
      style={{ animationDelay }}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Icon className={`h-6 w-6 ${experience.color || ''}`} />
              </div>
            )}
            <div>
              <h3 className="font-bold group-hover:text-primary transition-colors">{experience.title}</h3>
              <p className="text-primary font-medium">{experience.company}</p>
              {experience.companyInfo && (
                <div className="text-muted-foreground text-xs mt-1">
                  {experience.companyInfo.industry} • {experience.companyInfo.size} • Founded {experience.companyInfo.founded}
                </div>
              )}
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0">{experience.type}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{experience.period}</span>
          </div>
          {experience.duration && (
            <div className="flex items-center space-x-1">
              <span className="font-medium">({experience.duration})</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{experience.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">{experience.description}</p>
        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 flex items-center text-sm">
              <Award className="h-4 w-4 mr-1 text-primary" />
              Key Achievements
            </h4>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                  <span className="text-muted-foreground text-xs">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap gap-1">
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 