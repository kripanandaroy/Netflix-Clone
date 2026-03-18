import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  const getUserInitial = () => {
    if (user?.displayName) return user.displayName[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return 'U';
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__left">
          <div className="navbar__logo">NETFLIX</div>
          {user && (
            <div className="navbar__links">
              <span>Home</span>
              <span>TV Shows</span>
              <span>Movies</span>
              <span>New & Popular</span>
              <span>My List</span>
            </div>
          )}
        </div>
        
        <div className="navbar__right">
          {!user ? (
            <div className="navbar__nav-links">
              <select className="navbar__language" defaultValue="English">
                <option>English</option>
                <option>हिन्दी (Hindi)</option>
                <option>বাংলা (Bengali)</option>
                <option>தமிழ் (Tamil)</option>
                <option>తెలుగు (Telugu)</option>
                <option>मराठी (Marathi)</option>
                <option>ಕನ್ನಡ (Kannada)</option>
                <option>മലയാളം (Malayalam)</option>
                <option>ગુજરાતી (Gujarati)</option>
                <option>ਪੰਜਾਬੀ (Punjabi)</option>
                <option>Español (Spanish)</option>
                <option>Français (French)</option>
                <option>Deutsch (German)</option>
                <option>日本語 (Japanese)</option>
                <option>한국어 (Korean)</option>
                <option>中文 (Chinese)</option>
                <option>العربية (Arabic)</option>
                <option>Português (Portuguese)</option>
              </select>
            </div>
          ) : (
            <div className="navbar__user" ref={dropdownRef}>
              <div 
                className="navbar__avatar" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {getUserInitial()}
              </div>
              
              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-header">
                    <p className="navbar__dropdown-name">{user.displayName || 'Netflix User'}</p>
                    <p className="navbar__dropdown-email">{user.email}</p>
                  </div>
                  <div className="navbar__dropdown-divider"></div>
                  <div className="navbar__dropdown-links">
                    <span>Account</span>
                    <span>My List</span>
                    <span>Help Center</span>
                  </div>
                  <div className="navbar__dropdown-divider"></div>
                  <div className="navbar__dropdown-logout" onClick={handleLogout}>
                    Sign out of Netflix
                  </div>
                </div>
              )}
            </div>
          )}

          <button className="navbar__hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {!user ? (
          <select className="navbar__language" defaultValue="English">
            <option>English</option>
            <option>हिन्दी (Hindi)</option>
            <option>தமிழ் (Tamil)</option>
            <option>తెలుగు (Telugu)</option>
          </select>
        ) : (
          <div className="navbar__mobile-links">
            <div className="navbar__mobile-greeting">
              Hello, {user.displayName?.split(' ')[0] || 'User'}
            </div>
            <span>Home</span>
            <span>TV Shows</span>
            <span>Movies</span>
            <span>New & Popular</span>
            <span>My List</span>
            <div className="navbar__mobile-divider"></div>
            <div className="navbar__mobile-logout" onClick={handleLogout}>
              Sign Out
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
