import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import QuizAssessment from "./components/QuizAssessment";
import CollegeDirectory from "./components/CollegeDirectory";
import CourseRecommendations from "./components/CourseRecommendations";
import ExpertGuidance from "./components/ExpertGuidance";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleBackToHome = () => {
    setCurrentSection('home');
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'quiz':
        return <QuizAssessment onComplete={(results) => {
          console.log('Quiz completed with results:', results);
          // Could add functionality to save results or navigate somewhere
        }} />;
      case 'colleges':
        return <CollegeDirectory />;
      case 'courses':
        return <CourseRecommendations />;
      case 'guidance':
        return <ExpertGuidance />;
      default:
        return <Index onNavigate={handleNavigate} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          {currentSection !== 'home' && (
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
              <div className="container mx-auto px-4 py-4">
                <Button 
                  variant="outline" 
                  onClick={handleBackToHome}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </header>
          )}
          {renderContent()}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
