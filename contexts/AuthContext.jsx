import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize users if not exists
  const initializeUsers = () => {
    const users = localStorage.getItem('qianlun_users');
    if (!users) {
      const demoUser = {
        id: 1,
        email: 'demo@qianlun.com',
        name: 'Demo User',
        password: 'demo123',
        role: 'customer',
        avatar: '/assets/images/icons/dragon-icon.png'
      };
      localStorage.setItem('qianlun_users', JSON.stringify([demoUser]));
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    initializeUsers();
    const currentUserId = localStorage.getItem('qianlun_current_user');
    if (currentUserId) {
      const users = JSON.parse(localStorage.getItem('qianlun_users') || '[]');
      const currentUser = users.find(u => u.id == currentUserId);
      if (currentUser) {
        setUser({
          id: currentUser.id,
          email: currentUser.email,
          name: currentUser.name,
          role: currentUser.role,
          avatar: currentUser.avatar
        });
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('qianlun_users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      if (foundUser) {
        setUser({
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
          avatar: foundUser.avatar
        });
        localStorage.setItem('qianlun_current_user', foundUser.id);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('qianlun_users') || '[]');
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return { success: false, error: 'Email already registered' };
      }
      const newUser = {
        id: Date.now(),
        email,
        name,
        password,
        role: 'customer',
        avatar: '/assets/images/icons/dragon-icon.png'
      };
      users.push(newUser);
      localStorage.setItem('qianlun_users', JSON.stringify(users));
      setUser({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        avatar: newUser.avatar
      });
      localStorage.setItem('qianlun_current_user', newUser.id);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('qianlun_current_user');
  };

  const updateProfile = (updates) => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('qianlun_users') || '[]');
      const userIndex = users.findIndex(u => u.id == user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('qianlun_users', JSON.stringify(users));
        setUser({
          id: users[userIndex].id,
          email: users[userIndex].email,
          name: users[userIndex].name,
          role: users[userIndex].role,
          avatar: users[userIndex].avatar
        });
      }
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
