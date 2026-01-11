import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Cart.css';

function Cart() {
  const {
    items: cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getShippingCost,
    getTax,
    getFinalTotal
  } = useCart();

  const subtotal = getCartTotal();
  const shipping = getShippingCost();
  const tax = getTax();
  const total = getFinalTotal();

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <section className="cart-header">
        <div className="container text-center">
          <h1>Shopping Cart</h1>
          <p>Review your items before checkout</p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="section">
        <div className="container">
          {cartItems.length === 0 ? (
            // Empty Cart
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Start shopping to add items to your cart</p>
              <Link to="/products" className="btn btn-primary">Browse Products</Link>
              <br />
              <Link to="/products" className="btn btn-secondary">Browse Best Sellers</Link>
            </div>
          ) : (
            <div className="cart-container">
              {/* Cart Items */}
              <div className="cart-items">
                <h2>Cart Items ({cartItems.length})</h2>

                {/* Cart Table Header */}
                <div className="cart-table-header">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Subtotal</span>
                  <span>Action</span>
                </div>

                {/* Cart Items List */}
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    {/* Product Info */}
                    <div className="product-info">
                      <img src={item.image} alt={`${item.name} - ${item.category} luxury item`} />
                      <div className="product-details">
                        <h3>{item.name}</h3>
                        <span>{item.category}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="item-price">
                      <span>Rp {item.price.toLocaleString('id-ID')}</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="item-subtotal">
                      <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                    </div>

                    {/* Remove Button */}
                    <div className="item-actions">
                      <button
                        className="remove-btn"
                        onClick={() => {
                          removeFromCart(item.id);
                          // Simple toast notification
                          const toast = document.createElement('div');
                          toast.className = 'toast-notification';
                          toast.textContent = `${item.name} removed from cart!`;
                          document.body.appendChild(toast);
                          setTimeout(() => toast.remove(), 3000);
                        }}
                        aria-label="Remove item from cart"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {/* Cart Actions */}
                <div className="cart-actions">
                  <Link to="/products" className="continue-shopping">← Continue Shopping</Link>
                  <button
                    onClick={() => {
                      clearCart();
                      // Simple toast notification
                      const toast = document.createElement('div');
                      toast.className = 'toast-notification';
                      toast.textContent = 'Cart cleared!';
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 3000);
                    }}
                    className="btn btn-secondary"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <h2>Order Summary</h2>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `Rp ${shipping.toLocaleString('id-ID')}`}</span>
                  </div>

                  <div className="summary-row">
                    <span>Tax (11%)</span>
                    <span>Rp {tax.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="summary-row total">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                {shipping === 0 ? (
                  <div className="shipping-info free">
                    <span>✓</span>
                    <p>You qualify for FREE shipping!</p>
                  </div>
                ) : (
                  <div className="shipping-info">
                    <span>🚚</span>
                    <p>Add Rp {(5000000 - subtotal).toLocaleString('id-ID')} more for FREE shipping</p>
                  </div>
                )}

                {/* Checkout Button */}
                <button className="checkout-btn btn btn-primary">
                  Proceed to Checkout
                </button>

                {/* Payment Methods */}
                <div className="payment-methods">
                  <div className="payment-icons">
                    <span>💳</span>
                    <span>🏦</span>
                    <span>📱</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="security-badge">
                  <span>🔒</span>
                  <p>Secure checkout guaranteed</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Products */}
      {cartItems.length > 0 && (
        <section className="recommended-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Complete Your Look</h2>
              <p className="section-subtitle">Customers who bought these items also purchased</p>
            </div>

            <div className="recommended-grid">
              {/* Recommended Product 1 */}
              <div className="recommended-card">
                <img src="/assets/images/products/shoes.png" alt="Imperial Oxford luxury shoes" />
                <div className="card-content">
                  <h3>IMPERIAL OXFORD</h3>
                  <div className="product-rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(156)</span>
                  </div>
                  <p className="price">Rp 6.250.000</p>
                  <button className="btn btn-secondary">Add to Cart</button>
                </div>
              </div>

              {/* Recommended Product 2 */}
              <div className="recommended-card">
                <img src="/assets/images/products/wallet.png" alt="Elite Cardholder luxury wallet" />
                <div className="card-content">
                  <h3>ELITE CARDHOLDER</h3>
                  <div className="product-rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(203)</span>
                  </div>
                  <p className="price">Rp 3.500.000</p>
                  <button className="btn btn-secondary">Add to Cart</button>
                </div>
              </div>

              {/* Recommended Product 3 */}
              <div className="recommended-card">
                <img src="/assets/images/products/watch.png" alt="Prestige Timepiece luxury watch" />
                <div className="card-content">
                  <h3>PRESTIGE TIMEPIECE</h3>
                  <div className="product-rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(98)</span>
                  </div>
                  <p className="price">Rp 15.000.000</p>
                  <button className="btn btn-secondary">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Cart;