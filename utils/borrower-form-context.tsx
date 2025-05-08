'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BorrowerFormState, BorrowerFormSection } from '@/lib/types';
import { borrowerService } from './supabase';

// Default empty state for the form
const defaultFormState: BorrowerFormState = {
  // Property Information
  property_type: '',
  property_value: '',
  loan_amount: '',
  
  // Personal Information
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  
  // Income Details
  employment_type: '',
  monthly_income: '',
  employer_name: '',
  business_name: '',
  business_type: '',
  years_in_business: '',
  years_with_employer: '',
};

interface BorrowerFormContextProps {
  formState: BorrowerFormState;
  currentStep: BorrowerFormSection;
  isLoading: boolean;
  borrowerId: string | null;
  updateFormField: (field: keyof BorrowerFormState, value: string) => void;
  updateFormSection: (section: BorrowerFormSection, data: Partial<BorrowerFormState>) => void;
  saveFormData: () => Promise<void>;
  submitApplication: () => Promise<void>;
  setCurrentStep: (step: BorrowerFormSection) => void;
}

// Create the context
const BorrowerFormContext = createContext<BorrowerFormContextProps | undefined>(undefined);

// Provider component
export const BorrowerFormProvider = ({ children }: { children: ReactNode }) => {
  const [formState, setFormState] = useState<BorrowerFormState>(defaultFormState);
  const [currentStep, setCurrentStep] = useState<BorrowerFormSection>('property');
  const [isLoading, setIsLoading] = useState(false);
  const [borrowerId, setBorrowerId] = useState<string | null>(null);

  // Load form state from localStorage on initial load
  useEffect(() => {
    const savedFormState = localStorage.getItem('borrowerFormState');
    const savedBorrowerId = localStorage.getItem('borrowerId');
    
    if (savedFormState) {
      try {
        setFormState(JSON.parse(savedFormState));
      } catch (error) {
        console.error('Error parsing saved form state:', error);
        // Continue with default state if parsing fails
      }
    }
    
    if (savedBorrowerId) {
      setBorrowerId(savedBorrowerId);
    }
  }, []);

  // Save form state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('borrowerFormState', JSON.stringify(formState));
      
      if (borrowerId) {
        localStorage.setItem('borrowerId', borrowerId);
      }
    } catch (error) {
      console.error('Error saving form state to localStorage:', error);
      // Continue without saving to localStorage
    }
  }, [formState, borrowerId]);

  // Update a single form field
  const updateFormField = (field: keyof BorrowerFormState, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  // Update a whole section of the form
  const updateFormSection = (section: BorrowerFormSection, data: Partial<BorrowerFormState>) => {
    setFormState((prevState) => ({
      ...prevState,
      ...data
    }));
  };

  // Save form data to Supabase (either create or update)
  const saveFormData = async () => {
    try {
      setIsLoading(true);
      
      // Prepare borrower data based on the current step
      let borrowerData: any = {};
      
      // Always include property data if available
      if (formState.property_type) {
        borrowerData.property_type = formState.property_type;
        
        if (formState.property_value) {
          try {
            borrowerData.property_value = parseFloat(formState.property_value);
            if (isNaN(borrowerData.property_value)) {
              borrowerData.property_value = 0;
            }
          } catch (e) {
            borrowerData.property_value = 0;
          }
        }
        
        if (formState.loan_amount) {
          try {
            borrowerData.loan_amount = parseFloat(formState.loan_amount);
            if (isNaN(borrowerData.loan_amount)) {
              borrowerData.loan_amount = 0;
            }
          } catch (e) {
            borrowerData.loan_amount = 0;
          }
        }
      }
      
      // Include personal info if available
      if (formState.first_name) borrowerData.first_name = formState.first_name;
      if (formState.last_name) borrowerData.last_name = formState.last_name;
      if (formState.email) borrowerData.email = formState.email;
      if (formState.phone) borrowerData.phone = formState.phone;
      if (formState.address) borrowerData.address = formState.address;
      if (formState.city) borrowerData.city = formState.city;
      if (formState.state) borrowerData.state = formState.state;
      if (formState.pincode) borrowerData.pincode = formState.pincode;
      
      // Include income details if available
      if (formState.employment_type) borrowerData.employment_type = formState.employment_type;
      
      if (formState.monthly_income) {
        try {
          borrowerData.monthly_income = parseFloat(formState.monthly_income);
          if (isNaN(borrowerData.monthly_income)) {
            borrowerData.monthly_income = 0;
          }
        } catch (e) {
          borrowerData.monthly_income = 0;
        }
      }
      
      if (formState.employer_name) borrowerData.employer_name = formState.employer_name || null;
      if (formState.business_name) borrowerData.business_name = formState.business_name || null;
      if (formState.business_type) borrowerData.business_type = formState.business_type || null;
      
      if (formState.years_in_business) {
        try {
          borrowerData.years_in_business = parseInt(formState.years_in_business) || null;
        } catch (e) {
          borrowerData.years_in_business = null;
        }
      }
      
      if (formState.years_with_employer) {
        try {
          borrowerData.years_with_employer = parseInt(formState.years_with_employer) || null;
        } catch (e) {
          borrowerData.years_with_employer = null;
        }
      }
      
      // Check if we're updating an existing record or creating a new one
      if (borrowerId) {
        // Update existing borrower
        console.log('Updating borrower data:', borrowerData);
        await borrowerService.updateBorrower(borrowerId, borrowerData);
      } else {
        // Create new borrower - handle partial data based on current step
        console.log('Creating new borrower data:', borrowerData);
        
        // Only save property data as required minimum if we're in property step
        if (currentStep === 'property') {
          // Make sure we have the minimum required fields
          if (!borrowerData.property_type) throw new Error('Property type is required');
          if (!borrowerData.property_value && borrowerData.property_value !== 0) {
            borrowerData.property_value = 0;
          }
          if (!borrowerData.loan_amount && borrowerData.loan_amount !== 0) {
            borrowerData.loan_amount = 0;
          }
          
          // Add placeholder values for required fields to pass database constraints
          // These will be updated in subsequent steps
          if (!borrowerData.first_name) borrowerData.first_name = 'Pending';
          if (!borrowerData.last_name) borrowerData.last_name = 'Pending';
          if (!borrowerData.email) borrowerData.email = 'pending@example.com';
          if (!borrowerData.phone) borrowerData.phone = '0000000000';
          if (!borrowerData.address) borrowerData.address = 'Pending';
          if (!borrowerData.city) borrowerData.city = 'Pending';
          if (!borrowerData.state) borrowerData.state = 'Pending';
          if (!borrowerData.pincode) borrowerData.pincode = 'Pending';
          if (!borrowerData.employment_type) borrowerData.employment_type = 'Pending';
          if (!borrowerData.monthly_income && borrowerData.monthly_income !== 0) {
            borrowerData.monthly_income = 0;
          }
        }
        
        const newBorrower = await borrowerService.createBorrower(borrowerData);
        setBorrowerId(newBorrower.id);
      }
    } catch (error) {
      console.error('Error saving borrower data:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Submit the completed application
  const submitApplication = async () => {
    if (!borrowerId) {
      throw new Error('Cannot submit application without a borrower ID');
    }
    
    try {
      setIsLoading(true);
      await saveFormData(); // Save the latest data first
      await borrowerService.completeBorrowerApplication(borrowerId);
      
      // Clear the localStorage after successful submission
      localStorage.removeItem('borrowerFormState');
      localStorage.removeItem('borrowerId');
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BorrowerFormContext.Provider
      value={{
        formState,
        currentStep,
        isLoading,
        borrowerId,
        updateFormField,
        updateFormSection,
        saveFormData,
        submitApplication,
        setCurrentStep,
      }}
    >
      {children}
    </BorrowerFormContext.Provider>
  );
};

// Custom hook to use the borrower form context
export const useBorrowerForm = () => {
  const context = useContext(BorrowerFormContext);
  
  if (context === undefined) {
    throw new Error('useBorrowerForm must be used within a BorrowerFormProvider');
  }
  
  return context;
}; 