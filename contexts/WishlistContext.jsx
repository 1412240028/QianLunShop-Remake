import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Wishlist Context
const WishlistContext = createContext();

// Wishlist reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      // Check if item already exists
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        return state; // Don't add duplicate
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      };

    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: []
};

// Wishlist Provider Component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('qianlun-wishlist');
      if (savedWishlist) {
        const wishlistItems = JSON.parse(savedWishlist);
        if (Array.isArray(wishlistItems) && wishlistItems.length > 0) {
          dispatch({ type: 'LOAD_WISHLIST', payload: wishlistItems });
        }
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      localStorage.removeItem('qianlun-wishlist');
    }
  }, []);

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('qianlun-wishlist', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [state.items]);

  // Wishlist actions
  const addToWishlist = (product) => {
    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: product
    });
  };

  const removeFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id) => {
    return state.items.some(item => item.id === id);
  };

  const getWishlistCount = () => {
    return state.items.length;
  };

  const value = {
    items: state.items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};