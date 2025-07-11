// src/components/Navbar.jsx
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, Edit, LogOut } from "lucide-react";
import { UserContext } from "../../context/UserContext";
import "./Navbar.css";
import { IoMdClose } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { handleLogout } from "../../assets/Functions";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setAcitve] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo group">
          <div className="navbar-logo-icon">
            <span>B</span>
          </div>
          <span className="navbar-logo-text">BlogVerse</span>
        </Link>

        {/* Links */}
        <div className={`navbar-links ${active ? "active" : ""}`}>
          <Link to="/" className="navbar-link" onClick={() => setAcitve(false)}>
            <Home size={18} />
            <span>Home</span>
          </Link>

          {user && (
            <Link
              to="/profile"
              className="navbar-link"
              onClick={() => setAcitve(false)}
            >
              <User size={18} />
               <span>Profile</span>
            </Link>
          )}

          {!user && (
            <div className="auth-links-mobile">
              <Link to="/login" onClick={() => setAcitve(false)} className="mobile-btn">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setAcitve(false)} className="mobile-btn register">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          {user ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <div className="avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {user?.username?.slice(0, 1).toUpperCase()}
              </div>

              {dropdownOpen && (
                <div className="dropdown-content">
                  <p className="username">{user.username}</p>
                  <p className="email">{user.email}</p>
                  <hr />
                  <div className="dropdown-items">
                    <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <User size={14} />
                      <span>Profile</span>
                    </Link>
                    <Link to="/create-post" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <Edit size={14} />
                      <span>Write Post</span>
                    </Link>
                    <div onClick={()=> handleLogout({setUser,navigate})} className="dropdown-item logout">
                      <LogOut size={14} />
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login">
                <button className="auth-btn sign">Sign In</button>
              </Link>
              <Link to="/register">
                <button className="auth-btn register">Get Started</button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <button onClick={() => setAcitve(!active)} className="bars">
            {active ? <IoMdClose size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
