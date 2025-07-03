import { Mail, MapPin, Clock, Send, Github, Linkedin, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <section className="py-24">
        <div className="container-width section-padding relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Contact</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in data engineering, mobile development, or collaboration opportunities? I&apos;d love to hear from you.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Send a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                      <Input id="name" name="name" required placeholder="Your full name" className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                      <Input id="email" name="email" type="email" required placeholder="your.email@example.com" className="w-full" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
                    <Input id="subject" name="subject" required placeholder="What&apos;s this about?" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea id="message" name="message" required placeholder="Tell me about your project, opportunity, or question..." rows={5} className="w-full resize-none" />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </div>
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-8">
              <Card className="backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <span className="font-semibold">tangyetong@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Singapore</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                    <span className="font-semibold">SGT (UTC+8)</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Github className="h-6 w-6 text-primary" />
                    <a href="https://github.com/fivetran-tangyetong" target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold">GitHub</a>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Linkedin className="h-6 w-6 text-primary" />
                    <a href="https://www.linkedin.com/in/tang-yetong/" target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold">LinkedIn</a>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                    <a href="https://darkvoid32.github.io/" target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold">Personal Blog</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 