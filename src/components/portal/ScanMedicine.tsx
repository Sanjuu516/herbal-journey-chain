import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scan, 
  Camera, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle,
  MapPin,
  Calendar,
  Factory,
  Package,
  Hash,
  ExternalLink,
  Loader2,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DEMO_MEDICINES, STORAGE_KEYS } from "@/lib/demoData";

interface MedicineData {
  code: string;
  name: string;
  batchId: string;
  manufacturer: string;
  sourceLocation: string;
  harvestDate: string;
  expiryDate: string;
  qualityStatus: "verified" | "warning" | "invalid";
  blockchainTxId: string;
  nftId: string;
}

interface ScanHistoryItem {
  id: string;
  medicineName: string;
  scannedAt: string;
  status: string;
  batchId: string;
}

const ScanMedicine: React.FC = () => {
  const { toast } = useToast();
  const [scanMode, setScanMode] = useState<"camera" | "manual">("manual");
  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<MedicineData | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

  // Load scan history on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
    if (stored) {
      setScanHistory(JSON.parse(stored));
    }
  }, []);

  const saveScanToHistory = (medicine: MedicineData) => {
    const newItem: ScanHistoryItem = {
      id: Date.now().toString(),
      medicineName: medicine.name,
      scannedAt: new Date().toISOString(),
      status: medicine.qualityStatus,
      batchId: medicine.batchId
    };
    const updated = [newItem, ...scanHistory.slice(0, 9)];
    setScanHistory(updated);
    localStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify(updated));
  };

  const handleScan = async (code?: string) => {
    const searchCode = code || manualCode.trim();
    setIsScanning(true);
    setScanError(null);
    setScanResult(null);

    // Simulate scanning delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Look up in demo medicines
    const found = DEMO_MEDICINES.find(
      m => m.code.toLowerCase() === searchCode.toLowerCase() ||
           m.batchId.toLowerCase() === searchCode.toLowerCase() ||
           m.name.toLowerCase().includes(searchCode.toLowerCase())
    );

    if (found && found.qualityStatus !== "invalid") {
      setScanResult(found);
      saveScanToHistory(found);
      toast({
        title: "Medicine Verified",
        description: "This medicine has been authenticated on the blockchain.",
      });
    } else if (found && found.qualityStatus === "invalid") {
      setScanError("⚠️ WARNING: This medicine could not be verified. It may be counterfeit or not registered in the blockchain.");
    } else {
      setScanError("Medicine not found. Please check the code and try again. Try: VHC-2024-ASH001, VHC-2024-TRP002, or VHC-2024-TUL003");
    }

    setIsScanning(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleScan();
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "verified":
        return {
          bg: "bg-success/10",
          text: "text-success",
          border: "border-success/30",
          icon: ShieldCheck,
          label: "Verified & Authentic",
        };
      case "warning":
        return {
          bg: "bg-warning/10",
          text: "text-warning",
          border: "border-warning/30",
          icon: AlertTriangle,
          label: "Verification Pending",
        };
      default:
        return {
          bg: "bg-destructive/10",
          text: "text-destructive",
          border: "border-destructive/30",
          icon: XCircle,
          label: "Not Verified",
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Scan Medicine
        </h1>
        <p className="text-muted-foreground">
          Verify the authenticity of your medicine using blockchain technology
        </p>
      </motion.div>

      {/* Demo Codes Info */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <p className="text-sm font-medium text-primary mb-2">🧪 Try these demo codes:</p>
        <div className="flex flex-wrap gap-2">
          {DEMO_MEDICINES.filter(m => m.qualityStatus === "verified").map(m => (
            <button
              key={m.code}
              onClick={() => { setManualCode(m.code); }}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors"
            >
              {m.code}
            </button>
          ))}
          <button
            onClick={() => { setManualCode("FAKE-001"); }}
            className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded hover:bg-destructive/20 transition-colors"
          >
            FAKE-001 (Invalid)
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!scanResult && !scanError ? (
          <motion.div
            key="scanner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="medical-card"
          >
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={scanMode === "camera" ? "default" : "outline"}
                onClick={() => setScanMode("camera")}
                className={scanMode === "camera" ? "btn-primary-medical" : ""}
              >
                <Camera className="w-4 h-4 mr-2" />
                Camera Scan
              </Button>
              <Button
                variant={scanMode === "manual" ? "default" : "outline"}
                onClick={() => setScanMode("manual")}
                className={scanMode === "manual" ? "btn-primary-medical" : ""}
              >
                <Hash className="w-4 h-4 mr-2" />
                Enter Code
              </Button>
            </div>

            {scanMode === "camera" ? (
              <div className="space-y-6">
                {/* Camera Scanner */}
                <div className="relative aspect-video bg-muted rounded-xl overflow-hidden border-2 border-dashed border-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {/* Scanner Frame */}
                      <div className="absolute inset-0 border-2 border-primary rounded-lg" />
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                      
                      {/* Scan Line */}
                      {isScanning && (
                        <motion.div
                          className="absolute left-0 right-0 h-0.5 bg-primary shadow-lg shadow-primary/50"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}

                      <div className="absolute inset-0 flex items-center justify-center">
                        {isScanning ? (
                          <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        ) : (
                          <Scan className="w-12 h-12 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground">
                    Align QR code or barcode within the frame
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full btn-primary-medical py-6"
                  onClick={() => handleScan("VHC-2024-ASH001")}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5 mr-2" />
                      Simulate Scan (Demo)
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Enter Medicine Code
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., VHC-2024-ASH001"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    className="input-medical text-lg py-6"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter the product code, batch number, or medicine name
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-primary-medical py-6"
                  disabled={isScanning || !manualCode.trim()}
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 mr-2" />
                      Verify Medicine
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Scan History */}
            {scanHistory.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-medium text-foreground flex items-center gap-2 mb-4">
                  <History className="w-4 h-4" />
                  Recent Scans
                </h3>
                <div className="space-y-2">
                  {scanHistory.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.medicineName}</p>
                        <p className="text-xs text-muted-foreground">{item.batchId}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${item.status === 'verified' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : scanError ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="medical-card border-destructive/30"
          >
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-destructive" />
              </div>
              <h3 className="font-display text-xl font-semibold text-destructive mb-2">
                Verification Failed
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {scanError}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setScanError(null);
                  setManualCode("");
                }}
              >
                Try Again
              </Button>
            </div>
          </motion.div>
        ) : scanResult ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Status Banner */}
            {(() => {
              const status = getStatusStyles(scanResult.qualityStatus);
              const StatusIcon = status.icon;
              return (
                <div className={`${status.bg} ${status.border} border rounded-xl p-4 flex items-center gap-4`}>
                  <div className={`w-12 h-12 rounded-full ${status.bg} flex items-center justify-center`}>
                    <StatusIcon className={`w-6 h-6 ${status.text}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${status.text}`}>{status.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      This medicine has been verified on the blockchain
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Medicine Details */}
            <div className="medical-card">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                {scanResult.name}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Hash className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Batch ID</p>
                    <p className="font-medium">{scanResult.batchId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Factory className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Manufacturer</p>
                    <p className="font-medium">{scanResult.manufacturer}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Source Location</p>
                    <p className="font-medium">{scanResult.sourceLocation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Harvest Date</p>
                    <p className="font-medium">{scanResult.harvestDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Calendar className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Expiry Date</p>
                    <p className="font-medium">{scanResult.expiryDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Package className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">NFT ID</p>
                    <p className="font-medium">{scanResult.nftId}</p>
                  </div>
                </div>
              </div>

              {/* Blockchain TX */}
              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Blockchain Transaction</p>
                    <p className="font-mono text-sm text-foreground truncate max-w-xs sm:max-w-md">
                      {scanResult.blockchainTxId}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setScanResult(null);
                  setManualCode("");
                }}
              >
                Scan Another
              </Button>
              <Button className="flex-1 btn-primary-medical">
                View Full Trace
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ScanMedicine;
