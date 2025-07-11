import React, { useState } from 'react';
import './Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { BASE_URL } from '../../assets/url';

const Register = () => {
 let [form, setForm] = useState({
     username: "",
     email: "",
     password: "",
   });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError('');
    if (!form.username || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return ;
    }
    if(form.password.length < 8 ||  form.username.length < 3 ){
      setError('Password must be at least 8 characters long and username must be at least 3 characters long.');
      return;
    }
    try{
      await axios.post(`${BASE_URL}/auth/register`, form, { withCredentials: true });
      toast.success("Account created successfully");
      navigate("/login");
      
    }catch (err) {
          if (err.response) {
            if (err.response.status === 400) {
              toast.dark(`Email already exists`);
            } else {
              toast.error(err.response.data.message || "Register failed");
            }
          } else {
            toast.error("An unexpected error occurred");
            console.log(err);
          }
        }
      };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <a href="/" className="back-link">← Back to Home</a>

        <div className="card">
          <div className="card-header">
            <div className="icon-circle">
              <span className="icon">+</span>
            </div>
            <h2>Join BlogVerse</h2>
            <p>Create your account to start sharing your stories</p>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={form.username}
                onChange={handleChange}
                name='username'
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                name='email'
                required
              />
            </div>

            <div className="input-group password-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                name='password'
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          <div className="footer">
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
