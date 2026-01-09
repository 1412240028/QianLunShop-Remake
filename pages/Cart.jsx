import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

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
    <div>
      {/* Page Header */}
      <section>
        <h1>Shopping Cart</h1>
        <p>Review your items before checkout</p>
      </section>

      {/* Cart Content */}
      <section>
        {cartItems.length === 0 ? (
          // Empty Cart
          <div>
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart</p>
            <a href="/products">Browse Products</a>
          </div>
        ) : (
          <div>
            {/* Cart Items */}
            <div>
              <h2>Cart Items ({cartItems.length})</h2>

              {/* Cart Table Header */}
              <div>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span>Action</span>
              </div>

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <div key={item.id}>
                  {/* Product Info */}
                  <div>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <span>{item.category}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <span>Rp {item.price.toLocaleString('id-ID')}</span>
                  </div>

              {/* Quantity Controls */}
              <div>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              {/* Subtotal */}
              <div>
                <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>

              {/* Remove Button */}
              <div>
                <button onClick={() => removeFromCart(item.id)}>🗑️ Remove</button>
              </div>
                </div>
              ))}

              {/* Cart Actions */}
              <div>
                <Link to="/products">← Continue Shopping</Link>
                <button onClick={clearCart}>Clear Cart</button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h2>Order Summary</h2>

              <div>
                <div>
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>

                <div>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `Rp ${shipping.toLocaleString('id-ID')}`}</span>
                </div>

                <div>
                  <span>Tax (11%)</span>
                  <span>Rp {tax.toLocaleString('id-ID')}</span>
                </div>

                <div>
                  <span>Total</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Shipping Info */}
              {shipping === 0 ? (
                <div>
                  <span>✓</span>
                  <p>You qualify for FREE shipping!</p>
                </div>
              ) : (
                <div>
                  <span>🚚</span>
                  <p>Add Rp {(5000000 - subtotal).toLocaleString('id-ID')} more for FREE shipping</p>
                </div>
              )}

              {/* Checkout Button */}
              <button>Proceed to Checkout</button>

              {/* Payment Methods */}
              <div>
                <p>We accept:</p>
                <div>
                  <span>💳 Credit Card</span>
                  <span>🏦 Bank Transfer</span>
                  <span>📱 E-Wallet</span>
                </div>
              </div>

              {/* Security Badge */}
              <div>
                <span>🔒</span>
                <p>Secure checkout guaranteed</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Recommended Products */}
      {cartItems.length > 0 && (
        <section>
          <h2>Complete Your Look</h2>
          <p>Customers who bought these items also purchased</p>

          <div>
            {/* Recommended Product 1 */}
            <div>
              <img src="/assets/images/products/shoes.png" alt="Imperial Oxford" />
              <div>
                <h3>IMPERIAL OXFORD</h3>
                <span>⭐⭐⭐⭐⭐ (156)</span>
                <p>Rp 6.250.000</p>
                <button>Add to Cart</button>
              </div>
            </div>

            {/* Recommended Product 2 */}
            <div>
              <img src="/assets/images/products/wallet.png" alt="Elite Cardholder" />
              <div>
                <h3>ELITE CARDHOLDER</h3>
                <span>⭐⭐⭐⭐⭐ (203)</span>
                <p>Rp 3.500.000</p>
                <button>Add to Cart</button>
              </div>
            </div>

            {/* Recommended Product 3 */}
            <div>
              <img src="/assets/images/products/watch.png" alt="Prestige Timepiece" />
              <div>
                <h3>PRESTIGE TIMEPIECE</h3>
                <span>⭐⭐⭐⭐⭐ (98)</span>
                <p>Rp 15.000.000</p>
                <button>Add to Cart</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Cart;