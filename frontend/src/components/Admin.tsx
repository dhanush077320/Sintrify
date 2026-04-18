import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Admin.module.css";
import { API_ENDPOINTS } from "../config";

interface Project {
  _id: string;
  title: string;
  caption: string;
  fileUrl: string;
  fileType: string;
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "closed";
}

interface AdminProps {
  onLogout: () => void;
}


export default function Admin({ onLogout }: AdminProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "leads">("leads");
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.LEADS);
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.PROJECTS);
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("file", file);

    try {
      await axios.post(API_ENDPOINTS.PROJECTS, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setTitle("");
      setCaption("");
      setFile(null);
      fetchProjects();
      alert("Project uploaded successfully!");
    } catch (error) {
      console.error("Error uploading project:", error);
      alert("Failed to upload project.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.PROJECTS}/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Check if backend is running.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Delete this lead record permanently?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.LEADS}/${id}`);
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Failed to delete lead. Check if backend is running.");
    }
  };

  return (
    <div className={styles.adminContainer}>
      <nav className={styles.adminNav}>
        <div className={styles.logo}>
          <span>SINTR</span>IFY <span>ADMIN</span>
        </div>
        <button className="btn-outline" onClick={onLogout}>Logout</button>
      </nav>
      
      <main className={styles.content}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'leads' ? styles.activeTab : ""}`}
            onClick={() => setActiveTab('leads')}
          >
            Leads & Bookings ({leads.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.activeTab : ""}`}
            onClick={() => setActiveTab('projects')}
          >
            Portfolio Projects
          </button>
        </div>

        {activeTab === 'leads' ? (
          <section className={styles.leadsSection}>
            <header className={styles.header}>
              <h1>Appointment <span className="text-gradient">Bookings</span></h1>
              <p>Manage incoming ecosystem leads and customer consultations.</p>
            </header>

            <div className={styles.leadsGrid}>
              {leads.map((lead) => (
                <div key={lead._id} className={`${styles.leadCard} glass`}>
                  <div className={styles.leadHeader}>
                    <h3>{lead.name}</h3>
                    <span className={styles.date}>{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.leadInfo}>
                    <p><strong>Email:</strong> {lead.email}</p>
                    <p><strong>Phone:</strong> {lead.phone}</p>
                    <div className={styles.servicesList}>
                      {lead.services.map((s, i) => <span key={i} className={styles.serviceBadge}>{s}</span>)}
                    </div>
                  </div>
                  <div className={styles.leadMessage}>
                    <strong>Objectives:</strong>
                    <p>{lead.message}</p>
                  </div>
                  <div className={styles.leadActions}>
                    <button 
                      onClick={() => window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`)} 
                      className="btn-outline"
                    >
                      WhatsApp
                    </button>
                    <button onClick={() => window.open(`tel:${lead.phone}`)} className="btn-outline">Call</button>
                    <button onClick={() => handleDeleteLead(lead._id)} className={styles.deleteLink}>Delete</button>
                  </div>
                </div>
              ))}
              {leads.length === 0 && <p className={styles.emptyMsg}>No appointments booked yet.</p>}
            </div>
          </section>
        ) : (
          <>
            <header className={styles.header}>
              <h1>Project <span className="text-gradient">Management</span></h1>
              <p>Upload new work projects or manage existing ones.</p>
            </header>

            <section className={`${styles.uploadSection} glass`}>
              <h2>Upload New Project</h2>
              <form onSubmit={handleUpload} className={styles.uploadForm}>
                <div className={styles.inputGroup}>
                  <label>Project Title</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Caption</label>
                  <textarea 
                    value={caption} 
                    onChange={(e) => setCaption(e.target.value)} 
                    placeholder="Enter project description/caption (Optional)"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>File (Image or Document)</label>
                  <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                    required
                  />
                </div>
                <button type="submit" className="btn-filled" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload Project"}
                </button>
              </form>
            </section>

            <section className={styles.projectsList}>
              <h2>Manage Projects</h2>
              <div className={styles.projectGrid}>
                {projects.map((project) => (
                  <div key={project._id} className={`${styles.projectCard} glass`}>
                    <div className={styles.projectPreview}>
                      {project.fileType.startsWith("image/") ? (
                        <img src={`${API_ENDPOINTS.BASE}${project.fileUrl}`} alt={project.title} />
                      ) : (
                        <div className={styles.docIcon}>📄 {project.fileType.split("/")[1].toUpperCase()}</div>
                      )}
                    </div>
                    <div className={styles.projectInfo}>
                      <h3>{project.title}</h3>
                      <p>{project.caption}</p>
                      <button 
                        className={styles.deleteBtn} 
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        Delete Project
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {projects.length === 0 && <p className={styles.emptyMsg}>No projects uploaded yet.</p>}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
