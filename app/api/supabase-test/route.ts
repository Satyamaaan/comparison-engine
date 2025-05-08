import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    // Simple query to test the connection
    const { data, error } = await supabase.from('_tables').select('*').limit(1);
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to connect to Supabase', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to Supabase',
      data
    });
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return NextResponse.json(
      { error: 'Failed to connect to Supabase', details: String(error) },
      { status: 500 }
    );
  }
} 