import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Clock, Star, Users, Search, Filter } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  provider: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  price: string;
  category: string;
  description: string;
  skills: string[];
}

const sampleCourses: Course[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    provider: "TechEdu Academy",
    duration: "12 weeks",
    level: "Beginner",
    rating: 4.8,
    students: 15420,
    price: "₹29,999",
    category: "Technology",
    description: "Complete web development course covering HTML, CSS, JavaScript, React, Node.js, and databases.",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Digital Marketing Mastery",
    provider: "Marketing Pro Institute",
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.6,
    students: 8750,
    price: "₹19,999",
    category: "Marketing",
    description: "Learn SEO, social media marketing, Google Ads, content marketing, and analytics.",
    skills: ["SEO", "Social Media", "Google Ads", "Content Marketing", "Analytics"]
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    provider: "DataLearn University",
    duration: "16 weeks",
    level: "Advanced",
    rating: 4.9,
    students: 12300,
    price: "₹49,999",
    category: "Technology",
    description: "Master Python, statistics, machine learning algorithms, and data visualization.",
    skills: ["Python", "Statistics", "Machine Learning", "Pandas", "Scikit-learn"]
  },
  {
    id: 4,
    title: "Graphic Design Fundamentals",
    provider: "Creative Arts School",
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.7,
    students: 6890,
    price: "₹14,999",
    category: "Design",
    description: "Learn Adobe Photoshop, Illustrator, design principles, and create stunning visuals.",
    skills: ["Photoshop", "Illustrator", "Design Theory", "Color Theory", "Typography"]
  },
  {
    id: 5,
    title: "Financial Planning & Analysis",
    provider: "Finance Academy",
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.5,
    students: 4560,
    price: "₹24,999",
    category: "Finance",
    description: "Master financial modeling, investment analysis, and portfolio management.",
    skills: ["Excel", "Financial Modeling", "Investment Analysis", "Risk Management"]
  },
  {
    id: 6,
    title: "Mobile App Development",
    provider: "App Dev Institute",
    duration: "14 weeks",
    level: "Intermediate",
    rating: 4.8,
    students: 9870,
    price: "₹39,999",
    category: "Technology",
    description: "Build iOS and Android apps using React Native and Flutter.",
    skills: ["React Native", "Flutter", "Mobile UI", "API Integration", "App Store"]
  }
];

const CourseRecommendations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState(sampleCourses);

  const categories = ['all', 'Technology', 'Marketing', 'Design', 'Finance'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const handleSearch = () => {
    let filtered = sampleCourses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedCategory, selectedLevel]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Course Recommendations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover courses tailored to your career goals. Learn new skills and advance your professional journey.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-card bg-gradient-card border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses, skills, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="shadow-card hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-card">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {course.category}
                  </Badge>
                  <Badge variant="outline">
                    {course.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  by {course.provider}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{course.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {course.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {course.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                  <Button size="sm" className="shadow-button">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all available courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRecommendations;