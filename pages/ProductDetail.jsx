import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import useToast from '../utils/useToast';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'APEX CHRONOGRAPH',
      category: 'watch',
      price: 12500000,
      badge: 'NEW',
      rating: 5,
      reviews: 127,
      stock: 5,
      description: 'The Apex Chronograph represents the pinnacle of horological craftsmanship. Featuring a precision Swiss movement, sapphire crystal glass, and a luxurious leather strap with dragon-scale embossing. Water-resistant to 100 meters, this timepiece combines heritage with modern engineering.',
      features: [
        'Swiss automatic movement',
        'Sapphire crystal glass',
        'Dragon-scale embossed leather strap',
        'Water-resistant 100m',
        'Limited edition numbering',
        '2-year international warranty'
      ],
      images: [
        '/assets/images/products/watch.png',
        '/assets/images/products/watch2.png',
        '/assets/images/products/watch.png',
        '/assets/images/products/watch2.png'
      ],
      specifications: {
        material: 'Stainless Steel & Leather',
        movement: 'Swiss Automatic',
        diameter: '42mm',
        thickness: '12mm',
        weight: '180g'
      }
    },
    {
      id: 2,
      name: 'SOVEREIGN LEATHER',
      category: 'bag',
      price: 8750000,
      badge: 'BESTSELLER',
      rating: 5,
      reviews: 89,
      stock: 8,
      description: 'The Sovereign Leather bag combines timeless elegance with modern functionality. Crafted from premium Italian leather with dragon embossing details.',
      features: [
        'Premium Italian leather',
        'Dragon embossing',
        'Multiple compartments',
        'Adjustable strap',
        'Limited edition'
      ],
      images: [
        '/assets/images/products/bag.png',
        '/assets/images/products/bag.png',
        '/assets/images/products/bag.png',
        '/assets/images/products/bag.png'
      ],
      specifications: {
        material: 'Italian Leather',
        dimensions: '30x20x10 cm',
        weight: '800g'
      }
    },
    {
      id: 3,
      name: 'IMPERIAL OXFORD',
      category: 'shoes',
      price: 6250000,
      badge: 'SALE',
      rating: 5,
      reviews: 156,
      stock: 12,
      description: 'The Imperial Oxford shoes feature premium leather construction with dragon motif accents.',
      features: [
        'Premium leather',
        'Dragon motif',
        'Comfortable fit',
        'Water-resistant',
        'Handcrafted'
      ],
      images: [
        '/assets/images/products/shoes.png',
        '/assets/images/products/shoes.png',
        '/assets/images/products/shoes.png',
        '/assets/images/products/shoes.png'
      ],
      specifications: {
        material: 'Leather',
        size: '40-45',
        weight: '600g'
      }
    },
    {
      id: 4,
      name: 'ELITE CARDHOLDER',
      category: 'wallet',
      price: 3500000,
      badge: 'LIMITED',
      rating: 5,
      reviews: 203,
      stock: 15,
      description: 'The Elite Cardholder wallet offers sophisticated storage for your essentials.',
      features: [
        'Premium leather',
        'Multiple card slots',
        'RFID protection',
        'Compact design',
        'Limited edition'
      ],
      images: [
        '/assets/images/products/wallet.png',
        '/assets/images/products/wallet.png',
        '/assets/images/products/wallet.png',
        '/assets/images/products/wallet.png'
      ],
      specifications: {
        material: 'Leather',
        dimensions: '10x7 cm',
        weight: '100g'
      }
    },
    {
      id: 5,
      name: 'PRESTIGE TIMEPIECE',
      category: 'watch',
      price: 15000000,
      badge: 'EXCLUSIVE',
      rating: 5,
      reviews: 98,
      stock: 3,
      description: 'The Prestige Timepiece represents the ultimate fusion of traditional craftsmanship and modern precision. This masterpiece features a Swiss quartz movement housed in a dragon-engraved stainless steel case, complemented by a sapphire crystal glass and water-resistant construction. Each timepiece is individually numbered and comes with a premium leather strap, making it not just a watch, but a statement of sophistication and heritage.',
      features: [
        'Swiss quartz movement with precision accuracy',
        'Sapphire crystal glass for scratch resistance',
        'Dragon-engraved stainless steel case',
        'Premium leather strap with gold buckle',
        'Water-resistant to 50 meters',
        'Limited edition with individual numbering',
        '3-year international warranty',
        'Includes luxury presentation box and papers'
      ],
      images: [
        '/assets/images/products/watch2.png',
        '/assets/images/products/watch.png',
        '/assets/images/products/watch2.png',
        '/assets/images/products/watch.png'
      ],
      specifications: {
        material: 'Stainless Steel & Premium Leather',
        movement: 'Swiss Quartz',
        diameter: '40mm',
        thickness: '11mm',
        weight: '165g',
        waterResistance: '50m',
        crystal: 'Sapphire',
        strap: 'Genuine Leather',
        clasp: 'Gold-plated buckle'
      }
    }
  ];

  const product = products.find(p => p.id === parseInt(id));

  // Related products
  const relatedProducts = [
    {
      id: 2,
      name: 'SOVEREIGN LEATHER',
      category: 'bag',
      price: 8750000,
      image: '/assets/images/products/bag.png',
      rating: 5,
      reviews: 89
    },
    {
      id: 4,
      name: 'ELITE CARDHOLDER',
      category: 'wallet',
      price: 3500000,
      image: '/assets/images/products/wallet.png',
      rating: 5,
      reviews: 203
    },
    {
      id: 1,
      name: 'APEX CHRONOGRAPH',
      category: 'watch',
      price: 12500000,
      image: '/assets/images/products/watch.png',
      rating: 5,
      reviews: 127
    }
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
      quantity: quantity
    });

    showToast(`${product.name} added to cart!`, 'success');
  };

  if (!product) {
    return (
      <div className="page-wrapper">
        <div className="container text-center">
          <h1>Product Not Found</h1>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </nav>

      {/* Product Detail Section */}
      <section className="section">
        <div className="container">
          <div className="product-detail-grid">
            {/* Image Gallery */}
            <div className="product-gallery">
              {/* Main Image */}
              <div className="main-image">
                {product.badge && (
                  <div className="product-badge">
                    <span className={`badge badge-${product.badge.toLowerCase()}`}>
                      {product.badge}
                    </span>
                  </div>
                )}
                <img src={product.images[selectedImage]} alt={product.name} loading="lazy" />
              </div>

              {/* Thumbnail Images */}
              <div className="thumbnail-gallery">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-category">
                {product.category === 'watch' ? '⌚ Watch' :
                 product.category === 'bag' ? '👜 Bag' :
                 product.category === 'shoes' ? '👞 Shoes' : '👛 Wallet'}
              </div>
              <h1 className="product-title">{product.name}</h1>

              {/* Rating */}
              <div className="product-rating">
                <span>⭐⭐⭐⭐⭐</span>
                <span>{product.rating}.0</span>
                <span>({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="product-price">
                <h2>Rp {product.price.toLocaleString('id-ID')}</h2>
              </div>

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

              {/* Description */}
              <p className="product-description">{product.description}</p>

              {/* Quantity Selector */}
              <div className="quantity-selector">
                <label>Quantity</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <button
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button className="btn btn-accent">Buy Now</button>
                <button className="btn btn-secondary wishlist-btn">
                  ♡ Add to Wishlist
                </button>
              </div>

              {/* Additional Info */}
              <div className="product-features">
                <div className="feature-item">
                  <span>🚚</span>
                  <div>
                    <h4>Free Shipping</h4>
                    <p>For orders above Rp 5.000.000</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span>↩️</span>
                  <div>
                    <h4>30-Day Returns</h4>
                    <p>Hassle-free return policy</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span>🛡️</span>
                  <div>
                    <h4>Warranty</h4>
                    <p>2-year international warranty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="section">
        <div className="container">
          <div className="product-tabs">
            <div className="tab-buttons">
              <button
                className={activeTab === 'description' ? 'active' : ''}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={activeTab === 'features' ? 'active' : ''}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button
                className={activeTab === 'specifications' ? 'active' : ''}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={activeTab === 'reviews' ? 'active' : ''}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            <div className="tab-content">
              {/* Tab Content - Description */}
              {activeTab === 'description' && (
                <div className="tab-pane">
                  <h3>Product Description</h3>
                  <p>{product.description}</p>
                </div>
              )}

              {/* Tab Content - Features */}
              {activeTab === 'features' && (
                <div className="tab-pane">
                  <h3>Key Features</h3>
                  <ul className="features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab Content - Specifications */}
              {activeTab === 'specifications' && (
                <div className="tab-pane">
                  <h3>Specifications</h3>
                  <table className="specs-table">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab Content - Reviews */}
              {activeTab === 'reviews' && (
                <div className="tab-pane">
                  <h3>Customer Reviews</h3>
                  <div className="reviews-section">
                    {/* Overall Rating */}
                    <div className="overall-rating">
                      <div className="rating-summary">
                        <div className="rating-score">
                          <span className="score">4.8</span>
                          <span className="stars">⭐⭐⭐⭐⭐</span>
                          <span className="reviews-count">({product.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="reviews-list">
                      {/* Review 1 */}
                      <div className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <span className="reviewer-name">Ahmad Rahman</span>
                            <span className="review-date">2 weeks ago</span>
                          </div>
                          <div className="review-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                        <div className="review-content">
                          <p>Absolutely stunning craftsmanship! The attention to detail is remarkable. The dragon embossing is exquisite and the quality of materials is top-notch. Highly recommend for anyone looking for luxury accessories.</p>
                        </div>
                      </div>

                      {/* Review 2 */}
                      <div className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <span className="reviewer-name">Sarah Chen</span>
                            <span className="review-date">1 month ago</span>
                          </div>
                          <div className="review-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                        <div className="review-content">
                          <p>Exceptional quality and design. The heritage-inspired elements combined with modern luxury create a perfect balance. Fast shipping and excellent packaging. Will definitely purchase again.</p>
                        </div>
                      </div>

                      {/* Review 3 */}
                      <div className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <span className="reviewer-name">Budi Santoso</span>
                            <span className="review-date">6 weeks ago</span>
                          </div>
                          <div className="review-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                        <div className="review-content">
                          <p>Impressed by the brand's commitment to quality and heritage. The product exceeded my expectations. The customer service was also outstanding. A true luxury experience.</p>
                        </div>
                      </div>

                      {/* Review 4 */}
                      <div className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <span className="reviewer-name">Maya Putri</span>
                            <span className="review-date">2 months ago</span>
                          </div>
                          <div className="review-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                        <div className="review-content">
                          <p>Beautiful design that captures the essence of luxury. The craftsmanship is impeccable and the materials feel premium. Perfect for special occasions or as a statement piece.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">You May Also Like</h2>
          </div>
          <div className="grid grid-3">
            {relatedProducts.map((item) => (
              <div key={item.id} className="card">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <div className="product-rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>({item.reviews})</span>
                  </div>
                  <p className="price">Rp {item.price.toLocaleString('id-ID')}</p>
                  <Link to={`/products/${item.id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
