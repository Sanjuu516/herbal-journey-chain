// Demo user and sample data for AyuSethu Portal

export const DEMO_USER = {
  email: "demo@virtuherb.com",
  password: "demo123",
  name: "Arjun Sharma"
};

export const DEMO_HEALTH_PROFILE = {
  fullName: "Arjun Sharma",
  age: "35",
  gender: "Male",
  height: "175",
  weight: "72",
  phone: "+91 98765 43210",
  emergencyContact: "+91 87654 32109",
  symptoms: "Occasional joint pain in knees, mild fatigue in evenings, difficulty sleeping at night",
  symptomDuration: "3 weeks",
  severity: [6],
  occurredBefore: true,
  betterFactors: "Rest, warm compress, light stretching",
  worseFactors: "Prolonged sitting, cold weather, stress",
  conditions: ["Hypertension", "Arthritis"],
  otherCondition: "",
  medications: [
    { name: "Amlodipine", dose: "5mg", frequency: "Once daily", prescribed: true },
    { name: "Aspirin", dose: "75mg", frequency: "Once daily", prescribed: true }
  ],
  drugAllergies: "Penicillin - causes skin rash",
  foodAllergies: "None known",
  herbAllergies: "Mild sensitivity to Neem (causes stomach upset)",
  reactionType: "Skin rash, stomach upset",
  pregnant: false,
  breastfeeding: false,
  tryingToConceive: false,
  recentSurgery: false,
  alcoholUse: false,
  smoking: false,
  pastIllnesses: "Dengue fever (2019), Typhoid (2015)",
  hospitalizations: "Dengue treatment - 5 days (2019)",
  surgeries: "Appendectomy (2010)",
  familyHistory: "Father: Diabetes Type 2, Hypertension. Mother: Thyroid disorder",
  diet: "mixed",
  waterIntake: "adequate",
  sleepHours: "6",
  activityLevel: "moderate",
  stressLevel: "medium",
  usedHerbal: true,
  helpedHerbs: "Ashwagandha for stress, Triphala for digestion",
  issueHerbs: "Neem caused mild stomach upset",
  preferredForm: ["Tablets", "Powders"],
};

export const DEMO_MEDICINES = [
  {
    code: "VHC-2024-ASH001",
    name: "Ashwagandha Root Extract",
    batchId: "ASH-2024-001234",
    manufacturer: "VirtuHerb Pharmaceuticals",
    sourceLocation: "Madhya Pradesh, India",
    harvestDate: "2024-09-15",
    expiryDate: "2026-09-15",
    qualityStatus: "verified" as const,
    blockchainTxId: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
    nftId: "VHC-NFT-78901",
  },
  {
    code: "VHC-2024-TRP002",
    name: "Triphala Churna",
    batchId: "TRP-2024-005678",
    manufacturer: "Ayur Organics Ltd",
    sourceLocation: "Kerala, India",
    harvestDate: "2024-08-20",
    expiryDate: "2026-08-20",
    qualityStatus: "verified" as const,
    blockchainTxId: "0x9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e",
    nftId: "VHC-NFT-45678",
  },
  {
    code: "VHC-2024-TUL003",
    name: "Tulsi Extract Capsules",
    batchId: "TUL-2024-009012",
    manufacturer: "Himalaya Herbs",
    sourceLocation: "Uttarakhand, India",
    harvestDate: "2024-10-05",
    expiryDate: "2026-10-05",
    qualityStatus: "verified" as const,
    blockchainTxId: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    nftId: "VHC-NFT-12345",
  },
  {
    code: "FAKE-001",
    name: "Unknown Product",
    batchId: "",
    manufacturer: "",
    sourceLocation: "",
    harvestDate: "",
    expiryDate: "",
    qualityStatus: "invalid" as const,
    blockchainTxId: "",
    nftId: "",
  }
];

export const DEMO_SCAN_HISTORY = [
  {
    id: "1",
    medicineName: "Ashwagandha Root Extract",
    scannedAt: new Date().toISOString(),
    status: "verified",
    batchId: "ASH-2024-001234"
  },
  {
    id: "2",
    medicineName: "Triphala Churna",
    scannedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "verified",
    batchId: "TRP-2024-005678"
  }
];

export const DEMO_CONSULTATIONS = [
  {
    id: "1",
    doctorName: "Dr. Priya Menon",
    specialty: "Ayurvedic Physician",
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    time: "10:00 AM",
    status: "upcoming",
    meetLink: "https://meet.virtuherb.com/dr-priya-001"
  }
];

// localStorage keys
export const STORAGE_KEYS = {
  USER: "virtuherb_user",
  HEALTH_PROFILE: "virtuherb_health_profile",
  SCAN_HISTORY: "virtuherb_scan_history",
  CONSULTATIONS: "virtuherb_consultations",
  IS_DEMO_MODE: "virtuherb_demo_mode"
};

// Helper functions
export const initDemoData = () => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ name: DEMO_USER.name, email: DEMO_USER.email }));
  localStorage.setItem(STORAGE_KEYS.HEALTH_PROFILE, JSON.stringify(DEMO_HEALTH_PROFILE));
  localStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify(DEMO_SCAN_HISTORY));
  localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(DEMO_CONSULTATIONS));
  localStorage.setItem(STORAGE_KEYS.IS_DEMO_MODE, "true");
};

export const clearDemoData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
};

export const getStoredProfile = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.HEALTH_PROFILE);
  return stored ? JSON.parse(stored) : null;
};

export const saveProfile = (profile: typeof DEMO_HEALTH_PROFILE) => {
  localStorage.setItem(STORAGE_KEYS.HEALTH_PROFILE, JSON.stringify(profile));
};

export const getMedicineByCode = (code: string) => {
  return DEMO_MEDICINES.find(m => m.code.toLowerCase() === code.toLowerCase()) || null;
};
