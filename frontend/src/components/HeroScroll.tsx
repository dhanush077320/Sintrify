import { useEffect, useRef, useState } from "react";
import styles from "./HeroScroll.module.css";

// Optimization: Use 80 frames (every 3rd frame) to cut loading time by 66% while keeping it smooth
const TOTAL_FRAMES = 240;
const SKIP_FACTOR = 3; 
const ACTIVE_FRAMES = Math.floor(TOTAL_FRAMES / SKIP_FACTOR);

const FEATURES = [
  {
    title: "Architecting the Unimaginable",
    subtitle: "Your digital architect for scalable web apps and premium engineering.",
    start: 0,
    end: 20
  },
  {
    title: "Scalable Web Systems",
    subtitle: "Production-grade MERN architecture designed for global performance.",
    start: 25,
    end: 45
  },
  {
    title: "Immersive UI/UX",
    subtitle: "Cinematic interfaces that prioritize conversion, engagement, and authority.",
    start: 50,
    end: 70
  },
  {
    title: "Sintrify Ecosystem",
    subtitle: "Where world-class creativity meets disruptive technological innovation.",
    start: 75,
    end: 80
  }
];

export default function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Preload optimized frame sequence
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < ACTIVE_FRAMES; i++) {
      const img = new Image();
      const actualFrameIndex = (i * SKIP_FACTOR) + 1;
      const frameIndexStr = actualFrameIndex.toString().padStart(3, '0');
      img.src = `/hero-frames/ezgif-frame-${frameIndexStr}.png`;
      
      img.onload = () => {
        loadedCount++;
        const progress = Math.floor((loadedCount / ACTIVE_FRAMES) * 100);
        setLoadingProgress(progress);
        
        // Show site after first 10 frames are ready
        if (loadedCount >= 10 && !isReady) {
          setIsReady(true);
        }
        
        if (loadedCount === ACTIVE_FRAMES) {
          setImages(loadedImages);
        }
      };
      loadedImages[i] = img;
    }
  }, []);

  useEffect(() => {
    if (!isReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      handleScroll();
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const containerHeight = containerRef.current?.offsetHeight || 0;
      const scrollFraction = Math.min(1, Math.max(0, scrollPos / (containerHeight - viewportHeight)));
      const frameIndex = Math.min(ACTIVE_FRAMES - 1, Math.floor(scrollFraction * (ACTIVE_FRAMES - 1)));
      
      requestAnimationFrame(() => renderFrame(frameIndex));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [images, isReady]);

  if (!isReady) {
    return (
      <div className={styles.loader}>
        <div className={styles.loaderContent}>
          <div className={styles.logo}>SINTRIFY</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${loadingProgress}%` }} />
          </div>
          <div className={styles.loadingText}>Initializing Digital Ecosystem... {loadingProgress}%</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.scrollWrapper} ref={containerRef}>
      <div className={styles.stickyCanvas}>
        <canvas ref={canvasRef} />
        
        {loadingProgress < 100 && (
          <div className={styles.backgroundLoading}>
            OPTIMIZING EXPERIENCE... {loadingProgress}%
          </div>
        )}
        
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
      const containerHeight = (document.querySelector(`.${styles.scrollWrapper}`) as HTMLElement)?.offsetHeight || 0;
      const progress = (scrollPos / (containerHeight - viewportHeight)) * ACTIVE_FRAMES;

      if (progress >= feature.start && progress <= feature.end) {
        const fadeInPoint = feature.start + 2;
        const fadeOutPoint = feature.end - 2;
        
        let targetOpacity = 1;
        if (progress < fadeInPoint) {
          targetOpacity = (progress - feature.start) / 2;
        } else if (progress > fadeOutPoint) {
          targetOpacity = 1 - (progress - fadeOutPoint) / 2;
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
    <div className={styles.featureItem} style={{ opacity, transform }}>
      <h2 className={styles.featureTitle}>{feature.title}</h2>
      <p className={styles.featureSubtitle}>{feature.subtitle}</p>
    </div>
  );
}
