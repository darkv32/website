import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export interface AboutCardProps {
  about: {
    icon?: React.ElementType;
    title: string;
    description: string;
    color?: string;
    bgColor?: string;
  };
  animationDelay?: string;
  className?: string;
  children?: React.ReactNode;
}

export const AboutCard: React.FC<AboutCardProps> = ({
  about,
  animationDelay = '0ms',
  className = '',
  children,
}) => {
  const Icon = about.icon;
  return (
    <Card
      className={`card-enhanced-light card-about-light animate-slide-up ${className}`}
      style={{ animationDelay }}
    >
      <CardContent className="p-8 text-center group">
        {Icon && (
          <div className={`p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6 ${about.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse`}>
            <Icon className="h-10 w-10" />
          </div>
        )}
        <h4 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">{about.title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{about.description}</p>
        {children}
      </CardContent>
    </Card>
  );
}; 