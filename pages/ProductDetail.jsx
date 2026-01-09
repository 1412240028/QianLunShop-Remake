import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

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
        '/assets/images/products/watch.png',
        '/assets/images/products/watch.png',
        '/assets/images/products/watch.png'
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
      id: 5,
      name: 'PRESTIGE TIMEPIECE',
      category: 'watch',
      price: 15000000,
      image: '/assets/images/products/watch.png',
      rating: 5,
      reviews: 98
    }
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
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
                <img src={product.images[selectedImage]} alt={product.name} />
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
                <button className="btn btn-primary">Add to Cart</button>
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
                  <p>Reviews functionality will be added in Phase 3</p>
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
                <img src={item.image} alt={item.name} />
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
