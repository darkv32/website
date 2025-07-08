import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface ContactCardProps {
  contact: {
    icon?: React.ElementType;
    title?: string;
    name?: string;
    value?: string;
    href?: string;
    description?: string;
    color?: string;
  };
  animationDelay?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  animationDelay = '0ms',
  className = '',
  children,
}) => {
  const Icon = contact.icon;
  return (
    <Card className={`card-enhanced-light card-contact-light shadow-md ${className}`} style={{ animationDelay }}>
      <CardContent className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group">
        {Icon && (
          <div className={`p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors ${contact.color}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="flex-1">
          {contact.title && <div className="font-medium">{contact.title}</div>}
          {contact.name && <div className="font-medium">{contact.name}</div>}
          {contact.value && <div className="text-muted-foreground text-sm">{contact.value}</div>}
          {contact.description && <div className="text-muted-foreground text-xs">{contact.description}</div>}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}; 