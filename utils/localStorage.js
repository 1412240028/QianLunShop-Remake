/**
 * LocalStorage Utility Helper
 * Provides safe methods to interact with browser localStorage
 */

const STORAGE_KEYS = {
  CART: 'qianlun-cart',
  WISHLIST: 'qianlun-wishlist',
  ORDERS: 'qianlun-orders',
  PREFERENCES: 'qianlun-preferences',
  USER: 'qianlun-user'
};

/**
 * Check if localStorage is available
 */
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed data or default value
 */
export const getFromStorage = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const saveToStorage = (key, value) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded. Clearing old data...');
      clearOldData();
      
      // Try again after clearing
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (retryError) {
        console.error('Failed to save even after clearing:', retryError);
        return false;
      }
    }
    
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeFromStorage = (key) => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

/**
 * Clear all QianLun data from localStorage
 */
export const clearAllStorage = () => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('All QianLun data cleared from localStorage');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Clear old data to free up space (keep only recent orders)
 */
const clearOldData = () => {
  try {
    // Keep only last 10 orders
    const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    if (Array.isArray(orders) && orders.length > 10) {
      const recentOrders = orders.slice(0, 10);
      saveToStorage(STORAGE_KEYS.ORDERS, recentOrders);
    }
    
    // Clear search history if it's too large
    const preferences = getFromStorage(STORAGE_KEYS.PREFERENCES, {});
    if (preferences.searchHistory && preferences.searchHistory.length > 10) {
      preferences.searchHistory = preferences.searchHistory.slice(0, 10);
      saveToStorage(STORAGE_KEYS.PREFERENCES, preferences);
    }
  } catch (error) {
    console.error('Error clearing old data:', error);
  }
};

/**
 * Get storage usage information
 * @returns {object} Storage stats
 */
export const getStorageInfo = () => {
  if (!isLocalStorageAvailable()) {
    return { available: false };
  }

  try {
    let totalSize = 0;
    const items = {};

    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      const item = localStorage.getItem(key);
      const size = item ? new Blob([item]).size : 0;
      items[name] = {
        size: size,
        sizeKB: (size / 1024).toFixed(2)
      };
      totalSize += size;
    });

    return {
      available: true,
      totalSize: totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
      items: items,
      estimatedLimit: '5-10 MB' // Browser dependent
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { available: false, error: error.message };
  }
};

/**
 * Export all data as JSON (for backup)
 * @returns {object} All stored data
 */
export const exportAllData = () => {
  const data = {};
  
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    data[name] = getFromStorage(key);
  });
  
  return data;
};

/**
 * Import data from JSON (for restore)
 * @param {object} data - Data to import
 */
export const importAllData = (data) => {
  try {
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      if (data[name] !== undefined) {
        saveToStorage(key, data[name]);
      }
    });
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// Export storage keys for use in contexts
export { STORAGE_KEYS };

// Default export
export default {
  get: getFromStorage,
  save: saveToStorage,
  remove: removeFromStorage,
  clear: clearAllStorage,
  getInfo: getStorageInfo,
  export: exportAllData,
  import: importAllData,
  keys: STORAGE_KEYS
};