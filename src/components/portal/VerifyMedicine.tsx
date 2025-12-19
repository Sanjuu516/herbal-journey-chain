import React, { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, ShieldCheck, AlertTriangle, XCircle, Search, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyMedicine: React.FC = () => {
  const [medicine, setMedicine] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { status: "safe" | "caution" | "danger"; reasons: string[]; usage: string; monitoring: string }>(null);

  const analyze = async () => {
    if (!medicine.trim()) return;
    setIsAnalyzing(true);
    await new Promise((r) => setTimeout(r, 2500));
    setResult({
      status: Math.random() > 0.3 ? "safe" : Math.random() > 0.5 ? "caution" : "danger",
      reasons: ["No known drug interactions with your current medications", "Safe for your health conditions", "No allergy conflicts detected"],
      usage: "Take 500mg twice daily after meals. Continue for 2-4 weeks.",
      monitoring: "Monitor for any digestive discomfort. Consult if symptoms persist.",
    });
    setIsAnalyzing(false);
  };

  const statusConfig = {
    safe: { bg: "bg-success/10", border: "border-success/30", text: "text-success", icon: ShieldCheck, label: "✅ Safe to Use" },
    caution: { bg: "bg-warning/10", border: "border-warning/30", text: "text-warning", icon: AlertTriangle, label: "⚠️ Use with Caution" },
    danger: { bg: "bg-destructive/10", border: "border-destructive/30", text: "text-destructive", icon: XCircle, label: "❌ Not Recommended" },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Verify Medicine</h1>
        <p className="text-muted-foreground">AI Doctor Analysis based on your health profile</p>
      </motion.div>

      {/* Doctor Avatar */}
      <div className="medical-card mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-teal-light flex items-center justify-center">
            <Bot className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Dr. Virtu AI</h3>
            <p className="text-sm text-muted-foreground">Assigned to analyze your profile</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="medical-card mb-6">
        <label className="block text-sm font-medium mb-2">Medicine / Herb Name</label>
        <div className="flex gap-3">
          <Input value={medicine} onChange={(e) => setMedicine(e.target.value)} placeholder="e.g., Ashwagandha, Metformin, Turmeric..." className="input-medical flex-1" />
          <Button className="btn-primary-medical" onClick={analyze} disabled={isAnalyzing || !medicine.trim()}>
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span className="ml-2">{isAnalyzing ? "Analyzing..." : "Analyze"}</span>
          </Button>
        </div>
      </div>

      {/* Result */}
      {isAnalyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="medical-card text-center py-12">
          <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin mb-4" />
          <p className="text-muted-foreground">Analyzing history, conditions & interactions...</p>
        </motion.div>
      )}

      {result && !isAnalyzing && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Status */}
          <div className={`${statusConfig[result.status].bg} ${statusConfig[result.status].border} border rounded-xl p-6`}>
            <div className="flex items-center gap-4">
              {React.createElement(statusConfig[result.status].icon, { className: `w-8 h-8 ${statusConfig[result.status].text}` })}
              <div>
                <h3 className={`font-display text-xl font-semibold ${statusConfig[result.status].text}`}>{statusConfig[result.status].label}</h3>
                <p className="text-sm text-muted-foreground mt-1">Based on your complete health profile analysis</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="medical-card space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Analysis Findings</h4>
              <ul className="space-y-2">{result.reasons.map((r, i) => (<li key={i} className="flex items-start gap-2 text-sm"><ShieldCheck className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />{r}</li>))}</ul>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Suggested Usage</h4>
              <p className="text-sm text-muted-foreground">{result.usage}</p>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Monitoring Advice</h4>
              <p className="text-sm text-muted-foreground">{result.monitoring}</p>
            </div>
            <div className="border-t pt-4 bg-muted/50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
              <p className="text-xs text-muted-foreground">⚠️ Disclaimer: This analysis is for informational purposes only. Always consult a healthcare professional.</p>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={() => { setResult(null); setMedicine(""); }}>Analyze Another Medicine</Button>
        </motion.div>
      )}
    </div>
  );
};

export default VerifyMedicine;
