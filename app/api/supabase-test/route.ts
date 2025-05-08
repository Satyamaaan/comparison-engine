import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    // Test if we can simply connect to Supabase
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to connect to Supabase', 
        error: error.message 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to Supabase',
    });
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred while testing Supabase connection',
      error: String(error)
    }, { status: 500 });
  }
} 