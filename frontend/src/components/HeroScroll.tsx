import { useEffect, useRef, useState } from "react";
import styles from "./HeroScroll.module.css";

const FEATURES = [
  {
    title: "Architecting the Unimaginable",
    subtitle: "Your digital architect for scalable web apps and premium engineering.",
    start: 0,
    end: 0.25
  },
  {
    title: "Scalable Web Systems",
    subtitle: "Production-grade MERN architecture designed for global performance.",
    start: 0.3,
    end: 0.5
  },
  {
    title: "Immersive UI/UX",
    subtitle: "Cinematic interfaces that prioritize conversion, engagement, and authority.",
    start: 0.55,
    end: 0.75
  },
  {
    title: "Sintrify Ecosystem",
    subtitle: "Where world-class creativity meets disruptive technological innovation.",
    start: 0.8,
    end: 1
  }
];

export default function HeroScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pre-load the video
    video.load();

    const handleScroll = () => {
      if (!video.duration) return;
      
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const containerHeight = containerRef.current?.offsetHeight || 0;
      
      // Calculate progress (0 to 1) based on scroll through the wrapper
      const scrollFraction = Math.min(1, Math.max(0, scrollPos / (containerHeight - viewportHeight)));
      
      // Set video time based on scroll
      video.currentTime = scrollFraction * video.duration;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.scrollWrapper} ref={containerRef}>
      <div className={styles.stickyCanvas}>
        <video 
          ref={videoRef}
          src="/hero video.mp4"
          muted
          playsInline
          preload="auto"
          className={styles.video}
        />
        
        {/* Features Overlay */}
        <div className={styles.overlay}>
          {FEATURES.map((feature, i) => (
            <FeatureText key={i} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureText({ feature }: { feature: typeof FEATURES[0] }) {
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState("translateY(20px)");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalHeight = (document.documentElement.scrollHeight - viewportHeight);
      const progress = scrollPos / totalHeight;

      if (progress >= feature.start && progress <= feature.end) {
        // Fade in and out logic
        const fadeInPoint = feature.start + 0.05;
        const fadeOutPoint = feature.end - 0.05;
        
        let targetOpacity = 1;
        if (progress < fadeInPoint) {
          targetOpacity = (progress - feature.start) / 0.05;
        } else if (progress > fadeOutPoint) {
          targetOpacity = 1 - (progress - fadeOutPoint) / 0.05;
        }

        setOpacity(Math.max(0, Math.min(1, targetOpacity)));
        setTransform(`translateY(${(1 - targetOpacity) * 20}px)`);
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [feature]);

  return (
    <div 
      className={styles.featureItem} 
      style={{ opacity, transform }}
    >
      <h2 className={styles.featureTitle}>{feature.title}</h2>
      <p className={styles.featureSubtitle}>{feature.subtitle}</p>
    </div>
  );
}
