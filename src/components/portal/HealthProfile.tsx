import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Heart, Pill, AlertTriangle, Activity, FileText, Apple, Leaf, Stethoscope, ChevronRight, ChevronLeft, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const sections = [
  { id: 1, title: "Basic Identity", icon: User },
  { id: 2, title: "Health Complaints", icon: Heart },
  { id: 3, title: "Conditions", icon: Activity },
  { id: 4, title: "Medications", icon: Pill },
  { id: 5, title: "Allergies", icon: AlertTriangle },
  { id: 6, title: "Special Conditions", icon: AlertTriangle },
  { id: 7, title: "Medical History", icon: FileText },
  { id: 8, title: "Reports", icon: Upload },
  { id: 9, title: "Lifestyle", icon: Apple },
  { id: 10, title: "Herbal Preferences", icon: Leaf },
];

const conditions = ["Diabetes", "Hypertension", "Heart Disease", "Asthma/COPD", "Thyroid", "Kidney Disease", "Liver Disease", "PCOS", "Arthritis", "Gastric Issues", "Mental Health"];

const HealthProfile: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "", age: "", gender: "", height: "", weight: "", phone: "", emergencyContact: "",
    symptoms: "", symptomDuration: "", severity: [5], occurredBefore: false, betterFactors: "", worseFactors: "",
    conditions: [] as string[], otherCondition: "",
    medications: [{ name: "", dose: "", frequency: "", prescribed: true }],
    drugAllergies: "", foodAllergies: "", herbAllergies: "", reactionType: "",
    pregnant: false, breastfeeding: false, tryingToConceive: false, recentSurgery: false, alcoholUse: false, smoking: false,
    pastIllnesses: "", hospitalizations: "", surgeries: "", familyHistory: "",
    diet: "mixed", waterIntake: "adequate", sleepHours: "", activityLevel: "moderate", stressLevel: "medium",
    usedHerbal: false, helpedHerbs: "", issueHerbs: "", preferredForm: [] as string[],
  });

  const updateField = (field: string, value: any) => setFormData((prev) => ({ ...prev, [field]: value }));
  const toggleCondition = (c: string) => updateField("conditions", formData.conditions.includes(c) ? formData.conditions.filter((x) => x !== c) : [...formData.conditions, c]);

  const nextStep = () => { if (currentStep < 10) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const handleSave = () => {
    toast({ title: "Profile Saved", description: "Your health profile has been updated successfully." });
  };

  const progress = (currentStep / 10) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Health Profile</h1>
        <p className="text-muted-foreground">Complete your profile for personalized analysis</p>
      </motion.div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Step {currentStep} of 10</span>
          <span className="font-medium text-primary">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-primary to-teal-light" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Steps Nav */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {sections.map((s) => (
          <button key={s.id} onClick={() => setCurrentStep(s.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-sm transition-colors ${currentStep === s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            <s.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="medical-card min-h-[400px]">
        <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Basic Identity</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full Name</Label><Input value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Enter full name" className="input-medical" /></div>
                <div><Label>Age</Label><Input type="number" value={formData.age} onChange={(e) => updateField("age", e.target.value)} placeholder="Age" className="input-medical" /></div>
                <div><Label>Gender</Label><select value={formData.gender} onChange={(e) => updateField("gender", e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background"><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><Label>Height (cm)</Label><Input value={formData.height} onChange={(e) => updateField("height", e.target.value)} placeholder="Height" className="input-medical" /></div>
                <div><Label>Weight (kg)</Label><Input value={formData.weight} onChange={(e) => updateField("weight", e.target.value)} placeholder="Weight" className="input-medical" /></div>
                <div><Label>Phone</Label><Input value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Phone number" className="input-medical" /></div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Heart className="w-5 h-5 text-primary" /> Current Health Complaints</h2>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20"><p className="text-sm text-primary">Primary input for AI analysis</p></div>
              <div><Label>Describe Symptoms</Label><Textarea value={formData.symptoms} onChange={(e) => updateField("symptoms", e.target.value)} placeholder="Describe your current symptoms..." className="input-medical min-h-[100px]" /></div>
              <div><Label>Duration</Label><Input value={formData.symptomDuration} onChange={(e) => updateField("symptomDuration", e.target.value)} placeholder="e.g., 2 weeks" className="input-medical" /></div>
              <div><Label>Severity (1-10): {formData.severity[0]}</Label><Slider value={formData.severity} onValueChange={(v) => updateField("severity", v)} min={1} max={10} step={1} className="mt-2" /></div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Diagnosed Conditions</h2>
              <div className="flex flex-wrap gap-2">
                {conditions.map((c) => (
                  <button key={c} onClick={() => toggleCondition(c)} className={`chip ${formData.conditions.includes(c) ? "chip-primary" : "bg-muted text-muted-foreground"}`}>{formData.conditions.includes(c) && <Check className="w-3 h-3 mr-1" />}{c}</button>
                ))}
              </div>
              <div><Label>Other Conditions</Label><Input value={formData.otherCondition} onChange={(e) => updateField("otherCondition", e.target.value)} placeholder="Any other conditions..." className="input-medical" /></div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Pill className="w-5 h-5 text-primary" /> Current Medications</h2>
              {formData.medications.map((med, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-3">
                  <Input value={med.name} onChange={(e) => { const m = [...formData.medications]; m[i].name = e.target.value; updateField("medications", m); }} placeholder="Medicine name" className="input-medical" />
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={med.dose} onChange={(e) => { const m = [...formData.medications]; m[i].dose = e.target.value; updateField("medications", m); }} placeholder="Dose" className="input-medical" />
                    <Input value={med.frequency} onChange={(e) => { const m = [...formData.medications]; m[i].frequency = e.target.value; updateField("medications", m); }} placeholder="Frequency" className="input-medical" />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => updateField("medications", [...formData.medications, { name: "", dose: "", frequency: "", prescribed: true }])}>+ Add Medicine</Button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-warning" /> Allergies & Sensitivities</h2>
              <div className="p-4 bg-warning/10 rounded-lg border border-warning/20"><p className="text-sm text-warning">⚠️ Critical for safety analysis</p></div>
              <div><Label>Drug Allergies</Label><Textarea value={formData.drugAllergies} onChange={(e) => updateField("drugAllergies", e.target.value)} placeholder="List any drug allergies..." className="input-medical" /></div>
              <div><Label>Food Allergies</Label><Textarea value={formData.foodAllergies} onChange={(e) => updateField("foodAllergies", e.target.value)} placeholder="List any food allergies..." className="input-medical" /></div>
              <div><Label>Herb Allergies</Label><Textarea value={formData.herbAllergies} onChange={(e) => updateField("herbAllergies", e.target.value)} placeholder="List any herb allergies..." className="input-medical" /></div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-destructive" /> Special Conditions</h2>
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20"><p className="text-sm text-destructive">⚠️ High impact on safety recommendations</p></div>
              <div className="space-y-4">
                {[{ key: "pregnant", label: "Currently Pregnant" }, { key: "breastfeeding", label: "Breastfeeding" }, { key: "tryingToConceive", label: "Trying to Conceive" }, { key: "recentSurgery", label: "Recent Surgery (<6 months)" }, { key: "alcoholUse", label: "Chronic Alcohol Use" }, { key: "smoking", label: "Smoking/Tobacco Use" }].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span>{item.label}</span>
                    <Switch checked={formData[item.key as keyof typeof formData] as boolean} onCheckedChange={(v) => updateField(item.key, v)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Past Medical History</h2>
              <div><Label>Major Past Illnesses</Label><Textarea value={formData.pastIllnesses} onChange={(e) => updateField("pastIllnesses", e.target.value)} placeholder="List major illnesses..." className="input-medical" /></div>
              <div><Label>Hospitalizations</Label><Textarea value={formData.hospitalizations} onChange={(e) => updateField("hospitalizations", e.target.value)} placeholder="Previous hospitalizations..." className="input-medical" /></div>
              <div><Label>Surgeries</Label><Textarea value={formData.surgeries} onChange={(e) => updateField("surgeries", e.target.value)} placeholder="List surgeries with year..." className="input-medical" /></div>
              <div><Label>Family History</Label><Textarea value={formData.familyHistory} onChange={(e) => updateField("familyHistory", e.target.value)} placeholder="Diabetes, heart disease, cancer in family..." className="input-medical" /></div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Upload className="w-5 h-5 text-primary" /> Medical Reports</h2>
              <p className="text-sm text-muted-foreground">Upload relevant reports from the last 6-12 months</p>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Drag & drop files or click to upload</p>
                <p className="text-xs text-muted-foreground">PDF, JPG accepted. HbA1c, Lipid, Thyroid, LFT, RFT, CBC</p>
                <Button variant="outline" className="mt-4">Select Files</Button>
              </div>
            </div>
          )}

          {currentStep === 9 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Apple className="w-5 h-5 text-primary" /> Lifestyle & Diet</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Diet</Label><div className="flex gap-2 mt-2">{["Veg", "Non-veg", "Mixed"].map((d) => (<button key={d} onClick={() => updateField("diet", d.toLowerCase())} className={`chip ${formData.diet === d.toLowerCase() ? "chip-primary" : "bg-muted"}`}>{d}</button>))}</div></div>
                <div><Label>Water Intake</Label><div className="flex gap-2 mt-2">{["Low", "Adequate", "High"].map((w) => (<button key={w} onClick={() => updateField("waterIntake", w.toLowerCase())} className={`chip ${formData.waterIntake === w.toLowerCase() ? "chip-primary" : "bg-muted"}`}>{w}</button>))}</div></div>
                <div><Label>Sleep Hours</Label><Input value={formData.sleepHours} onChange={(e) => updateField("sleepHours", e.target.value)} placeholder="Hours per night" className="input-medical" /></div>
                <div><Label>Activity Level</Label><div className="flex gap-2 mt-2">{["None", "Light", "Moderate", "Heavy"].map((a) => (<button key={a} onClick={() => updateField("activityLevel", a.toLowerCase())} className={`chip ${formData.activityLevel === a.toLowerCase() ? "chip-primary" : "bg-muted"}`}>{a}</button>))}</div></div>
              </div>
            </div>
          )}

          {currentStep === 10 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Leaf className="w-5 h-5 text-primary" /> Herbal Experience</h2>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Used herbal/ayurveda before?</span>
                <Switch checked={formData.usedHerbal} onCheckedChange={(v) => updateField("usedHerbal", v)} />
              </div>
              {formData.usedHerbal && (
                <>
                  <div><Label>Herbs that helped</Label><Textarea value={formData.helpedHerbs} onChange={(e) => updateField("helpedHerbs", e.target.value)} className="input-medical" /></div>
                  <div><Label>Herbs that caused issues</Label><Textarea value={formData.issueHerbs} onChange={(e) => updateField("issueHerbs", e.target.value)} className="input-medical" /></div>
                </>
              )}
              <div><Label>Preferred Form</Label><div className="flex flex-wrap gap-2 mt-2">{["Powders", "Tablets", "Decoctions", "Oils", "Capsules"].map((f) => (<button key={f} onClick={() => updateField("preferredForm", formData.preferredForm.includes(f) ? formData.preferredForm.filter((x) => x !== f) : [...formData.preferredForm, f])} className={`chip ${formData.preferredForm.includes(f) ? "chip-primary" : "bg-muted"}`}>{formData.preferredForm.includes(f) && <Check className="w-3 h-3 mr-1" />}{f}</button>))}</div></div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}><ChevronLeft className="w-4 h-4 mr-2" />Previous</Button>
        {currentStep === 10 ? (
          <Button className="btn-primary-medical" onClick={handleSave}><Check className="w-4 h-4 mr-2" />Save Profile</Button>
        ) : (
          <Button className="btn-primary-medical" onClick={nextStep}>Next<ChevronRight className="w-4 h-4 ml-2" /></Button>
        )}
      </div>
    </div>
  );
};

export default HealthProfile;
