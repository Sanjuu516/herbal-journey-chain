import React, { useState } from "react";
import { motion } from "framer-motion";
import { Video, Calendar, Clock, User, Star, Phone, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const doctors = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "Ayurveda Specialist", rating: 4.9, experience: "15 years", available: ["10:00 AM", "2:00 PM", "4:00 PM"], image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop" },
  { id: 2, name: "Dr. Rajesh Kumar", specialty: "Herbal Medicine Expert", rating: 4.8, experience: "12 years", available: ["9:00 AM", "11:00 AM", "3:00 PM"], image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop" },
  { id: 3, name: "Dr. Anita Desai", specialty: "Integrative Medicine", rating: 4.7, experience: "10 years", available: ["10:30 AM", "1:00 PM", "5:00 PM"], image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop" },
];

const DoctorConsult: React.FC = () => {
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultType, setConsultType] = useState<"video" | "phone" | "chat">("video");
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (selectedDoctor && selectedTime) {
      setBooked(true);
      toast({ title: "Consultation Booked!", description: `Your ${consultType} consultation is scheduled for ${selectedTime}` });
    }
  };

  if (booked) {
    const doctor = doctors.find((d) => d.id === selectedDoctor);
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="medical-card text-center py-12">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">Consultation Booked!</h2>
          <p className="text-muted-foreground mb-6">Your appointment has been confirmed</p>
          <div className="bg-muted/50 rounded-xl p-6 mb-6 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <img src={doctor?.image} alt={doctor?.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold">{doctor?.name}</h3>
                <p className="text-sm text-muted-foreground">{doctor?.specialty}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /><span>Today</span></div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /><span>{selectedTime}</span></div>
              <div className="flex items-center gap-2"><Video className="w-4 h-4 text-primary" /><span className="capitalize">{consultType} Consultation</span></div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Button className="btn-primary-medical"><Video className="w-4 h-4 mr-2" />Join Meeting</Button>
            <Button variant="outline" onClick={() => { setBooked(false); setSelectedDoctor(null); setSelectedTime(null); }}>Book Another</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Consult a Doctor</h1>
        <p className="text-muted-foreground">Connect with verified healthcare professionals</p>
      </motion.div>

      {/* Consultation Type */}
      <div className="flex gap-3 mb-6 justify-center">
        {[{ type: "video" as const, icon: Video, label: "Video Call" }, { type: "phone" as const, icon: Phone, label: "Phone Call" }, { type: "chat" as const, icon: MessageSquare, label: "Chat" }].map((t) => (
          <Button key={t.type} variant={consultType === t.type ? "default" : "outline"} onClick={() => setConsultType(t.type)} className={consultType === t.type ? "btn-primary-medical" : ""}>
            <t.icon className="w-4 h-4 mr-2" />{t.label}
          </Button>
        ))}
      </div>

      {/* Doctors */}
      <div className="grid gap-4">
        {doctors.map((doc) => (
          <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`medical-card cursor-pointer transition-all ${selectedDoctor === doc.id ? "ring-2 ring-primary" : ""}`} onClick={() => { setSelectedDoctor(doc.id); setSelectedTime(null); }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" />{doc.rating}</span>
                      <span className="text-muted-foreground">{doc.experience}</span>
                    </div>
                  </div>
                  {selectedDoctor === doc.id && <Check className="w-6 h-6 text-primary" />}
                </div>
                {selectedDoctor === doc.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Available Slots:</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.available.map((time) => (
                        <button key={time} onClick={(e) => { e.stopPropagation(); setSelectedTime(time); }} className={`px-4 py-2 rounded-lg text-sm transition-colors ${selectedTime === time ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>{time}</button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Book Button */}
      {selectedDoctor && selectedTime && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <Button className="btn-primary-medical w-full py-6 text-lg" onClick={handleBook}>
            <Calendar className="w-5 h-5 mr-2" />Book Consultation for {selectedTime}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default DoctorConsult;
