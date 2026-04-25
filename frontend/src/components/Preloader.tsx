import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  progress: number; // Still keeping the prop for timing, but not showing it
  isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShouldRender(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.wrapper} ${!isLoading ? styles.fadeOut : ""}`}>
      {/* Cinematic Background */}
      <div className={styles.nebula} />
      <div className={styles.stardust} />
      
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <h1 className={styles.mainLogo}>
            <span className={styles.letter}>S</span>
            <span className={styles.letter}>I</span>
            <span className={styles.letter}>N</span>
            <span className={styles.letter}>T</span>
            <span className={styles.letter}>R</span>
            <span className={styles.letter}>I</span>
            <span className={styles.letter}>F</span>
            <span className={styles.letter}>Y</span>
            <span className={styles.dot} />
          </h1>
          <div className={styles.shimmerOverlay} />
        </div>
        
        {/* Subtle Activity Indicator */}
        <div className={styles.pulseRing} />
      </div>
    </div>
  );
}
