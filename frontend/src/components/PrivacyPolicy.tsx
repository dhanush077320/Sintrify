import styles from "./FAQ.module.css"; // Reuse FAQ styles for text content

interface Props {
  onBack?: () => void;
}

export default function PrivacyPolicy({ onBack }: Props) {
  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        {onBack && (
          <button className="btn-outline" style={{ marginBottom: '2rem' }} onClick={onBack}>
            ← Back to Home
          </button>
        )}
        <div className={styles.header}>
          <h2 className={styles.title}>Privacy <span className="text-gradient">Protocol</span></h2>
          <p className={styles.desc} style={{ textAlign: 'left', marginTop: '2rem' }}>
            At Sintrify, we value your privacy and are committed to protecting your personal data. 
            This Privacy Protocol outlines how we collect, use, and safeguard your information when you interact with our digital ecosystem.
            <br/><br/>
            <strong>1. Information Collection:</strong> We collect necessary technical and contact information when you engage with our Quote Calculator or contact forms.
            <br/><br/>
            <strong>2. Data Usage:</strong> Your data is solely used for project estimation, strategic architectural planning, and direct communication.
            <br/><br/>
            <strong>3. Security:</strong> We employ high-end encryption and modern security protocols to ensure your data is secure against unauthorized access.
            <br/><br/>
            <strong>4. Third-Party Sharing:</strong> We do not sell or trade your data to third parties. Information is only shared with trusted partners when strictly necessary for deployment.
            <br/><br/>
            For any privacy-related inquiries, please contact our security team at hello@sintrify.com.
          </p>
        </div>
      </div>
    </section>
  );
}
