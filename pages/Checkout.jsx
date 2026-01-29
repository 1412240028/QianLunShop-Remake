import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrderHistory } from '../contexts/OrderHistoryContext';
import { useAuth } from '../contexts/AuthContext';
import useToast from '../utils/useToast';
import { paymentService } from '../utils/paymentService';
import '../styles/Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { items: cartItems, clearCart, getCartTotal, getShippingCost, getTax, getFinalTotal } = useCart();
  const { addOrder } = useOrderHistory();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Indonesia'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal ? getCartTotal() : 0;
  const shipping = getShippingCost ? getShippingCost() : 0;
  const tax = getTax ? getTax() : 0;
  const total = getFinalTotal ? getFinalTotal() : 0;

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    return required.every(field => billingInfo[field].trim() !== '');
  };

  const validateStep2 = () => {
    if (paymentMethod === 'card') {
      return cardInfo.cardNumber && cardInfo.expiryDate && cardInfo.cvv && cardInfo.cardholderName;
    }
    return true; // Other payment methods don't need validation
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);

    try {
      let paymentResult = null;

      // Process payment based on method
      if (paymentMethod === 'card') {
        // Initialize payment service if needed
        await paymentService.initialize();

        // Create payment intent
        const paymentIntent = await paymentService.createPaymentIntent(total);

        // Confirm payment
        paymentResult = await paymentService.confirmPayment(
          paymentIntent.clientSecret,
          {
            cardNumber: cardInfo.cardNumber.replace(/\s/g, ''),
            expiryDate: cardInfo.expiryDate,
            cvv: cardInfo.cvv,
            cardholderName: cardInfo.cardholderName
          }
        );

        if (!paymentResult.success) {
          throw new Error('Payment failed');
        }
      } else if (paymentMethod === 'bank') {
        // Process bank transfer
        const orderId = Date.now();
        paymentResult = await paymentService.processBankTransfer(orderId, total);
      } else if (paymentMethod === 'cod') {
        // Process cash on delivery
        const orderId = Date.now();
        paymentResult = await paymentService.processCashOnDelivery(orderId);
      }

      // Create order data
      const orderData = {
        id: Date.now(),
        items: cartItems,
        billingInfo,
        paymentMethod,
        paymentResult,
        subtotal,
        shipping,
        tax,
        total,
        status: 'confirmed',
        date: new Date().toISOString()
      };

      // Save order
      addOrder(orderData);
      clearCart();

      showToast('Order placed successfully!', 'success');
      navigate('/settings'); // Redirect to settings to see order history

    } catch (error) {
      console.error('Order processing failed:', error);
      showToast('Payment failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container text-center">
          <h1>Your cart is empty</h1>
          <p>Add some items to your cart before checking out.</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section className="checkout-header">
        <div className="container">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Billing</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Payment</span>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirm</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="checkout-layout">
            {/* Main Content */}
            <div className="checkout-main">
              {/* Step 1: Billing Information */}
              {currentStep === 1 && (
                <div className="checkout-step">
                  <h2>Billing Information</h2>
                  <div className="billing-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={billingInfo.firstName}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name *</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={billingInfo.lastName}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={billingInfo.email}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={billingInfo.phone}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address *</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={billingInfo.address}
                        onChange={handleBillingChange}
                        placeholder="Street address"
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="city">City *</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={billingInfo.city}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="postalCode">Postal Code *</label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={billingInfo.postalCode}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">Country *</label>
                      <select
                        id="country"
                        name="country"
                        value={billingInfo.country}
                        onChange={handleBillingChange}
                      >
                        <option value="Indonesia">Indonesia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Malaysia">Malaysia</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="checkout-step">
                  <h2>Payment Information</h2>
                  <div className="payment-methods">
                    <div className="payment-method-options">
                      <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>💳 Credit/Debit Card</span>
                      </label>
                      <label className={`payment-option ${paymentMethod === 'bank' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          value="bank"
                          checked={paymentMethod === 'bank'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>🏦 Bank Transfer</span>
                      </label>
                      <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>🚚 Cash on Delivery</span>
                      </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="card-form">
                        <div className="form-group">
                          <label htmlFor="cardholderName">Cardholder Name *</label>
                          <input
                            type="text"
                            id="cardholderName"
                            name="cardholderName"
                            value={cardInfo.cardholderName}
                            onChange={handleCardChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="cardNumber">Card Number *</label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={cardInfo.cardNumber}
                            onChange={handleCardChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            required
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date *</label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={cardInfo.expiryDate}
                              onChange={handleCardChange}
                              placeholder="MM/YY"
                              maxLength="5"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="cvv">CVV *</label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={cardInfo.cvv}
                              onChange={handleCardChange}
                              placeholder="123"
                              maxLength="4"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'bank' && (
                      <div className="payment-info">
                        <p>You will receive bank transfer details after placing the order.</p>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="payment-info">
                        <p>You will pay in cash when your order is delivered.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Order Confirmation */}
              {currentStep === 3 && (
                <div className="checkout-step">
                  <h2>Confirm Your Order</h2>
                  <div className="order-confirmation">
                    <div className="confirmation-section">
                      <h3>Shipping Address</h3>
                      <p>
                        {billingInfo.firstName} {billingInfo.lastName}<br />
                        {billingInfo.address}<br />
                        {billingInfo.city}, {billingInfo.postalCode}<br />
                        {billingInfo.country}
                      </p>
                    </div>

                    <div className="confirmation-section">
                      <h3>Payment Method</h3>
                      <p>
                        {paymentMethod === 'card' && `💳 Card ending in ${cardInfo.cardNumber.slice(-4)}`}
                        {paymentMethod === 'bank' && '🏦 Bank Transfer'}
                        {paymentMethod === 'cod' && '🚚 Cash on Delivery'}
                      </p>
                    </div>

                    <div className="confirmation-section">
                      <h3>Contact Information</h3>
                      <p>
                        Email: {billingInfo.email}<br />
                        Phone: {billingInfo.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="checkout-navigation">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-secondary"
                  >
                    ← Back
                  </button>
                )}

                {currentStep < 3 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary"
                    disabled={
                      (currentStep === 1 && !validateStep1()) ||
                      (currentStep === 2 && !validateStep2())
                    }
                  >
                    Continue →
                  </button>
                )}

                {currentStep === 3 && (
                  <button
                    type="button"
                    onClick={handleSubmitOrder}
                    className="btn btn-primary"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Place Order - Rp ${total.toLocaleString('id-ID')}`}
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="checkout-sidebar">
              <div className="order-summary-card">
                <h3>Order Summary</h3>

                <div className="order-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p className="item-price">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `Rp ${shipping.toLocaleString('id-ID')}`}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax (11%)</span>
                    <span>Rp {tax.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="total-row total">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
