import React, { useState } from "react";
import { motion } from "framer-motion";
import PortalNavbar from "./PortalNavbar";
import LandingHero from "./LandingHero";
import FeatureHighlights from "./FeatureHighlights";
import ScanMedicine from "./ScanMedicine";
import HealthProfile from "./HealthProfile";
import VerifyMedicine from "./VerifyMedicine";
import PrescribeMedicine from "./PrescribeMedicine";
import DoctorConsult from "./DoctorConsult";

const VirtuHerbPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("scan");
  const [userName] = useState("John Doe");

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab("scan");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
        <LandingHero
          onGetStarted={handleLogin}
          onScanMedicine={handleLogin}
          onBuildProfile={handleLogin}
        />
        <FeatureHighlights />
        
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
