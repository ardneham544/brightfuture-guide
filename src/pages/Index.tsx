import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Brain, MapPin, Users, CheckCircle, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-career-guidance.jpg';

interface IndexProps {
  onNavigate: (section: string) => void;
}

const Index: React.FC<IndexProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Brain,
      title: "Smart Career Assessment",
      description: "Take our comprehensive aptitude test to discover careers that match your skills and interests.",
      action: "quiz"
    },
    {
      icon: BookOpen,
      title: "Course Recommendations", 
      description: "Get personalized course suggestions based on your career goals and academic background.",
      action: "courses"
    },
    {
      icon: MapPin,
      title: "College Directory",
      description: "Explore colleges and universities with detailed information about programs and admission requirements.",
      action: "colleges"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Connect with career counselors and mentors for personalized advice and support.",
      action: "guidance"
    }
  ];

  const benefits = [
    "Personalized career recommendations",
    "Comprehensive college database",
    "Multilingual support",
    "Offline accessibility",
    "Government-verified information",
    "Regular updates and notifications"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Future Starts with the
                <span className="text-accent"> Right Guidance</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
                Discover your perfect career path with personalized assessments, course recommendations, and comprehensive college information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="shadow-button hover:shadow-elevated transition-all duration-300"
                  onClick={() => onNavigate('quiz')}
                >
                  Start Career Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => onNavigate('colleges')}
                >
                  Explore Colleges
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src={heroImage} 
                alt="Students exploring career opportunities" 
                className="rounded-2xl shadow-elevated"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-foreground">
              Everything You Need for Career Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and information you need to make informed decisions about your education and career.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-card cursor-pointer group"
                onClick={() => onNavigate(feature.action)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We're committed to making quality career guidance accessible to everyone, regardless of location or background.
              </p>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-accent rounded-2xl p-8 shadow-elevated">
              <h3 className="text-2xl font-bold mb-4 text-accent-foreground">
                Ready to Get Started?
              </h3>
              <p className="text-accent-foreground/80 mb-6">
                Join thousands of students who have already discovered their ideal career path with our platform.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full shadow-button"
                onClick={() => onNavigate('quiz')}
              >
                Begin Your Journey Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
            Transform Your Future Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't let uncertainty hold you back. Start your personalized career journey with expert guidance and comprehensive resources.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="shadow-button hover:shadow-elevated transition-all duration-300"
            onClick={() => onNavigate('quiz')}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;