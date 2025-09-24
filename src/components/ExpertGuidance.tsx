import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageCircle, 
  Calendar, 
  Star, 
  Clock, 
  Users, 
  Award, 
  BookOpen, 
  Send,
  CheckCircle
} from 'lucide-react';

interface Expert {
  id: number;
  name: string;
  title: string;
  specialization: string[];
  experience: string;
  rating: number;
  sessions: number;
  hourlyRate: string;
  avatar: string;
  bio: string;
  availability: string;
}

const experts: Expert[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Senior Career Counselor",
    specialization: ["Engineering", "Technology", "Data Science"],
    experience: "12 years",
    rating: 4.9,
    sessions: 2150,
    hourlyRate: "₹2,000",
    avatar: "/placeholder.svg",
    bio: "Former Google engineer turned career counselor. Specialized in tech career transitions and skill development.",
    availability: "Mon-Fri, 10 AM - 6 PM"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    title: "Business Strategy Mentor",
    specialization: ["Business", "Management", "Entrepreneurship"],
    experience: "15 years",
    rating: 4.8,
    sessions: 1890,
    hourlyRate: "₹2,500",
    avatar: "/placeholder.svg",
    bio: "Ex-McKinsey consultant with experience in business strategy and startup mentorship.",
    availability: "Mon-Sat, 2 PM - 8 PM"
  },
  {
    id: 3,
    name: "Dr. Anjali Mehta",
    title: "Education Specialist",
    specialization: ["Academic Planning", "Study Abroad", "Scholarships"],
    experience: "10 years",
    rating: 4.9,
    sessions: 1650,
    hourlyRate: "₹1,800",
    avatar: "/placeholder.svg",
    bio: "Former university admissions officer with expertise in international education and scholarship guidance.",
    availability: "Tue-Sat, 11 AM - 7 PM"
  },
  {
    id: 4,
    name: "Vikram Singh",
    title: "Creative Industry Mentor",
    specialization: ["Design", "Media", "Arts", "Marketing"],
    experience: "8 years",
    rating: 4.7,
    sessions: 980,
    hourlyRate: "₹1,500",
    avatar: "/placeholder.svg",
    bio: "Creative director with experience in advertising, design, and digital media industries.",
    availability: "Mon-Fri, 1 PM - 9 PM"
  }
];

const ExpertGuidance: React.FC = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    preferredTime: ''
  });

  const specializations = ['all', 'Engineering', 'Technology', 'Business', 'Design', 'Education'];

  const filteredExperts = selectedSpecialization === 'all' 
    ? experts 
    : experts.filter(expert => 
        expert.specialization.some(spec => 
          spec.toLowerCase().includes(selectedSpecialization.toLowerCase())
        )
      );

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation request:', consultationForm);
    // Handle form submission
    alert('Your consultation request has been submitted! We will contact you within 24 hours.');
    setConsultationForm({
      name: '',
      email: '',
      phone: '',
      topic: '',
      message: '',
      preferredTime: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Expert Guidance & Mentorship
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized advice from industry experts and experienced mentors to accelerate your career journey.
          </p>
        </div>

        <Tabs defaultValue="experts" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="experts">Find Experts</TabsTrigger>
            <TabsTrigger value="consultation">Book Consultation</TabsTrigger>
            <TabsTrigger value="resources">Free Resources</TabsTrigger>
          </TabsList>

          {/* Experts Tab */}
          <TabsContent value="experts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Available Experts</h2>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map(spec => (
                    <SelectItem key={spec} value={spec}>
                      {spec === 'all' ? 'All Specializations' : spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredExperts.map((expert) => (
                <Card key={expert.id} className="shadow-card hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-card">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={expert.avatar} alt={expert.name} />
                        <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{expert.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {expert.title}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current text-yellow-500" />
                            <span className="text-sm">{expert.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{expert.sessions} sessions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{expert.experience} exp</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{expert.bio}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {expert.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{expert.availability}</span>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {expert.hourlyRate}/hour
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button size="sm" className="flex-1 shadow-button">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Session
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Consultation Tab */}
          <TabsContent value="consultation" className="space-y-6">
            <Card className="max-w-2xl mx-auto shadow-card bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Book a Free Consultation</CardTitle>
                <CardDescription className="text-center">
                  Get 30 minutes of free career guidance from our experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleConsultationSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input
                        placeholder="Enter your full name"
                        value={consultationForm.name}
                        onChange={(e) => setConsultationForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={consultationForm.email}
                        onChange={(e) => setConsultationForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input
                        placeholder="Enter your phone number"
                        value={consultationForm.phone}
                        onChange={(e) => setConsultationForm(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Consultation Topic</label>
                      <Select 
                        value={consultationForm.topic}
                        onValueChange={(value) => setConsultationForm(prev => ({ ...prev, topic: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="career-change">Career Change</SelectItem>
                          <SelectItem value="skill-development">Skill Development</SelectItem>
                          <SelectItem value="education-planning">Education Planning</SelectItem>
                          <SelectItem value="job-search">Job Search Strategy</SelectItem>
                          <SelectItem value="interview-prep">Interview Preparation</SelectItem>
                          <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Time</label>
                    <Input
                      placeholder="e.g., Weekdays 2-5 PM or Weekend mornings"
                      value={consultationForm.preferredTime}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      placeholder="Tell us about your current situation and what you'd like guidance on..."
                      value={consultationForm.message}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full shadow-button">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Consultation Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Free Career Resources</h2>
              <p className="text-muted-foreground">
                Access our collection of free guides, templates, and tools to boost your career.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Resume Templates",
                  description: "Professional resume templates for different industries",
                  icon: BookOpen,
                  downloads: "15,420"
                },
                {
                  title: "Interview Guide",
                  description: "Complete guide with common questions and best practices",
                  icon: MessageCircle,
                  downloads: "12,890"
                },
                {
                  title: "Salary Negotiation",
                  description: "Learn how to negotiate better compensation packages",
                  icon: Award,
                  downloads: "8,760"
                },
                {
                  title: "Career Planning Workbook",
                  description: "Step-by-step workbook for planning your career journey",
                  icon: Calendar,
                  downloads: "9,340"
                },
                {
                  title: "Networking Templates",
                  description: "Email templates and scripts for professional networking",
                  icon: Users,
                  downloads: "6,750"
                },
                {
                  title: "Skills Assessment Tool",
                  description: "Identify your strengths and areas for improvement",
                  icon: CheckCircle,
                  downloads: "11,230"
                }
              ].map((resource, index) => (
                <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-card">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
                      <resource.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <CardDescription>{resource.description}</CardDescription>
                    <p className="text-sm text-muted-foreground">
                      {resource.downloads} downloads
                    </p>
                    <Button size="sm" className="w-full shadow-button">
                      Download Free
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExpertGuidance;