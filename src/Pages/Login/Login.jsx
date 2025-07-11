import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { BASE_URL } from "../../assets/url";
import { useContext } from "react";

const Login = () => {
  const { setUser}  = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.info);
      toast.success("Logged Successfully");
      navigate("/");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          toast.error("Incorrect Password Or Email");
        } else if (err.response.status === 404) {
          toast.error("Email and Password are required");
        } else {
          toast.error("Login failed");
        }
      } else {
        toast.error("An unexpected error occurred");
        console.log(err);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <Link to="/" className="back-link">← Back to Home</Link>

        <div className="icon-circle">
          <span className="icon">⇨</span>
        </div>

        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Sign in to your account to continue</p>

        {error && <div className="error-message">{error}</div>}

        <form 
        onSubmit={handleLogin}
         className="form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group password-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
