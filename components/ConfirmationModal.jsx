import React from 'react';

function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning' // 'warning', 'danger', 'info', 'success'
}) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: '⚠️',
          color: '#e74c3c',
          bgColor: '#fff5f5',
          borderColor: '#e74c3c'
        };
      case 'warning':
        return {
          icon: '⚡',
          color: '#f39c12',
          bgColor: '#fff9f0',
          borderColor: '#f39c12'
        };
      case 'success':
        return {
          icon: '✅',
          color: '#27ae60',
          bgColor: '#f0fff4',
          borderColor: '#27ae60'
        };
      case 'info':
      default:
        return {
          icon: 'ℹ️',
          color: '#3498db',
          bgColor: '#f0f8ff',
          borderColor: '#3498db'
        };
    }
  };

  const typeStyles = getTypeStyles();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          animation: 'slideUp 0.3s ease-out',
          border: `3px solid ${typeStyles.borderColor}`
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '1.5rem',
            borderBottom: `2px solid ${typeStyles.borderColor}`,
            background: typeStyles.bgColor
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{typeStyles.icon}</span>
            <h3 
              style={{ 
                margin: 0, 
                color: typeStyles.color,
                fontSize: '1.5rem',
                fontWeight: '600',
                fontFamily: 'var(--font-secondary)'
              }}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem 1.5rem' }}>
          <p 
            style={{ 
              margin: 0, 
              fontSize: '1.05rem', 
              lineHeight: '1.6',
              color: 'var(--gray-dark)'
            }}
          >
            {message}
          </p>
        </div>

        {/* Footer */}
        <div 
          style={{ 
            padding: '1.25rem 1.5rem',
            borderTop: '2px solid var(--gray-light)',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            background: 'var(--off-white)'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '0.875rem 2rem',
              background: 'white',
              border: '2px solid var(--gray-light)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: 'var(--font-secondary)',
              color: 'var(--gray-dark)',
              transition: 'all 0.2s ease',
              minHeight: '48px'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'var(--gray-light)';
              e.target.style.borderColor = 'var(--gray)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = 'var(--gray-light)';
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              padding: '0.875rem 2rem',
              background: typeStyles.color,
              border: `2px solid ${typeStyles.color}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: 'var(--font-secondary)',
              color: 'white',
              transition: 'all 0.2s ease',
              minHeight: '48px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = `0 4px 12px ${typeStyles.color}44`;
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .modal-content {
            max-width: 90vw !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ConfirmationModal;