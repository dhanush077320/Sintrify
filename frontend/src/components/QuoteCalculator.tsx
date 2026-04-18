import { useState } from "react";
import axios from "axios";
import styles from "./QuoteCalculator.module.css";
import { API_ENDPOINTS } from "../config";

const SERVICES = [
  { 
    id: "web", 
    label: "Web Platform", 
    base: 2500, 
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
        <path d="M9 3V21M15 3V21M3 9H21M3 15H21" opacity="0.4" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  { 
    id: "mobile", 
    label: "App Development", 
    base: 3500, 
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M12 18H12.01" strokeWidth="3" strokeLinecap="round" />
        <path d="M9 2H15" opacity="0.4" />
      </svg>
    )
  },
  { 
    id: "branding", 
    label: "Logo(2D&3D) & Mascot", 
    base: 1200, 
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" strokeDasharray="2 2" />
        <path d="M12 8L10 12H14L12 16" />
        <path d="M8 12C8 12 10 10 12 10C14 10 16 12 16 12" strokeDasharray="3 1" />
      </svg>
    )
  },
  { 
    id: "cinema", 
    label: "Photo/Video Production", 
    base: 1800, 
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M22 7L18 9V11L22 13" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    )
  },
  { 
    id: "software", 
    label: "Software Development", 
    base: 3000, 
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 18L20 22L21 21L17 17L16 18Z" />
        <path d="M7 8L3 12L7 16" />
        <path d="M17 8L21 12L17 16" />
        <path d="M14 4L10 20" />
      </svg>
    )
  },
  { 
    id: "editing", 
    label: "Photo/Video Editing", 
    base: 1000, 
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 21L10 21" />
        <path d="M14 21L17 21" />
        <path d="M12 21L12 18" />
        <path d="M3 7V14C3 15.1046 3.89543 16 5 16H19C20.1046 16 21 15.1046 21 14V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" />
        <path d="M9 10L12 7L15 10" />
      </svg>
    )
  },
  { 
    id: "grading", 
    label: "Color Grading", 
    base: 800, 
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2V22" />
        <path d="M12 12L21 12" />
        <path d="M12 12L16.5 4.5" />
        <path d="M12 12L16.5 19.5" />
      </svg>
    )
  }
];

interface QuoteCalculatorProps {
  onBack?: () => void;
}

export default function QuoteCalculator({ onBack }: QuoteCalculatorProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const total = selected.reduce((sum, id) => {
    return sum + (SERVICES.find(s => s.id === id)?.base || 0);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.LEADS, {
        ...formData,
        services: selected.map(id => SERVICES.find(s => s.id === id)?.label),
        estimate: total
      });
      setStep(3);
    } catch (err) {
      alert("Consultation booking failed. Please reach out via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {onBack && (
          <button className="btn-outline" style={{ marginBottom: '2rem' }} onClick={onBack}>
            ← Back to Home
          </button>
        )}
        <div className={styles.header}>
          <h2 className={styles.title}>Estimate Your <span className="text-gradient">Ecosystem</span></h2>
          <p className={styles.subtitle}>Select your technical requirements to generate a strategic digital project roadmap.</p>
        </div>

        <div className={`glass ${styles.card}`}>
          {/* Architectural Stepper */}
          <div className={styles.stepper}>
            <div className={`${styles.step} ${step >= 1 ? styles.activeStep : ""}`}>
              <span className={styles.stepNum}>01</span>
              <span className={styles.stepLabel}>Discovery</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.step} ${step >= 2 ? styles.activeStep : ""}`}>
              <span className={styles.stepNum}>02</span>
              <span className={styles.stepLabel}>Strategy</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.step} ${step >= 3 ? styles.activeStep : ""}`}>
              <span className={styles.stepNum}>03</span>
              <span className={styles.stepLabel}>Impact</span>
            </div>
          </div>

          <div className={styles.content}>
            {step === 1 && (
              <div className={styles.grid}>
                {SERVICES.map(s => (
                  <div 
                    key={s.id} 
                    className={`${styles.serviceCard} ${selected.includes(s.id) ? styles.selected : ""}`}
                    onClick={() => setSelected(prev => prev.includes(s.id) ? prev.filter(i => i !== s.id) : [...prev, s.id])}
                  >
                    <div className={styles.serviceIcon}>
                      <s.icon />
                    </div>
                    <div className={styles.serviceInfo}>
                      <h4>{s.label}</h4>
                    </div>
                    <div className={styles.checkbox}>
                      {selected.includes(s.id) && <div className={styles.checkInner} />}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label>Consultant Name</label>
                  <input 
                    type="text" required placeholder="Ex. Alexander Pierce" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Business Email</label>
                  <input 
                    type="email" required placeholder="contact@company.com" 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Ecosystem Objectives</label>
                  <textarea 
                    rows={4} placeholder="Describe your primary technical goals..."
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
              </form>
            )}

            {step === 3 && (
              <div className={styles.success}>
                <div className={styles.successPulse}>
                  <div className={styles.checkIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17L4 12" />
                    </svg>
                  </div>
                  <div className={styles.pulseRing} />
                </div>
                <h3>Consultation Initialized</h3>
                <p>Your strategic roadmap is being prepared. Our architectural team will contact you at <strong>{formData.email}</strong> within 12 hours.</p>
                <button className="btn-filled" onClick={() => { setStep(1); setSelected([]); }}>New Estimate</button>
              </div>
            )}
          </div>

          {step < 3 && (
            <div className={styles.footer}>
              <div className={styles.pricing}>
                {/* Price labels removed as requested */}
              </div>
              <div className={styles.actions}>
                {step === 2 && (
                  <button className="btn-outline" onClick={() => setStep(1)} disabled={loading}>
                    Back
                  </button>
                )}
                <button 
                  className="btn-filled"
                  disabled={selected.length === 0 || loading}
                  onClick={() => step === 1 ? setStep(2) : handleSubmit({ preventDefault: () => {} } as any)}
                >
                  {loading ? "INITIALIZING..." : step === 1 ? "NEXT: STRATEGY" : "BOOK CONSULTATION"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
