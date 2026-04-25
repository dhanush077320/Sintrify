import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "./config";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HeroScroll from "./components/HeroScroll";
import HeroCTA from "./components/HeroCTA";
import Services from "./components/Services";
import Explore from "./components/Explore";
import Pathway from "./components/Pathway";
import FAQ from "./components/FAQ";
import QuoteCalculator from "./components/QuoteCalculator";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Admin from "./components/Admin";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import FloatingContact from "./components/FloatingContact";
import Preloader from "./components/Preloader";
import "./index.css";

function App() {
  const [view, setView] = useState<"landing" | "login" | "admin" | "explore" | "faq" | "privacy" | "terms" | "startproject">("landing");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isHeroLoading, setIsHeroLoading] = useState(true);

  // Scroll Lock while loading
  useEffect(() => {
    if (isHeroLoading && view === "landing") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isHeroLoading, view]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Background ping to wake up the Render backend (Cold Start fix)
    const wakeUpServer = async () => {
      try {
        await axios.get(API_ENDPOINTS.STATS);
        console.log("🚀 Sintrify Engine: Waking up backend...");
      } catch (e) {
        // Silent catch
      }
    };
    wakeUpServer();
  }, [view]);

  const scrollToSection = (id: string) => {
    if (view !== "landing") {
      setView("landing");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ThemeProvider>
      <main>
        {view === "landing" && (
          <Preloader progress={loadingProgress} isLoading={isHeroLoading} />
        )}
        {view !== "login" && view !== "admin" && <FloatingContact />}
        {view === "landing" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onStartProject={() => setView("startproject")} />
            <HeroScroll 
              onProgress={setLoadingProgress} 
              onReady={() => setIsHeroLoading(false)} 
            />
            <HeroCTA onExplore={() => setView("explore")} onStartProject={() => setView("startproject")} />
            <Services />
            <Pathway />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onScrollTo={scrollToSection} />
          </>
        )}
        
        {view === "login" && (
          <Login 
            onBack={() => setView("landing")} 
            onLoginSuccess={() => setView("admin")}
          />
        )}

        {view === "admin" && (
          <Admin onLogout={() => setView("landing")} />
        )}

        {view === "explore" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onStartProject={() => setView("startproject")} onHome={() => setView("landing")} />
            <Explore onBack={() => setView("landing")} />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onScrollTo={scrollToSection} />
          </>
        )}

        {view === "faq" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onHome={() => setView("landing")} />
            <FAQ onBack={() => setView("landing")} />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onScrollTo={scrollToSection} />
          </>
        )}

        {view === "privacy" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onHome={() => setView("landing")} />
            <PrivacyPolicy onBack={() => setView("landing")} />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onScrollTo={scrollToSection} />
          </>
        )}

        {view === "terms" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onHome={() => setView("landing")} />
            <TermsOfService onBack={() => setView("landing")} />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onScrollTo={scrollToSection} />
          </>
        )}

        {view === "startproject" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onStartProject={() => setView("startproject")} onHome={() => setView("landing")} />
            <QuoteCalculator onBack={() => setView("landing")} />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onScrollTo={scrollToSection} />
          </>
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;
