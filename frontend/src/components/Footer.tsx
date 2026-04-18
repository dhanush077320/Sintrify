import styles from "./Footer.module.css";

interface FooterProps {
  onPrivacy?: () => void;
  onTerms?: () => void;
  onExplore?: () => void;
  onScrollTo?: (id: string) => void;
}

export default function Footer({ onPrivacy, onTerms, onExplore, onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              SINTR<span>IFY</span><span className={styles.dot}>.</span>
            </div>
            <p className={styles.tagline}>
              Architecting the unimaginable — where code meets world-class creativity.
            </p>
          </div>

          <div className={styles.linksRow}>
            <div className={styles.col}>
              <h4>PLATFORM</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); onExplore?.(); }}>Portfolio</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); onScrollTo?.("services"); }}>Services</a>
              <a href="#process" onClick={(e) => { e.preventDefault(); onScrollTo?.("process"); }}>Process</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); onScrollTo?.("about"); }}>About Us</a>
            </div>
            <div className={styles.col}>
              <h4>CONNECT</h4>
              <a href="https://wa.me/917736078898" target="_blank" rel="noopener noreferrer">Direct Inquiry</a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sintrify123@gmail.com" target="_blank" rel="noopener noreferrer">Email</a>
              <a href="https://www.facebook.com/share/1CngwNgURy/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.instagram.com/sintrify?igsh=eGlxc3JnemRrczk2" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <div className={styles.col}>
              <h4>LOCATION</h4>
              <p>Based in Thiruvananthapuram, Kerala</p>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {currentYear} SINTR<span>IFY</span>. ALL RIGHTS RESERVED.
          </p>
          <div className={styles.legal}>
            <a href="#" onClick={(e) => { e.preventDefault(); if (onPrivacy) onPrivacy(); }}>Privacy Protocol</a>
            <a href="#" onClick={(e) => { e.preventDefault(); if (onTerms) onTerms(); }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
