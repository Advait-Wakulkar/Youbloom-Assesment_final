import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when app starts - learned this pattern online
  useEffect(() => {
    console.log('Checking if user is already logged in...');
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    
    if (storedAuth === 'true' && storedUser) {
      console.log('Found existing session! Logging user back in automatically');
      try {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear corrupted data just in case
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
      }
    } else {
      console.log('No existing session found - user needs to login');
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log('Attempting login for phone:', userData.phoneNumber);
    
    // Mock authentication logic - just checking phone number format for now
    // TODO: In real app this would call actual auth API
    const phoneNumber = userData.phoneNumber;
    const isValidPhoneNumber = phoneNumber.startsWith('+254') && 
                              phoneNumber.length === 13 && 
                              /^\+254\d{9}$/.test(phoneNumber);
    
    if (isValidPhoneNumber) {
      console.log('Login successful! Phone number format is correct');
      const userProfile = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber
      };
      
      // Update state
      setIsAuthenticated(true);
      setUser(userProfile);
      
      // Save to localStorage so user stays logged in
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userProfile));
      console.log('User session saved to localStorage');
      
      return { success: true };
    } else {
      console.log('Login failed - phone number format is wrong');
      console.log('Expected format: +254xxxxxxxxx (13 characters total)');
      return { success: false, error: 'Please enter a valid phone number starting with +254' };
    }
  };

  const logout = () => {
    console.log('User is logging out...');
    // Clear all the state
    setIsAuthenticated(false);
    setUser(null);
    
    // Remove from localStorage so they have to login again next time
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    console.log('User session cleared from localStorage');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};