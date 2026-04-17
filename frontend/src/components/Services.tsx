import styles from "./Services.module.css";

const Icons = {
  Web: () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="80" height="60" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M20 45H100" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M35 65L45 75L35 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="85" cy="75" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M10 20L15 25" stroke="currentColor" strokeWidth="1" />
      <path d="M110 95L105 90" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="20" r="2" fill="currentColor" />
      <path d="M40 20L45 25M55 20L50 25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  App: () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="15" width="50" height="90" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="42" y="25" width="36" height="50" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="60" cy="88" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M100 40L105 35M100 80L105 85" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 30L20 35M15 70L20 65" stroke="currentColor" strokeWidth="1.5" />
      <rect x="48" y="35" width="8" height="8" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="64" y="35" width="8" height="8" rx="1" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  UI: () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="25" stroke="currentColor" strokeWidth="2" />
      <rect x="55" y="55" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M40 40L75 75" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="85" cy="25" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 90L25 100" stroke="currentColor" strokeWidth="2" />
      <path d="M105 105L100 100" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Color: () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 20H100V100H20V20Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" />
      <path d="M60 35V85M35 60H85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M85 85L105 105" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="30" r="3" fill="currentColor" />
    </svg>
  ),
  Prod: () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 40L90 40L100 90L20 90L30 40Z" stroke="currentColor" strokeWidth="2" />
      <path d="M30 40L20 20L80 20L90 40" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="65" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M10 50L15 55M110 50L105 55" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Logo: () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20L100 80H20L60 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="60" cy="55" r="15" stroke="currentColor" strokeWidth="2" />
      <path d="M10 100H110" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M90 20L100 30" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Mascot: () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="40" width="60" height="45" rx="15" stroke="currentColor" strokeWidth="2" />
      <circle cx="45" cy="62" r="4" fill="currentColor" />
      <circle cx="75" cy="62" r="4" fill="currentColor" />
      <path d="M50 75C55 78 65 78 70 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M45 40L40 25M75 40L80 25" stroke="currentColor" strokeWidth="2" />
      <circle cx="15" cy="40" r="2" fill="currentColor" />
      <circle cx="105" cy="80" r="3" fill="currentColor" />
    </svg>
  ),
  Portfolio: () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
      <rect x="35" y="35" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="var(--bg-page)" />
      <rect x="50" y="50" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="var(--bg-page)" />
      <path d="M100 20L105 15" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="110" cy="10" r="2" fill="currentColor" />
    </svg>
  )
};

const SERVICES = [
  {
    title: "Web Development",
    desc: "Engineering high-performance, scalable web applications that blend powerful backend logic with seamless frontend experiences.",
    icon: Icons.Web
  },
  {
    title: "App Development",
    desc: "Building high-speed, native-quality mobile applications for iOS and Android using Flutter’s powerful cross-platform framework.",
    icon: Icons.App
  },
  {
    title: "UI Design",
    desc: "Crafting intuitive and immersive interfaces that transform complex digital interactions into effortless user journeys.",
    icon: Icons.UI
  },
  {
    title: "Color Grading",
    desc: "Cinematic color science applied to your footage to achieve a polished, emotionally resonant look that enhances your narrative.",
    icon: Icons.Color
  },
  {
    title: "Photo & Video Production",
    desc: "End-to-end production services that turn concepts into high-quality visual stories, capturing your brand with cinematic precision.",
    icon: Icons.Prod
  },
  {
    title: "Logo Design",
    desc: "Engineering strategic brand identities, from original geometry to timeless marks that immediately establish market authority.",
    icon: Icons.Logo
  },
  {
    title: "Mascot Design",
    desc: "Crafting distinctive character identities that instantly inject personality, recognition, and deep memory into your brand.",
    icon: Icons.Mascot
  },
  {
    title: "Personal Portfolio Making",
    desc: "Showcase your skills and achievements with a stunning personal portfolio. Our tailored designs enhance your online presence and attract potential clients or employers.",
    icon: Icons.Portfolio
  }
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our <span className="text-gradient">Services</span></h2>
          <p className={styles.subtitle}>Engineering disruptive digital solutions with architectural precision.</p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s, idx) => (
            <div key={idx} className={styles.doodleCard}>
              <div className={styles.visual}>
                <s.icon />
                <div className={styles.sparkle} />
              </div>
              <div className={styles.info}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
