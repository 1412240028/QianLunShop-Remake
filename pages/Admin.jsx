import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useOrderHistory } from '../contexts/OrderHistoryContext';
import { apiService } from '../utils/apiService';
import { useToast } from '../utils/useToast';
import ConfirmationModal from '../components/ConfirmationModal';
import './Admin.css';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const { orders, updateOrderStatus } = useOrderHistory();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock: '',
    images: ['']
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  // Load products
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts();
      if (response.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
        images: productForm.images.filter(img => img.trim())
      };

      if (editingProduct) {
        await apiService.updateProduct(editingProduct.id, productData);
        showToast('Product updated successfully', 'success');
      } else {
        await apiService.createProduct(productData);
        showToast('Product created successfully', 'success');
      }

      loadProducts();
      resetForm();
    } catch (error) {
      showToast('Failed to save product', 'error');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await apiService.deleteProduct(productId);
      showToast('Product deleted successfully', 'success');
      loadProducts();
    } catch (error) {
      showToast('Failed to delete product', 'error');
    }
    setShowModal(false);
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      updateOrderStatus(orderId, newStatus);
      showToast('Order status updated', 'success');
    } catch (error) {
      showToast('Failed to update order status', 'error');
    }
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      category: '',
      price: '',
      description: '',
      stock: '',
      images: ['']
    });
    setEditingProduct(null);
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      stock: product.stock.toString(),
      images: product.images || ['']
    });
  };

  const addImageField = () => {
    setProductForm(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateImageField = (index, value) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImageField = (index) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (!isAuthenticated) {
    return <div className="admin-loading">Redirecting to login...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.name}</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products Management
        </button>
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders Management
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Products</h2>
            <button
              className="btn-primary"
              onClick={() => setEditingProduct(null)}
            >
              Add New Product
            </button>
          </div>

          <div className="products-grid">
            {loading ? (
              <div className="loading">Loading products...</div>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.images[0] || '/assets/images/products/placeholder.png'}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="category">{product.category}</p>
                    <p className="price">Rp {product.price.toLocaleString()}</p>
                    <p className="stock">Stock: {product.stock}</p>
                    <div className="product-actions">
                      <button
                        className="btn-secondary"
                        onClick={() => editProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => {
                          setModalAction(() => () => handleDeleteProduct(product.id));
                          setShowModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {(editingProduct || !editingProduct) && (
            <form className="product-form" onSubmit={handleProductSubmit}>
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>

              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category:</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                  required
                >
                  <option value="">Select category</option>
                  <option value="watch">Watch</option>
                  <option value="bag">Bag</option>
                  <option value="wallet">Wallet</option>
                  <option value="shoes">Shoes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock:</label>
                <input
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Images:</label>
                {productForm.images.map((image, index) => (
                  <div key={index} className="image-input-group">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={image}
                      onChange={(e) => updateImageField(index, e.target.value)}
                    />
                    {productForm.images.length > 1 && (
                      <button
                        type="button"
                        className="btn-danger small"
                        onClick={() => removeImageField(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-secondary small"
                  onClick={addImageField}
                >
                  Add Image
                </button>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Orders</h2>
          </div>

          <div className="orders-list">
            {orders.length === 0 ? (
              <div className="no-orders">No orders found</div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status ${order.status}`}>{order.status}</span>
                  </div>

                  <div className="order-details">
                    <p><strong>Total:</strong> Rp {order.total.toLocaleString()}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Items:</strong> {order.items.length}</p>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>Rp {item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-actions">
                    <select
                      value={order.status}
                      onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={modalAction}
        title="Confirm Action"
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default Admin;
