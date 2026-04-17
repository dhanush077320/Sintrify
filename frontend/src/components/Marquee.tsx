import styles from "./Marquee.module.css";

export default function Marquee() {
  const text = "ENGINEERED ARCHITECTURE • CINEMATIC STRATEGY • SUSTAINED GROWTH • ";
  
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent}>
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
      </div>
    </div>
  );
}
