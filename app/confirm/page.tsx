'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/page-layout';
import ProgressSteps from '@/components/layout/progress-steps';

export default function ConfirmPage() {
  const router = useRouter();
  const [isConsent, setIsConsent] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Dummy data for the summary
  const propertyData = {
    type: 'Residential',
    value: '₹50,00,000',
    loanAmount: '₹35,00,000'
  };
  
  const personalData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '9876543210',
    city: 'Mumbai'
  };
  
  const incomeData = {
    source: 'Salaried',
    monthlyIncome: '₹75,000',
    employmentType: 'Full-time',
    companyName: 'ABC Corporation',
    workExperience: '5 years'
  };

  const validateForm = () => {
    if (!isConsent || !isPrivacy) {
      setError('Please agree to all terms to continue');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // In a real implementation, we would save this data to state management or API
      // For now, just simulate and navigate to the login page
      setTimeout(() => {
        // Navigate to the login page to view loan offers
        router.push('/login');
      }, 1500);
    }
  };

  return (
    <PageLayout>
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <ProgressSteps currentStep={4} />

        <Card>
          <CardHeader>
            <CardTitle>Review & Confirm</CardTitle>
            <CardDescription>
              Please review your information before submitting
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Property Information */}
              <div className="space-y-3 border-b pb-4">
                <h3 className="font-medium text-emerald-600">Property Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Property Type:</div>
                  <div>{propertyData.type}</div>
                  <div className="text-gray-500">Property Value:</div>
                  <div>{propertyData.value}</div>
                  <div className="text-gray-500">Loan Amount:</div>
                  <div>{propertyData.loanAmount}</div>
                </div>
                <div className="text-right">
                  <Link href="/property" className="text-xs text-emerald-600 hover:underline">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-3 border-b pb-4">
                <h3 className="font-medium text-emerald-600">Personal Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Name:</div>
                  <div>{personalData.name}</div>
                  <div className="text-gray-500">Email:</div>
                  <div>{personalData.email}</div>
                  <div className="text-gray-500">Phone:</div>
                  <div>{personalData.phone}</div>
                  <div className="text-gray-500">City:</div>
                  <div>{personalData.city}</div>
                </div>
                <div className="text-right">
                  <Link href="/personal" className="text-xs text-emerald-600 hover:underline">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Income Information */}
              <div className="space-y-3 border-b pb-4">
                <h3 className="font-medium text-emerald-600">Income Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Income Source:</div>
                  <div>{incomeData.source}</div>
                  <div className="text-gray-500">Monthly Income:</div>
                  <div>{incomeData.monthlyIncome}</div>
                  <div className="text-gray-500">Employment Type:</div>
                  <div>{incomeData.employmentType}</div>
                  <div className="text-gray-500">Company:</div>
                  <div>{incomeData.companyName}</div>
                  <div className="text-gray-500">Work Experience:</div>
                  <div>{incomeData.workExperience}</div>
                </div>
                <div className="text-right">
                  <Link href="/income" className="text-xs text-emerald-600 hover:underline">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Terms & Consent */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="consent" 
                    checked={isConsent}
                    onCheckedChange={(checked: boolean) => setIsConsent(checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="consent"
                      className="text-sm font-normal leading-snug text-gray-600"
                    >
                      I consent to Unbias Lending processing my personal data in accordance with their Terms of Service
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="privacy" 
                    checked={isPrivacy}
                    onCheckedChange={(checked: boolean) => setIsPrivacy(checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="privacy"
                      className="text-sm font-normal leading-snug text-gray-600"
                    >
                      I agree that Unbias Lending may share my information with lending partners to provide loan offers
                    </Label>
                  </div>
                </div>
                
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Link href="/income">
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
                {isLoading ? 'Processing...' : 'Submit'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
} 