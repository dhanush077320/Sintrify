import { API_ENDPOINTS } from "../config";

export default function Admin({ onLogout }: AdminProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`${API_ENDPOINTS.PROJECTS}/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
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
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete Project
                  </button>
                </div>
              </div>
            ))}
          </div>
          {projects.length === 0 && <p className={styles.emptyMsg}>No projects uploaded yet.</p>}
        </section>
      </main>
    </div>
  );
}
