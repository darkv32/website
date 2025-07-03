import { Mail, MapPin, Clock, Send, Github, Linkedin, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageLayout } from '@/components/ui/page-layout';

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact"
      description="Interested in data engineering, mobile development, or collaboration opportunities? I'd love to hear from you."
      badge="Get In Touch"
      showBackButton
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="card-enhanced animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-primary" />
              <span>Send a Message</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                  <Input 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Your full name" 
                    className="input-enhanced" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="your.email@example.com" 
                    className="input-enhanced" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
                <Input 
                  id="subject" 
                  name="subject" 
                  required 
                  placeholder="What's this about?" 
                  className="input-enhanced" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  required 
                  placeholder="Tell me about your project, opportunity, or question..." 
                  rows={5} 
                  className="textarea-enhanced" 
                />
              </div>
              <Button type="submit" className="btn-primary-enhanced w-full" size="lg">
                <div className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Personal Info */}
          <Card className="card-enhanced animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-colors duration-300">
                  <Mail className="h-6 w-6 text-primary" />
                  <span className="font-semibold">tangyetong@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span className="font-semibold">Singapore</span>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-colors duration-300">
                  <Clock className="h-6 w-6 text-primary" />
                  <span className="font-semibold">SGT (UTC+8)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="card-enhanced animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
            <CardContent className="p-8">
              <h4 className="font-bold text-lg mb-6">Connect With Me</h4>
              <div className="space-y-4">
                <a 
                  href="https://github.com/fivetran-tangyetong" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Github className="h-6 w-6 text-primary group-hover:animate-pulse" />
                  <span className="font-semibold group-hover:text-primary transition-colors">GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/tang-yetong/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Linkedin className="h-6 w-6 text-primary group-hover:animate-pulse" />
                  <span className="font-semibold group-hover:text-primary transition-colors">LinkedIn</span>
                </a>
                <a 
                  href="https://darkvoid32.github.io/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-4 p-3 hover:bg-secondary/20 rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Globe className="h-6 w-6 text-primary group-hover:animate-pulse" />
                  <span className="font-semibold group-hover:text-primary transition-colors">Personal Blog</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="card-enhanced animate-slide-in-right" style={{ animationDelay: '0.9s' }}>
            <CardContent className="p-8 text-center">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">Response Time</h4>
              <p className="text-muted-foreground text-sm">
                I typically respond within 24 hours during business days. 
                For urgent matters, please mention it in your message.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
} 