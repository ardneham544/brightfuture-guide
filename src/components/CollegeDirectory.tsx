import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, Star, Phone, Globe, ArrowRight } from 'lucide-react';

interface College {
  id: number;
  name: string;
  location: string;
  type: string;
  rating: number;
  studentsCount: string;
  programs: string[];
  fees: string;
  contact: string;
  website: string;
  established: number;
  accreditation: string;
}

const sampleColleges: College[] = [
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    type: "Public",
    rating: 4.8,
    studentsCount: "8,000+",
    programs: ["Engineering", "Computer Science", "Mathematics", "Physics"],
    fees: "₹2,50,000/year",
    contact: "+91-11-2659-1020",
    website: "iitd.ac.in",
    established: 1961,
    accreditation: "NAAC A++"
  },
  {
    id: 2,
    name: "All India Institute of Medical Sciences",
    location: "New Delhi, Delhi",
    type: "Public",
    rating: 4.9,
    studentsCount: "3,000+",
    programs: ["Medicine", "Nursing", "Dental", "Pharmacy"],
    fees: "₹1,50,000/year",
    contact: "+91-11-2659-3333",
    website: "aiims.edu",
    established: 1956,
    accreditation: "NAAC A++"
  },
  {
    id: 3,
    name: "Lady Shri Ram College for Women",
    location: "New Delhi, Delhi",
    type: "Public",
    rating: 4.6,
    studentsCount: "2,500+",
    programs: ["Arts", "Commerce", "Science", "Psychology"],
    fees: "₹45,000/year",
    contact: "+91-11-2433-2275",
    website: "lsr.edu.in",
    established: 1956,
    accreditation: "NAAC A+"
  },
  {
    id: 4,
    name: "National Institute of Design",
    location: "Ahmedabad, Gujarat",
    type: "Public",
    rating: 4.5,
    studentsCount: "1,200+",
    programs: ["Design", "Animation", "Fashion", "Industrial Design"],
    fees: "₹3,50,000/year",
    contact: "+91-79-2662-3692",
    website: "nid.edu",
    established: 1961,
    accreditation: "NAAC A"
  },
  {
    id: 5,
    name: "Indian School of Business",
    location: "Hyderabad, Telangana",
    type: "Private",
    rating: 4.7,
    studentsCount: "900+",
    programs: ["MBA", "Business Analytics", "Finance", "Marketing"],
    fees: "₹36,00,000/year",
    contact: "+91-40-2300-7000",
    website: "isb.edu",
    established: 2001,
    accreditation: "AACSB"
  },
  {
    id: 6,
    name: "Jamia Millia Islamia University",
    location: "New Delhi, Delhi",
    type: "Public",
    rating: 4.3,
    studentsCount: "15,000+",
    programs: ["Engineering", "Arts", "Science", "Education"],
    fees: "₹85,000/year",
    contact: "+91-11-2698-1717",
    website: "jmi.ac.in",
    established: 1920,
    accreditation: "NAAC A"
  }
];

const CollegeDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterProgram, setFilterProgram] = useState('all');

  // Get unique programs for filter
  const allPrograms = Array.from(
    new Set(sampleColleges.flatMap(college => college.programs))
  ).sort();

  // Filter colleges based on search and filters
  const filteredColleges = sampleColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.programs.some(program => 
                           program.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesType = filterType === 'all' || college.type.toLowerCase() === filterType;
    
    const matchesProgram = filterProgram === 'all' || 
                          college.programs.some(program => 
                            program.toLowerCase() === filterProgram.toLowerCase()
                          );

    return matchesSearch && matchesType && matchesProgram;
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
          College Directory
        </h1>
        <p className="text-xl text-muted-foreground">
          Explore top colleges and universities to find the perfect fit for your academic journey.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8 shadow-card border-0 bg-gradient-card">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Colleges</label>
              <Input
                placeholder="Search by name, location, or program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Institution Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Program</label>
              <Select value={filterProgram} onValueChange={setFilterProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {allPrograms.map(program => (
                    <SelectItem key={program} value={program.toLowerCase()}>
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredColleges.length} of {sampleColleges.length} colleges
        </p>
      </div>

      {/* College Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredColleges.map(college => (
          <Card key={college.id} className="shadow-card hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span className="font-medium">{college.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{college.studentsCount}</span>
                    </div>
                    <Badge variant="outline">{college.type}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Programs Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {college.programs.map(program => (
                    <Badge key={program} variant="secondary">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Annual Fees:</span>
                  <p className="text-primary font-semibold">{college.fees}</p>
                </div>
                <div>
                  <span className="font-medium">Established:</span>
                  <p>{college.established}</p>
                </div>
                <div>
                  <span className="font-medium">Accreditation:</span>
                  <p>{college.accreditation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-primary">{college.website}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="flex-1">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredColleges.length === 0 && (
        <Card className="text-center py-12 shadow-card border-0 bg-gradient-card">
          <CardContent>
            <h3 className="text-xl font-medium mb-2">No colleges found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more results.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterProgram('all');
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CollegeDirectory;