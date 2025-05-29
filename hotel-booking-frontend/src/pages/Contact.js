import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/themeContext';

function Contact() {
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatusMessage('❌ Please fill in all fields.');
      return;
    }

    setStatusMessage('✅ Message sent successfully! Thank you.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '3rem auto',
        padding: '2.5rem',
        backgroundColor: theme.background,
        borderRadius: '14px',
        boxShadow: `0 0 25px ${theme.accent}`,
        fontFamily: "'Georgia', serif",
        color: theme.text,
      }}
    >
      <h1
        style={{
          fontSize: '2.8rem',
          marginBottom: '1rem',
          color: theme.primary,
          textAlign: 'center',
          animation: 'fadeInDown 1s ease',
        }}
      >
        Contact Us
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          marginBottom: '2rem',
          textAlign: 'center',
          color: theme.accent,
          animation: 'fadeIn 1.5s ease',
        }}
      >
        We would love to hear from you. Please fill out the form below to get in touch.
      </p>

      <form onSubmit={handleSubmit}>
        {['name', 'email', 'subject'].map((field) => (
          <label
            key={field}
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.primary }}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Your ${field}${field === 'subject' ? '' : ' full name'}`}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '0.3rem',
                marginBottom: '1.5rem',
                borderRadius: '8px',
                border: `1.5px solid ${theme.accent}`,
                fontSize: '1rem',
                fontFamily: "'Georgia', serif",
                backgroundColor: theme.background,
                color: 'black',              // Make typed text black
                fontWeight: 'bold',          // Make typed text bold
              }}
              required
            />
          </label>
        ))}

        <label
          style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.primary }}
        >
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Write your message here..."
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '0.3rem',
              marginBottom: '1.5rem',
              borderRadius: '8px',
              border: `1.5px solid ${theme.accent}`,
              fontSize: '1rem',
              fontFamily: "'Georgia', serif",
              resize: 'vertical',
              backgroundColor: theme.background,
              color: 'black',              // Make typed text black
              fontWeight: 'bold',          // Make typed text bold
            }}
            required
          />
        </label>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: theme.primary,
            color: theme.text,
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.accent)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
        >
          Send Message
        </button>
      </form>

      {statusMessage && (
        <div
          style={{
            marginTop: '1.8rem',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: statusMessage.startsWith('✅') ? '#e6ffed' : '#ffe6e6',
            color: statusMessage.startsWith('✅') ? '#2e7d32' : '#c62828',
            fontSize: '1rem',
            textAlign: 'center',
            fontWeight: '600',
            animation: 'fadeIn 0.8s ease',
          }}
        >
          {statusMessage}
        </div>
      )}

      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Contact;
