import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BankLogos from "@/components/banks/bank-logos";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-emerald-600 rounded-md flex items-center justify-center mr-2">
            <span className="text-white font-bold text-xs">UL</span>
          </div>
          <span className="font-semibold text-lg">Unbias Lending</span>
        </div>
        <button className="text-emerald-600 flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          Need help?
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 md:py-16">
        <div className="max-w-3xl w-full mx-auto text-center">
          {/* Hero Image - Small house or property icon */}
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-8 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-gray-400" 
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
          </div>

          {/* Hero Text */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover your ideal<br />home loan in minutes
          </h1>
          <p className="text-gray-600 mb-8">
            Receive free advice from our loan experts
          </p>

          {/* Feature List */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 text-emerald-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span className="text-sm md:text-base">Free of charge</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 text-emerald-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span className="text-sm md:text-base">Multiple banks in one place</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 text-emerald-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span className="text-sm md:text-base">No commitment</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/property">
            <Button className="w-full md:w-64 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md">
              Begin
            </Button>
          </Link>

          {/* Continue Process Link */}
          <div className="mt-4 text-sm">
            <span className="text-gray-500">Do you already have an active process?</span>{' '}
            <Link href="/login" className="text-emerald-600 hover:underline">
              Continue your process
            </Link>
          </div>
        </div>

        {/* Bank Partnerships */}
        <div className="mt-16 md:mt-20 w-full max-w-4xl mx-auto">
          <p className="text-center text-gray-500 text-sm mb-8">
            We work with the best banks and financial institutions in India
          </p>

          <div className="px-4">
            <BankLogos />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t text-center text-gray-500 text-sm">
        <p>Powered by Unbias Lending</p>
      </footer>
    </div>
  );
}
