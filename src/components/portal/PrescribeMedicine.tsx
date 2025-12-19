import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pill, Search, Leaf, ShieldCheck, Info, Loader2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const mockSuggestions = [
  { name: "Ashwagandha", form: "Tablet", reason: "Helps with stress and anxiety based on your symptoms", suitability: "High", safety: "safe" },
  { name: "Brahmi", form: "Powder", reason: "Supports cognitive function and mental clarity", suitability: "High", safety: "safe" },
  { name: "Triphala", form: "Capsule", reason: "Aids digestion and detoxification", suitability: "Medium", safety: "caution" },
  { name: "Turmeric Extract", form: "Tablet", reason: "Anti-inflammatory properties for joint health", suitability: "High", safety: "safe" },
];

const PrescribeMedicine: React.FC = () => {
  const [problem, setProblem] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof mockSuggestions | null>(null);
  const [filter, setFilter] = useState("all");

  const search = async () => {
    if (!problem.trim()) return;
    setIsSearching(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSuggestions(mockSuggestions);
    setIsSearching(false);
  };

  const filtered = suggestions?.filter((s) => filter === "all" || (filter === "herbal" && ["Powder", "Decoction"].includes(s.form)) || (filter === "safe" && s.safety === "safe"));

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Get Prescription</h1>
        <p className="text-muted-foreground">Personalized medicine suggestions based on your profile</p>
      </motion.div>

      {/* Input */}
      <div className="medical-card mb-6">
        <label className="block text-sm font-medium mb-2">Describe Your Problem</label>
        <Textarea value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="e.g., I've been experiencing fatigue, difficulty sleeping, and mild anxiety for the past 2 weeks..." className="input-medical min-h-[120px] mb-4" />
        <Button className="btn-primary-medical w-full" onClick={search} disabled={isSearching || !problem.trim()}>
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
          {isSearching ? "Finding Best Options..." : "Find Best Options"}
        </Button>
      </div>

      {/* Loading */}
      {isSearching && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="medical-card text-center py-12">
          <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin mb-4" />
          <p className="text-muted-foreground">Analyzing your profile and symptoms...</p>
        </motion.div>
      )}

      {/* Results */}
      {suggestions && !isSearching && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}><Filter className="w-3 h-3 mr-1" />All</Button>
            <Button variant={filter === "herbal" ? "default" : "outline"} size="sm" onClick={() => setFilter("herbal")}><Leaf className="w-3 h-3 mr-1" />Herbal Only</Button>
            <Button variant={filter === "safe" ? "default" : "outline"} size="sm" onClick={() => setFilter("safe")}><ShieldCheck className="w-3 h-3 mr-1" />Fully Safe</Button>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered?.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="medical-card hover-lift">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{s.name}</h3>
                      <span className="text-xs text-muted-foreground">{s.form}</span>
                    </div>
                  </div>
                  <span className={`chip ${s.safety === "safe" ? "chip-success" : "chip-warning"}`}>{s.safety === "safe" ? "Safe" : "Caution"}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{s.reason}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs"><span className="text-muted-foreground">Suitability:</span> <span className="font-medium text-primary">{s.suitability}</span></span>
                  <Button size="sm" variant="outline"><Info className="w-3 h-3 mr-1" />Details</Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-muted/50 rounded-xl">
            <p className="text-xs text-muted-foreground text-center">⚠️ These suggestions are based on your profile. Always consult a healthcare professional before starting any medication.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PrescribeMedicine;
