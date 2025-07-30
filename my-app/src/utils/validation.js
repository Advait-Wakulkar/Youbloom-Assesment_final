// Phone number validation
export const validatePhoneNumber = (phoneNumber) => {
  const errors = [];
  
  // Check if phone number is provided
  if (!phoneNumber || phoneNumber.trim() === '') {
    errors.push('Phone number is required');
    return { isValid: false, errors };
  }
  
  // Check if it starts with country code
  if (!phoneNumber.startsWith('+')) {
    errors.push('Phone number must start with country code (e.g., +254)');
  }
  
  // Check if it starts with +254 
  if (!phoneNumber.startsWith('+254')) {
    errors.push('Phone number must start with +254');
  }
  
  // Check minimum length (country code + 9 digits = 13 characters)
  if (phoneNumber.length < 13) {
    errors.push('Phone number is too short');
  }
  
  // Check if it contains only numbers after the +
  const numberPart = phoneNumber.slice(1); // Remove the +
  if (!/^\d+$/.test(numberPart)) {
    errors.push('Phone number can only contain numbers after +');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Email validation
export const validateEmail = (email) => {
  const errors = [];
  
  if (!email || email.trim() === '') {
    errors.push('Email is required');
    return { isValid: false, errors };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Name validation
export const validateName = (name, fieldName) => {
  const errors = [];
  
  if (!name || name.trim() === '') {
    errors.push(`${fieldName} is required`);
    return { isValid: false, errors };
  }
  
  if (name.trim().length < 2) {
    errors.push(`${fieldName} must be at least 2 characters long`);
  }
  
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    errors.push(`${fieldName} can only contain letters and spaces`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate entire login form
export const validateLoginForm = (formData) => {
  const errors = {};
  
  // Validate first name
  const firstNameValidation = validateName(formData.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.errors;
  }
  
  // Validate last name
  const lastNameValidation = validateName(formData.lastName, 'Last name');
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.errors;
  }
  
  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.errors;
  }
  
  // Validate phone number
  const phoneValidation = validatePhoneNumber(formData.phoneNumber);
  if (!phoneValidation.isValid) {
    errors.phoneNumber = phoneValidation.errors;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};