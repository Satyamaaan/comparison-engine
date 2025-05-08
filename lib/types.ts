export interface Borrower {
  id?: string;
  created_at?: string;
  property_type: string;
  property_value: number;
  loan_amount: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  employment_type: string;
  monthly_income: number;
  employer_name?: string | null;
  business_name?: string | null;
  business_type?: string | null;
  years_in_business?: number | null;
  years_with_employer?: number | null;
  status?: 'draft' | 'completed' | 'approved' | 'rejected';
}

export interface BorrowerFormState {
  // Property Information
  property_type: string;
  property_value: string;
  loan_amount: string;
  
  // Personal Information
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  
  // Income Details
  employment_type: string;
  monthly_income: string;
  employer_name: string;
  business_name: string;
  business_type: string;
  years_in_business: string;
  years_with_employer: string;
}

export type BorrowerFormSection = 'property' | 'personal' | 'income' | 'confirm'; 