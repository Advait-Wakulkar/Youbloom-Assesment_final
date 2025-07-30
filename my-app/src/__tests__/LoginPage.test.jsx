import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';

// Helper function to render LoginPage with required providers
const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('LoginPage Component', () => {
  test('renders login form with all required fields', () => {
    console.log('Testing if login form renders correctly...');
    renderLoginPage();
    
    // Check if all form fields are present
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    
    // Check if submit button is present
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    
    console.log('✅ All form fields are rendered correctly');
  });

  test('shows validation errors for empty fields', async () => {
    console.log('Testing form validation for empty fields...');
    renderLoginPage();
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    // Try to submit form without filling any fields
    fireEvent.click(submitButton);
    
    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    });
    
    console.log('✅ Validation errors are shown correctly for empty fields');
  });

  test('shows error for invalid phone number format', async () => {
    console.log('Testing phone number validation...');
    renderLoginPage();
    
    // Fill in all fields with invalid phone number
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '1234567890' } // Invalid format
    });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Should show phone number validation error
    await waitFor(() => {
      expect(screen.getByText(/phone number must start with \+254/i)).toBeInTheDocument();
    });
    
    console.log('✅ Phone number validation works correctly');
  });

  test('accepts valid phone number format', async () => {
    console.log('Testing valid phone number acceptance...');
    renderLoginPage();
    
    // Fill in all fields with valid data
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '+254712345678' } // Valid format
    });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Should not show phone number validation errors
    await waitFor(() => {
      expect(screen.queryByText(/phone number must start with \+254/i)).not.toBeInTheDocument();
    });
    
    console.log('✅ Valid phone number is accepted');
  });

  test('form fields update when user types', () => {
    console.log('Testing form field updates...');
    renderLoginPage();
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    
    // Type in the fields
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    fireEvent.change(emailInput, { target: { value: 'jane@test.com' } });
    
    // Check if values are updated
    expect(firstNameInput.value).toBe('Jane');
    expect(emailInput.value).toBe('jane@test.com');
    
    console.log('✅ Form fields update correctly when user types');
  });
});