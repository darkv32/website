import { GraduationCap, Heart, Target, Users, Code, Database, Smartphone, Award, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/ui/page-layout';
import { generateMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/seo/structured-data';
import { BreadcrumbData } from '@/components/seo/structured-data';
import { generateStructuredData } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'About Tang Yetong - Data Analyst & Developer',
  description: 'Learn about Tang Yetong, a Data Analyst at Fivetran with expertise in data engineering, Android development, and blockchain technology. Discover my journey, skills, and contributions to the tech community.',
  keywords: [
    'About Tang Yetong', 'Data Analyst', 'Fivetran', 'Data Engineering',
    'Android Developer', 'Blockchain', 'Singapore', 'GovTech',
    'NUS Hackers', 'Computer Science', 'Technical Background'
  ],
  url: '/about',
});

export default function AboutPage() {
  const personData = generateStructuredData('person', {});
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ];

  const values = [
    {
      icon: Target,
      title: "Data-Driven Excellence",
      description: "Delivering high-quality data solutions that drive business insights and decision-making.",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Collaborative Innovation",
      description: "Teamwork and cross-functional collaboration to solve complex engineering challenges.",
      color: "text-green-500"
    },
    {
      icon: Heart,
      title: "Continuous Learning",
      description: "Staying current with emerging technologies and contributing to the tech community.",
      color: "text-purple-500"
    }
  ];

  return (
    <>
      <PageLayout
        title="About Me"
        description="Data Analyst at Fivetran with a passion for building scalable solutions and driving innovation through technology."
        badge="About Me"
        showBackButton
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-20 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg rotate-45 animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-60 right-1/3 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full animate-float" style={{ animationDelay: '5s' }}></div>
          
          {/* Gradient Lines */}
          <div className="absolute top-1/3 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20 relative z-10">
          {/* Enhanced Biography */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <div className="p-3 bg-primary/10 rounded-full animate-pulse">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">Hello! I&apos;m Tang Yetong</h3>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div 
                className="p-6 bg-card/95 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-border/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.05] hover:border-primary/70 hover:bg-card/98 animate-slide-in-left"
                style={{ animationDelay: '0.5s' }}
              >
                <p>
                  I&apos;m currently a <span className="text-primary font-semibold">Data Analyst at Fivetran</span>, 
                  where I work on optimizing data pipelines and building analytics solutions for enterprise clients. 
                  My journey in technology spans across data engineering, mobile development, and full-stack web applications.
                </p>
              </div>
              
              <div 
                className="p-6 bg-card/95 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-border/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.05] hover:border-primary/70 hover:bg-card/98 animate-slide-in-left"
                style={{ animationDelay: '0.7s' }}
              >
                <p>
                  With experience at <span className="text-primary font-semibold">GovTech Singapore</span>, 
                  I&apos;ve contributed to government digital transformation initiatives, building citizen-facing applications 
                  and implementing cloud solutions on AWS. My work has directly impacted how citizens interact with 
                  government services.
                </p>
              </div>
              
              <div 
                className="p-6 bg-card/95 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-border/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.05] hover:border-primary/70 hover:bg-card/98 animate-slide-in-left"
                style={{ animationDelay: '0.9s' }}
              >
                <p>
                  I specialize in <span className="text-primary font-semibold">Android development</span> with 
                  Bluetooth Low Energy integration, having built enterprise solutions for the hospitality industry 
                  at RFCOM Technologies. I&apos;m also passionate about blockchain technology, contributing to Bitcoin 
                  development projects and cryptocurrency wallet applications.
                </p>
              </div>
              
              <div 
                className="p-6 bg-card/95 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-border/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.05] hover:border-primary/70 hover:bg-card/98 animate-slide-in-left"
                style={{ animationDelay: '1.1s' }}
              >
                <p>
                  As an active member of the <span className="text-primary font-semibold">NUS Hackers community</span>, 
                  I contribute to open-source projects and help foster Singapore&apos;s vibrant tech ecosystem. 
                  I believe in continuous learning and sharing knowledge with fellow developers.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Education & Expertise */}
          <div className="space-y-8">
            {/* Education */}
            <Card className="card-enhanced-light card-about-light animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl animate-pulse">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3">Education</h4>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors duration-300">
                        <p className="font-semibold text-foreground">National University of Singapore</p>
                        <p className="text-sm">Undergraduate, Computer Science</p>
                        <p className="text-sm text-primary">Jan 2022 - Aug 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Focus */}
            <Card className="card-enhanced-light card-about-light animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-8">
                <h4 className="font-bold text-lg mb-6 flex items-center">
                  <Award className="h-6 w-6 mr-3 text-primary animate-pulse" />
                  Current Focus
                </h4>
                <div className="space-y-4">
                  {[
                    { text: "Data Analytics at Fivetran", color: "green", delay: 0 },
                    { text: "Open Source Contributions", color: "blue", delay: 0.2 },
                    { text: "NUS Hackers Community", color: "purple", delay: 0.4 }
                  ].map((item, index) => (
                    <div 
                      key={item.text}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 animate-slide-in-right ${
                        item.color === 'green' ? 'bg-green-500/10 hover:bg-green-500/20' :
                        item.color === 'blue' ? 'bg-blue-500/10 hover:bg-blue-500/20' :
                        item.color === 'purple' ? 'bg-purple-500/10 hover:bg-purple-500/20' : ''
                      }`}
                      style={{ animationDelay: `${0.7 + item.delay}s` }}
                    >
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'animate-pulse' : ''} ${
                        item.color === 'green' ? 'bg-green-500' :
                        item.color === 'blue' ? 'bg-blue-500' :
                        item.color === 'purple' ? 'bg-purple-500' : ''
                      }`}></div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Expertise Areas */}
        <div className="mb-16 relative z-10">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-3xl font-bold mb-4">Areas of Expertise</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized skills and technologies I&apos;ve mastered across different domains
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Data Engineering",
                description: "Building scalable data pipelines and analytics solutions at Fivetran",
                technologies: ["Python", "SQL", "ETL", "Data Pipelines"],
                color: "text-blue-500",
                bgColor: "bg-blue-500/10"
              },
              {
                icon: Smartphone,
                title: "Mobile Development",
                description: "Android applications with Bluetooth LE and enterprise integrations",
                technologies: ["Kotlin", "Android", "React Native", "BLE"],
                color: "text-green-500",
                bgColor: "bg-green-500/10"
              },
              {
                icon: Code,
                title: "Full Stack Development",
                description: "Web applications and government digital services",
                technologies: ["TypeScript", "React", "Node.js", "AWS"],
                color: "text-purple-500",
                bgColor: "bg-purple-500/10"
              }
            ].map((area, index) => (
              <Card 
                key={area.title} 
                className="card-enhanced-light card-about-light animate-slide-up" 
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-4 ${area.bgColor} rounded-xl`}>
                      <area.icon className={`h-8 w-8 ${area.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">{area.title}</h4>
                      <p className="text-muted-foreground text-sm">{area.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Values Section */}
        <div className="mb-16 relative z-10">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-3xl font-bold mb-4">Core Values</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide my work and professional growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className="card-enhanced-light card-about-light animate-slide-up" 
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`p-4 ${value.color.replace('text-', 'bg-')}/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center`}>
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h4 className="font-bold text-xl mb-4">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageLayout>
      
      {/* Structured Data */}
      <StructuredData data={personData} />
      <BreadcrumbData items={breadcrumbItems} />
    </>
  );
} 