import { useEffect, useRef, useState } from "react";
import styles from "./HeroScroll.module.css";

const FRAME_COUNT = 240;

const FEATURES = [
  {
    title: "Architecting the",
    highlight: "Unimaginable",
    subtitle: "Your digital architect for scalable web apps and premium engineering.",
    start: 0,
    end: 60
  },
  {
    title: "Scalable Web",
    highlight: "Systems",
    subtitle: "Production-grade MERN architecture designed for global performance.",
    start: 75,
    end: 135
  },
  {
    title: "Immersive",
    highlight: "UI/UX",
    subtitle: "Cinematic interfaces that prioritize conversion, engagement, and authority.",
    start: 150,
    end: 210
  },
  {
    title: "Sintrify",
    highlight: "Ecosystem",
    subtitle: "Where world-class creativity meets disruptive technological innovation.",
    start: 225,
    end: 240
  }
];

export default function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preload all 240 frames for ultimate quality
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, '0');
      img.src = `/ezgif-frame-${frameIndex}.png`;
      
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
    if (images.length < FRAME_COUNT || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      // Smart Zoom: Increase scale slightly to push watermark out of view
      const zoomFactor = 1.15; 

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width * zoomFactor;
        drawHeight = (canvas.width / imgRatio) * zoomFactor;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = (canvas.height * imgRatio) * zoomFactor;
        drawHeight = canvas.height * zoomFactor;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      const context = canvas.getContext("2d");
      if (context) context.scale(dpr, dpr);
      
      handleScroll();
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const containerHeight = containerRef.current?.offsetHeight || 0;
      const scrollFraction = Math.min(1, Math.max(0, scrollPos / (containerHeight - viewportHeight)));
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(scrollFraction * (FRAME_COUNT - 1)));
      
      requestAnimationFrame(() => renderFrame(frameIndex));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  if (loadingProgress < 100) {
    return (
      <div className={styles.loader}>
        <div className={styles.loaderContent}>
          <div className={styles.logo}>
            <span className={styles.logoBase}>SINTR</span>
            <span className={styles.logoAccent}>IFY</span>
            <span className={styles.logoDot} />
          </div>
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
      const progress = (scrollPos / (containerHeight - viewportHeight)) * FRAME_COUNT;

      if (progress >= feature.start && progress <= feature.end) {
        const fadeInPoint = feature.start + 5;
        const fadeOutPoint = feature.end - 5;
        
        let targetOpacity = 1;
        if (progress < fadeInPoint) {
          targetOpacity = (progress - feature.start) / 5;
        } else if (progress > fadeOutPoint) {
          targetOpacity = 1 - (progress - fadeOutPoint) / 5;
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
      <h2 className={styles.featureTitle}>
        {feature.title} <span className={styles.textGradient}>{feature.highlight}</span>
      </h2>
      <p className={styles.featureSubtitle}>{feature.subtitle}</p>
    </div>
  );
}
