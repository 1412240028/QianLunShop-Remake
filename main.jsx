import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { OrderHistoryProvider } from './contexts/OrderHistoryContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';

// Import global CSS
import './styles/global.css';
import './styles/Toast.css';
import './styles/Modal.css';
import './styles/mobile-responsive.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserPreferencesProvider>
      <OrderHistoryProvider>
        <WishlistProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </WishlistProvider>
      </OrderHistoryProvider>
    </UserPreferencesProvider>
  </React.StrictMode>
);