import { useState } from "react";
import styles from "./Portfolio.module.css";

const Icons = {
  Commerce: () => (
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="35" width="70" height="50" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M25 50H95" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="45" cy="95" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="75" cy="95" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M40 20L60 35L80 20" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Tapestry: () => (
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 20C40 40 80 40 100 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 100C40 80 80 80 100 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="40" y="35" width="40" height="50" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M50 50H70" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="60" r="3" fill="currentColor" />
    </svg>
  ),
  Fintech: () => (
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 90L50 60L80 75L110 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="110" cy="30" r="4" fill="currentColor" />
      <rect x="20" y="20" width="80" height="80" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M40 80V50" stroke="currentColor" strokeWidth="2" />
      <path d="M60 80V65" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Streaming: () => (
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 35L85 60L40 85V35Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
      <rect x="15" y="15" width="90" height="90" rx="10" stroke="currentColor" strokeWidth="2" />
      <path d="M15 85H105" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <circle cx="60" cy="110" r="2" fill="currentColor" />
    </svg>
  ),
  AI: () => (
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <path d="M60 30V90M30 60H90" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="60" r="8" fill="currentColor" />
      <path d="M40 40L80 80M80 40L40 80" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  ),
  Health: () => (
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 90L50 75H30V45H50L60 30L70 45H90V75H70L60 90Z" stroke="currentColor" strokeWidth="2" />
      <path d="M45 60H75M60 45V75" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    </svg>
  ),
  Logistics: () => (
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="40" width="70" height="40" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M25 40L40 20H80L95 40" stroke="currentColor" strokeWidth="2" />
      <circle cx="40" cy="90" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="80" cy="90" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M100 20L110 30" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Social: () => (
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="20" stroke="currentColor" strokeWidth="2" />
      <circle cx="75" cy="75" r="25" stroke="currentColor" strokeWidth="2" />
      <path d="M55 55L65 65" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="20" r="3" fill="currentColor" />
    </svg>
  )
};

const CASE_STUDIES = [
  { id: "01", title: "Quantum Commerce", category: "Architecture", desc: "Engineered scalable e-commerce logic with sub-pixel UI precision.", icon: Icons.Commerce, metric: "99.9% UPTIME" },
  { id: "02", title: "Heritage Tapestry", category: "Experience", desc: "A cinematic digital tapestry color-graded for premium global storytelling.", icon: Icons.Tapestry, metric: "4K CINEMATIC" },
  { id: "03", title: "Aura Fintech", category: "Performance", desc: "Strategic financial data visualization with ultra-fast real-time response.", icon: Icons.Fintech, metric: "98/100 SPEED" },
  { id: "04", title: "Lumina Streaming", category: "Deployment", desc: "High-tier video delivery infrastructure optimized for elite performance.", icon: Icons.Streaming, metric: "LOW LATENCY" },
  { id: "05", title: "Vertex AI", category: "Logic", desc: "Complex automation engine blending technical logic with effortless UI flow.", icon: Icons.AI, metric: "SMART LOGIC" },
  { id: "06", title: "Pulse Health", category: "Ecosystems", desc: "Building resilient patient-first portals with absolute data integrity.", icon: Icons.Health, metric: "HIPAA READY" },
  { id: "07", title: "Orbital Logistics", category: "Tracking", desc: "Supply chain visualization with geometric precision and market authority.", icon: Icons.Logistics, metric: "GLOBAL FLOW" },
  { id: "08", title: "Nexus Social", category: "Community", desc: "Disruptive social architecture designed for deep brand memory.", icon: Icons.Social, metric: "HIGH ENGAGE" }
];

export default function Portfolio() {
  const [slider, setSlider] = useState(50);

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.tag}>SELECTED IMPACTS</span>
        <h2 className={styles.title}>The Proof of <span className="text-gradient">Performance</span></h2>
        <p className={styles.subtitle}>Witness our architectural precision across 8 high-performance digital deployments.</p>
      </div>

      <div className={styles.grid}>
        {CASE_STUDIES.map(study => (
          <div key={study.id} className={styles.doodleCard}>
            <div className={styles.visual}>
              <study.icon />
              <div className={styles.metricBadge}>{study.metric}</div>
            </div>
            
            <div className={styles.info}>
              <span className={styles.category}>{study.category}</span>
              <h3 className={styles.studyTitle}>{study.title}</h3>
              <p className={styles.studyDesc}>{study.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Concept Slider */}
      <div className={`glass ${styles.evolution}`}>
        <div className={styles.evoText}>
          <span className={styles.tag}>BRAND ENGINEERING</span>
          <h3 className={styles.evoTitle}>From <span className="text-gradient">Blueprint</span> to Scale</h3>
          <p>The meticulous transition from conceptual geometry to market-ready digital assets.</p>
        </div>

        <div className={styles.sliderBox}>
          <div className={styles.view} style={{ backgroundImage: "url('/sintrify_3d_logo_1776353941615.png')" }} />
          <div 
            className={`${styles.view} ${styles.top}`} 
            style={{ 
              backgroundImage: "url('/design_sketch_concept_1776354137711.png')",
              clipPath: `inset(0 ${100 - slider}% 0 0)`
            }} 
          />
          <input 
            type="range" min="0" max="100" value={slider} 
            onChange={e => setSlider(Number(e.target.value))} 
            className={styles.range}
          />
          <div className={styles.handle} style={{ left: `${slider}%` }}>
            <div className={styles.button}>↔</div>
          </div>
        </div>
      </div>
    </section>
  );
}
