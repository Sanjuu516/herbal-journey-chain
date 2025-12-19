import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PortalNavbar from "./PortalNavbar";
import LandingHero from "./LandingHero";
import FeatureHighlights from "./FeatureHighlights";
import ScanMedicine from "./ScanMedicine";
import HealthProfile from "./HealthProfile";
import VerifyMedicine from "./VerifyMedicine";
import PrescribeMedicine from "./PrescribeMedicine";
import DoctorConsult from "./DoctorConsult";
import LoginForm from "./LoginForm";
import { DEMO_USER, initDemoData, clearDemoData, STORAGE_KEYS } from "@/lib/demoData";
import { useToast } from "@/hooks/use-toast";

const VirtuHerbPortal: React.FC = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("scan");
  const [userName, setUserName] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string, password: string, isDemo: boolean = false) => {
    if (isDemo || (email === DEMO_USER.email && password === DEMO_USER.password)) {
      // Initialize demo data
      initDemoData();
      setUserName(DEMO_USER.name);
      setIsLoggedIn(true);
      setShowLogin(false);
      setActiveTab("scan");
      toast({
        title: "Welcome to VirtuHerbChain!",
        description: isDemo ? "Demo mode activated with sample data." : "Logged in successfully.",
      });
    } else {
      // For non-demo login, just create a session
      const name = email.split("@")[0];
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ name, email }));
      setUserName(name);
      setIsLoggedIn(true);
      setShowLogin(false);
      setActiveTab("scan");
      toast({
        title: "Welcome!",
        description: "You're now logged in. Start by building your health profile.",
      });
    }
  };

  const handleLogout = () => {
    clearDemoData();
    setIsLoggedIn(false);
    setUserName("");
    setActiveTab("scan");
    toast({
      title: "Logged Out",
      description: "See you soon!",
    });
  };

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "scan":
        return <ScanMedicine />;
      case "profile":
        return <HealthProfile />;
      case "verify":
        return <VerifyMedicine />;
      case "prescribe":
        return <PrescribeMedicine />;
      case "consult":
        return <DoctorConsult />;
      default:
        return <ScanMedicine />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <PortalNavbar
          activeTab=""
          onTabChange={() => {}}
          isLoggedIn={false}
          onLogout={() => {}}
        />
        
        {showLogin ? (
          <LoginForm 
            onLogin={handleLogin} 
            onBack={() => setShowLogin(false)}
            demoCredentials={DEMO_USER}
          />
        ) : (
          <>
            <LandingHero
              onGetStarted={handleGetStarted}
              onScanMedicine={handleGetStarted}
              onBuildProfile={handleGetStarted}
            />
            <FeatureHighlights />
          </>
        )}
        
        {/* Privacy Notice */}
        <div className="bg-primary/5 border-t border-primary/10 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              🔒 Your health data is encrypted and secured. We comply with HIPAA standards 
              and use blockchain technology to ensure data integrity.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PortalNavbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userName={userName}
      />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Privacy Footer */}
      <footer className="bg-muted/30 border-t border-border py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Your health data is safe here. All information is encrypted and blockchain-secured.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VirtuHerbPortal;
