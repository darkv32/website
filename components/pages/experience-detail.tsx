'use client';

import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, Award, Building, Code, Database, Smartphone, ExternalLink, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/page-layout';

export function ExperienceDetail() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const experiences = [
    {
      title: "Data Analyst Intern",
      company: "Fivetran",
      location: "Oakland, California, United States",
      period: "Sep 2024 - Present",
      duration: "11 mos",
      type: "Full-time",
      description: "Working on data pipeline optimization and analytics at a leading data integration platform. Contributing to enterprise-scale data solutions serving thousands of customers.",
      achievements: [
        "Optimized data pipeline performance for enterprise clients, reducing processing time by 30%",
        "Developed analytics dashboards for internal teams using Python and SQL",
        "Contributed to data quality monitoring systems with automated alerting",
        "Collaborated with cross-functional teams on product feature development",
        "Implemented data validation frameworks for improved data integrity"
      ],
      technologies: ["Python", "SQL", "Data Pipelines", "Analytics", "ETL", "PostgreSQL", "Airflow"],
      icon: Database,
      color: "text-blue-500",
      companyInfo: {
        industry: "Data Integration",
        size: "1000+ employees",
        founded: "2012"
      }
    },
    {
      title: "Software Engineer Internship",
      company: "GovTech Singapore",
      location: "Singapore · Hybrid",
      period: "May 2023 - Aug 2023",
      duration: "4 mos",
      type: "Full-time",
      description: "Developed government digital services and applications. Worked on citizen-facing applications and internal government systems with focus on scalability and security.",
      achievements: [
        "Built scalable web applications for government services using React and Node.js",
        "Implemented AWS cloud solutions for high availability and disaster recovery",
        "Collaborated with cross-functional teams on digital transformation initiatives",
        "Developed data analytics solutions using AWS CloudWatch for operational insights",
        "Contributed to user acceptance testing and quality assurance processes"
      ],
      technologies: ["Kotlin", "React.js", "AWS", "CloudWatch", "Node.js", "Government Tech"],
      icon: Building,
      color: "text-green-500",
      companyInfo: {
        industry: "Government Technology",
        size: "3000+ employees",
        founded: "2016"
      }
    },
    {
      title: "Contract Software Engineer",
      company: "RFCOM Technologies Pte. Ltd.",
      location: "Singapore",
      period: "Apr 2022 - Dec 2022",
      duration: "9 mos",
      type: "Part-time",
      description: "Developed Android applications with Bluetooth Low Energy integration for enterprise clients in hospitality industry. Created innovative solutions for hotel management systems.",
      achievements: [
        "Created luggage management system for hotels using Android and Kotlin",
        "Implemented BLE technology for real-time tracking and inventory management",
        "Deployed solutions to Pan Pacific Hotel and other major hospitality clients",
        "Developed custom UI components for enhanced user experience",
        "Maintained 99.9% uptime for production applications"
      ],
      technologies: ["Kotlin", "Android", "Bluetooth LE", "Enterprise", "SQLite", "Material Design"],
      icon: Smartphone,
      color: "text-orange-500",
      companyInfo: {
        industry: "IoT Solutions",
        size: "50+ employees",
        founded: "2015"
      }
    },
    {
      title: "Intern",
      company: "Summer of Bitcoin",
      location: "Singapore",
      period: "Jun 2022 - Aug 2022",
      duration: "3 mos",
      type: "Part-time",
      description: "Contributed to Bitcoin development ecosystem and open-source projects. Worked on cryptocurrency wallet applications and blockchain technology research.",
      achievements: [
        "Contributed to Bitcoin development kit (BDK) with Kotlin bindings",
        "Developed cryptocurrency wallet features using BDK-Kotlin library",
        "Participated in blockchain research and development initiatives",
        "Created technical documentation and tutorials for developer community",
        "Mentored by industry experts in Bitcoin protocol development"
      ],
      technologies: ["Kotlin", "Bitcoin", "Blockchain", "Cryptocurrency", "BDK", "Rust"],
      icon: Code,
      color: "text-yellow-500",
      companyInfo: {
        industry: "Blockchain Education",
        size: "Global Program",
        founded: "2021"
      }
    },
    {
      title: "Software Engineer Intern",
      company: "Travel Prologue Pte Ltd",
      location: "Singapore",
      period: "Jan 2020 - Mar 2020",
      duration: "3 mos",
      type: "Internship",
      description: "Resolved bugs and added features to existing website infrastructure. Assisted in SQL database population and system design for public-facing applications.",
      achievements: [
        "Enhanced website performance and user experience through optimization",
        "Managed SQL database operations with real-world travel data",
        "Designed systems for public-facing travel booking applications",
        "Implemented responsive design improvements for mobile users",
        "Collaborated with design team on UI/UX enhancements"
      ],
      technologies: ["Web Development", "SQL", "Database Management", "JavaScript", "HTML/CSS"],
      icon: Code,
      color: "text-purple-500",
      companyInfo: {
        industry: "Travel Technology",
        size: "20+ employees",
        founded: "2018"
      }
    }
  ];

  const achievements = [
    {
      title: "Arctic Code Vault Contributor",
      organization: "GitHub",
      year: "2024",
      icon: Award,
      description: "Code preserved in the Arctic Code Vault for future generations",
      details: "Contributed to open-source projects that were selected for long-term preservation"
    },
    {
      title: "NUS Hackers Committee Member",
      organization: "National University of Singapore",
      year: "2022 - Present",
      icon: Award,
      description: "Active contributor to university tech community and events",
      details: "Organizing hackathons, workshops, and tech talks for the student community"
    },
    {
      title: "Multiple GitHub Achievements",
      organization: "GitHub",
      year: "2024",
      icon: Award,
      description: "Pair Extraordinaire, YOLO, Quickdraw, Pull Shark",
      details: "Recognition for collaborative coding and open-source contributions"
    },
    {
      title: "Bitcoin Development Contributor",
      organization: "Summer of Bitcoin",
      year: "2022",
      icon: Award,
      description: "Contributed to Bitcoin ecosystem development",
      details: "Developed wallet applications and educational resources for Bitcoin community"
    }
  ];

  const organizations = [
    { name: "NUS Hackers", role: "Committee Member", period: "2022 - Present" },
    { name: "Fivetran", role: "Data Analyst Intern", period: "2024 - Present" },
    { name: "AppVenture NUSH", role: "Contributor", period: "2023" },
    { name: "NUS CS2103 AY2324S2", role: "Student", period: "2024" },
    { name: "AY2324S2-CS2103T-W12-3", role: "Team Member", period: "2024" }
  ];

  const skills = {
    "Data Engineering": ["Python", "SQL", "ETL/ELT", "Data Pipelines", "Analytics"],
    "Mobile Development": ["Kotlin", "Android", "React Native", "Bluetooth LE"],
    "Web Development": ["TypeScript", "React", "Node.js", "JavaScript"],
    "Cloud & DevOps": ["AWS", "CloudWatch", "Docker", "CI/CD"],
    "Blockchain": ["Bitcoin", "BDK-Kotlin", "Cryptocurrency", "Wallet Development"]
  };

  return (
    <PageLayout
      title="Professional Experience"
      description="My journey through data engineering, software development, and technology innovation across leading companies and organizations."
      badge="Experience"
      showBackButton
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <Card className="card-enhanced text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">5</div>
            <div className="text-muted-foreground">Companies</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-muted-foreground">Organizations</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">4</div>
            <div className="text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Experience Timeline */}
      <div className="page-section">
        <div className="page-section-content">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-center mb-16 animate-slide-up ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`} style={{ animationDelay: `${index * 200}ms` }}>
                {/* Timeline Dot with Icon */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-16 h-16 bg-background border-4 border-primary rounded-full z-10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <exp.icon className={`h-7 w-7 ${exp.color}`} />
                </div>

                {/* Content */}
                <div className={`ml-24 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <Card className="card-enhanced border-l-4 border-l-primary group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{exp.title}</h3>
                          <p className="text-primary font-semibold text-lg">{exp.company}</p>
                          <div className="text-muted-foreground text-sm mt-1">
                            {exp.companyInfo.industry} • {exp.companyInfo.size} • Founded {exp.companyInfo.founded}
                          </div>
                        </div>
                        <Badge variant="secondary" className="badge-enhanced shrink-0">{exp.type}</Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">({exp.duration})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                      {/* Key Achievements */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-primary" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start space-x-2 animate-fade-in" style={{ animationDelay: `${(index * 200) + (i * 50)}ms` }}>
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                              <span className="text-muted-foreground text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge 
                              key={tech} 
                              variant="outline" 
                              className="badge-enhanced text-xs"
                              style={{ animationDelay: `${(index * 200) + (techIndex * 30)}ms` }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="page-section-alt">
        <div className="page-section-content">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Education
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="card-enhanced border-l-4 border-l-primary animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6 group">
                  <div className="p-4 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Building className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">National University of Singapore</h3>
                    <p className="text-primary font-semibold text-lg mb-2">Undergraduate, Computer Science</p>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Jan 2022 - Aug 2026</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Singapore</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Pursuing Computer Science degree with focus on software engineering, data structures, 
                      algorithms, and system design. Active member of NUS Hackers community.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Computer Science", "Software Engineering", "Data Structures", "Algorithms", "System Design"].map((subject, index) => (
                        <Badge 
                          key={subject} 
                          variant="outline" 
                          className="badge-enhanced text-xs"
                          style={{ animationDelay: `${0.5 + (index * 50)}ms` }}
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="page-section">
        <div className="page-section-content">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Core Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card 
                key={category} 
                className="card-enhanced animate-slide-up" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="badge-enhanced text-xs"
                        style={{ animationDelay: `${(index * 150) + (skillIndex * 30)}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Button size="lg" className="btn-primary-enhanced">
              View Complete Skills
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Organizations */}
      <div className="page-section-alt">
        <div className="page-section-content">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Organizations & Communities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {organizations.map((org, index) => (
              <Card 
                key={org.name} 
                className="card-enhanced text-center animate-slide-up" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 group">
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{org.name}</h4>
                  <p className="text-muted-foreground text-sm mb-1">{org.role}</p>
                  <p className="text-primary text-xs">{org.period}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="page-section">
        <div className="page-section-content">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Achievements & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card 
                key={index} 
                className="card-enhanced animate-slide-up" 
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 group">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{achievement.title}</h4>
                      <p className="text-muted-foreground text-sm mb-1">{achievement.organization}</p>
                      <p className="text-primary text-sm font-medium mb-3">{achievement.year}</p>
                      <p className="text-muted-foreground text-sm mb-2">{achievement.description}</p>
                      <p className="text-muted-foreground text-xs">{achievement.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="page-section">
        <div className="page-section-content text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Ready to Collaborate?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            I&apos;m always interested in discussing new opportunities in data engineering, 
            mobile development, and innovative technology projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Button size="lg" className="btn-primary-enhanced">
              Get In Touch
            </Button>
            <Button size="lg" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}