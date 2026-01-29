import React, { useState, useEffect, useReducer } from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useOrderHistory } from '../contexts/OrderHistoryContext';
import { usePreferences } from '../contexts/UserPreferencesContext';
import localStorage from '../utils/localStorage';
import ConfirmationModal from '../components/ConfirmationModal';
import useToast from '../utils/useToast';

// Reducer for confirmation modal state
const modalReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN':
      return {
        isOpen: true,
        title: action.payload.title,
        message: action.payload.message,
        onConfirm: action.payload.onConfirm,
        type: action.payload.type || 'warning',
        confirmText: action.payload.confirmText || 'Confirm',
        cancelText: action.payload.cancelText || 'Cancel'
      };
    case 'CLOSE':
      return {
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        type: 'warning',
        confirmText: 'Confirm',
        cancelText: 'Cancel'
      };
    default:
      return state;
  }
};

function Settings() {
  const [storageInfo, setStorageInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [pendingPreferences, setPendingPreferences] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [confirmModal, dispatchModal] = useReducer(modalReducer, {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'warning',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  });
  
  const { clearCart, items: cartItems, getCartTotal } = useCart();
  const { clearWishlist, items: wishlistItems } = useWishlist();
  const { clearOrderHistory, orders, getTotalSpent } = useOrderHistory();
  const { preferences, updatePreference, resetPreferences, clearUserInfo } = usePreferences();
  const { showToast } = useToast();

  useEffect(() => {
    updateStorageInfo();
  }, []);

  // Initialize pending preferences when preferences change
  useEffect(() => {
    setPendingPreferences({ ...preferences });
    setHasUnsavedChanges(false);
  }, [preferences]);

  const updateStorageInfo = () => {
    const info = localStorage.getInfo();
    setStorageInfo(info);
  };

  const showConfirmation = (config) => {
    dispatchModal({
      type: 'OPEN',
      payload: config
    });
  };

  const closeConfirmation = () => {
    dispatchModal({ type: 'CLOSE' });
  };

  const handleClearCart = () => {
    showConfirmation({
      title: 'Clear Shopping Cart?',
      message: `You are about to remove ${cartItems.length} item(s) from your cart. This action cannot be undone. Are you sure you want to continue?`,
      type: 'warning',
      confirmText: 'Yes, Clear Cart',
      cancelText: 'Cancel',
      onConfirm: () => {
        clearCart();
        showToast('🛒 Cart cleared successfully!', 'success');
        updateStorageInfo();
      }
    });
  };

  const handleClearWishlist = () => {
    showConfirmation({
      title: 'Clear Wishlist?',
      message: `You are about to remove ${wishlistItems.length} item(s) from your wishlist. You can always add them back later. Continue?`,
      type: 'warning',
      confirmText: 'Yes, Clear Wishlist',
      cancelText: 'Cancel',
      onConfirm: () => {
        clearWishlist();
        showToast('❤️ Wishlist cleared successfully!', 'success');
        updateStorageInfo();
      }
    });
  };

  const handleClearOrders = () => {
    const totalSpent = getTotalSpent();
    showConfirmation({
      title: 'Delete Order History?',
      message: `You are about to permanently delete ${orders.length} order(s) worth Rp ${totalSpent.toLocaleString('id-ID')}. This action CANNOT be undone. Are you absolutely sure?`,
      type: 'danger',
      confirmText: 'Yes, Delete History',
      cancelText: 'Keep History',
      onConfirm: () => {
        clearOrderHistory();
        showToast('📦 Order history deleted successfully!', 'success');
        updateStorageInfo();
      }
    });
  };

  const handleResetPreferences = () => {
    showConfirmation({
      title: 'Reset All Preferences?',
      message: 'This will restore all settings to their default values including theme, language, notifications, and display preferences. Your cart and orders will not be affected.',
      type: 'warning',
      confirmText: 'Yes, Reset All',
      cancelText: 'Cancel',
      onConfirm: () => {
        resetPreferences();
        showToast('⚙️ Preferences reset to default!', 'success');
        updateStorageInfo();
      }
    });
  };

  const handleClearUserInfo = () => {
    showConfirmation({
      title: 'Clear Saved User Information?',
      message: 'This will remove your saved email, phone number, and address. You will need to enter this information again during checkout.',
      type: 'info',
      confirmText: 'Yes, Clear Info',
      cancelText: 'Cancel',
      onConfirm: () => {
        clearUserInfo();
        showToast('👤 User information cleared!', 'success');
      }
    });
  };

  const handleClearAllData = () => {
    showConfirmation({
      title: '⚠️ DELETE ALL DATA?',
      message: `🚨 CRITICAL WARNING: This will PERMANENTLY delete ALL your data including ${cartItems.length} cart items, ${wishlistItems.length} wishlist items, ${orders.length} orders, and all preferences. This action is IRREVERSIBLE and CANNOT be undone. Are you absolutely certain?`,
      type: 'danger',
      confirmText: 'YES, DELETE EVERYTHING',
      cancelText: 'No, Keep My Data',
      onConfirm: () => {
        // Second confirmation for critical action
        showConfirmation({
          title: '⚠️ FINAL CONFIRMATION',
          message: '🛑 Last chance! This is your final warning. ALL data will be permanently deleted. Click "CONFIRM DELETE" to proceed or "CANCEL" to abort.',
          type: 'danger',
          confirmText: 'CONFIRM DELETE',
          cancelText: 'CANCEL',
          onConfirm: () => {
            localStorage.clear();
            clearCart();
            clearWishlist();
            clearOrderHistory();
            resetPreferences();
            showToast('🗑️ All data has been permanently deleted!', 'success');
            updateStorageInfo();
          }
        });
      }
    });
  };

  const handleExportData = () => {
    showConfirmation({
      title: 'Export All Data?',
      message: 'This will download a backup file containing all your cart items, wishlist, order history, and preferences. The file will be saved to your Downloads folder.',
      type: 'info',
      confirmText: 'Yes, Export Now',
      cancelText: 'Cancel',
      onConfirm: () => {
        const data = localStorage.export();
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `qianlun-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        showToast('📥 Data exported successfully!', 'success');
      }
    });
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    showConfirmation({
      title: 'Import Backup Data?',
      message: `⚠️ This will REPLACE all your current data with the data from "${file.name}". Your existing cart, wishlist, orders, and preferences will be overwritten. Make sure you have a backup of your current data before proceeding.`,
      type: 'warning',
      confirmText: 'Yes, Import & Replace',
      cancelText: 'Cancel',
      onConfirm: () => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            const success = localStorage.import(data);
            
            if (success) {
              showToast('📤 Data imported successfully! Refreshing page...', 'success');
              setTimeout(() => window.location.reload(), 2000);
            } else {
              showToast('❌ Failed to import data. Please check the file format.', 'error');
            }
          } catch (error) {
            console.error('Import error:', error);
            showToast('❌ Error: Invalid backup file format.', 'error');
          }
        };
        reader.readAsText(file);
      }
    });

    // Reset input so same file can be selected again
    event.target.value = '';
  };

  // Handle pending preference changes
  const handlePendingPreferenceChange = (key, value) => {
    if (!pendingPreferences) return;

    const updated = { ...pendingPreferences, [key]: value };
    setPendingPreferences(updated);

    // Check if there are unsaved changes
    const hasChanges = JSON.stringify(updated) !== JSON.stringify(preferences);
    setHasUnsavedChanges(hasChanges);
  };

  // Save settings with confirmation
  const handleSaveSettings = () => {
    if (!hasUnsavedChanges || !pendingPreferences) return;

    showConfirmation({
      title: 'Save Settings?',
      message: 'Your preference changes will be saved and applied immediately. Continue?',
      type: 'info',
      confirmText: 'Yes, Save Settings',
      cancelText: 'Cancel',
      onConfirm: () => {
        // Apply all pending changes
        Object.entries(pendingPreferences).forEach(([key, value]) => {
          if (preferences[key] !== value) {
            updatePreference(key, value);
          }
        });

        setHasUnsavedChanges(false);
        showToast('⚙️ Settings saved successfully!', 'success');
      }
    });
  };

  // Discard changes
  const handleDiscardChanges = () => {
    if (!hasUnsavedChanges) return;

    showConfirmation({
      title: 'Discard Changes?',
      message: 'Your unsaved preference changes will be lost. Continue?',
      type: 'warning',
      confirmText: 'Yes, Discard',
      cancelText: 'Keep Changes',
      onConfirm: () => {
        setPendingPreferences({ ...preferences });
        setHasUnsavedChanges(false);
        showToast('🔄 Changes discarded!', 'success');
      }
    });
  };



  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="section-header">
            <h1 className="section-title">Settings & Data Management</h1>
            <p className="section-subtitle">Manage your preferences and stored data</p>
          </div>

          {/* Tabs */}
          <div className="settings-tabs" style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '2rem',
            borderBottom: '2px solid var(--gray-light)',
            flexWrap: 'wrap'
          }}>
            <button
              className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === 'general' ? 'var(--gold)' : 'transparent',
                color: activeTab === 'general' ? 'var(--primary-black)' : 'var(--gray)',
                border: 'none',
                borderBottom: activeTab === 'general' ? '3px solid var(--gold)' : 'none',
                cursor: 'pointer',
                fontWeight: '600',
                marginBottom: '-2px',
                fontFamily: 'var(--font-secondary)',
                fontSize: '1rem'
              }}
            >
              📊 General
            </button>
            <button
              className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === 'preferences' ? 'var(--gold)' : 'transparent',
                color: activeTab === 'preferences' ? 'var(--primary-black)' : 'var(--gray)',
                border: 'none',
                borderBottom: activeTab === 'preferences' ? '3px solid var(--gold)' : 'none',
                cursor: 'pointer',
                fontWeight: '600',
                marginBottom: '-2px',
                fontFamily: 'var(--font-secondary)',
                fontSize: '1rem'
              }}
            >
              ⚙️ Preferences
            </button>
            <button
              className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
              onClick={() => setActiveTab('data')}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === 'data' ? 'var(--gold)' : 'transparent',
                color: activeTab === 'data' ? 'var(--primary-black)' : 'var(--gray)',
                border: 'none',
                borderBottom: activeTab === 'data' ? '3px solid var(--gold)' : 'none',
                cursor: 'pointer',
                fontWeight: '600',
                marginBottom: '-2px',
                fontFamily: 'var(--font-secondary)',
                fontSize: '1rem'
              }}
            >
              💾 Data & Storage
            </button>
          </div>

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="settings-content">
              <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-secondary)' }}>📈 Data Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ padding: '1.5rem', background: 'var(--off-white)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--gray)', fontSize: '0.9rem', fontWeight: '600' }}>🛒 Cart Items</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-black)', margin: '0.5rem 0' }}>{cartItems.length}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray)', margin: 0 }}>Rp {getCartTotal().toLocaleString('id-ID')}</p>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'var(--off-white)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--gray)', fontSize: '0.9rem', fontWeight: '600' }}>❤️ Wishlist Items</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-black)', margin: '0.5rem 0' }}>{wishlistItems.length}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray)', margin: 0 }}>Saved products</p>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'var(--off-white)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--gray)', fontSize: '0.9rem', fontWeight: '600' }}>📦 Total Orders</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-black)', margin: '0.5rem 0' }}>{orders.length}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray)', margin: 0 }}>Rp {getTotalSpent().toLocaleString('id-ID')}</p>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'var(--off-white)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--gray)', fontSize: '0.9rem', fontWeight: '600' }}>💾 Storage Used</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-black)', margin: '0.5rem 0' }}>
                      {storageInfo?.totalSizeKB || '0'} KB
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray)', margin: 0 }}>{storageInfo?.totalSizeMB || '0'} MB total</p>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-secondary)' }}>⚡ Quick Actions</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <button 
                    onClick={handleClearCart}
                    className="btn btn-secondary"
                    disabled={cartItems.length === 0}
                    style={{ 
                      opacity: cartItems.length === 0 ? 0.5 : 1,
                      cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    🛒 Clear Cart ({cartItems.length} items)
                  </button>
                  <button 
                    onClick={handleClearWishlist}
                    className="btn btn-secondary"
                    disabled={wishlistItems.length === 0}
                    style={{ 
                      opacity: wishlistItems.length === 0 ? 0.5 : 1,
                      cursor: wishlistItems.length === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    ❤️ Clear Wishlist ({wishlistItems.length} items)
                  </button>
                  <button 
                    onClick={handleClearOrders}
                    className="btn btn-secondary"
                    disabled={orders.length === 0}
                    style={{ 
                      opacity: orders.length === 0 ? 0.5 : 1,
                      cursor: orders.length === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    📦 Clear Order History ({orders.length} orders)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="settings-content">
              <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-secondary)' }}>🎨 Display Preferences</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Theme</label>
                    <select
                      value={pendingPreferences?.theme || preferences.theme}
                      onChange={(e) => handlePendingPreferenceChange('theme', e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--gray-light)', borderRadius: '4px', fontSize: '1rem' }}
                    >
                      <option value="light">☀️ Light</option>
                      <option value="dark">🌙 Dark</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Language</label>
                    <select
                      value={pendingPreferences?.language || preferences.language}
                      onChange={(e) => handlePendingPreferenceChange('language', e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--gray-light)', borderRadius: '4px', fontSize: '1rem' }}
                    >
                      <option value="id">🇮🇩 Bahasa Indonesia</option>
                      <option value="en">🇺🇸 English</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Default Sort By</label>
                    <select
                      value={pendingPreferences?.defaultSortBy || preferences.defaultSortBy}
                      onChange={(e) => handlePendingPreferenceChange('defaultSortBy', e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--gray-light)', borderRadius: '4px', fontSize: '1rem' }}
                    >
                      <option value="default">Default</option>
                      <option value="price-low">💰 Price: Low to High</option>
                      <option value="price-high">💎 Price: High to Low</option>
                      <option value="name">🔤 Name: A to Z</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-secondary)' }}>🔔 Notification Preferences</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '0.75rem', background: 'var(--off-white)', borderRadius: '6px' }}>
                    <input
                      type="checkbox"
                      checked={pendingPreferences?.emailNotifications ?? preferences.emailNotifications}
                      onChange={(e) => handlePendingPreferenceChange('emailNotifications', e.target.checked)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '1rem' }}>📧 Email Notifications</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '0.75rem', background: 'var(--off-white)', borderRadius: '6px' }}>
                    <input
                      type="checkbox"
                      checked={pendingPreferences?.orderUpdates ?? preferences.orderUpdates}
                      onChange={(e) => handlePendingPreferenceChange('orderUpdates', e.target.checked)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '1rem' }}>📦 Order Updates</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '0.75rem', background: 'var(--off-white)', borderRadius: '6px' }}>
                    <input
                      type="checkbox"
                      checked={pendingPreferences?.promotionalEmails ?? preferences.promotionalEmails}
                      onChange={(e) => handlePendingPreferenceChange('promotionalEmails', e.target.checked)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '1rem' }}>🎁 Promotional Emails</span>
                  </label>
                </div>
              </div>

              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {hasUnsavedChanges && (
                    <div style={{
                      padding: '1rem',
                      background: '#fff3cd',
                      border: '2px solid #ffc107',
                      borderRadius: '6px',
                      marginBottom: '1rem'
                    }}>
                      <p style={{ margin: '0', color: '#856404', fontWeight: '600' }}>
                        ⚠️ You have unsaved changes. Save your settings to apply them.
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <button
                      onClick={handleSaveSettings}
                      disabled={!hasUnsavedChanges}
                      className="btn btn-primary"
                      style={{
                        opacity: hasUnsavedChanges ? 1 : 0.5,
                        cursor: hasUnsavedChanges ? 'pointer' : 'not-allowed'
                      }}
                    >
                      💾 Save Settings
                    </button>
                    <button
                      onClick={handleDiscardChanges}
                      disabled={!hasUnsavedChanges}
                      className="btn btn-secondary"
                      style={{
                        opacity: hasUnsavedChanges ? 1 : 0.5,
                        cursor: hasUnsavedChanges ? 'pointer' : 'not-allowed'
                      }}
                    >
                      🔄 Discard Changes
                    </button>
                  </div>

                  <button onClick={handleResetPreferences} className="btn btn-secondary">
                    ♻️ Reset All Preferences to Default
                  </button>
                  {(preferences.savedEmail || preferences.savedPhone || preferences.savedAddress) && (
                    <button onClick={handleClearUserInfo} className="btn btn-secondary">
                      👤 Clear Saved User Information
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Data & Storage Tab */}
          {activeTab === 'data' && (
            <div className="settings-content">
              <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-secondary)' }}>💾 Storage Information</h3>
                {storageInfo && storageInfo.available ? (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'var(--off-white)', borderRadius: '6px' }}>
                      <p style={{ margin: '0.5rem 0' }}><strong>📊 Total Storage Used:</strong> {storageInfo.totalSizeKB} KB ({storageInfo.totalSizeMB} MB)</p>
                      <p style={{ margin: '0.5rem 0' }}><strong>📏 Estimated Browser Limit:</strong> {storageInfo.estimatedLimit}</p>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <h4 style={{ marginBottom: '0.75rem', fontFamily: 'var(--font-secondary)' }}>📂 Storage Breakdown:</h4>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {Object.entries(storageInfo.items).map(([key, value]) => (
                          <div key={key} style={{ padding: '0.75rem', background: 'var(--off-white)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
                            <strong>{key}:</strong>
                            <span>{value.sizeKB} KB</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'var(--gray)' }}>❌ localStorage is not available in your browser.</p>
                )}
              </div>

              <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-secondary)' }}>💼 Backup & Restore</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <button onClick={handleExportData} className="btn btn-primary">
                    📥 Export All Data (Backup)
                  </button>
                  <div>
                    <label htmlFor="import-file" className="btn btn-secondary" style={{ cursor: 'pointer', display: 'inline-block', width: '100%', textAlign: 'center' }}>
                      📤 Import Data (Restore)
                    </label>
                    <input
                      id="import-file"
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginTop: '0.5rem', padding: '1rem', background: 'var(--off-white)', borderRadius: '6px', borderLeft: '4px solid var(--gold)' }}>
                    ℹ️ <strong>Tip:</strong> You can backup your data as a JSON file and restore it later if needed. This is useful before clearing browser data or switching devices.
                  </p>
                </div>
              </div>

              <div className="card" style={{ padding: '2rem', background: '#fff5f5', border: '3px solid #e74c3c' }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#e74c3c', fontFamily: 'var(--font-secondary)' }}>⚠️ Danger Zone</h3>
                <p style={{ marginBottom: '1rem', color: 'var(--gray-dark)', fontSize: '1rem' }}>
                  ⛔ <strong>WARNING:</strong> This action is permanent and cannot be undone. All your cart items ({cartItems.length}), wishlist items ({wishlistItems.length}), orders ({orders.length}), and preferences will be permanently deleted.
                </p>
                <button 
                  onClick={handleClearAllData}
                  style={{
                    background: '#e74c3c',
                    color: 'white',
                    border: '2px solid #e74c3c',
                    padding: '1rem 2rem',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-secondary)',
                    width: '100%',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#c0392b';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#e74c3c';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  🗑️ Delete All Data Permanently
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmation}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
      />
    </div>
  );
}

export default Settings;