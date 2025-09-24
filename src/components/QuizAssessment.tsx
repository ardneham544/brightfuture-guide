import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Which activity do you find most engaging?",
    options: [
      "Solving complex mathematical problems",
      "Creating art or writing stories", 
      "Helping others solve their problems",
      "Building or fixing things with your hands"
    ],
    category: "interests"
  },
  {
    id: 2,
    question: "In a group project, you prefer to:",
    options: [
      "Lead the team and coordinate tasks",
      "Research and analyze information",
      "Present findings to the group",
      "Support team members and ensure harmony"
    ],
    category: "skills"
  },
  {
    id: 3,
    question: "Your ideal work environment would be:",
    options: [
      "A quiet office with minimal distractions",
      "A collaborative space with lots of interaction",
      "Outdoors or different locations",
      "A laboratory or workshop setting"
    ],
    category: "environment"
  },
  {
    id: 4,
    question: "Which subject did you enjoy most in school?",
    options: [
      "Mathematics and Physics",
      "Literature and History",
      "Biology and Chemistry",
      "Arts and Music"
    ],
    category: "academics"
  },
  {
    id: 5,
    question: "When facing a problem, you typically:",
    options: [
      "Break it down into smaller, logical steps",
      "Brainstorm creative solutions",
      "Seek advice from others",
      "Use trial and error approach"
    ],
    category: "problem-solving"
  }
];

interface QuizAssessmentProps {
  onComplete?: (results: Record<string, number>) => void;
}

const QuizAssessment: React.FC<QuizAssessmentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeQuiz = () => {
    setIsCompleted(true);
    
    // Calculate results based on answers
    const results = {
      analytical: 0,
      creative: 0,
      social: 0,
      practical: 0
    };

    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      switch (answerIndex) {
        case 0:
          results.analytical += 1;
          break;
        case 1:
          results.creative += 1;
          break;
        case 2:
          results.social += 1;
          break;
        case 3:
          results.practical += 1;
          break;
      }
    });

    onComplete?.(results);
  };

  const getCareerSuggestions = (results: Record<string, number>) => {
    const maxScore = Math.max(...Object.values(results));
    const dominantTrait = Object.keys(results).find(key => results[key] === maxScore);

    const careerMappings = {
      analytical: ['Software Engineer', 'Data Scientist', 'Financial Analyst', 'Research Scientist'],
      creative: ['Graphic Designer', 'Content Writer', 'Marketing Specialist', 'Architect'],
      social: ['Teacher', 'Counselor', 'Human Resources', 'Social Worker'],
      practical: ['Mechanical Engineer', 'Chef', 'Technician', 'Project Manager']
    };

    return careerMappings[dominantTrait as keyof typeof careerMappings] || [];
  };

  if (isCompleted) {
    const results = {
      analytical: 0,
      creative: 0,
      social: 0,
      practical: 0
    };

    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      switch (answerIndex) {
        case 0:
          results.analytical += 1;
          break;
        case 1:
          results.creative += 1;
          break;
        case 2:
          results.social += 1;
          break;
        case 3:
          results.practical += 1;
          break;
      }
    });

    const suggestions = getCareerSuggestions(results);

    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="shadow-elevated border-0 bg-gradient-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl lg:text-3xl">Assessment Complete!</CardTitle>
            <CardDescription className="text-lg">
              Based on your responses, here are your personalized career recommendations:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Your Strengths Profile</h3>
                <div className="space-y-3">
                  {Object.entries(results).map(([trait, score]) => (
                    <div key={trait}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize font-medium">{trait}</span>
                        <span>{score}/{sampleQuestions.length}</span>
                      </div>
                      <Progress value={(score / sampleQuestions.length) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Recommended Careers</h3>
                <div className="space-y-2">
                  {suggestions.map((career, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span className="font-medium">{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" className="flex-1">
                Explore Courses for These Careers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                Find Relevant Colleges
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = sampleQuestions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="shadow-elevated border-0 bg-gradient-card">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="mb-6" />
          <CardTitle className="text-xl lg:text-2xl">{question.question}</CardTitle>
          <CardDescription>Choose the option that best describes you:</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`p-4 text-left rounded-lg border transition-all duration-200 hover:shadow-card ${
                  answers[currentQuestion] === index
                    ? 'border-primary bg-primary/5 shadow-card'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === index
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === undefined}
            >
              {currentQuestion === sampleQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizAssessment;