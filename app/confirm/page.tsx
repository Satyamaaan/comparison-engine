'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/page-layout';
import ProgressSteps from '@/components/layout/progress-steps';
import { useBorrowerForm } from '@/utils/borrower-form-context';

export default function ConfirmPage() {
  const router = useRouter();
  const { 
    formState, 
    isLoading,
    submitApplication,
    setCurrentStep,
    borrowerId
  } = useBorrowerForm();

  const [isConsent, setIsConsent] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [error, setError] = useState('');
  
  // Format currency values
  const formatCurrency = (value: string) => {
    if (!value) return '₹0';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '₹0';
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(numValue);
  };

  useEffect(() => {
    // Set the current step when this page is loaded
    setCurrentStep('confirm');
  }, [setCurrentStep]);

  const validateForm = () => {
    if (!isConsent || !isPrivacy) {
      setError('Please agree to all terms to continue');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await submitApplication();
        // Navigate to the login page to view loan offers
        router.push('/login');
      } catch (error) {
        console.error('Error submitting application:', error);
        setError('Failed to submit application. Please try again.');
      }
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
                  <div>{formState.property_type === 'residential' ? 'Residential' : 'Commercial'}</div>
                  <div className="text-gray-500">Property Value:</div>
                  <div>{formatCurrency(formState.property_value)}</div>
                  <div className="text-gray-500">Loan Amount:</div>
                  <div>{formatCurrency(formState.loan_amount)}</div>
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
                  <div>{formState.first_name} {formState.last_name}</div>
                  <div className="text-gray-500">Email:</div>
                  <div>{formState.email}</div>
                  <div className="text-gray-500">Phone:</div>
                  <div>{formState.phone}</div>
                  <div className="text-gray-500">Address:</div>
                  <div>{formState.address}</div>
                  <div className="text-gray-500">City:</div>
                  <div>{formState.city}</div>
                  <div className="text-gray-500">State:</div>
                  <div>{formState.state}</div>
                  <div className="text-gray-500">Pincode:</div>
                  <div>{formState.pincode}</div>
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
                  <div className="text-gray-500">Employment Type:</div>
                  <div>{formState.employment_type === 'salaried' ? 'Salaried' : 'Self-Employed'}</div>
                  <div className="text-gray-500">Monthly Income:</div>
                  <div>{formatCurrency(formState.monthly_income)}</div>
                  
                  {formState.employment_type === 'salaried' && (
                    <>
                      <div className="text-gray-500">Employer:</div>
                      <div>{formState.employer_name || 'N/A'}</div>
                      <div className="text-gray-500">Years with Employer:</div>
                      <div>{formState.years_with_employer || 'N/A'}</div>
                    </>
                  )}
                  
                  {formState.employment_type === 'self-employed' && (
                    <>
                      <div className="text-gray-500">Business Name:</div>
                      <div>{formState.business_name || 'N/A'}</div>
                      <div className="text-gray-500">Business Type:</div>
                      <div>{formState.business_type || 'N/A'}</div>
                      <div className="text-gray-500">Years in Business:</div>
                      <div>{formState.years_in_business || 'N/A'}</div>
                    </>
                  )}
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
                
                {borrowerId && (
                  <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                    <p>Application ID: <span className="font-mono">{borrowerId}</span></p>
                  </div>
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