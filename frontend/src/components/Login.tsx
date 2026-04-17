import React, { useState } from "react";
import styles from "./Login.module.css";

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export default function Login({ onBack, onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Admin Credentials
    if (username === "SintrifyAdmin@123" && password === "St@rtup@admin@123") {
      onLoginSuccess();
    } else {
      setError("Invalid credentials. Access denied.");
    }
  };

  return (
    <div className={styles.loginOverlay}>
      <div className={`${styles.loginCard} glass`}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <div className={styles.header}>
          <h2>Access <span className="text-gradient">Portal</span></h2>
          <p>Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter username"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn-filled">Authorize Access</button>
        </form>
      </div>
    </div>
  );
}
