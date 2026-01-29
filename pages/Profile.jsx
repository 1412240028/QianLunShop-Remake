import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (!user) {
    return (
      <div className="page-wrapper">
        <div className="container text-center" style={{ padding: 'var(--spacing-xxl)' }}>
          <h1>Please log in to view your profile</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="profile-section">
        <div className="container">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className="profile-info">
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                <span className="user-role">{user.role}</span>
              </div>
            </div>

            {message && (
              <div className="success-message">
                {message}
              </div>
            )}

            <div className="profile-content">
              <div className="profile-section-card">
                <div className="section-header">
                  <h2>Personal Information</h2>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="profile-details">
                    <div className="detail-item">
                      <span className="label">Name:</span>
                      <span className="value">{user.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Email:</span>
                      <span className="value">{user.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Member Since:</span>
                      <span className="value">January 2024</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="profile-section-card">
                <h2>Account Actions</h2>
                <div className="action-buttons">
                  <button className="btn btn-secondary" onClick={() => alert('Feature coming soon!')}>
                    View Order History
                  </button>
                  <button className="btn btn-secondary" onClick={() => alert('Feature coming soon!')}>
                    Manage Addresses
                  </button>
                  <button className="btn btn-secondary" onClick={() => alert('Feature coming soon!')}>
                    Change Password
                  </button>
                  <button className="btn btn-danger" onClick={logout}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
