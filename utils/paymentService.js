// Mock Payment Service - Ready for real payment gateway integration
class PaymentService {
  constructor() {
    // In a real implementation, this would be your payment provider's API key
    this.apiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock_key';
    this.isInitialized = false;
  }

  // Initialize payment provider (Stripe, PayPal, etc.)
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Mock initialization - in real app, this would load Stripe.js
      console.log('Initializing payment service...');
      await new Promise(resolve => setTimeout(resolve, 500));
      this.isInitialized = true;
      console.log('Payment service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize payment service:', error);
      throw new Error('Payment service initialization failed');
    }
  }

  // Create payment intent (for card payments)
  async createPaymentIntent(amount, currency = 'idr') {
    try {
      // Mock API call - replace with real payment provider API
      const response = await this.mockApiCall('/create-payment-intent', {
        amount: Math.round(amount * 100), // Convert to smallest currency unit
        currency: currency.toLowerCase(),
        metadata: {
          integration_check: 'accept_a_payment'
        }
      });

      return {
        clientSecret: response.client_secret,
        paymentIntentId: response.id,
        status: response.status
      };
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      throw new Error('Unable to process payment');
    }
  }

  // Confirm payment
  async confirmPayment(clientSecret, paymentMethod) {
    try {
      // Mock payment confirmation
      const result = await this.mockApiCall('/confirm-payment', {
        clientSecret,
        paymentMethod
      });

      return {
        success: result.status === 'succeeded',
        paymentIntentId: result.id,
        status: result.status
      };
    } catch (error) {
      console.error('Payment confirmation failed:', error);
      throw new Error('Payment confirmation failed');
    }
  }

  // Process bank transfer payment
  async processBankTransfer(orderId, amount) {
    try {
      // Mock bank transfer processing
      const bankDetails = {
        bankName: 'BCA',
        accountNumber: '1234567890',
        accountHolder: 'QianLun Shop',
        amount: amount,
        reference: `QL-${orderId}`,
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };

      // In real implementation, this would save to database and send email
      console.log('Bank transfer details generated:', bankDetails);

      return bankDetails;
    } catch (error) {
      console.error('Bank transfer processing failed:', error);
      throw new Error('Unable to process bank transfer');
    }
  }

  // Process cash on delivery
  async processCashOnDelivery(orderId) {
    try {
      // Mock COD processing
      const codDetails = {
        orderId,
        paymentMethod: 'cash_on_delivery',
        instructions: 'Please prepare exact change. Delivery agent will collect payment upon arrival.',
        status: 'confirmed'
      };

      console.log('Cash on delivery processed:', codDetails);
      return codDetails;
    } catch (error) {
      console.error('COD processing failed:', error);
      throw new Error('Unable to process cash on delivery');
    }
  }

  // Mock API call - replace with real HTTP requests
  async mockApiCall(endpoint, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random failures (5% chance)
        if (Math.random() < 0.05) {
          reject(new Error('Network error'));
          return;
        }

        // Mock successful responses
        switch (endpoint) {
          case '/create-payment-intent':
            resolve({
              id: `pi_mock_${Date.now()}`,
              client_secret: `pi_mock_secret_${Date.now()}`,
              status: 'requires_payment_method',
              amount: data.amount,
              currency: data.currency
            });
            break;

          case '/confirm-payment':
            resolve({
              id: `pi_mock_${Date.now()}`,
              status: 'succeeded',
              amount: data.amount || 100000,
              currency: 'idr'
            });
            break;

          default:
            resolve({ success: true });
        }
      }, 1000 + Math.random() * 2000); // 1-3 second delay
    });
  }

  // Validate payment method
  validatePaymentMethod(method, data) {
    switch (method) {
      case 'card':
        return this.validateCardData(data);
      case 'bank_transfer':
        return true; // No validation needed for bank transfer
      case 'cash_on_delivery':
        return true; // No validation needed for COD
      default:
        return false;
    }
  }

  // Validate card data
  validateCardData(cardData) {
    const { cardNumber, expiryDate, cvv, cardholderName } = cardData;

    // Basic validation - in real app, use a proper validation library
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) return false;
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
    if (!cvv || cvv.length < 3) return false;
    if (!cardholderName || cardholderName.trim().length < 2) return false;

    return true;
  }

  // Format card number with spaces
  formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  }

  // Format expiry date
  formatExpiryDate(value) {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  }
}

// Export singleton instance
export const paymentService = new PaymentService();
export default paymentService;
