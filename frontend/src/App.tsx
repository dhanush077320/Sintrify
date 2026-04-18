import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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
import "./index.css";

function App() {
  const [view, setView] = useState<"landing" | "login" | "admin" | "explore" | "faq" | "privacy" | "terms" | "startproject">("landing");

  return (
    <ThemeProvider>
      <main>
        {view !== "login" && view !== "admin" && <FloatingContact />}
        {view === "landing" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onStartProject={() => setView("startproject")} />
            <Hero onExplore={() => setView("explore")} onStartProject={() => setView("startproject")} />
            <Services />
            <Pathway />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} />
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
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} />
          </>
        )}

        {view === "faq" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onHome={() => setView("landing")} />
            <FAQ onBack={() => setView("landing")} />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} />
          </>
        )}

        {view === "privacy" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onHome={() => setView("landing")} />
            <PrivacyPolicy onBack={() => setView("landing")} />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} />
          </>
        )}

        {view === "terms" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onHome={() => setView("landing")} />
            <TermsOfService onBack={() => setView("landing")} />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} />
          </>
        )}

        {view === "startproject" && (
          <>
            <Navbar onSecretTrigger={() => setView("login")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} onStartProject={() => setView("startproject")} onHome={() => setView("landing")} />
            <QuoteCalculator onBack={() => setView("landing")} />
            <Footer onPrivacy={() => setView("privacy")} onTerms={() => setView("terms")} onExplore={() => setView("explore")} onFAQ={() => setView("faq")} />
          </>
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;
