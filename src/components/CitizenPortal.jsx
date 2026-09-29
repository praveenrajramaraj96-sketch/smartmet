import React, { useState } from 'react';
import { 
  QrCode, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Camera, 
  MapPin, 
  Upload, 
  FileText, 
  ExternalLink,
  Info,
  Scale,
  Send,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CitizenPortal({ instruments, onOpenCertificate, onAddGrievance }) {
  const [selectedScanId, setSelectedScanId] = useState(instruments[0]?.id || '');
  const [scannedResult, setScannedResult] = useState(instruments[0]);
  const [isScanning, setIsScanning] = useState(false);

  // Grievance form state
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('Indiranagar Market, Bengaluru');
  const [instrumentId, setInstrumentId] = useState('');
  const [allegation, setAllegation] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(null);

  // Trigger simulate scan
  const handleSimulateScan = (instId) => {
    setIsScanning(true);
    setSelectedScanId(instId);
    setTimeout(() => {
      const found = instruments.find(i => i.id === instId);
      setScannedResult(found || null);
      setIsScanning(false);
      if (found && found.status !== 'Tampered / Flagged') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    }, 700);
  };

  const handleLodgeGrievance = (e) => {
    e.preventDefault();
    if (!storeName || !allegation) {
      alert('Please provide store name and complaint details.');
      return;
    }
    const newGrv = {
      id: `GRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      citizenName: citizenName || 'Anonymous Citizen',
      citizenPhone: '+91 98450 XXXXX',
      storeName,
      location,
      allegation,
      instrumentId: instrumentId || 'Unregistered / Seal Missing',
      date: new Date().toISOString().split('T')[0],
      status: 'Assigned to LMO Flying Squad for Surprise Inspection',
      priority: 'High'
    };
    onAddGrievance(newGrv);
    setGrievanceSubmitted(newGrv);
    setStoreName('');
    setAllegation('');
    setCitizenName('');
  };

  return (
    <div className="space-y-8">
      
      {/* Top Citizen Header */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-slate-800 p-6 rounded-2xl">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Public Legal Metrology Interface
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Citizen & Consumer Transparency Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Verify any commercial weighing scale, fuel dispenser, or weighbridge in India instantly using its QR Stamping Seal. If you detect short-weight or broken seals, report immediately for surprise enforcement.
          </p>
        </div>
      </div>

      {/* Grid: QR Scanner on Left, Grievance Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Section 1: Instant QR Code Scanner Simulator */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Live QR Stamping Seal Scanner</h3>
                  <p className="text-xs text-slate-400">Point phone camera at the official Stamping QR on any scale</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-mono">
                Camera: READY
              </span>
            </div>

            {/* Quick Sample Selector for Instant Demo Testing */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Test Preset Instruments (Quick Demo):</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {instruments.slice(0, 4).map((inst) => (
                  <button
                    key={inst.id}
                    onClick={() => handleSimulateScan(inst.id)}
                    className={`p-2 rounded-xl border text-left text-xs transition ${
                      selectedScanId === inst.id
                        ? 'bg-blue-600/20 border-blue-500 text-white font-bold'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-mono text-[10px] text-blue-400 truncate">{inst.id.split('-')[2]}</div>
                    <div className="truncate text-[11px] mt-0.5">{inst.name.split(' ')[0]} {inst.name.split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Camera Viewfinder */}
            <div className="relative aspect-video max-h-72 rounded-2xl bg-slate-950 border-2 border-slate-700 overflow-hidden flex items-center justify-center">
              {/* Scanline Animation */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_#3b82f6] animate-bounce"></div>
              
              {/* Corner Viewfinder Brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400"></div>

              {isScanning ? (
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs text-blue-300 font-mono">Decoding Cryptographic QR Hash...</p>
                </div>
              ) : scannedResult ? (
                <div className="text-center space-y-2 p-4 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700 max-w-sm">
                  <div className="flex items-center justify-center gap-2">
                    {scannedResult.status === 'Active' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-rose-400" />
                    )}
                    <span className="font-bold text-white text-sm">{scannedResult.name}</span>
                  </div>
                  <p className="text-xs text-slate-300">{scannedResult.ownerName}</p>
                  <p className="text-[11px] font-mono text-emerald-400">{scannedResult.certNumber}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-500">Align QR code inside the viewfinder frame</p>
              )}
            </div>

            {/* Scanned Result Card Details */}
            {scannedResult && (
              <div className={`p-4 rounded-xl border transition ${
                scannedResult.status === 'Active'
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : scannedResult.status === 'Expiring Soon'
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-rose-950/20 border-rose-500/40'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1 ${
                      scannedResult.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : scannedResult.status === 'Expiring Soon'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {scannedResult.status.toUpperCase()}
                    </span>
                    <h4 className="text-sm font-bold text-white">{scannedResult.name}</h4>
                    <p className="text-xs text-slate-300">{scannedResult.ownerName} - {scannedResult.location}</p>
                  </div>

                  <button
                    onClick={() => onOpenCertificate(scannedResult)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition self-start"
                  >
                    <FileText className="w-3.5 h-3.5" /> View Official Certificate
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Accuracy Class:</span>
                    <span className="font-semibold text-white">{scannedResult.accuracyClass}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Valid Until:</span>
                    <span className="font-semibold text-amber-300">{scannedResult.expiryDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Observed Error:</span>
                    <span className="font-semibold text-emerald-400">{scannedResult.lastToleranceError}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Section 2: Lodge Tampering Grievance / Fraud Flag */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Lodge Tampering / Short-Weight Report</h3>
                <p className="text-xs text-slate-400">Directly alerts the nearest Legal Metrology Flying Squad</p>
              </div>
            </div>

            {grievanceSubmitted ? (
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Grievance Registered Successfully!
                </div>
                <p className="text-xs text-slate-300">
                  Ticket ID: <strong className="text-white font-mono">{grievanceSubmitted.id}</strong> has been transmitted to LMO Jurisdiction Officer for surprise audit within 24 hours.
                </p>
                <button
                  onClick={() => setGrievanceSubmitted(null)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition"
                >
                  Lodge Another Report
                </button>
              </div>
            ) : (
              <form onSubmit={handleLodgeGrievance} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Establishment / Trader Name *</label>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. Royal Sweets & Dry Fruits, Sector 18"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Location / Market *</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Instrument ID (if known)</label>
                    <input
                      type="text"
                      value={instrumentId}
                      onChange={(e) => setInstrumentId(e.target.value)}
                      placeholder="e.g. INST-KA-2026-9041"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Allegation / Tampering Details *</label>
                  <textarea
                    rows={3}
                    required
                    value={allegation}
                    onChange={(e) => setAllegation(e.target.value)}
                    placeholder="Describe short-weight incident, missing verification seal, modified calibration knob, etc."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>

                <div className="p-3 bg-slate-950/60 border border-dashed border-slate-700 rounded-xl flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-400" />
                    <span>Upload Photo of Scale / Receipt (Optional)</span>
                  </div>
                  <span className="text-blue-400 font-semibold cursor-pointer hover:underline">Select Photo</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition"
                >
                  <Send className="w-4 h-4" /> Submit Legal Metrology Grievance
                </button>
              </form>
            )}

          </div>

          {/* Quick Legal Metrology Permissible Tolerance Guide */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
            <h5 className="font-bold text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" /> Permissible Maximum Error (MPE) Limits
            </h5>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Class I (Gold/Diamonds):</span>
                <span className="text-emerald-400 font-bold">± 0.001g (Ultra-strict)</span>
              </div>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Class III (Grocery Scale):</span>
                <span className="text-emerald-400 font-bold">± 0.05% to ± 0.1%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
