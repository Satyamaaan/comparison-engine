'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import PageLayout from '@/components/layout/page-layout';
import ProgressSteps from '@/components/layout/progress-steps';

export default function PropertyPage() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    propertyType: '',
    propertyValue: '',
    loanAmount: ''
  });

  const validateForm = () => {
    const newErrors = {
      propertyType: '',
      propertyValue: '',
      loanAmount: ''
    };
    
    let isValid = true;
    
    if (!propertyType) {
      newErrors.propertyType = 'Property type is required';
      isValid = false;
    }
    
    if (!propertyValue) {
      newErrors.propertyValue = 'Property value is required';
      isValid = false;
    } else if (isNaN(Number(propertyValue))) {
      newErrors.propertyValue = 'Property value must be a number';
      isValid = false;
    }
    
    if (!loanAmount) {
      newErrors.loanAmount = 'Loan amount is required';
      isValid = false;
    } else if (isNaN(Number(loanAmount))) {
      newErrors.loanAmount = 'Loan amount must be a number';
      isValid = false;
    } else if (Number(loanAmount) > Number(propertyValue)) {
      newErrors.loanAmount = 'Loan amount cannot exceed property value';
      isValid = false;
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
        router.push('/personal');
      }, 1000);
    }
  };

  return (
    <PageLayout>
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <ProgressSteps currentStep={1} />

        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
            <CardDescription>
              Tell us about the property you're looking to finance
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="propertyType">Property Type</Label>
                <RadioGroup 
                  id="propertyType" 
                  value={propertyType} 
                  onValueChange={setPropertyType}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem 
                      value="residential" 
                      id="residential" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="residential"
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
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                        />
                      </svg>
                      Residential
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem 
                      value="commercial" 
                      id="commercial" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="commercial"
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                        />
                      </svg>
                      Commercial
                    </Label>
                  </div>
                </RadioGroup>
                {errors.propertyType && (
                  <p className="text-sm text-red-500">{errors.propertyType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyValue">Property Value (₹)</Label>
                <Input
                  id="propertyValue"
                  type="text"
                  placeholder="e.g. 5000000"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                />
                {errors.propertyValue && (
                  <p className="text-sm text-red-500">{errors.propertyValue}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount Required (₹)</Label>
                <Input
                  id="loanAmount"
                  type="text"
                  placeholder="e.g. 3500000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
                {errors.loanAmount && (
                  <p className="text-sm text-red-500">{errors.loanAmount}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Link href="/">
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