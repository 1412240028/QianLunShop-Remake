import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-3">
          {/* Brand Section */}
          <div>
            <h3>QIANLUNSHOP</h3>
            <p>Where Heritage Meets Modern Luxury</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/products">Koleksi</Link>
              </li>
              <li>
                <Link to="/about">Tentang Kami</Link>
              </li>
              <li>
                <Link to="/contact">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:dhoniprasetya3@gmail.com">dhoniprasetya3@gmail.com</a>
              </li>
              <li>
                <a href="https://wa.me/6285755285030">+62 857-552-85030</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2025 QianlunShop. Semua hak dilindungi.</p>
          <p>Desain oleh Dhoni Prasetya</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;