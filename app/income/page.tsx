'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageLayout from '@/components/layout/page-layout';
import ProgressSteps from '@/components/layout/progress-steps';

export default function IncomePage() {
  const router = useRouter();
  const [incomeSource, setIncomeSource] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    incomeSource: '',
    monthlyIncome: '',
    employmentType: '',
    companyName: '',
    workExperience: ''
  });

  const validateForm = () => {
    const newErrors = {
      incomeSource: '',
      monthlyIncome: '',
      employmentType: '',
      companyName: '',
      workExperience: ''
    };
    
    let isValid = true;
    
    if (!incomeSource) {
      newErrors.incomeSource = 'Income source is required';
      isValid = false;
    }
    
    if (!monthlyIncome) {
      newErrors.monthlyIncome = 'Monthly income is required';
      isValid = false;
    } else if (isNaN(Number(monthlyIncome))) {
      newErrors.monthlyIncome = 'Monthly income must be a number';
      isValid = false;
    }
    
    if (incomeSource === 'salaried') {
      if (!employmentType) {
        newErrors.employmentType = 'Employment type is required';
        isValid = false;
      }
      
      if (!companyName) {
        newErrors.companyName = 'Company name is required';
        isValid = false;
      }
      
      if (!workExperience) {
        newErrors.workExperience = 'Work experience is required';
        isValid = false;
      } else if (isNaN(Number(workExperience))) {
        newErrors.workExperience = 'Work experience must be a number';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // In a real implementation, we would save this data to state management or API
      // For now, just simulate and navigate to the next step
      setTimeout(() => {
        // Navigate to the next step in the onboarding process
        router.push('/confirm');
      }, 1000);
    }
  };

  return (
    <PageLayout>
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <ProgressSteps currentStep={3} />

        <Card>
          <CardHeader>
            <CardTitle>Income Details</CardTitle>
            <CardDescription>
              Tell us about your financial situation
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="incomeSource">Primary Source of Income</Label>
                <RadioGroup 
                  id="incomeSource" 
                  value={incomeSource} 
                  onValueChange={setIncomeSource}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem 
                      value="salaried" 
                      id="salaried" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="salaried"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 [&:has([data-state=checked])]:border-emerald-600"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 mb-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                        />
                      </svg>
                      Salaried
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem 
                      value="self-employed" 
                      id="self-employed" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="self-employed"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 [&:has([data-state=checked])]:border-emerald-600"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 mb-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" 
                        />
                      </svg>
                      Self-Employed
                    </Label>
                  </div>
                </RadioGroup>
                {errors.incomeSource && (
                  <p className="text-sm text-red-500">{errors.incomeSource}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                <Input
                  id="monthlyIncome"
                  type="text"
                  placeholder="e.g. 60000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                />
                {errors.monthlyIncome && (
                  <p className="text-sm text-red-500">{errors.monthlyIncome}</p>
                )}
              </div>

              {incomeSource === 'salaried' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select 
                      value={employmentType}
                      onValueChange={setEmploymentType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.employmentType && (
                      <p className="text-sm text-red-500">{errors.employmentType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="e.g. ABC Corporation"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-500">{errors.companyName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workExperience">Work Experience (Years)</Label>
                    <Input
                      id="workExperience"
                      type="text"
                      placeholder="e.g. 5"
                      value={workExperience}
                      onChange={(e) => setWorkExperience(e.target.value)}
                    />
                    {errors.workExperience && (
                      <p className="text-sm text-red-500">{errors.workExperience}</p>
                    )}
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Link href="/personal">
                <Button 
                  variant="outline" 
                  type="button"
                >
                  Back
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Next'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
} 