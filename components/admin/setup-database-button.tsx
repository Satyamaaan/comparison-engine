'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SetupDatabaseButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const setupDatabase = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      setError('');

      const response = await fetch('/api/setup-db');
      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
      } else {
        setError(data.message || 'An error occurred');
        if (data.sqlQuery) {
          console.info('SQL Query to run manually:', data.sqlQuery);
        }
      }
    } catch (err) {
      setError('Failed to setup database. See console for details.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button 
        onClick={setupDatabase}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 mb-2"
      >
        {isLoading ? 'Setting up...' : 'Setup Database'}
      </Button>
      
      {message && (
        <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">{message}</div>
      )}
      
      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-800 rounded">{error}</div>
      )}
    </div>
  );
} 