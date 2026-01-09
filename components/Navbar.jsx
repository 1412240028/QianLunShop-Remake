import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src="/assets/images/logos/logo.png" alt="QianLun Logo" />
            <span>QIANLUN</span>
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
                <span className="cart-count">{getCartCount()}</span>
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
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Produk</Link>
            </li>
            <li>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="cart-link">
                Keranjang
                <span className="cart-count">{getCartCount()}</span>
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>Tentang</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Kontak</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;