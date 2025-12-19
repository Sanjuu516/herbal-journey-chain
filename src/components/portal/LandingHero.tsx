import React from "react";
import { motion } from "framer-motion";
import { Scan, User, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingHeroProps {
  onGetStarted: () => void;
  onScanMedicine: () => void;
  onBuildProfile: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({
  onGetStarted,
  onScanMedicine,
  onBuildProfile,
}) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mint via-background to-sky-light" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Blockchain-Verified Healthcare
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              <span className="text-gradient">Verify.</span>{" "}
              <span className="text-foreground">Analyze.</span>{" "}
              <span className="text-gradient">Prescribe.</span>
              <br />
              <span className="text-muted-foreground text-3xl sm:text-4xl lg:text-5xl">
                Your Trusted Medicine Companion
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Blockchain-backed medicine verification with personalized doctor-style 
              analysis based on your complete health profile. Your health data is safe here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="btn-primary-medical text-base px-8 py-6"
                onClick={onScanMedicine}
              >
                <Scan className="w-5 h-5 mr-2" />
                Scan Medicine
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 border-2"
                onClick={onBuildProfile}
              >
                <User className="w-5 h-5 mr-2" />
                Build Health Profile
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-success" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-success" />
                <span>Blockchain Secured</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card rounded-3xl p-8 shadow-xl"
              >
                <div className="aspect-square max-w-md mx-auto relative">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=600&fit=crop"
                    alt="Medical Dashboard"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  
                  {/* Floating Badge 1 */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-medium">Verified</span>
                  </motion.div>

                  {/* Floating Badge 2 */}
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-4 -left-4 bg-card text-foreground px-4 py-3 rounded-xl shadow-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Scan className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">QR Scanned</p>
                        <p className="font-semibold text-sm">Ashwagandha Root</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Background Elements */}
              <div className="absolute -z-10 top-10 left-10 w-full h-full bg-gradient-to-br from-primary/20 to-sky/20 rounded-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
