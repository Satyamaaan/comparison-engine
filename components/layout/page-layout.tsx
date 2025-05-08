import React from 'react';
import Link from 'next/link';

interface PageLayoutProps {
  children: React.ReactNode;
  hideBreadcrumbs?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children,
  hideBreadcrumbs = false
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center border-b">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-emerald-600 rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">UL</span>
              </div>
              <span className="font-semibold text-lg">Unbias Lending</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 border-t text-center text-gray-500 text-sm">
        <p>Powered by Unbias Lending</p>
      </footer>
    </div>
  );
};

export default PageLayout; 