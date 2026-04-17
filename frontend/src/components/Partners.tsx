import styles from "./Partners.module.css";

const PARTNERS = [
  { name: "Node.js", logo: "N" },
  { name: "MongoDB", logo: "M" },
  { name: "Next.js", logo: "N" },
  { name: "AWS", logo: "A" },
  { name: "Figma", logo: "F" },
  { name: "DaVinci", logo: "D" }
];

export default function Partners() {
  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        <span className={styles.label}>TECHNOLOGICAL AUTHORITY</span>
        <div className={styles.grid}>
          {PARTNERS.map(p => (
            <div key={p.name} className={styles.partner}>
              <span className={styles.logo}>{p.logo}</span>
              <span className={styles.name}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
