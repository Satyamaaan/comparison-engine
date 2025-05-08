import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    console.log('Checking Supabase connection and database setup...');
    
    // First, check if Supabase is accessible
    let connectionTest;
    let connectionError;
    try {
      const result = await supabase.from('_test').select('*').limit(1);
      connectionTest = result.data;
      connectionError = result.error;
    } catch (error) {
      connectionError = new Error('Connection test failed');
    }
    
    if (connectionError) {
      console.log('Supabase connection issue, checking if it is just the table that does not exist...');
    }
    
    // Check if the borrowers table exists already
    const { data: borrowersExists, error: checkError } = await supabase
      .from('borrowers')
      .select('id')
      .limit(1);
    
    // If there's no error, the table already exists
    if (!checkError) {
      console.log('Borrowers table already exists, no need to create');
      return NextResponse.json({ 
        success: true, 
        message: 'Database is already set up' 
      });
    }
    
    console.log('Borrowers table does not exist, attempting to create it...');
    
    // Check if the SQL execution function exists
    let rpcCheckError;
    try {
      const result = await supabase.rpc('execute_sql', { sql_query: 'SELECT 1' });
      rpcCheckError = result.error;
    } catch (error) {
      rpcCheckError = new Error('RPC function does not exist');
    }
    
    if (rpcCheckError) {
      console.log('The execute_sql RPC function does not exist or is not accessible');
      
      // Try a direct create table SQL command - this will likely fail due to permissions 
      // but it's worth trying in development environments
      try {
        console.log('Attempting direct SQL execution (may fail due to permissions)...');
        
        const { error: createTableDirectError } = await supabase
          .from('_migrations')
          .insert({
            name: 'create_borrowers_table',
            sql: `
              CREATE TABLE IF NOT EXISTS borrowers (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                property_type TEXT NOT NULL,
                property_value NUMERIC NOT NULL,
                loan_amount NUMERIC NOT NULL,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                city TEXT NOT NULL,
                state TEXT NOT NULL,
                pincode TEXT NOT NULL,
                employment_type TEXT NOT NULL,
                monthly_income NUMERIC NOT NULL,
                employer_name TEXT,
                business_name TEXT,
                business_type TEXT,
                years_in_business INTEGER,
                years_with_employer INTEGER,
                status TEXT DEFAULT 'draft'
              );
              
              -- Create index on phone for faster lookups
              CREATE INDEX IF NOT EXISTS borrowers_phone_idx ON borrowers (phone);
              
              -- Create index on status for filtering
              CREATE INDEX IF NOT EXISTS borrowers_status_idx ON borrowers (status);
            `
          });
          
        if (createTableDirectError) {
          console.log('Direct table creation failed:', createTableDirectError);
          throw createTableDirectError;
        }
      } catch (directError) {
        // Direct SQL execution likely failed, provide SQL for manual execution
        console.log('Direct SQL execution failed, providing SQL for manual execution');
        
        return NextResponse.json({ 
          success: false, 
          message: 'To set up the database, please execute the provided SQL in the Supabase SQL editor', 
          sqlQuery: `
          CREATE TABLE IF NOT EXISTS borrowers (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            property_type TEXT NOT NULL,
            property_value NUMERIC NOT NULL,
            loan_amount NUMERIC NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            pincode TEXT NOT NULL,
            employment_type TEXT NOT NULL,
            monthly_income NUMERIC NOT NULL,
            employer_name TEXT,
            business_name TEXT,
            business_type TEXT,
            years_in_business INTEGER,
            years_with_employer INTEGER,
            status TEXT DEFAULT 'draft'
          );
          
          -- Create index on phone for faster lookups
          CREATE INDEX IF NOT EXISTS borrowers_phone_idx ON borrowers (phone);
          
          -- Create index on status for filtering
          CREATE INDEX IF NOT EXISTS borrowers_status_idx ON borrowers (status);
          `,
          errorDetails: directError
        });
      }
    } else {
      // If the execute_sql function exists, use it
      console.log('Using execute_sql RPC function to create table...');
      
      const { error: sqlError } = await supabase.rpc('execute_sql', {
        sql_query: `
          CREATE TABLE IF NOT EXISTS borrowers (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            property_type TEXT NOT NULL,
            property_value NUMERIC NOT NULL,
            loan_amount NUMERIC NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            pincode TEXT NOT NULL,
            employment_type TEXT NOT NULL,
            monthly_income NUMERIC NOT NULL,
            employer_name TEXT,
            business_name TEXT,
            business_type TEXT,
            years_in_business INTEGER,
            years_with_employer INTEGER,
            status TEXT DEFAULT 'draft'
          );
          
          -- Create index on phone for faster lookups
          CREATE INDEX IF NOT EXISTS borrowers_phone_idx ON borrowers (phone);
          
          -- Create index on status for filtering
          CREATE INDEX IF NOT EXISTS borrowers_status_idx ON borrowers (status);
        `
      });
      
      if (sqlError) {
        console.error('SQL execution error with RPC function:', sqlError);
        
        return NextResponse.json({ 
          success: false, 
          message: 'Error executing SQL with RPC function. Please run the SQL manually.',
          sqlQuery: `
          CREATE TABLE IF NOT EXISTS borrowers (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            property_type TEXT NOT NULL,
            property_value NUMERIC NOT NULL,
            loan_amount NUMERIC NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            pincode TEXT NOT NULL,
            employment_type TEXT NOT NULL,
            monthly_income NUMERIC NOT NULL,
            employer_name TEXT,
            business_name TEXT,
            business_type TEXT,
            years_in_business INTEGER,
            years_with_employer INTEGER,
            status TEXT DEFAULT 'draft'
          );
          
          -- Create index on phone for faster lookups
          CREATE INDEX IF NOT EXISTS borrowers_phone_idx ON borrowers (phone);
          
          -- Create index on status for filtering
          CREATE INDEX IF NOT EXISTS borrowers_status_idx ON borrowers (status);
          `,
          error: sqlError
        });
      }
    }
    
    // Verify the table was created successfully
    const { data: verifyTable, error: verifyError } = await supabase
      .from('borrowers')
      .select('id')
      .limit(1);
    
    if (verifyError) {
      console.error('Failed to verify table creation:', verifyError);
      return NextResponse.json({ 
        success: false, 
        message: 'Could not verify if table was created. Please check in Supabase dashboard.',
        error: verifyError
      });
    }
    
    console.log('Database tables created successfully and verified!');
    return NextResponse.json({ 
      success: true, 
      message: 'Database tables created successfully' 
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error setting up database', 
      error 
    }, { status: 500 });
  }
} 