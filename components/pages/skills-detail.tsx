'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Code, Database, Globe, Smartphone, Cloud, Palette, Brain, Shield, Award, TrendingUp, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SkillsDetail() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skillCategories = [
    {
      title: "Data Engineering & Analytics",
      icon: Database,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Building scalable data pipelines and analytics solutions",
      skills: [
        { name: "Python", level: 95, experience: "5+ years", projects: 15 },
        { name: "SQL", level: 92, experience: "4+ years", projects: 12 },
        { name: "Data Pipelines", level: 88, experience: "2+ years", projects: 8 },
        { name: "ETL/ELT", level: 85, experience: "2+ years", projects: 6 },
        { name: "Apache Airflow", level: 80, experience: "1+ year", projects: 4 },
        { name: "Pandas/NumPy", level: 90, experience: "3+ years", projects: 10 }
      ]
    },
    {
      title: "Mobile Development", 
      icon: Smartphone,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Native and cross-platform mobile applications",
      skills: [
        { name: "Kotlin", level: 92, experience: "4+ years", projects: 10 },
        { name: "Android", level: 90, experience: "4+ years", projects: 8 },
        { name: "React Native", level: 82, experience: "2+ years", projects: 5 },
        { name: "Bluetooth LE", level: 88, experience: "3+ years", projects: 6 },
        { name: "Jetpack Compose", level: 85, experience: "2+ years", projects: 4 },
        { name: "Material Design", level: 87, experience: "3+ years", projects: 7 }
      ]
    },
    {
      title: "Web Development",
      icon: Globe,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Full-stack web applications and modern frameworks",
      skills: [
        { name: "TypeScript", level: 90, experience: "3+ years", projects: 12 },
        { name: "React/Next.js", level: 88, experience: "3+ years", projects: 10 },
        { name: "Node.js", level: 85, experience: "2+ years", projects: 8 },
        { name: "JavaScript", level: 92, experience: "4+ years", projects: 15 },
        { name: "HTML/CSS", level: 88, experience: "4+ years", projects: 12 },
        { name: "Tailwind CSS", level: 85, experience: "2+ years", projects: 8 }
      ]
    },
    {
      title: "Backend & APIs",
      icon: Code,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "Server-side development and API design",
      skills: [
        { name: "REST APIs", level: 90, experience: "3+ years", projects: 12 },
        { name: "Express.js", level: 85, experience: "2+ years", projects: 8 },
        { name: "WebSocket", level: 80, experience: "2+ years", projects: 5 },
        { name: "Microservices", level: 78, experience: "1+ year", projects: 4 },
        { name: "GraphQL", level: 75, experience: "1+ year", projects: 3 },
        { name: "API Security", level: 82, experience: "2+ years", projects: 6 }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      description: "Cloud infrastructure and deployment automation",
      skills: [
        { name: "AWS", level: 85, experience: "2+ years", projects: 8 },
        { name: "Docker", level: 80, experience: "2+ years", projects: 6 },
        { name: "CI/CD", level: 78, experience: "2+ years", projects: 5 },
        { name: "Kubernetes", level: 70, experience: "1+ year", projects: 3 },
        { name: "GitHub Actions", level: 82, experience: "2+ years", projects: 7 },
        { name: "Vercel/Netlify", level: 85, experience: "2+ years", projects: 8 }
      ]
    },
    {
      title: "Blockchain & Crypto",
      icon: Shield,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "Cryptocurrency and blockchain application development",
      skills: [
        { name: "Bitcoin Development", level: 82, experience: "2+ years", projects: 6 },
        { name: "DeFi Protocols", level: 75, experience: "1+ year", projects: 4 },
        { name: "Smart Contracts", level: 70, experience: "1+ year", projects: 3 },
        { name: "Wallet Integration", level: 85, experience: "2+ years", projects: 5 },
        { name: "BDK-Kotlin", level: 88, experience: "2+ years", projects: 7 },
        { name: "Web3.js", level: 75, experience: "1+ year", projects: 4 }
      ]
    },
    {
      title: "AI/ML & Data Science",
      icon: Brain,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      description: "Machine learning and artificial intelligence",
      skills: [
        { name: "Machine Learning", level: 78, experience: "2+ years", projects: 5 },
        { name: "Neural Networks", level: 75, experience: "1+ year", projects: 4 },
        { name: "Data Analysis", level: 88, experience: "3+ years", projects: 10 },
        { name: "Statistical Modeling", level: 80, experience: "2+ years", projects: 6 },
        { name: "TensorFlow", level: 72, experience: "1+ year", projects: 3 },
        { name: "Scikit-learn", level: 78, experience: "2+ years", projects: 5 }
      ]
    },
    {
      title: "Tools & Design",
      icon: Palette,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      description: "Development tools and design systems",
      skills: [
        { name: "Git/GitHub", level: 95, experience: "5+ years", projects: 20 },
        { name: "Figma", level: 80, experience: "2+ years", projects: 8 },
        { name: "Testing", level: 85, experience: "3+ years", projects: 10 },
        { name: "Agile/Scrum", level: 88, experience: "3+ years", projects: 12 },
        { name: "VS Code", level: 92, experience: "4+ years", projects: 15 },
        { name: "Postman", level: 85, experience: "3+ years", projects: 10 }
      ]
    }
  ];

  const technologies = {
    "Programming Languages": ["Python", "TypeScript", "Kotlin", "JavaScript", "Java", "SQL", "HTML/CSS"],
    "Frameworks & Libraries": ["React", "Next.js", "Express.js", "Android SDK", "React Native", "Jetpack Compose"],
    "Databases": ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Firebase", "Supabase"],
    "Cloud Platforms": ["AWS", "Vercel", "Netlify", "Google Cloud", "Heroku"],
    "Development Tools": ["Git", "Docker", "VS Code", "Android Studio", "Figma", "Postman"],
    "Specialized": ["Bluetooth LE", "BDK-Kotlin", "Bitcoin", "WebSocket", "GraphQL", "Airflow"]
  };

  const professionalHighlights = [
    {
      title: "Fivetran Experience",
      description: "Data pipeline optimization and enterprise analytics",
      icon: Database,
      color: "text-blue-500",
      metrics: { projects: 5, impact: "30% performance improvement" }
    },
    {
      title: "GovTech Projects",
      description: "Government digital services and AWS cloud solutions",
      icon: Cloud,
      color: "text-green-500",
      metrics: { projects: 3, impact: "Citizen-facing applications" }
    },
    {
      title: "Enterprise Mobile Apps",
      description: "Bluetooth LE solutions for hospitality industry",
      icon: Smartphone,
      color: "text-orange-500",
      metrics: { projects: 4, impact: "Pan Pacific Hotel deployment" }
    },
    {
      title: "Open Source Contributor",
      description: "Bitcoin development and community projects",
      icon: Shield,
      color: "text-yellow-500",
      metrics: { projects: 8, impact: "Arctic Code Vault" }
    }
  ];

  const certifications = [
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      status: "In Progress",
      year: "2024"
    },
    {
      name: "Android Developer Certification",
      issuer: "Google",
      status: "Planned",
      year: "2024"
    },
    {
      name: "Data Engineering Certificate",
      issuer: "Coursera",
      status: "Completed",
      year: "2023"
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.title.toLowerCase().includes(selectedCategory));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container-width section-padding relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            <Link href="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Technical Skills & Expertise
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive overview of my technical skills, tools, and technologies used to build 
                scalable data solutions and innovative applications.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">8</div>
                  <div className="text-muted-foreground">Skill Categories</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">40+</div>
                  <div className="text-muted-foreground">Technologies</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">30+</div>
                  <div className="text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Highlights */}
      <section className="py-20">
        <div className="container-width section-padding">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {professionalHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card key={highlight.title} className="hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${highlight.color} bg-secondary/50 group-hover:bg-secondary transition-colors`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold mb-2">{highlight.title}</h4>
                  <p className="text-muted-foreground text-sm mb-3">{highlight.description}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Projects:</span>
                      <span className="font-medium">{highlight.metrics.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impact:</span>
                      <span className="font-medium text-primary">{highlight.metrics.impact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-20 bg-secondary/20">
        <div className="container-width section-padding">
          <h2 className="text-3xl font-bold text-center mb-12">Skill Categories</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="sm"
            >
              All Skills
            </Button>
            {['data', 'mobile', 'web', 'cloud', 'blockchain'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={category.title} className="hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${category.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div>
                      <span className="text-lg">{category.title}</span>
                      <p className="text-sm text-muted-foreground font-normal">{category.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{skill.experience}</span>
                          <span>•</span>
                          <span>{skill.projects} projects</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Proficiency</span>
                          <span className="font-medium">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={isVisible ? skill.level : 0} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies by Category */}
      <section className="py-20">
        <div className="container-width section-padding">
          <h2 className="text-3xl font-bold text-center mb-12">Technologies & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(technologies).map(([category, techs], index) => (
              <Card key={category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>{category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-secondary/20">
        <div className="container-width section-padding">
          <h2 className="text-3xl font-bold text-center mb-12">Certifications & Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Card key={cert.name} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{cert.name}</h4>
                  <p className="text-muted-foreground text-sm mb-2">{cert.issuer}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge 
                      variant={cert.status === 'Completed' ? 'default' : cert.status === 'In Progress' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {cert.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{cert.year}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Philosophy */}
      <section className="py-20">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Learning Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Continuous Learning</h4>
                  <p className="text-muted-foreground text-sm">
                    Staying current with emerging technologies and industry best practices through 
                    hands-on projects and community involvement.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Knowledge Sharing</h4>
                  <p className="text-muted-foreground text-sm">
                    Contributing to open-source projects and writing technical articles to 
                    share knowledge with the developer community.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Problem Solving</h4>
                  <p className="text-muted-foreground text-sm">
                    Applying diverse technical skills to solve complex engineering challenges 
                    across different domains and industries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container-width section-padding text-center">
          <h2 className="text-3xl font-bold mb-6">Let&apos;s Build Something Amazing</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to leverage these skills for your next project? I&apos;m always excited to tackle 
            new challenges and create innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg">
                Discuss a Project
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline">
                View My Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}