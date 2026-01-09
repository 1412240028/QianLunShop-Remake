import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="container text-center">
          <h1>About QianLun</h1>
          <p>Where Heritage Meets Modern Luxury</p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div>
              <div className="section-header">
                <h2 className="section-title">Our Story</h2>
              </div>
              <p>Founded on the principles of excellence and tradition, QianLun represents the fusion of timeless craftsmanship with contemporary design. Inspired by the legendary dragon—a symbol of strength, wisdom, and prosperity—we create luxury goods that embody these enduring values.</p>
              <p>Each piece in our collection tells a story of meticulous attention to detail, from the selection of premium materials to the final hand-finishing touches. We work exclusively with master artisans who share our commitment to perfection, ensuring that every product meets the highest standards of quality and durability.</p>
              <p>Our philosophy is simple: create products that transcend trends and stand the test of time. In a world of mass production, we choose exclusivity. In an era of disposability, we choose permanence.</p>
            </div>
            <div className="text-center">
              <img src="/assets/images/icons/dragon-icon.png" alt="QianLun Dragon Symbol" style={{maxWidth: '300px'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Defines Us</h2>
          </div>

          <div className="grid grid-3">
            <div className="card text-center">
              <div className="card-content">
                <span style={{fontSize: '3rem', marginBottom: '16px'}}>🛠️</span>
                <h3>Exceptional Craftsmanship</h3>
                <p>Every product is crafted by skilled artisans using traditional techniques refined over generations. We use only the finest materials sourced from trusted suppliers worldwide.</p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-content">
                <span style={{fontSize: '3rem', marginBottom: '16px'}}>🐉</span>
                <h3>Cultural Heritage</h3>
                <p>Our designs draw inspiration from rich cultural traditions, particularly the symbolism of the dragon. We honor this heritage while creating pieces that feel relevant and modern.</p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-content">
                <span style={{fontSize: '3rem', marginBottom: '16px'}}>💎</span>
                <h3>Limited Exclusivity</h3>
                <p>We believe in quality over quantity. Our collections are intentionally limited, ensuring that each piece remains special and maintains its value over time.</p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-content">
                <span style={{fontSize: '3rem', marginBottom: '16px'}}>👑</span>
                <h3>Uncompromising Luxury</h3>
                <p>From materials to packaging, every aspect of the QianLun experience reflects our commitment to luxury. We never compromise on quality or presentation.</p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-content">
                <span style={{fontSize: '3rem', marginBottom: '16px'}}>🌍</span>
                <h3>Sustainable Practices</h3>
                <p>We are committed to responsible sourcing and sustainable production methods. Our products are made to last a lifetime, reducing waste and environmental impact.</p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-content">
                <span style={{fontSize: '3rem', marginBottom: '16px'}}>🤝</span>
                <h3>Client Partnership</h3>
                <p>We build lasting relationships with our clients, offering personalized service, expert advice, and comprehensive after-sales support for every purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The QianLun Process</h2>
            <p className="section-subtitle">From concept to completion, excellence at every stage</p>
          </div>

          <div className="process-grid">
            <div className="process-step">
              <div className="process-number">
                <span>1</span>
              </div>
              <h3>Design & Concept</h3>
              <p>Our design team meticulously researches and sketches each piece, drawing inspiration from traditional motifs while ensuring modern relevance.</p>
            </div>

            <div className="process-step">
              <div className="process-number">
                <span>2</span>
              </div>
              <h3>Material Selection</h3>
              <p>We source only premium materials from certified suppliers. Every leather hide, metal component, and finishing element is hand-selected for quality.</p>
            </div>

            <div className="process-step">
              <div className="process-number">
                <span>3</span>
              </div>
              <h3>Expert Crafting</h3>
              <p>Master artisans bring each design to life using time-honored techniques. Every stitch, cut, and detail is executed with precision and care.</p>
            </div>

            <div className="process-step">
              <div className="process-number">
                <span>4</span>
              </div>
              <h3>Quality Control</h3>
              <p>Each finished piece undergoes rigorous inspection. Only products that meet our exacting standards bear the QianLun name.</p>
            </div>

            <div className="process-step">
              <div className="process-number">
                <span>5</span>
              </div>
              <h3>Luxury Presentation</h3>
              <p>Products are packaged in premium materials with attention to every detail, creating an unboxing experience worthy of the item inside.</p>
            </div>

            <div className="process-step">
              <div className="process-number">
                <span>6</span>
              </div>
              <h3>Lifetime Support</h3>
              <p>Our commitment continues after purchase. We offer comprehensive warranty coverage and expert maintenance services for the life of your product.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The People Behind QianLun</h2>
            <p className="section-subtitle">Meet the craftsmen and designers who bring our vision to life</p>
          </div>

          <div className="grid grid-3">
            <div className="team-member">
              <img src="/assets/images/products/watch.png" alt="Master Craftsman" />
              <h3>Master Artisans</h3>
              <p>Our team includes craftsmen with decades of experience in leatherworking, metalsmithing, and precision assembly.</p>
            </div>

            <div className="team-member">
              <img src="/assets/images/products/bag.png" alt="Design Team" />
              <h3>Design Team</h3>
              <p>Led by award-winning designers, our creative team balances aesthetic beauty with functional excellence.</p>
            </div>

            <div className="team-member">
              <img src="/assets/images/products/shoes.png" alt="Quality Control" />
              <h3>Quality Specialists</h3>
              <p>Dedicated inspectors ensure every product meets our rigorous standards before reaching our clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10+</h3>
              <p>Years of Excellence</p>
            </div>
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Satisfied Clients</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Client Retention</p>
            </div>
            <div className="stat-item">
              <h3>25+</h3>
              <p>Master Artisans</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <div className="section-header">
            <h2 className="section-title">Experience the QianLun Difference</h2>
            <p className="section-subtitle">Discover our collection of handcrafted luxury goods</p>
          </div>
          <div className="cta-buttons">
            <Link to="/products" className="btn btn-primary">View Collection</Link>
            <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
