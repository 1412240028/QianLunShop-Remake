import React, { useState, useEffect, memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Products.css';

// Memoized Product Card Component
const ProductCard = memo(({ product, onAddToCart }) => (
  <div className="card">
    {/* Product Badge */}
    {product.badge && (
      <div className="product-badge">
        <span className={`badge badge-${product.badge.toLowerCase()}`}>
          {product.badge}
        </span>
      </div>
    )}

    {/* Product Image */}
    <img src={product.image} alt={product.name} loading="lazy" />

    {/* Product Info */}
    <div className="card-content">
      <span className="product-category">
        {product.category === 'watch' ? '⌚ Watch' :
         product.category === 'bag' ? '👜 Bag' :
         product.category === 'shoes' ? '👞 Shoes' : '👛 Wallet'}
      </span>
      <h3 className="product-name">{product.name}</h3>

      {/* Rating */}
      <div className="product-rating">
        <span>⭐⭐⭐⭐⭐</span>
        <span>({product.reviews} reviews)</span>
      </div>

      {/* Price */}
      <p className="product-price">Rp {product.price.toLocaleString('id-ID')}</p>

      {/* Stock Indicator */}
      <div className="stock-indicator">
        {product.stock > 10 ? (
          <span className="stock-high">✓ In Stock ({product.stock})</span>
        ) : product.stock > 0 ? (
          <span className="stock-low">⚠ Low Stock ({product.stock})</span>
        ) : (
          <span className="stock-out">✗ Out of Stock</span>
        )}
      </div>

      {/* Actions */}
      <div className="product-actions">
        <button
          className="btn btn-secondary"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
        <Link
          to={`/products/${product.id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
));

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true); // Collapsed by default on mobile
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 6; // Show 6 products per page
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();

  // Handle search from URL params
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Product data
  const products = [
    {
      id: 1,
      name: 'APEX CHRONOGRAPH',
      category: 'watch',
      price: 12500000,
      image: '/assets/images/products/watch.png',
      badge: 'NEW',
      rating: 5,
      reviews: 127,
      stock: 5
    },
    {
      id: 2,
      name: 'SOVEREIGN LEATHER',
      category: 'bag',
      price: 8750000,
      image: '/assets/images/products/bag.png',
      badge: 'BESTSELLER',
      rating: 5,
      reviews: 89,
      stock: 8
    },
    {
      id: 3,
      name: 'IMPERIAL OXFORD',
      category: 'shoes',
      price: 6250000,
      image: '/assets/images/products/shoes.png',
      badge: 'SALE',
      rating: 5,
      reviews: 156,
      stock: 12
    },
    {
      id: 4,
      name: 'ELITE CARDHOLDER',
      category: 'wallet',
      price: 3500000,
      image: '/assets/images/products/wallet.png',
      badge: 'LIMITED',
      rating: 5,
      reviews: 203,
      stock: 15
    },
    {
      id: 5,
      name: 'PRESTIGE TIMEPIECE',
      category: 'watch',
      price: 15000000,
      image: '/assets/images/products/watch2.png',
      badge: 'EXCLUSIVE',
      rating: 5,
      reviews: 98,
      stock: 3
    }
  ];

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'low' && product.price < 5000000) ||
      (priceRange === 'mid' && product.price >= 5000000 && product.price <= 10000000) ||
      (priceRange === 'high' && product.price > 10000000);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    setIsLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, priceRange, searchQuery, sortBy]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });

    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = `${product.name} added to cart!`;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  };

  const toggleFilterCollapse = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
  };

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <h1 className="section-title">Our Collection</h1>
            <p className="section-subtitle">Explore our curated selection of luxury items</p>
          </div>
        </div>
      </section>

      <div className="products-container">
        {/* Sidebar Filter */}
        <aside className={`products-sidebar ${isFilterCollapsed ? 'collapsed' : ''}`}>
          <h3 onClick={toggleFilterCollapse}>
            Filters
          </h3>

          {/* Search */}
          <div className="filter-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid var(--gray-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '1rem',
                minHeight: '48px'
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4>Category</h4>
            <ul className="filter-list">
              <li>
                <button
                  className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  className={`filter-btn ${selectedCategory === 'watch' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('watch')}
                >
                  ⌚ Watches
                </button>
              </li>
              <li>
                <button
                  className={`filter-btn ${selectedCategory === 'bag' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('bag')}
                >
                  👜 Bags
                </button>
              </li>
              <li>
                <button
                  className={`filter-btn ${selectedCategory === 'shoes' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('shoes')}
                >
                  👞 Shoes
                </button>
              </li>
              <li>
                <button
                  className={`filter-btn ${selectedCategory === 'wallet' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('wallet')}
                >
                  👛 Wallets
                </button>
              </li>
            </ul>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <ul className="filter-list">
              <li>
                <button
                  className={`filter-btn ${priceRange === 'all' ? 'active' : ''}`}
                  onClick={() => setPriceRange('all')}
                >
                  All Prices
                </button>
              </li>
              <li>
                <button
                  className={`filter-btn ${priceRange === 'low' ? 'active' : ''}`}
                  onClick={() => setPriceRange('low')}
                >
                  Under Rp 5.000.000
                </button>
              </li>
              <li>
                <button
                  className={`filter-btn ${priceRange === 'mid' ? 'active' : ''}`}
                  onClick={() => setPriceRange('mid')}
                >
                  Rp 5.000.000 - Rp 10.000.000
                </button>
              </li>
              <li>
                <button
                  className={`filter-btn ${priceRange === 'high' ? 'active' : ''}`}
                  onClick={() => setPriceRange('high')}
                >
                  Above Rp 10.000.000
                </button>
              </li>
            </ul>
          </div>

          {/* Reset Filters */}
          <button
            className="btn btn-secondary reset-filters"
            onClick={() => {
              setSelectedCategory('all');
              setPriceRange('all');
              setSearchQuery('');
            }}
          >
            Reset All Filters
          </button>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          <div className="products-header">
            <p>Showing {sortedProducts.length} products</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="products-grid">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}

          {sortedProducts.length === 0 && (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;