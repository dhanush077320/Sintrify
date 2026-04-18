import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Hero.module.css";
import { API_ENDPOINTS } from "../config";
import CountUp from "./CountUp";

interface HeroProps {
  onExplore?: () => void;
  onStartProject?: () => void;
}

export default function Hero({ onExplore, onStartProject }: HeroProps) {
  const [showContacts, setShowContacts] = useState(false);
  const [stats, setStats] = useState({ happyClients: 0, projectsDelivered: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.STATS);
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching live stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Architecting the <br />
            <span className={styles.gradientText}>Unimaginable.</span>
          </h1>
          <p className={styles.subtitle}>
            Your digital architect for scalable web apps, immersive UI design, and premium content production—where code meets world-class creativity.
          </p>
          
          <div className={styles.ctaGroup}>
            <div className={styles.topButtons}>
              <div className={styles.contactWrapper}>
                <button className="btn-filled" onClick={() => setShowContacts(!showContacts)}>Contact Us</button>
                {showContacts && (
                  <div className={styles.contactDropdown}>
                    <a href="tel:+917736078898" className={styles.contactItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      +91 77360 78898
                    </a>
                    <a href="tel:+916282348375" className={styles.contactItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      +91 62823 48375
                    </a>
                  </div>
                )}
              </div>
              <button className="btn-filled" onClick={onExplore}>Explore</button>
            </div>
            
            <button className={`${styles.startProjectBtn} btn-filled`} onClick={onStartProject}>
              Start Project
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.count}><CountUp end={stats.happyClients} duration={800} />+</span>
              <span className={styles.label}>Happy Clients</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.count}><CountUp end={stats.projectsDelivered} duration={800} />+</span>
              <span className={styles.label}>Projects Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
