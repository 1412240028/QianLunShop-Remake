import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>
            <img src="/assets/images/logos/logo.png" alt="QianLun Logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <ul>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/products">Produk</Link>
            </li>
            <li>
              <Link to="/cart" className="cart-link">
                Keranjang
                {getCartCount() > 0 && (
                  <span className="cart-count">{getCartCount()}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/about">Tentang</Link>
            </li>
            <li>
              <Link to="/contact">Kontak</Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu" style={{ display: 'block' }}>
          <ul>
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={closeMobileMenu}>
                Produk
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={closeMobileMenu} className="cart-link">
                Keranjang
                {getCartCount() > 0 && (
                  <span className="cart-count">{getCartCount()}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMobileMenu}>
                Tentang
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMobileMenu}>
                Kontak
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;