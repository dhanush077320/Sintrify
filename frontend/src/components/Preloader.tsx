import React, { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  progress: number;
  isLoading: boolean;
}

export default function Preloader({ progress, isLoading }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Small delay to allow the fade-out animation to play
      const timer = setTimeout(() => setShouldRender(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.wrapper} ${!isLoading ? styles.fadeOut : ""}`}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div className={styles.logoText}>
            <span className={styles.white}>SINTR</span>
            <span className={styles.gradient}>IFY</span>
            <span className={styles.dot} />
          </div>
          {/* Glitch clones for the professional effect */}
          <div className={`${styles.logoText} ${styles.clone} ${styles.blue}`}>
            <span>SINTR</span><span>IFY</span>
          </div>
          <div className={`${styles.logoText} ${styles.clone} ${styles.purple}`}>
            <span>SINTR</span><span>IFY</span>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.track}>
            <div 
              className={styles.fill} 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className={styles.stats}>
            <span className={styles.status}>INITIALIZING ECOSYSTEM</span>
            <span className={styles.percentage}>{progress}%</span>
          </div>
        </div>
      </div>
      
      <div className={styles.backgroundEffects}>
        <div className={styles.glow} />
        <div className={styles.grid} />
      </div>
    </div>
  );
}
