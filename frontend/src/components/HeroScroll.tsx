import { useEffect, useRef, useState } from "react";
import styles from "./HeroScroll.module.css";

const FRAME_COUNT = 240;

const FEATURES = [
  {
    title: "Architecting the Unimaginable",
    subtitle: "Your digital architect for scalable web apps and premium engineering.",
    start: 0,
    end: 60
  },
  {
    title: "Scalable Web Systems",
    subtitle: "Production-grade MERN architecture designed for global performance.",
    start: 65,
    end: 120
  },
  {
    title: "Immersive UI/UX",
    subtitle: "Cinematic interfaces that prioritize conversion, engagement, and authority.",
    start: 125,
    end: 180
  },
  {
    title: "Sintrify Ecosystem",
    subtitle: "Where world-class creativity meets disruptive technological innovation.",
    start: 185,
    end: 240
  }
];

export default function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, '0');
      img.src = `/src/assets/ezgif-frame-${frameIndex}.png`;
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages[i - 1] = img;
    }
  }, []);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      // Draw image to cover canvas
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
      // Initial render
      const scrollPos = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollPos / totalScroll;
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(scrollFraction * FRAME_COUNT));
      renderFrame(frameIndex);
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const containerHeight = containerRef.current?.offsetHeight || 0;
      
      // Calculate progress relative to the animation container
      const scrollFraction = Math.min(1, Math.max(0, scrollPos / (containerHeight - viewportHeight)));
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(scrollFraction * (FRAME_COUNT - 1)));
      
      requestAnimationFrame(() => renderFrame(frameIndex));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  if (loadingProgress < 100) {
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
      const frameIndex = (scrollPos / totalHeight) * FRAME_COUNT;

      if (frameIndex >= feature.start && frameIndex <= feature.end) {
        // Fade in and out logic
        const fadeInPoint = feature.start + 5;
        const fadeOutPoint = feature.end - 5;
        
        let targetOpacity = 1;
        if (frameIndex < fadeInPoint) {
          targetOpacity = (frameIndex - feature.start) / 5;
        } else if (frameIndex > fadeOutPoint) {
          targetOpacity = 1 - (frameIndex - fadeOutPoint) / 5;
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
