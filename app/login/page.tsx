'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  // Phone number validation pattern (simple version)
  const isValidPhoneNumber = (number: string) => {
    const pattern = /^[0-9]{10}$/; // Simple 10-digit validation
    return pattern.test(number.replace(/\s+/g, ''));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    
    // Validate phone number
    if (!phoneNumber) {
      setError('Please enter your mobile number');
      return;
    }
    
    const formattedNumber = phoneNumber.replace(/\s+/g, '');
    if (!isValidPhoneNumber(formattedNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // This will be implemented in a future task when we connect to Supabase auth
      // For now, just simulate and redirect
      console.log('Phone authentication will be implemented in the future');
      
      // In a real implementation, we would send the OTP here
      // For now, just redirect to the verification page
      setTimeout(() => {
        router.push('/verify');
      }, 1000);
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo and Company Name */}
        <div className="mb-8 flex flex-col items-center">
          {/* Replace with your actual logo */}
          <div className="h-16 w-16 bg-primary rounded-full mb-3 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">CE</span>
          </div>
          <h1 className="text-2xl font-bold text-center">Comparison Engine</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Enter your mobile number to sign in or create an account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2"
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Continue with Mobile Number'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
} 