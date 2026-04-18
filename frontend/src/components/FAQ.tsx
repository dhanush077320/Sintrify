import { useState } from "react";
import styles from "./FAQ.module.css";

const FAQ_DATA = [
  {
    question: "What is Sintrify?",
    answer: "Sintrify is a digital powerhouse that provides a unified solution for businesses. We combine expert software development (Web & App) with professional media production (Video, Photo, & Design) to build a complete digital ecosystem for our clients."
  },
  {
    question: "Why should I choose Sintrify over hiring multiple freelancers?",
    answer: "Hiring multiple freelancers often leads to fragmented branding and communication gaps. Sintrify acts as a single partner where your code, design, and media are developed under one roof, ensuring perfect synchronization and a consistent brand voice."
  },
  {
    question: "Do you provide UI/UX design services?",
    answer: "Yes. Every software project starts with a comprehensive UI/UX phase to ensure the final product is not only functional but also intuitive and visually stunning."
  },
  {
    question: "Can you help with existing projects, or do you only start from scratch?",
    answer: "We do both! We can build a 'from-zero' MVP for your startup or provide specialized 'Digital Force' to scale and optimize your existing platforms."
  },
  {
    question: "How do we get started with a project?",
    answer: "Simply click the 'Get Started' button on our posters or website. We’ll schedule a discovery call to understand your 'First Logic' and map out the path to your 'Final Frame.'"
  },
  {
    question: "What kind of video production and photography do you offer?",
    answer: "At Sintrify, we offer a personalized 'Digital Photographer' experience. We use a combination of professional cameras and high-end iPhones to help you capture your vision. We specialize in creating high-quality reels, short-form videos, and professional photoshoots for individuals and brands. Think of us as your personal production team that handles everything from the 'First Logic' of the shoot to the 'Final Frame' of the edit."
  },
  {
    question: "Is your production service available everywhere?",
    answer: "Since we are currently in our launch phase, our on-site video and photo production services are exclusively available in Trivandrum. This allows us to provide a dedicated, local service as we grow. However, our software and design services remain available to clients everywhere!"
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
