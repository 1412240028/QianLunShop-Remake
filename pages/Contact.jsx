import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be added in Phase 3
    console.log('Form submitted:', formData);
  };

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="container text-center">
          <h1>Get in Touch</h1>
          <p>We're here to assist you with any inquiries</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {/* Contact Form */}
            <div className="contact-form">
              <div className="section-header">
                <h2 className="section-title">Send us a Message</h2>
                <p className="section-subtitle">Fill out the form below and our team will get back to you within 24 hours</p>
              </div>

              <form className="form">
                {/* Name Input */}
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+62 812-3456-7890"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Subject Input */}
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-status">Order Status</option>
                    <option value="custom-order">Custom Order Request</option>
                    <option value="repair-service">Repair & Maintenance</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info">
              <div className="section-header">
                <h2 className="section-title">Contact Information</h2>
                <p className="section-subtitle">Reach out to us through any of these channels</p>
              </div>

              {/* Contact Details */}
              <div className="contact-details">
                {/* Email */}
                <div className="contact-item">
                  <span style={{fontSize: '2rem', marginRight: '16px'}}>📧</span>
                  <div>
                    <h3>Email</h3>
                    <a href="mailto:dhoniprasetya3@gmail.com">dhoniprasetya3@gmail.com</a>
                    <p>We respond within 24 hours</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-item">
                  <span style={{fontSize: '2rem', marginRight: '16px'}}>📱</span>
                  <div>
                    <h3>Phone / WhatsApp</h3>
                    <a href="https://wa.me/6285755285030">+62 857-552-85030</a>
                    <p>Available Mon-Sat, 9 AM - 6 PM WIB</p>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-item">
                  <span style={{fontSize: '2rem', marginRight: '16px'}}>📍</span>
                  <div>
                    <h3>Location</h3>
                    <p>Surabaya, East Java</p>
                    <p>Indonesia</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="contact-item">
                  <span style={{fontSize: '2rem', marginRight: '16px'}}>🕐</span>
                  <div>
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="social-media">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Quick answers to common questions</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>We offer a 30-day return policy for all unused items in their original packaging. Custom orders are non-refundable.</p>
            </div>

            <div className="faq-item">
              <h3>Do you offer international shipping?</h3>
              <p>Currently, we ship within Indonesia. International shipping is available upon request for selected items.</p>
            </div>

            <div className="faq-item">
              <h3>How long does delivery take?</h3>
              <p>Standard delivery within Java takes 2-3 business days. Outside Java takes 3-5 business days. Express shipping is available.</p>
            </div>

            <div className="faq-item">
              <h3>Do you accept custom orders?</h3>
              <p>Yes, we accept custom orders for personalization and bespoke pieces. Contact us to discuss your requirements.</p>
            </div>

            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept bank transfer, credit/debit cards, and e-wallet payments through our secure payment gateway.</p>
            </div>

            <div className="faq-item">
              <h3>Is there a warranty on your products?</h3>
              <p>All QianLun products come with a 2-year international warranty covering manufacturing defects and craftsmanship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <div className="section-header">
            <h2 className="section-title">Ready to Experience QianLun?</h2>
            <p className="section-subtitle">Explore our collection of handcrafted luxury goods</p>
          </div>
          <Link to="/products" className="btn btn-primary">View Collection</Link>
        </div>
      </section>
    </div>
  );
}

export default Contact;
