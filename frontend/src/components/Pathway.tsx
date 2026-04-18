import { useState } from "react";
import styles from "./Pathway.module.css";

const NODES = [
  {
    id: "analyzing",
    title: "Analyzing",
    desc: "Deep-dive technical auditing and project discovery to establish a solid architectural foundation for your digital ecosystem.",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21L16.65 16.65" />
        <path d="M8 11H14" />
      </svg>
    )
  },
  {
    id: "strategy",
    title: "Strategy & Design",
    desc: "Drafting high-fidelity interface wireframes and immersive UI design that prioritize conversion, engagement, and brand authority.",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
        <path d="M12 8V16M8 12H16" />
        <circle cx="12" cy="12" r="3" opacity="0.3" />
      </svg>
    )
  },
  {
    id: "service",
    title: "Our Service",
    desc: "Production-grade MERN architecture combined with cinematic video production to deliver high-performance, polished results.",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 17L10 11L4 5" />
        <path d="M14 19H20" />
        <circle cx="15" cy="10" r="5" strokeDasharray="2 2" />
      </svg>
    )
  }
];

export default function Pathway() {
  const [activeNodeId, setActiveNodeId] = useState(NODES[0].id);

  return (
    <section className={styles.pathway} id="process">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>The Architectural <span className="text-gradient">Pathway</span></h2>
          <p className={styles.subtitle}>Our rigorous process for transforming disruptive ideas into market-leading digital ecosystems.</p>
        </div>

        <div className={styles.mainContent}>
          {/* Visual Side (Left) */}
          <div className={styles.visualSide}>
            <div className={styles.networkContainer}>
              <svg className={styles.backgroundSvg} viewBox="0 0 600 550">
                {/* Responsive coordinates: 80 for mobile (scale-adjusted), 130 for desktop */}
                <path d="M80 175 Q 300 175 300 285" className={`${styles.flowPath} ${activeNodeId === 'analyzing' ? styles.pathActive : ''}`} />
                <path d="M80 285 H 300" className={`${styles.flowPath} ${activeNodeId === 'strategy' ? styles.pathActive : ''}`} />
                <path d="M80 395 Q 300 395 300 285" className={`${styles.flowPath} ${activeNodeId === 'service' ? styles.pathActive : ''}`} />
                
                {/* Center to Right connection */}
                <path d="M300 285 H 550" className={styles.flowPath} />
              </svg>

              {/* Input Nodes (Visible and Interactive) */}
              <div className={styles.inputNodes}>
                 {NODES.map((node, i) => (
                   <div 
                    key={node.id} 
                    className={`${styles.node} ${activeNodeId === node.id ? styles.active : ""}`}
                    style={{ "--node-top": `${175 + i * 110}px` } as any}
                    onMouseEnter={() => setActiveNodeId(node.id)}
                   >
                     <div className={styles.nodeIcon}><node.icon /></div>
                     <span className={styles.iconLabel}>{node.title}</span>
                   </div>
                 ))}
              </div>

              {/* Central Sintrify Engine Node */}
              <div className={styles.centerNode}>
                <div className={styles.corePulse}>
                  <div className={styles.coreInner}>S</div>
                  <div className={styles.pulseRing} />
                </div>
                <span className={styles.coreLabel}>Sintrify</span>
              </div>

              {/* Output Node */}
              <div className={styles.outputNode}>
                <div className={styles.impactWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className={styles.nodeLabel}>Client</span>
              </div>
            </div>
          </div>

          {/* Text Side (Right) */}
          <div className={styles.textSide}>
            {NODES.map((node, i) => (
              <div 
                key={node.id} 
                className={`${styles.processItem} ${activeNodeId === node.id ? styles.activeItem : ""}`}
                onMouseEnter={() => setActiveNodeId(node.id)}
              >
                <div className={styles.itemNumber}>{i + 1}.</div>
                <div className={styles.itemContent}>
                  <h3>{node.title}</h3>
                  <p>{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Section  */}
        <div id="about" className={styles.about}>
          <div className={styles.aboutContent}>
            <h3>About Sintrify</h3>
            <div className={styles.aboutBody}>
              <p>
                At <strong>Sintrify</strong>, we don't just build websites — we solve problems. 
              </p>
              <p>
                Based in <strong>Nedumangad, Trivandrum</strong>, our mission is to uncover your business's pain points and deliver strategic, tailor-made digital solutions. Whether it's increasing your online visibility or streamlining operations, we help you take the right step forward.
              </p>
              <p>
                With an expert team behind every project, we turn challenges into results. From initial planning to post-launch support — we stay connected and committed.
              </p>
              <p>
                Let <strong>Sintrify</strong> be the force that drives your digital success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
