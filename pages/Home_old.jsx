import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Newsletter logic will be added in Phase 3
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <img src="/dragon-icon.png" alt="QianLun Dragon" />
          <h1>QIANLUN - Where Heritage Meets Modern Luxury</h1>
          <p>Experience timeless elegance with our dragon-inspired collections. Crafted for the discerning few.</p>
          <div>
            <Link to="/products" className="btn btn-primary">Explore Collection</Link>
            <a href="#featured" className="btn btn-secondary">View Featured</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The QianLun Legacy</h2>
            <p className="section-subtitle">Inspired by the strength and wisdom of legendary dragons, QianLun brings luxurious heritage with a contemporary touch. Each product is a masterpiece that unites modern precision with traditional artistry.</p>
          </div>

          <div className="grid grid-4">
            {/* Value 1 */}
            <div className="card">
              <div className="card-content text-center">
                <span style={{fontSize: '3rem'}}>🛠️</span>
                <h3>Craftsmanship</h3>
                <p>Created by the finest artisans with premium materials</p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="card">
              <div className="card-content text-center">
                <span style={{fontSize: '3rem'}}>🐉</span>
                <h3>Heritage</h3>
                <p>Elevating cultural heritage in modern design</p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="card">
              <div className="card-content text-center">
                <span style={{fontSize: '3rem'}}>💎</span>
                <h3>Exclusivity</h3>
                <p>Limited collections for those who appreciate uniqueness</p>
              </div>
            </div>

            {/* Value 4 */}
            <div className="card">
              <div className="card-content text-center">
                <span style={{fontSize: '3rem'}}>👑</span>
                <h3>Luxury</h3>
                <p>Manifesting luxury in every product detail</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Signature Collection</h2>
            <p className="section-subtitle">Featured collections that define QianLun elegance</p>
          </div>

          <div className="grid grid-4">
            {/* Product 1 - Watch */}
            <div className="card">
              <div style={{position: 'relative'}}>
                <span className="badge" style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#e74c3c',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>NEW</span>
                <img src="/watch.jpg" alt="Apex Chronograph Watch" />
              </div>
              <div className="card-content">
                <span>⌚ Watch</span>
                <h3>APEX CHRONOGRAPH</h3>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <span>⭐⭐⭐⭐⭐</span>
                  <span style={{marginLeft: '8px', fontSize: '0.9rem', color: '#7f8c8d'}}>(127 reviews)</span>
                </div>
                <p className="price">Rp 12.500.000</p>
                <Link to="/products/1" className="btn btn-primary" style={{width: '100%'}}>View Details</Link>
              </div>
            </div>

            {/* Product 2 - Bag */}
            <div className="card">
              <div style={{position: 'relative'}}>
                <span className="badge" style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#f39c12',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>BESTSELLER</span>
                <img src="/bag.jpg" alt="Sovereign Leather Bag" />
              </div>
              <div className="card-content">
                <span>👜 Bag</span>
                <h3>SOVEREIGN LEATHER</h3>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <span>⭐⭐⭐⭐⭐</span>
                  <span style={{marginLeft: '8px', fontSize: '0.9rem', color: '#7f8c8d'}}>(89 reviews)</span>
                </div>
                <p className="price">Rp 8.750.000</p>
                <Link to="/products/2" className="btn btn-primary" style={{width: '100%'}}>View Details</Link>
              </div>
            </div>

            {/* Product 3 - Shoes */}
            <div className="card">
              <div style={{position: 'relative'}}>
                <span className="badge" style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#e67e22',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>SALE</span>
                <img src="/shoes.jpg" alt="Imperial Oxford Shoes" />
              </div>
              <div className="card-content">
                <span>👞 Shoes</span>
                <h3>IMPERIAL OXFORD</h3>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <span>⭐⭐⭐⭐⭐</span>
                  <span style={{marginLeft: '8px', fontSize: '0.9rem', color: '#7f8c8d'}}>(156 reviews)</span>
                </div>
                <p className="price">Rp 6.250.000</p>
                <Link to="/products/3" className="btn btn-primary" style={{width: '100%'}}>View Details</Link>
              </div>
            </div>

            {/* Product 4 - Wallet */}
            <div className="card">
              <div style={{position: 'relative'}}>
                <span className="badge" style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#9b59b6',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>LIMITED</span>
                <img src="/wallet.jpg" alt="Elite Cardholder Wallet" />
              </div>
              <div className="card-content">
                <span>👛 Wallet</span>
                <h3>ELITE CARDHOLDER</h3>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <span>⭐⭐⭐⭐⭐</span>
                  <span style={{marginLeft: '8px', fontSize: '0.9rem', color: '#7f8c8d'}}>(203 reviews)</span>
                </div>
                <p className="price">Rp 3.500.000</p>
                <Link to="/products/4" className="btn btn-primary" style={{width: '100%'}}>View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2>What Our Clients Say</h2>

        <div>
          {/* Testimonial 1 */}
          <div>
            <p>"Exceptional quality. The attention to detail in the craftsmanship is remarkable. A true investment piece."</p>
            <h4>Alexander Wijaya</h4>
            <span>Collector</span>
          </div>

          {/* Testimonial 2 */}
          <div>
            <p>"A local brand that can compete internationally. The packaging and presentation are absolutely premium."</p>
            <h4>Sarah Chen</h4>
            <span>Fashion Influencer</span>
          </div>

          {/* Testimonial 3 */}
          <div>
            <p>"Worth every rupiah. The quality speaks for itself, and the design is timeless. Highly recommended."</p>
            <h4>Michael Tanaka</h4>
            <span>Business Owner</span>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section>
        <h3>Join the QianLun Inner Circle</h3>
        <p>Get early access to limited collections and exclusive offers</p>
        <div>
          <input type="email" placeholder="Enter your email" />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      </section>
    </div>
  );
}

export default Home;