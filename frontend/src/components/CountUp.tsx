import { useState, useEffect } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
}

export default function CountUp({ end, duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0); // Reset count whenever target changes
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth stop
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(percentage) * end);
      
      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}</>;
}
