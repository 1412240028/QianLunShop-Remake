import React, { createContext, useContext, useReducer, useEffect } from 'react';

// User Preferences Context
const UserPreferencesContext = createContext();

// Preferences reducer
const preferencesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PREFERENCE':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };

    case 'UPDATE_MULTIPLE_PREFERENCES':
      return {
        ...state,
        ...action.payload
      };

    case 'RESET_PREFERENCES':
      return initialState;

    case 'LOAD_PREFERENCES':
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

// Initial state with default preferences
const initialState = {
  // Display preferences
  theme: 'light', // 'light' or 'dark'
  currency: 'IDR',
  language: 'id',
  
  // Shopping preferences
  defaultSortBy: 'default', // 'default', 'price-low', 'price-high', 'name'
  itemsPerPage: 12,
  gridView: 'grid', // 'grid' or 'list'
  
  // Notification preferences
  emailNotifications: true,
  orderUpdates: true,
  promotionalEmails: false,
  
  // User info (for quick checkout)
  savedAddress: null,
  savedPhone: null,
  savedEmail: null,
  
  // Recently viewed products (max 10)
  recentlyViewed: [],
  
  // Search history (max 20)
  searchHistory: []
};

// User Preferences Provider Component
export const UserPreferencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem('qianlun-preferences');
      if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: 'LOAD_PREFERENCES', payload: preferences });
      }
    } catch (error) {
      console.error('Error loading preferences from localStorage:', error);
      localStorage.removeItem('qianlun-preferences');
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('qianlun-preferences', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error);
    }
  }, [state]);

  // Preference actions
  const updatePreference = (key, value) => {
    dispatch({
      type: 'UPDATE_PREFERENCE',
      payload: { key, value }
    });
  };

  const updateMultiplePreferences = (preferences) => {
    dispatch({
      type: 'UPDATE_MULTIPLE_PREFERENCES',
      payload: preferences
    });
  };

  const resetPreferences = () => {
    dispatch({ type: 'RESET_PREFERENCES' });
  };

  // Recently viewed products
  const addRecentlyViewed = (product) => {
    const updatedRecent = [
      product,
      ...state.recentlyViewed.filter(p => p.id !== product.id)
    ].slice(0, 10); // Keep only last 10
    
    updatePreference('recentlyViewed', updatedRecent);
  };

  const clearRecentlyViewed = () => {
    updatePreference('recentlyViewed', []);
  };

  // Search history
  const addSearchQuery = (query) => {
    if (!query || query.trim() === '') return;
    
    const updatedHistory = [
      query,
      ...state.searchHistory.filter(q => q !== query)
    ].slice(0, 20); // Keep only last 20
    
    updatePreference('searchHistory', updatedHistory);
  };

  const clearSearchHistory = () => {
    updatePreference('searchHistory', []);
  };

  // User info helpers
  const saveUserInfo = (email, phone, address) => {
    updateMultiplePreferences({
      savedEmail: email,
      savedPhone: phone,
      savedAddress: address
    });
  };

  const clearUserInfo = () => {
    updateMultiplePreferences({
      savedEmail: null,
      savedPhone: null,
      savedAddress: null
    });
  };

  const value = {
    preferences: state,
    updatePreference,
    updateMultiplePreferences,
    resetPreferences,
    addRecentlyViewed,
    clearRecentlyViewed,
    addSearchQuery,
    clearSearchHistory,
    saveUserInfo,
    clearUserInfo
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

// Custom hook to use user preferences context
export const usePreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a UserPreferencesProvider');
  }
  return context;
};