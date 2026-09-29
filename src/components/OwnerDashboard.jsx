import React, { useState } from 'react';
import { 
  Scale, 
  PlusCircle, 
  RefreshCw, 
  FileText, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  ExternalLink,
  CreditCard,
  Upload,
  X,
  Sparkles,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OwnerDashboard({ instruments, onOpenCertificate, onAddNewApplication }) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  // New Application Form State
  const [newInstName, setNewInstName] = useState('Electronic Bench Platform Scale');
  const [newCapacity, setNewCapacity] = useState('50 kg (e = 10 g)');
  const [newAccuracyClass, setNewAccuracyClass] = useState('Class III (Commercial)');
  const [newManufacturer, setNewManufacturer] = useState('Avery India Weighing Solutions');
  const [newSerialNo, setNewSerialNo] = useState(`SN-IND-${Math.floor(100000 + Math.random() * 900000)}`);
  const [dealerLicense, setDealerLicense] = useState('DL-KA-BLR-88401');
  const [dealerName, setDealerName] = useState('Karnataka Precision Weighing Corp');
  const [premiseAddress, setPremiseAddress] = useState('Shop #12, Wholesale Grain Market, Bengaluru');
  const [feeAmount, setFeeAmount] = useState(450);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handle1ClickRenew = (instrument) => {
    confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
    alert(`1-Click Re-Verification Request triggered for ${instrument.name} (${instrument.id}). \n\nLMO & GATC notified for slot allocation within 48 hours.`);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowApplyModal(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      
      const newApp = {
        appId: `APP-2026-KA-${Math.floor(10000 + Math.random() * 90000)}`,
        applicant: "Sri Balaji Supermarket & Wholesale",
        traderName: "Sri Balaji Retail Traders",
        instrumentType: newInstName,
        capacity: newCapacity,
        serialNo: newSerialNo,
        dealerName,
        dealerLicense,
        feeAmount,
        feeStatus: "Paid Online (Razorpay / Bharat e-Pay Ref: BEP88921)",
        submissionDate: new Date().toISOString().split('T')[0],
        assignedGatc: "Apex Metrology Calibration Labs (GATC-KA-09)",
        assignedLmo: "Shri. R. Suresh, LMO Bengaluru East",
        status: "Under LMO Review",
        location: premiseAddress,
        urgency: "Normal"
      };

      onAddNewApplication(newApp);
      alert(`Application #${newApp.appId} submitted successfully! \n\nPrescribed Fee of ₹${feeAmount} processed. Digital tracking initiated.`);
      setWizardStep(1);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Quick Actions */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5" /> Registered Trader Desk
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            My Registered Instruments & Stamping Lifecycle
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Establishment: <strong className="text-white">Sri Balaji Commercial Group (GSTIN: 29AABCB1234D1Z5)</strong>
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> Apply for New Stamping / Verification
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">Total Registered Machines</span>
          <span className="text-2xl font-bold text-white font-heading mt-1 block">{instruments.length} Units</span>
          <span className="text-[11px] text-emerald-400">100% Digital Dossier Synced</span>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">Active Certified Scales</span>
          <span className="text-2xl font-bold text-emerald-400 font-heading mt-1 block">
            {instruments.filter(i => i.status === 'Active').length} Units
          </span>
          <span className="text-[11px] text-slate-400">Valid Stamping Hologram</span>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">Expiring within 30 Days</span>
          <span className="text-2xl font-bold text-amber-400 font-heading mt-1 block">
            {instruments.filter(i => i.status === 'Expiring Soon').length} Units
          </span>
          <span className="text-[11px] text-amber-400">1-Click Renewal Ready</span>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">DigiLocker Linked</span>
          <span className="text-2xl font-bold text-blue-400 font-heading mt-1 block">100%</span>
          <span className="text-[11px] text-blue-400">Instant Citizen QR Lookup</span>
        </div>
      </div>

      {/* Main Instruments Table / Card List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-400" /> Regulated Weighing & Measuring Instruments
          </h3>
          <span className="text-xs text-slate-400">Auto-Refreshed via National Metrology Registry</span>
        </div>

        <div className="divide-y divide-slate-800">
          {instruments.map((inst) => {
            const isExpiring = inst.status === 'Expiring Soon';
            const isTampered = inst.status === 'Tampered / Flagged';
            const isActive = inst.status === 'Active';

            return (
              <div key={inst.id} className="p-5 hover:bg-slate-800/40 transition space-y-3">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left Specs */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-400 font-bold">{inst.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : isExpiring
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {inst.status.toUpperCase()}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-mono">
                        {inst.accuracyClass}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">{inst.name}</h4>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span>Make: <strong className="text-slate-300">{inst.manufacturer} ({inst.modelNumber})</strong></span>
                      <span>Serial: <strong className="text-cyan-300 font-mono">{inst.serialNumber}</strong></span>
                      <span>Capacity: <strong className="text-slate-300">{inst.capacity}</strong></span>
                      <span>Location: <strong className="text-slate-300">{inst.location.split(',')[0]}</strong></span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {isExpiring && (
                      <button
                        onClick={() => handle1ClickRenew(inst)}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow-sm animate-pulse"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> 1-Click Renew
                      </button>
                    )}

                    <button
                      onClick={() => onOpenCertificate(inst)}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" /> Digital Certificate
                    </button>

                    <button
                      onClick={() => alert(`DigiLocker Document URI: doc.digilocker.gov.in/${inst.digilockerId}\n\nSynced with National Identity Database.`)}
                      className="px-3.5 py-1.5 bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/60 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> DigiLocker ID
                    </button>
                  </div>
                </div>

                {/* Expiry Bar */}
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/60 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Last Stamping: <strong className="text-slate-200">{inst.verificationDate}</strong></span>
                    <span>•</span>
                    <span>Valid Until: <strong className="text-amber-300">{inst.expiryDate}</strong></span>
                  </div>
                  <div>
                    <span>LMO Officer: <strong className="text-slate-300">{inst.lmoOfficer}</strong></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: 4-Step Verification Wizard */}
      {showApplyModal && (
        <div className="modal-backdrop">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
              <div>
                <h3 className="text-lg font-bold text-white">Apply for Legal Metrology Verification (Rule 14)</h3>
                <p className="text-xs text-slate-400">Step {wizardStep} of 4: Machine Dossier & Prescribed Stamping Fee</p>
              </div>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Wizard Progress */}
            <div className="grid grid-cols-4 border-b border-slate-800 text-center text-xs font-semibold">
              <div className={`py-2.5 ${wizardStep === 1 ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400'}`}>1. Instrument</div>
              <div className={`py-2.5 ${wizardStep === 2 ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400'}`}>2. Dealer License</div>
              <div className={`py-2.5 ${wizardStep === 3 ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400'}`}>3. Geo-Location</div>
              <div className={`py-2.5 ${wizardStep === 4 ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400'}`}>4. Online Fee</div>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-6 space-y-4 text-xs">
              
              {/* STEP 1: Instrument Info */}
              {wizardStep === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Instrument Type *</label>
                    <select 
                      value={newInstName}
                      onChange={(e) => setNewInstName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                    >
                      <option value="Electronic Bench Platform Scale">Electronic Bench Platform Scale (Class III)</option>
                      <option value="Digital Countertop Weighing Scale">Digital Countertop Weighing Scale (Class III)</option>
                      <option value="Micro-Precision Carat Analytical Scale">Micro-Precision Carat Analytical Scale (Class I)</option>
                      <option value="Heavy Duty Weighbridge (50T)">Heavy Duty Weighbridge (50T - Class IV)</option>
                      <option value="Fuel Dispensing Flow Meter Unit">Fuel Dispensing Flow Meter Unit (Class 0.5)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Max Capacity / Division *</label>
                      <input 
                        type="text"
                        value={newCapacity}
                        onChange={(e) => setNewCapacity(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Accuracy Class *</label>
                      <input 
                        type="text"
                        value={newAccuracyClass}
                        onChange={(e) => setNewAccuracyClass(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Manufacturer Make *</label>
                      <input 
                        type="text"
                        value={newManufacturer}
                        onChange={(e) => setNewManufacturer(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Serial Number *</label>
                      <input 
                        type="text"
                        value={newSerialNo}
                        onChange={(e) => setNewSerialNo(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
                    >
                      Next: Dealer Credentials &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Dealer License */}
              {wizardStep === 2 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Authorized Dealer / Manufacturer Name *</label>
                    <input 
                      type="text"
                      value={dealerName}
                      onChange={(e) => setDealerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Dealer Stamping License Number *</label>
                    <input 
                      type="text"
                      value={dealerLicense}
                      onChange={(e) => setDealerLicense(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                    />
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-dashed border-slate-700 rounded-xl space-y-1 text-center">
                    <Upload className="w-6 h-6 text-blue-400 mx-auto" />
                    <span className="text-white font-semibold block">Upload Model Approval Certificate & Dealer Invoice</span>
                    <span className="text-slate-400 text-[11px]">PDF, PNG or JPG (Max 5MB) - Mock auto-attached</span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setWizardStep(3)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
                    >
                      Next: Premise & Location &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Premise & Geo-Location */}
              {wizardStep === 3 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Business Premise Address *</label>
                    <textarea 
                      rows={2}
                      value={premiseAddress}
                      onChange={(e) => setPremiseAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <MapPin className="w-4 h-4" />
                      <div>
                        <span className="font-bold block">GPS Coordinates Captured:</span>
                        <span className="font-mono text-[11px] text-slate-300">Lat: 12.9716° N, Lng: 77.5946° E</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">
                      GEOFENCE LOCKED
                    </span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setWizardStep(4)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
                    >
                      Next: Pay Verification Fee &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Stamping Fee & Submit */}
              {wizardStep === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>Statutory Government Stamping Fee (Rule 14):</span>
                      <span className="font-bold text-white">₹400.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Digital Certificate & QR Seal Generation:</span>
                      <span className="font-bold text-white">₹50.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-2 text-sm font-bold">
                      <span className="text-white">Total Amount Payable:</span>
                      <span className="text-emerald-400 font-mono text-base">₹450.00</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <div>
                      <span className="font-bold text-white block">Payment Mode: Bharat e-Pay Gateway (UPI / QR / NetBanking)</span>
                      <span className="text-slate-400 text-[11px]">Instant automated receipt generation & LMO docket dispatch</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setWizardStep(3)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                    >
                      {isSubmitting ? (
                        <>Submitting & Generating e-Challan...</>
                      ) : (
                        <><Sparkles className="w-4 h-4 text-amber-300" /> Confirm & Pay ₹450</>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
