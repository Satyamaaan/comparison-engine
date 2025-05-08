'use client';

import { useState } from 'react';

export default function SupabaseTestPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<any>(null);

  async function testConnection() {
    try {
      setStatus('loading');
      const res = await fetch('/api/supabase-test');
      const data = await res.json();
      
      setResponse(data);
      setStatus(data.success ? 'success' : 'error');
    } catch (error) {
      console.error('Error testing connection:', error);
      setResponse({ error: String(error) });
      setStatus('error');
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <button
        onClick={testConnection}
        disabled={status === 'loading'}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'loading' ? 'Testing...' : 'Test Connection'}
      </button>
      
      {status !== 'idle' && (
        <div className="mt-6 p-4 rounded border">
          <h2 className="text-lg font-semibold mb-2">
            Result: 
            {status === 'loading' && <span className="text-gray-500"> Checking...</span>}
            {status === 'success' && <span className="text-green-600"> Connection Successful!</span>}
            {status === 'error' && <span className="text-red-600"> Connection Failed</span>}
          </h2>
          
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto text-sm">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 