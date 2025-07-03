import { GraduationCap, Heart, Target, Users, Code, Database, Smartphone, Award, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/ui/page-layout';

export default function AboutPage() {
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
    <PageLayout
      title="About Me"
      description="Data Analyst at Fivetran with a passion for building scalable solutions and driving innovation through technology."
      badge="About Me"
      showBackButton
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
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
              className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 animate-slide-in-left"
              style={{ animationDelay: '0.5s' }}
            >
              <p>
                I&apos;m currently a <span className="text-primary font-semibold">Data Analyst at Fivetran</span>, 
                where I work on optimizing data pipelines and building analytics solutions for enterprise clients. 
                My journey in technology spans across data engineering, mobile development, and full-stack web applications.
              </p>
            </div>
            
            <div 
              className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 animate-slide-in-left"
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
              className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 animate-slide-in-left"
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
              className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 animate-slide-in-left"
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
          <Card className="card-enhanced animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
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
          <Card className="card-enhanced animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
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
                    className={`flex items-center space-x-3 p-3 bg-${item.color}-500/10 rounded-lg hover:bg-${item.color}-500/20 transition-all duration-300 hover:scale-105 animate-slide-in-right`}
                    style={{ animationDelay: `${0.7 + item.delay}s` }}
                  >
                    <div className={`w-3 h-3 bg-${item.color}-500 rounded-full ${index === 0 ? 'animate-pulse' : ''}`}></div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GitHub Achievements */}
          <Card className="card-enhanced animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
            <CardContent className="p-8">
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-primary animate-pulse" />
                GitHub Achievements
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Arctic Code Vault', 'Pair Extraordinaire', 'YOLO', 'Quickdraw', 'Pull Shark'].map((achievement, index) => (
                  <Badge 
                    key={achievement} 
                    variant="secondary" 
                    className="badge-enhanced text-xs animate-fade-in"
                    style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                  >
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Expertise Areas */}
      <div className="mb-16">
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
              className="card-enhanced animate-slide-up" 
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 group">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`p-4 rounded-xl ${area.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <area.icon className={`h-8 w-8 ${area.color} group-hover:animate-pulse`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">{area.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {area.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="badge-enhanced text-xs"
                      style={{ animationDelay: `${(index * 200) + (techIndex * 50)}ms` }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enhanced Core Values */}
      <div>
        <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-3xl font-bold mb-4">Core Values</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide my work and drive my passion for technology
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card 
              key={value.title} 
              className="card-enhanced animate-slide-up" 
              style={{ animationDelay: `${(index + 3) * 200}ms` }}
            >
              <CardContent className="p-8 text-center group">
                <div className={`p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6 ${value.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse`}>
                  <value.icon className="h-10 w-10" />
                </div>
                <h4 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
} 