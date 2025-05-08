'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="h-16 w-16 bg-primary rounded-full mb-3 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">CE</span>
          </div>
          <h1 className="text-2xl font-bold text-center">Comparison Engine</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Verification Page</CardTitle>
            <CardDescription className="text-center">
              This is a placeholder for the OTP verification page (Task #7)
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            <p>This page will be implemented in Task #7</p>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Link href="/login">
              <Button>Go Back to Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 