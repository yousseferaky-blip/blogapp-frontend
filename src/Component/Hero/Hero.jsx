import { Link } from "react-router-dom";
import "./Hero.css"; 
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Hero = () => {
    const {user} = useContext(UserContext)
  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">
          Welcome to <span className="highlight-text">BlogVerse</span>
        </h1>
        <p className="hero-subtitle">
          Discover amazing stories, share your thoughts, and connect with writers from around the world.
        </p>

        {user ? (
          <Link to="/profile">
            <button className="btn primary-btn">View Your Posts</button>
          </Link>
        ) : (
          <div className="hero-buttons">
            <Link to="/register">
              <button className="btn primary-btn">Get Started</button>
            </Link>
            <Link to="/login">
              <button className="btn outline-btn">Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
