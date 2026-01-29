import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
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
              <NavLink to="/" exact activeClassName="active">Beranda</NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">Produk</NavLink>
            </li>
            <li>
              <NavLink to="/cart" activeClassName="active" className="cart-link">
                Keranjang
                {getCartCount() > 0 && (
                  <span className="cart-count">{getCartCount()}</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">Tentang</NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active">Kontak</NavLink>
            </li>
            <li>
              <NavLink to="/settings" activeClassName="active">Settings</NavLink>
            </li>
          </ul>
        </div>

        {/* User/Auth Links */}
        {isAuthenticated ? (
          <div className="navbar-user">
            <div className="user-menu">
              <Link to="/profile" className="user-info">
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <span>{user.name}</span>
              </Link>
              <button onClick={logout} className="btn btn-secondary logout-btn">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-auth">
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        )}

        {/* Mobile Menu Button - Hidden on mobile, bottom nav used instead */}
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

      {/* Mobile Menu - For additional items */}
      {isMobileMenuOpen && (
        <div className="mobile-menu" style={{ display: 'block' }}>
          <ul>
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

      {/* Bottom Navigation for Mobile */}
      <div className="bottom-nav">
        <Link to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>
          <span className="bottom-nav-icon">🏠</span>
          <span className="bottom-nav-label">Beranda</span>
        </Link>
        <Link to="/products" className={`bottom-nav-item ${location.pathname === '/products' ? 'active' : ''}`} onClick={closeMobileMenu}>
          <span className="bottom-nav-icon">🔍</span>
          <span className="bottom-nav-label">Produk</span>
        </Link>
        <Link to="/cart" className={`bottom-nav-item cart-link ${location.pathname === '/cart' ? 'active' : ''}`} onClick={closeMobileMenu}>
          <span className="bottom-nav-icon">🛒</span>
          <span className="bottom-nav-label">Keranjang</span>
          {getCartCount() > 0 && (
            <span className="cart-count">{getCartCount()}</span>
          )}
        </Link>
        <Link to="/settings" className={`bottom-nav-item ${location.pathname === '/settings' ? 'active' : ''}`} onClick={closeMobileMenu}>
          <span className="bottom-nav-icon">👤</span>
          <span className="bottom-nav-label">Profile</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;