'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/page-layout';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const router = useRouter();
  
  // Phone number validation pattern (simple version)
  const isValidPhoneNumber = (number: string) => {
    const pattern = /^[0-9]{10}$/; // Simple 10-digit validation
    return pattern.test(number.replace(/\s+/g, ''));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpSent) {
      // Validate OTP
      if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
        setError('Please enter a valid 6-digit OTP');
        return;
      }
      
      setIsLoading(true);
      
      // Simulate OTP verification
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to loan comparison page
        router.push('/loans');
      }, 1500);
      
    } else {
      // Validate phone number
      if (!phoneNumber) {
        setError('Phone number is required');
        return;
      }
      
      if (!isValidPhoneNumber(phoneNumber)) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }
      
      setIsLoading(true);
      
      // Simulate sending OTP
      setTimeout(() => {
        setIsLoading(false);
        setOtpSent(true);
        setError('');
      }, 1500);
    }
  };
  
  return (
    <PageLayout>
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="h-16 w-16 bg-emerald-600 rounded-full mb-3 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">UL</span>
          </div>
          <h1 className="text-2xl font-bold text-center">Access Your Loan Offers</h1>
          <p className="text-center text-gray-500 mt-2">
            {otpSent ? 
              'Enter the OTP sent to your mobile number' : 
              'Your profile has been created. Enter your mobile number to view your loan offers'}
          </p>
        </div>
        
        <Card>
          <CardHeader className={otpSent ? "pb-2" : ""}>
            <CardTitle>
              {otpSent ? 'Verify OTP' : 'Mobile Number Login'}
            </CardTitle>
            <CardDescription>
              {otpSent ? 
                `We've sent a verification code to ${phoneNumber}` : 
                'Enter your phone number to receive an OTP'}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent>
              {otpSent ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="text-center text-lg tracking-widest"
                      autoFocus
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </div>
                  
                  <div className="text-center">
                    <button 
                      type="button" 
                      className="text-sm text-emerald-600 hover:underline"
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setError('');
                        }, 1000);
                      }}
                    >
                      Resend OTP
                    </button>
                    {' | '}
                    <button 
                      type="button" 
                      className="text-sm text-emerald-600 hover:underline"
                      onClick={() => {
                        setOtpSent(false);
                        setError('');
                      }}
                    >
                      Change Number
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Input
                      id="phone"
                      placeholder="Enter 10-digit mobile number"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoFocus
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>You'll receive a one-time password (OTP) on this number</p>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
              </Button>
              
              {!otpSent && (
                <div className="text-center text-sm">
                  <Link href="/" className="text-emerald-600 hover:underline">
                    Back to Home
                  </Link>
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
} 