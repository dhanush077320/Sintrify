import styles from "./FAQ.module.css"; // Reuse FAQ styles for text content

interface Props {
  onBack?: () => void;
}

export default function TermsOfService({ onBack }: Props) {
  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        {onBack && (
          <button className="btn-outline" style={{ marginBottom: '2rem' }} onClick={onBack}>
            ← Back to Home
          </button>
        )}
        <div className={styles.header}>
          <h2 className={styles.title}>Terms of <span className="text-gradient">Service</span></h2>
          <p className={styles.desc} style={{ textAlign: 'left', marginTop: '2rem' }}>
            Welcome to Sintrify. By engaging our digital architecture and production services, you agree to the following terms.
            <br/><br/>
            <strong>1. Scope of Work:</strong> All projects are executed based on agreed-upon strategic roadmaps. Any deviations or additional modules will be subject to a revised estimate.
            <br/><br/>
            <strong>2. Intellectual Property:</strong> Upon full payment, the intellectual property of the final product is transferred to the client. Sintrify retains the right to display the project in our portfolio.
            <br/><br/>
            <strong>3. Payment Terms:</strong> Projects are divided into architectural milestones. Payments must be cleared at each milestone before proceeding to the next deployment phase.
            <br/><br/>
            <strong>4. Limitation of Liability:</strong> Sintrify engineers products to the highest standards, but we are not liable for external third-party outages or server failures beyond our managed infrastructure.
            <br/><br/>
            For detailed enterprise agreements, please refer to your tailored project contract.
          </p>
        </div>
      </div>
    </section>
  );
}
