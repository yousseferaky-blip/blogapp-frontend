// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Github, Twitter, Mail, Heart } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">B</div>
              <span className="footer-logo-text">BlogVerse</span>
            </Link>
            <p className="footer-description">
              A modern platform for sharing stories, thoughts, and connecting with writers from around the world.
            </p>
            <div className="footer-icons">
              <a href="#"><Github size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Mail size={20} /></a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Get Started</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 BlogVerse. All rights reserved.</p>
          <p>Made with <Heart className="heart-icon" /> for writers everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
