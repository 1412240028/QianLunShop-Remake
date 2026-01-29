// Mock API Service - Ready for real backend integration
class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.qianlunshop.com';
    this.isInitialized = false;
  }

  // Initialize API service
  async initialize() {
    if (this.isInitialized) return;

    try {
      console.log('Initializing API service...');
      // In real implementation, this might set up authentication headers, etc.
      await new Promise(resolve => setTimeout(resolve, 300));
      this.isInitialized = true;
      console.log('API service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize API service:', error);
      throw new Error('API service initialization failed');
    }
  }

  // Generic API request handler
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      };

      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

      // Simulate random network errors (2% chance)
      if (Math.random() < 0.02) {
        throw new Error('Network error');
      }

      // Mock responses based on endpoint
      return this.mockResponse(endpoint, config);
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Mock response generator
  mockResponse(endpoint, config) {
    const method = config.method || 'GET';

    // Products endpoints
    if (endpoint.startsWith('/products')) {
      return this.handleProductsEndpoint(endpoint, method, config);
    }

    // Orders endpoints
    if (endpoint.startsWith('/orders')) {
      return this.handleOrdersEndpoint(endpoint, method, config);
    }

    // Users endpoints
    if (endpoint.startsWith('/users') || endpoint.startsWith('/auth')) {
      return this.handleUsersEndpoint(endpoint, method, config);
    }

    // Analytics endpoints
    if (endpoint.startsWith('/analytics')) {
      return this.handleAnalyticsEndpoint(endpoint, method, config);
    }

    // Default response
    return { success: true, data: null };
  }

  // Products API handlers
  handleProductsEndpoint(endpoint, method, config) {
    switch (method) {
      case 'GET':
        if (endpoint === '/products') {
          // Get all products with pagination
          const page = config.params?.page || 1;
          const limit = config.params?.limit || 12;
          const category = config.params?.category;
          const search = config.params?.search;

          let products = this.getMockProducts();

          // Apply filters
          if (category) {
            products = products.filter(p => p.category === category);
          }
          if (search) {
            products = products.filter(p =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.description.toLowerCase().includes(search.toLowerCase())
            );
          }

          // Apply pagination
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedProducts = products.slice(startIndex, endIndex);

          return {
            success: true,
            data: {
              products: paginatedProducts,
              pagination: {
                page,
                limit,
                total: products.length,
                pages: Math.ceil(products.length / limit)
              }
            }
          };
        } else if (endpoint.match(/^\/products\/\d+$/)) {
          // Get single product
          const id = parseInt(endpoint.split('/')[2]);
          const product = this.getMockProducts().find(p => p.id === id);

          if (product) {
            return { success: true, data: product };
          } else {
            throw new Error('Product not found');
          }
        }
        break;

      case 'POST':
        if (endpoint === '/products') {
          // Create product (admin only)
          const newProduct = {
            id: Date.now(),
            ...JSON.parse(config.body),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          return { success: true, data: newProduct };
        }
        break;

      case 'PUT':
        if (endpoint.match(/^\/products\/\d+$/)) {
          // Update product
          const id = parseInt(endpoint.split('/')[2]);
          const updates = JSON.parse(config.body);
          return {
            success: true,
            data: {
              id,
              ...updates,
              updatedAt: new Date().toISOString()
            }
          };
        }
        break;

      case 'DELETE':
        if (endpoint.match(/^\/products\/\d+$/)) {
          // Delete product
          return { success: true, message: 'Product deleted successfully' };
        }
        break;
    }
  }

  // Orders API handlers
  handleOrdersEndpoint(endpoint, method, config) {
    switch (method) {
      case 'GET':
        if (endpoint === '/orders') {
          // Get user orders
          const userId = config.params?.userId;
          let orders = this.getMockOrders();

          if (userId) {
            orders = orders.filter(o => o.userId === userId);
          }

          return { success: true, data: orders };
        } else if (endpoint.match(/^\/orders\/\d+$/)) {
          // Get single order
          const id = parseInt(endpoint.split('/')[2]);
          const order = this.getMockOrders().find(o => o.id === id);

          if (order) {
            return { success: true, data: order };
          } else {
            throw new Error('Order not found');
          }
        }
        break;

      case 'POST':
        if (endpoint === '/orders') {
          // Create order
          const orderData = JSON.parse(config.body);
          const newOrder = {
            id: Date.now(),
            ...orderData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          return { success: true, data: newOrder };
        }
        break;

      case 'PUT':
        if (endpoint.match(/^\/orders\/\d+$/)) {
          // Update order status
          const id = parseInt(endpoint.split('/')[2]);
          const updates = JSON.parse(config.body);
          return {
            success: true,
            data: {
              id,
              ...updates,
              updatedAt: new Date().toISOString()
            }
          };
        }
        break;
    }
  }

  // Users API handlers
  handleUsersEndpoint(endpoint, method, config) {
    switch (method) {
      case 'POST':
        if (endpoint === '/auth/login') {
          // Login
          const { email, password } = JSON.parse(config.body);

          if (email === 'demo@qianlun.com' && password === 'demo123') {
            const user = {
              id: 1,
              email: 'demo@qianlun.com',
              name: 'Demo User',
              role: 'customer'
            };
            return {
              success: true,
              data: {
                user,
                token: 'mock_jwt_token_' + Date.now()
              }
            };
          } else {
            throw new Error('Invalid credentials');
          }
        } else if (endpoint === '/auth/register') {
          // Register
          const userData = JSON.parse(config.body);
          const newUser = {
            id: Date.now(),
            ...userData,
            role: 'customer',
            createdAt: new Date().toISOString()
          };
          return {
            success: true,
            data: {
              user: newUser,
              token: 'mock_jwt_token_' + Date.now()
            }
          };
        } else if (endpoint === '/users/profile') {
          // Update profile
          const profileData = JSON.parse(config.body);
          return {
            success: true,
            data: {
              ...profileData,
              updatedAt: new Date().toISOString()
            }
          };
        }
        break;

      case 'GET':
        if (endpoint === '/users/profile') {
          // Get profile
          return {
            success: true,
            data: {
              id: 1,
              name: 'Demo User',
              email: 'demo@qianlun.com',
              phone: '+62 812-3456-7890',
              address: 'Jl. Sudirman No. 123, Jakarta',
              role: 'customer'
            }
          };
        }
        break;
    }
  }

  // Analytics API handlers
  handleAnalyticsEndpoint(endpoint, method, config) {
    if (method === 'GET') {
      if (endpoint === '/analytics/dashboard') {
        return {
          success: true,
          data: {
            totalRevenue: 125000000,
            totalOrders: 156,
            totalCustomers: 89,
            averageOrderValue: 801282,
            monthlyRevenue: [
              { month: 'Jan', revenue: 8500000 },
              { month: 'Feb', revenue: 12200000 },
              { month: 'Mar', revenue: 15800000 },
              { month: 'Apr', revenue: 18900000 },
              { month: 'May', revenue: 21200000 },
              { month: 'Jun', revenue: 24500000 }
            ],
            topProducts: [
              { name: 'APEX CHRONOGRAPH', sales: 23, revenue: 34500000 },
              { name: 'SOVEREIGN LEATHER', sales: 18, revenue: 26250000 },
              { name: 'PRESTIGE TIMEPIECE', sales: 15, revenue: 22500000 }
            ]
          }
        };
      } else if (endpoint === '/analytics/sales') {
        return {
          success: true,
          data: {
            daily: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              sales: Math.floor(Math.random() * 1000000) + 500000
            })).reverse(),
            weekly: Array.from({ length: 12 }, (_, i) => ({
              week: `Week ${i + 1}`,
              sales: Math.floor(Math.random() * 5000000) + 2000000
            })),
            monthly: Array.from({ length: 12 }, (_, i) => ({
              month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
              sales: Math.floor(Math.random() * 20000000) + 5000000
            }))
          }
        };
      }
    }
  }

  // Mock data generators
  getMockProducts() {
    return [
      {
        id: 1,
        name: 'APEX CHRONOGRAPH',
        category: 'watch',
        price: 12500000,
        images: ['/assets/images/products/watch.png', '/assets/images/products/watch2.png'],
        description: 'The Apex Chronograph represents the pinnacle of horological craftsmanship.',
        stock: 15,
        rating: 5,
        reviews: 127
      },
      {
        id: 2,
        name: 'SOVEREIGN LEATHER',
        category: 'bag',
        price: 8750000,
        images: ['/assets/images/products/bag.png'],
        description: 'The Sovereign Leather bag combines timeless elegance with modern functionality.',
        stock: 8,
        rating: 5,
        reviews: 89
      },
      {
        id: 3,
        name: 'PRESTIGE TIMEPIECE',
        category: 'watch',
        price: 15000000,
        images: ['/assets/images/products/watch2.png', '/assets/images/products/watch.png'],
        description: 'A masterpiece of precision engineering and luxurious design.',
        stock: 5,
        rating: 5,
        reviews: 98
      }
    ];
  }

  getMockOrders() {
    return [
      {
        id: 1,
        userId: 1,
        items: [
          { id: 1, name: 'APEX CHRONOGRAPH', quantity: 1, price: 12500000 }
        ],
        total: 12500000,
        status: 'delivered',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        userId: 1,
        items: [
          { id: 2, name: 'SOVEREIGN LEATHER', quantity: 1, price: 8750000 }
        ],
        total: 8750000,
        status: 'shipped',
        createdAt: '2024-01-20T14:45:00Z'
      }
    ];
  }

  // Convenience methods for common operations
  async getProducts(params = {}) {
    return this.request('/products', { params });
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, { method: 'DELETE' });
  }

  async getOrders(userId = null) {
    return this.request('/orders', { params: userId ? { userId } : {} });
  }

  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async updateOrderStatus(id, status) {
    return this.request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async getAnalytics(endpoint = 'dashboard') {
    return this.request(`/analytics/${endpoint}`);
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
