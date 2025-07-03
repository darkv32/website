import { GraduationCap, Heart, Target, Users, Code, Database, Smartphone, Award, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      <section className="py-24">
        <div className="container-width section-padding relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <Badge variant="outline" className="text-sm">About Me</Badge>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Data Analyst at Fivetran with a passion for building scalable solutions and driving innovation through technology.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">Hello! I&apos;m Tang Yetong</h3>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                  <p>
                    I&apos;m currently a <span className="text-primary font-semibold">Data Analyst at Fivetran</span>, optimizing data pipelines and building analytics solutions for enterprise clients. My journey in technology spans data engineering, mobile development, and full-stack web applications.
                  </p>
                </div>
                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                  <p>
                    With experience at <span className="text-primary font-semibold">GovTech Singapore</span>, I&apos;ve contributed to government digital transformation initiatives, building citizen-facing applications and implementing cloud solutions on AWS.
                  </p>
                </div>
                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                  <p>
                    I specialize in <span className="text-primary font-semibold">Android development</span> with Bluetooth Low Energy integration, having built enterprise solutions for the hospitality industry at RFCOM Technologies. I&apos;m also passionate about blockchain technology, contributing to Bitcoin development projects and cryptocurrency wallet applications.
                  </p>
                </div>
                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                  <p>
                    As an active member of the <span className="text-primary font-semibold">NUS Hackers community</span>, I contribute to open-source projects and help foster Singapore&apos;s vibrant tech ecosystem. I believe in continuous learning and sharing knowledge with fellow developers.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <Card className="backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3">Education</h4>
                      <div className="space-y-3 text-muted-foreground">
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <p className="font-semibold text-foreground">National University of Singapore</p>
                          <p className="text-sm">Undergraduate, Computer Science</p>
                          <p className="text-sm text-primary">Jan 2022 - Aug 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <h4 className="font-bold text-lg mb-6 flex items-center">
                    <Award className="h-6 w-6 mr-3 text-primary" />
                    Current Focus
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Data Analytics at Fivetran</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Open Source Contributions</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">NUS Hackers Community</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {values.map((value) => (
              <Card key={value.title} className="text-center hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${value.color} bg-secondary/50 group-hover:bg-secondary transition-colors`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-3">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 