'use client';

import { useState, useEffect } from 'react';
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
import { useBorrowerForm } from '@/utils/borrower-form-context';

export default function IncomePage() {
  const router = useRouter();
  const { 
    formState, 
    updateFormField, 
    saveFormData, 
    isLoading,
    setCurrentStep
  } = useBorrowerForm();

  const [errors, setErrors] = useState({
    employment_type: '',
    monthly_income: '',
    employer_name: '',
    business_name: '',
    business_type: '',
    years_in_business: '',
    years_with_employer: ''
  });

  useEffect(() => {
    // Set the current step when this page is loaded
    setCurrentStep('income');
  }, [setCurrentStep]);

  const validateForm = () => {
    const newErrors = {
      employment_type: '',
      monthly_income: '',
      employer_name: '',
      business_name: '',
      business_type: '',
      years_in_business: '',
      years_with_employer: ''
    };
    
    let isValid = true;
    
    if (!formState.employment_type) {
      newErrors.employment_type = 'Employment type is required';
      isValid = false;
    }
    
    if (!formState.monthly_income) {
      newErrors.monthly_income = 'Monthly income is required';
      isValid = false;
    } else if (isNaN(Number(formState.monthly_income))) {
      newErrors.monthly_income = 'Monthly income must be a number';
      isValid = false;
    }
    
    if (formState.employment_type === 'salaried') {
      if (!formState.employer_name) {
        newErrors.employer_name = 'Employer name is required';
        isValid = false;
      }
      
      if (!formState.years_with_employer) {
        newErrors.years_with_employer = 'Years with employer is required';
        isValid = false;
      } else if (isNaN(Number(formState.years_with_employer))) {
        newErrors.years_with_employer = 'Years with employer must be a number';
        isValid = false;
      }
    } else if (formState.employment_type === 'self-employed') {
      if (!formState.business_name) {
        newErrors.business_name = 'Business name is required';
        isValid = false;
      }
      
      if (!formState.business_type) {
        newErrors.business_type = 'Business type is required';
        isValid = false;
      }
      
      if (!formState.years_in_business) {
        newErrors.years_in_business = 'Years in business is required';
        isValid = false;
      } else if (isNaN(Number(formState.years_in_business))) {
        newErrors.years_in_business = 'Years in business must be a number';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await saveFormData();
        // Navigate to the next step in the onboarding process
        router.push('/confirm');
      } catch (error) {
        console.error('Error saving income data:', error);
        // You could add error handling UI here
      }
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
                <Label htmlFor="employmentType">Employment Type</Label>
                <RadioGroup 
                  id="employmentType" 
                  value={formState.employment_type} 
                  onValueChange={(value) => updateFormField('employment_type', value)}
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
                {errors.employment_type && (
                  <p className="text-sm text-red-500">{errors.employment_type}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                <Input
                  id="monthlyIncome"
                  type="text"
                  placeholder="e.g. 60000"
                  value={formState.monthly_income}
                  onChange={(e) => updateFormField('monthly_income', e.target.value)}
                />
                {errors.monthly_income && (
                  <p className="text-sm text-red-500">{errors.monthly_income}</p>
                )}
              </div>

              {formState.employment_type === 'salaried' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="employerName">Employer Name</Label>
                    <Input
                      id="employerName"
                      type="text"
                      placeholder="e.g. ABC Corporation"
                      value={formState.employer_name}
                      onChange={(e) => updateFormField('employer_name', e.target.value)}
                    />
                    {errors.employer_name && (
                      <p className="text-sm text-red-500">{errors.employer_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsWithEmployer">Years with Employer</Label>
                    <Input
                      id="yearsWithEmployer"
                      type="text"
                      placeholder="e.g. 5"
                      value={formState.years_with_employer}
                      onChange={(e) => updateFormField('years_with_employer', e.target.value)}
                    />
                    {errors.years_with_employer && (
                      <p className="text-sm text-red-500">{errors.years_with_employer}</p>
                    )}
                  </div>
                </>
              )}
              
              {formState.employment_type === 'self-employed' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="e.g. XYZ Enterprises"
                      value={formState.business_name}
                      onChange={(e) => updateFormField('business_name', e.target.value)}
                    />
                    {errors.business_name && (
                      <p className="text-sm text-red-500">{errors.business_name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select 
                      value={formState.business_type}
                      onValueChange={(value) => updateFormField('business_type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.business_type && (
                      <p className="text-sm text-red-500">{errors.business_type}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsInBusiness">Years in Business</Label>
                    <Input
                      id="yearsInBusiness"
                      type="text"
                      placeholder="e.g. 5"
                      value={formState.years_in_business}
                      onChange={(e) => updateFormField('years_in_business', e.target.value)}
                    />
                    {errors.years_in_business && (
                      <p className="text-sm text-red-500">{errors.years_in_business}</p>
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