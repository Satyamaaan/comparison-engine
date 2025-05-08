import { createClient } from '@supabase/supabase-js';
import { Borrower } from '@/lib/types';

// Initialize the Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Borrower related database operations
 */
export const borrowerService = {
  /**
   * Create a new borrower in draft status
   */
  createBorrower: async (data: Partial<Borrower>) => {
    try {
      // Log the data we're sending to Supabase
      console.log('Creating borrower with data:', data);
      
      // Ensure all required fields are present
      const requiredFields = [
        'property_type', 'property_value', 'loan_amount',
        'first_name', 'last_name', 'email', 'phone',
        'address', 'city', 'state', 'pincode',
        'employment_type', 'monthly_income'
      ];
      
      const missingFields = requiredFields.filter(field => data[field as keyof Partial<Borrower>] === undefined);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      const { data: newBorrower, error } = await supabase
        .from('borrowers')
        .insert([{ ...data, status: 'draft' }])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error creating borrower:', error);
        throw error;
      }
      
      console.log('Successfully created borrower:', newBorrower);
      return newBorrower;
    } catch (error) {
      console.error('Error in createBorrower:', error);
      throw error;
    }
  },

  /**
   * Update an existing borrower
   */
  updateBorrower: async (id: string, data: Partial<Borrower>) => {
    try {
      console.log('Updating borrower with ID:', id, 'with data:', data);
      
      if (!id) {
        throw new Error('Borrower ID is required for update');
      }
      
      const { data: updatedBorrower, error } = await supabase
        .from('borrowers')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error updating borrower:', error);
        throw error;
      }
      
      console.log('Successfully updated borrower:', updatedBorrower);
      return updatedBorrower;
    } catch (error) {
      console.error('Error in updateBorrower:', error);
      throw error;
    }
  },

  /**
   * Get a borrower by ID
   */
  getBorrower: async (id: string) => {
    try {
      if (!id) {
        throw new Error('Borrower ID is required');
      }
      
      const { data, error } = await supabase
        .from('borrowers')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Supabase error fetching borrower:', error);
        throw error;
      }
      
      return data as Borrower;
    } catch (error) {
      console.error('Error in getBorrower:', error);
      throw error;
    }
  },

  /**
   * Complete a borrower application
   */
  completeBorrowerApplication: async (id: string) => {
    try {
      if (!id) {
        throw new Error('Borrower ID is required to complete application');
      }
      
      const { data, error } = await supabase
        .from('borrowers')
        .update({ status: 'completed' })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error completing borrower application:', error);
        throw error;
      }
      
      console.log('Successfully completed borrower application:', data);
      return data as Borrower;
    } catch (error) {
      console.error('Error in completeBorrowerApplication:', error);
      throw error;
    }
  }
}; 