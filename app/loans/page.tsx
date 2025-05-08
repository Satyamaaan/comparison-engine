'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/page-layout';
import BankLogos from '@/components/banks/bank-logos';

export default function LoansPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedTenure, setSelectedTenure] = useState('20');
  
  // Mock data for loan offers
  const loanOffers = [
    {
      id: 1,
      bankName: 'HDFC Bank',
      logo: '/bank-logos/hdfc.png',
      interestRate: 8.5,
      processingFee: '0.5%',
      disbursalTime: '7 days',
      maxLoanAmount: '₹70,00,000',
      features: ['No prepayment penalty', 'Doorstep service', 'Quick approval'],
      recommended: true,
      color: '#004C8F'
    },
    {
      id: 2,
      bankName: 'ICICI Bank',
      logo: '/bank-logos/icici.png',
      interestRate: 8.75,
      processingFee: '0.75%',
      disbursalTime: '5-7 days',
      maxLoanAmount: '₹85,00,000',
      features: ['Home loan balance transfer', 'No prepayment penalty'],
      recommended: false,
      color: '#F26522'
    },
    {
      id: 3,
      bankName: 'SBI',
      logo: '/bank-logos/sbi.png',
      interestRate: 8.65,
      processingFee: '0.35%',
      disbursalTime: '10 days',
      maxLoanAmount: '₹90,00,000',
      features: ['Lower interest rates', 'Minimal documentation'],
      recommended: false,
      color: '#2597D3'
    },
    {
      id: 4,
      bankName: 'Kotak Mahindra Bank',
      logo: '/bank-logos/kotak.png',
      interestRate: 8.9,
      processingFee: '0.5%',
      disbursalTime: '5 days',
      maxLoanAmount: '₹75,00,000',
      features: ['Special rates for women', 'Quick disbursal'],
      recommended: false,
      color: '#003C79'
    }
  ];
  
  // Filter offers based on the selected tab
  const filteredOffers = selectedTab === 'all' 
    ? loanOffers 
    : selectedTab === 'recommended' 
      ? loanOffers.filter(offer => offer.recommended) 
      : loanOffers.filter(offer => offer.interestRate < 8.7);
  
  // Calculate EMI for different tenures
  const calculateEMI = (principal: number, ratePerAnnum: number, tenureYears: number) => {
    const p = principal;
    const r = ratePerAnnum / 12 / 100; // Monthly interest rate
    const n = tenureYears * 12; // Total number of payments
    
    const emi = p * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };
  
  const loanAmount = 3500000; // ₹35,00,000
  const tenure = parseInt(selectedTenure);

  return (
    <PageLayout>
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Your Personalized Loan Offers</h1>
          <p className="text-gray-600 mt-2">
            Based on your profile, we've found these loan options for you
          </p>
        </div>
        
        {/* Loan Details Summary */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Loan Amount</p>
                <p className="font-semibold">₹35,00,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Property Type</p>
                <p className="font-semibold">Residential</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Property Value</p>
                <p className="font-semibold">₹50,00,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">Mumbai</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Loan Tenure Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium">Select Loan Tenure</h2>
            <p className="text-sm text-gray-500">Showing EMI per month</p>
          </div>
          <RadioGroup
            value={selectedTenure}
            onValueChange={setSelectedTenure}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="10" id="tenure-10" className="peer sr-only" />
              <Label
                htmlFor="tenure-10"
                className="flex flex-col items-center rounded-md border-2 border-muted bg-transparent p-3 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 [&:has([data-state=checked])]:border-emerald-600"
              >
                <span className="font-semibold">10 Years</span>
                <span className="text-xs text-gray-500">120 months</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="20" id="tenure-20" className="peer sr-only" />
              <Label
                htmlFor="tenure-20"
                className="flex flex-col items-center rounded-md border-2 border-muted bg-transparent p-3 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 [&:has([data-state=checked])]:border-emerald-600"
              >
                <span className="font-semibold">20 Years</span>
                <span className="text-xs text-gray-500">240 months</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="30" id="tenure-30" className="peer sr-only" />
              <Label
                htmlFor="tenure-30"
                className="flex flex-col items-center rounded-md border-2 border-muted bg-transparent p-3 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 [&:has([data-state=checked])]:border-emerald-600"
              >
                <span className="font-semibold">30 Years</span>
                <span className="text-xs text-gray-500">360 months</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Tabs for filtering offers */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All Offers</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="lowest">Lowest Rate</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Loan Offers */}
        <div className="space-y-6">
          {filteredOffers.map(offer => (
            <Card key={offer.id} className="overflow-hidden">
              {offer.recommended && (
                <div className="bg-emerald-600 text-white text-center text-xs font-medium py-1">
                  RECOMMENDED FOR YOU
                </div>
              )}
              
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  {/* Bank Info */}
                  <div className="flex items-center space-x-3">
                    <div 
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${offer.color}20` }}
                    >
                      <svg 
                        className="w-8 h-8" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke={offer.color} 
                        strokeWidth="2"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">{offer.bankName}</h3>
                      <p className="text-xs text-gray-500">Home Loan</p>
                    </div>
                  </div>
                  
                  {/* Interest Rate */}
                  <div className="text-center md:text-left">
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <p className="font-bold text-lg">{offer.interestRate}%</p>
                  </div>
                  
                  {/* EMI */}
                  <div className="text-center md:text-left">
                    <p className="text-sm text-gray-500">EMI per month</p>
                    <p className="font-bold text-lg">
                      ₹{calculateEMI(loanAmount, offer.interestRate, tenure).toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  {/* Apply Button */}
                  <div className="flex flex-col items-center md:items-end">
                    <Button 
                      className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700"
                    >
                      Apply Now
                    </Button>
                    <button className="text-xs text-emerald-600 mt-2 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {offer.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Partners Section */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Our lending partners include India's top banks and financial institutions
          </p>
          <BankLogos />
        </div>
      </div>
    </PageLayout>
  );
} 