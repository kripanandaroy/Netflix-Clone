import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__left">
        <div className="navbar__logo">NETFLIX</div>
      </div>
      
      <div className="navbar__right">
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
          <button className="navbar__signin">Sign In</button>
        </div>
        <button className="navbar__hamburger" aria-label="Menu">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
