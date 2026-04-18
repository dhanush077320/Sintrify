import styles from "./Footer.module.css";

interface FooterProps {
  onPrivacy?: () => void;
  onTerms?: () => void;
  onExplore?: () => void;
  onFAQ?: () => void;
}

export default function Footer({ onPrivacy, onTerms, onExplore, onFAQ }: FooterProps) {
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
              <a href="#services">Services</a>
              <a href="#process">Process</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onFAQ?.(); }}>Intelligence</a>
            </div>
            <div className={styles.col}>
              <h4>CONNECT</h4>
              <a href="mailto:hello@sintrify.com">Direct Inquiry</a>
              <a href="#">LinkedIn</a>
              <a href="#">X / Twitter</a>
              <a href="#">Instagram</a>
            </div>
            <div className={styles.col}>
              <h4>LOCATION</h4>
              <p>Based in Thiruvananthapuram, Kerala</p>
              <p>Operational Globally</p>
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
