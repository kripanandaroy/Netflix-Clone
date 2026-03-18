import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Signup.css';

const Signup = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      return setError('Password should be at least 6 characters');
    }
    
    setError('');
    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.fullName);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else {
        setError('Failed to create account.');
      }
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        <h1 className="signup-logo">NETFLIX</h1>
      </div>
      
      <div className="signup-card">
        <h1>Create Account</h1>
        {error && <div className="signup-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="signup-input-group">
            <input 
              type="text" 
              name="fullName"
              className="signup__input"
              placeholder="Full Name" 
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-input-group">
            <input 
              type="email" 
              name="email"
              className="signup__input"
              placeholder="Email address" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-input-group">
            <input 
              type="password" 
              name="password"
              className="signup__input"
              placeholder="Add a password" 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <span onClick={onSwitchToLogin}>Sign in</span></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
