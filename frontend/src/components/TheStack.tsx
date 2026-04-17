import styles from "./TheStack.module.css";

const STACK = [
  { name: "React", category: "Engine", description: "Reactive UI Architecture" },
  { name: "Node.js", category: "Runtime", description: "High-Scale Server Execution" },
  { name: "MongoDB", category: "Persistence", description: "Flexible Schema Architecture" },
  { name: "TypeScript", category: "Safety", description: "Strict Type Integrity" },
  { name: "DaVinci", category: "Cinema", description: "Color Science Engineering" },
  { name: "After Effects", category: "Motion", description: "Visual Effect Computation" },
];

export default function TheStack() {
  return (
    <section id="stack" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>TECHNOLOGY</span>
          <h2 className={styles.title}>The <span className="text-gradient">Architectural</span> Stack</h2>
          <p className={styles.desc}>We leverage industry-standard tools to build robust, future-proof digital products.</p>
        </div>

        <div className={styles.grid}>
          {STACK.map(item => (
            <div key={item.name} className={`glass ${styles.item}`}>
              <div className={styles.meta}>
                <span className={styles.category}>{item.category}</span>
                <h3 className={styles.name}>{item.name}</h3>
              </div>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
