import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onSecretTrigger?: () => void;
  onExplore?: () => void;
  onHome?: () => void;
  onFAQ?: () => void;
  onStartProject?: () => void;
}

export default function Navbar({ onSecretTrigger, onHome, onFAQ, onStartProject }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 10) {
      setClickCount(0);
      if (onSecretTrigger) {
        onSecretTrigger();
      }
    }
  };

  const handleNavClick = (action?: () => void) => {
    setMenuOpen(false);
    if (action) action();
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <span className={styles.logoBase}>SINTR</span>
          <span className={styles.logoAccent}>IFY</span>
          <span className={styles.logoDot} />
        </div>

        {/* Hamburger Toggle */}
        <button 
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        
        <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
          {onHome ? (
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(onHome); }}>HOME</a>
          ) : (
            <>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(() => window.scrollTo({ top: 0, behavior: 'smooth' })); }}>HOME</a>
              <a href="#services" onClick={() => setMenuOpen(false)}>SERVICES</a>
              <a href="#process" onClick={() => setMenuOpen(false)}>PATHWAY</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(onFAQ); }}>FAQ</a>
            </>
          )}
          {/* Mobile-only Start Project inside menu */}
          <button 
            className={`btn-filled ${styles.mobileStartBtn}`}
            onClick={() => handleNavClick(onStartProject)}
          >
            Start Project
          </button>
        </div>

        <div className={styles.actions}>
          <button 
            className="btn-filled" 
            onClick={() => {
              if (onStartProject) onStartProject();
            }}
          >
            Start Project
          </button>
        </div>
      </div>
    </nav>
  );
}
