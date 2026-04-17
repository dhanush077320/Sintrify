import { useState } from "react";
import styles from "./FAQ.module.css";

const FAQ_DATA = [
  {
    question: "What is Sintrify's modular architectural approach?",
    answer: "We engineer elite digital products using a strategy-first MERN architecture. Every module is built for synchronous scale, utilizing high-performance data patterns and cinematic interface logic to ensure your brand commands authority from day one."
  },
  {
    id: "02",
    question: "How do you bridge high-end production with technical engineering?",
    answer: "Our team operates at the intersection of code and creativity. We treat every line of React as a structural asset and every frame of cinematic video as a narrative tool, ensuring technical performance and emotional impact are never traded off."
  },
  {
    question: "What is the typical deployment timeline for an elite ecosystem?",
    answer: "An elite architectural MVP typically transitions from blueprint to deployment within 4 to 8 weeks. Complex enterprise ecosystems with deep integrations follow a meticulous 12+ week deployment framework."
  },
  {
    question: "How does the 'Nedumangad to Global' strategy benefit my brand?",
    answer: "We leverage local technical agility and global cinematic standards. This ensures your project is cost-optimized for development while maintaining the premium quality required to compete in high-stakes global markets."
  }
];

export interface FAQProps {
  onBack?: () => void;
}

export default function FAQ({ onBack }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>
        {onBack && (
          <button className="btn-outline" style={{ marginBottom: '2rem' }} onClick={onBack}>
            ← Back to Home
          </button>
        )}
        <div className={styles.header}>
          <span className={styles.badge}>DUE DILIGENCE</span>
          <h2 className={styles.title}>Elite <span className="text-gradient">Intelligence</span></h2>
          <p className={styles.desc}>Providing architectural clarity on our deployment process and tactical execution.</p>
        </div>

        <div className={styles.accordion}>
          {FAQ_DATA.map((item, idx) => (
            <div 
              key={idx} 
              className={`${styles.item} ${openIndex === idx ? styles.active : ""}`}
            >
              <button 
                className={styles.questionBox}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <h3>{item.question}</h3>
                <div className={styles.toggleIcon}>
                  <div className={styles.line} />
                  <div className={`${styles.line} ${styles.vertical}`} />
                </div>
              </button>
              <div className={styles.answerBox}>
                <div className={styles.answerContent}>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
