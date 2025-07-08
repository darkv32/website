import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export interface SkillCardProps {
  skillCategory: {
    title: string;
    icon?: React.ElementType;
    color?: string;
    bgColor?: string;
    description?: string;
    topSkills: { name: string; level: number }[];
  };
  animationDelay?: string;
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skillCategory,
  animationDelay = '0ms',
  className = '',
}) => {
  const Icon = skillCategory.icon;
  return (
    <Card
      className={`hover:shadow-xl transition-all duration-300 group ${className}`}
      style={{ animationDelay }}
    >
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          {Icon && (
            <div className={`p-3 rounded-lg ${skillCategory.bgColor} group-hover:scale-110 transition-transform`}>
              <Icon className={`h-6 w-6 ${skillCategory.color}`} />
            </div>
          )}
          <div>
            <span className="text-lg">{skillCategory.title}</span>
            {skillCategory.description && (
              <p className="text-sm text-muted-foreground font-normal">{skillCategory.description}</p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillCategory.topSkills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <Progress value={skill.level} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}; 