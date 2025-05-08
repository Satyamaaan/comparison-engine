'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/page-layout';
import ProgressSteps from '@/components/layout/progress-steps';
import { useBorrowerForm } from '@/utils/borrower-form-context';

export default function PersonalPage() {
  const router = useRouter();
  const { 
    formState, 
    updateFormField, 
    saveFormData, 
    isLoading,
    setCurrentStep
  } = useBorrowerForm();

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    // Set the current step when this page is loaded
    setCurrentStep('personal');
  }, [setCurrentStep]);

  const validateForm = () => {
    const newErrors = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    };
    
    let isValid = true;
    
    if (!formState.first_name) {
      newErrors.first_name = 'First name is required';
      isValid = false;
    }
    
    if (!formState.last_name) {
      newErrors.last_name = 'Last name is required';
      isValid = false;
    }
    
    if (!formState.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!formState.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formState.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }
    
    if (!formState.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    
    if (!formState.city) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    
    if (!formState.state) {
      newErrors.state = 'State is required';
      isValid = false;
    }
    
    if (!formState.pincode) {
      newErrors.pincode = 'Pincode is required';
      isValid = false;
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
        router.push('/income');
      } catch (error) {
        console.error('Error saving personal data:', error);
        // You could add error handling UI here
      }
    }
  };

  return (
    <PageLayout>
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <ProgressSteps currentStep={2} />

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Tell us about yourself
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="e.g. John"
                    value={formState.first_name}
                    onChange={(e) => updateFormField('first_name', e.target.value)}
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-500">{errors.first_name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="e.g. Doe"
                    value={formState.last_name}
                    onChange={(e) => updateFormField('last_name', e.target.value)}
                  />
                  {errors.last_name && (
                    <p className="text-sm text-red-500">{errors.last_name}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. john.doe@example.com"
                  value={formState.email}
                  onChange={(e) => updateFormField('email', e.target.value)}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formState.phone}
                  onChange={(e) => updateFormField('phone', e.target.value)}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="e.g. 123 Main Street"
                  value={formState.address}
                  onChange={(e) => updateFormField('address', e.target.value)}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={formState.city}
                    onChange={(e) => updateFormField('city', e.target.value)}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="e.g. Maharashtra"
                    value={formState.state}
                    onChange={(e) => updateFormField('state', e.target.value)}
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500">{errors.state}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  type="text"
                  placeholder="e.g. 400001"
                  value={formState.pincode}
                  onChange={(e) => updateFormField('pincode', e.target.value)}
                />
                {errors.pincode && (
                  <p className="text-sm text-red-500">{errors.pincode}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Link href="/property">
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