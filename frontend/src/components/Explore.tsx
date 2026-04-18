import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Explore.module.css";
import { API_ENDPOINTS } from "../config";

interface Project {
  _id: string;
  title: string;
  caption: string;
  fileUrl: string;
  fileType: string;
}

interface ExploreProps {
  onBack?: () => void;
}


export default function Explore({ onBack }: ExploreProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.PROJECTS);
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className={styles.loading}>Loading Sintrify Universe...</div>;

  return (
    <section className={styles.explore} id="explore">
      <div className={styles.container}>
        {onBack && (
          <button className="btn-outline" style={{ marginBottom: '2rem' }} onClick={onBack}>
            ← Back to Home
          </button>
        )}
        <header className={styles.header}>
          <h2 className={styles.title}>Explore our <span className="text-gradient">Portfolio</span></h2>
          <p className={styles.subtitle}>Discover our latest projects and high-performance engineering.</p>
        </header>

        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project._id} className={`${styles.card} glass`}>
              <div className={styles.media}>
                {project.fileType.startsWith("image/") ? (
                  <img 
                    src={project.fileUrl.startsWith("http") ? project.fileUrl : `${API_ENDPOINTS.BASE}${project.fileUrl}`} 
                    alt={project.title} 
                  />
                ) : (
                  <div className={styles.docPlaceholder}>
                    <span>📄</span>
                    <a 
                      href={project.fileUrl.startsWith("http") ? project.fileUrl : `${API_ENDPOINTS.BASE}${project.fileUrl}`} 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      View Document
                    </a>
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <h3>{project.title}</h3>
                {project.caption && (() => {
                  const urlRegex = /(https?:\/\/[^\s]+)/;
                  const match = project.caption.match(urlRegex);
                  const url = match ? match[0] : null;
                  const cleanText = url ? project.caption.replace(url, "").trim() : project.caption;
                  
                  return (
                    <div className={styles.captionWrapper}>
                      {cleanText && <p className={styles.captionText}>{cleanText}</p>}
                      {url && (
                        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                          View Live Website →
                        </a>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className={styles.empty}>
            <p>The universe is currently being architected. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
