import React, { useState } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Wrench, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Download, 
  PlusCircle, 
  FileText, 
  Navigation, 
  MapPin, 
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  X,
  Play,
  Camera,
  Eye,
  CreditCard,
  Building2,
  FileCheck2,
  FileX,
  User,
  Send,
  ShieldAlert,
  Search,
  Upload,
  RefreshCw,
  Receipt,
  Printer,
  Smartphone,
  Check
} from 'lucide-react';
import DigitalCertificateModal from './components/DigitalCertificateModal';
import LiveCameraQRScanner from './components/LiveCameraQRScanner';
import AIChatbot from './components/AIChatbot';
import { INITIAL_INSTRUMENTS, MOCK_APPLICATIONS } from './data/mockData';
import confetti from 'canvas-confetti';

export default function App() {
  // Current Trader Logged-in Persona
  const loggedInTrader = {
    name: "Sri Balaji Supermarket & Provisions",
    gstin: "29AABCB1234D1Z5",
    proprietor: "M. Ramesh Gowda",
    location: "100ft Road, Indiranagar, Bengaluru - 560038"
  };

  // Active Tab: 'owner' | 'lmo' | 'gatc' | 'citizen'
  const [activeTab, setActiveTab] = useState('owner');
  
  // Shared State
  const [instruments, setInstruments] = useState(INITIAL_INSTRUMENTS);
  const [applications, setApplications] = useState([
    {
      appId: "APP-2026-KA-10928",
      applicant: "Sri Balaji Supermarket & Provisions",
      traderName: "M. Ramesh Gowda",
      traderGstin: "29AABCB1234D1Z5",
      instrumentType: "Digital Countertop Weighing Scale (Class III)",
      capacity: "30 kg (e = 5 g)",
      serialNo: "SN-KA-889201",
      dealerName: "Essae Precision Scales Ltd.",
      dealerLicense: "DL-KA-LM-8890",
      feeAmount: 450,
      feeStatus: "Paid Online (Bharat e-Pay)",
      submissionDate: "2026-09-29",
      assignedGatc: "Apex Metrology Labs (GATC-KA-09)",
      assignedLmo: "Shri. R. Suresh (LMO)",
      stage: "NEW_SUBMITTED",
      status: "1. Awaiting LMO Initial Scrutiny",
      location: "Shop #14, 100ft Road, Indiranagar, Bengaluru",
      gatcTestResult: null
    },
    {
      appId: "APP-2026-DL-88210",
      applicant: "Rajdhani Wholesale Grains",
      traderName: "Sunil Aggarwal",
      traderGstin: "07AAACR9921B1Z2",
      instrumentType: "Platform Heavy Weighing Scale (Class III)",
      capacity: "300 kg (e = 50 g)",
      serialNo: "SN-DL-AG-9912",
      dealerName: "Northern Precision Scales",
      dealerLicense: "DL-DL-LM-1099",
      feeAmount: 1200,
      feeStatus: "Paid Online",
      submissionDate: "2026-09-28",
      assignedGatc: "National Standards Calibration GATC",
      assignedLmo: "Shri. R. Suresh (LMO)",
      stage: "GATC_REPORT_READY",
      status: "3. GATC Test Done (Ready for Final LMO Approval)",
      location: "Chandni Chowk Wholesale Hub",
      gatcTestResult: {
        errorPercent: "+0.02%",
        mpeThreshold: "±0.05%",
        verdict: "PASS",
        recommendation: "Linear step calibration verified. Recommended for LMO statutory digital stamping."
      }
    }
  ]);

  const [viewingCertificate, setViewingCertificate] = useState(null);

  // LMO Review Customer Submission Dossier Modal State
  const [reviewingApp, setReviewingApp] = useState(null);

  // Owner Form Modal
  const [showOwnerApplyModal, setShowOwnerApplyModal] = useState(false);
  const [newTraderScale, setNewTraderScale] = useState({
    name: "Digital Countertop Weighing Scale (Class III)",
    capacity: "30 kg (e = 5 g)",
    dealer: "Essae Precision Scales Ltd.",
    dealerLicense: "DL-KA-LM-8890",
    location: loggedInTrader.location,
    fee: 450
  });

  // 1-Click Renewal & Payment Modal State
  const [renewingInstrument, setRenewingInstrument] = useState(null);
  const [renewalPaymentMethod, setRenewalPaymentMethod] = useState('upi');
  const [isProcessingRenewal, setIsProcessingRenewal] = useState(false);
  const [renewalReceipt, setRenewalReceipt] = useState(null);

  // GATC Test State
  const [gatcTestWeights, setGatcTestWeights] = useState({ standard: 10.00, observed: 10.002 });
  const [gatcAiReportDone, setGatcAiReportDone] = useState(false);

  // Citizen Lodge Grievance State
  const [citizenStoreName, setCitizenStoreName] = useState('');
  const [citizenLocation, setCitizenLocation] = useState('Indiranagar 100ft Road, Bengaluru');
  const [citizenAllegation, setCitizenAllegation] = useState('');
  const [grievanceTicket, setGrievanceTicket] = useState(null);

  // Filter ONLY current owner's instruments
  const myInstruments = instruments.filter(
    (inst) => inst.ownerName?.includes("Sri Balaji") || inst.traderGstin === loggedInTrader.gstin
  );

  // Filter ONLY current owner's applications
  const myApplications = applications.filter(
    (app) => app.applicant?.includes("Sri Balaji") || app.traderGstin === loggedInTrader.gstin
  );

  // Applications queues for LMO
  const lmoInitialQueue = applications.filter(a => a.stage === 'NEW_SUBMITTED');
  const lmoFinalQueue = applications.filter(a => a.stage === 'GATC_REPORT_READY');

  // Applications queue for GATC
  const gatcQueue = applications.filter(a => a.stage === 'GATC_TESTING');

  // STEP 1: Owner submits application
  const handleOwnerSubmit = (e) => {
    e.preventDefault();
    const newApp = {
      appId: `APP-2026-KA-${Math.floor(10000 + Math.random() * 90000)}`,
      applicant: loggedInTrader.name,
      traderName: loggedInTrader.proprietor,
      traderGstin: loggedInTrader.gstin,
      instrumentType: newTraderScale.name,
      capacity: newTraderScale.capacity,
      serialNo: `SN-KA-${Math.floor(100000 + Math.random() * 900000)}`,
      dealerName: newTraderScale.dealer,
      dealerLicense: newTraderScale.dealerLicense,
      feeAmount: newTraderScale.fee,
      feeStatus: "Paid Online (Bharat e-Pay Ref: BEP-88921)",
      submissionDate: new Date().toISOString().split('T')[0],
      assignedGatc: "Apex Metrology Labs (GATC-KA-09)",
      assignedLmo: "Shri. R. Suresh (LMO)",
      stage: "NEW_SUBMITTED",
      status: "1. Awaiting LMO Initial Scrutiny",
      location: newTraderScale.location,
      gatcTestResult: null
    };

    setApplications([newApp, ...applications]);
    setShowOwnerApplyModal(false);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    alert(`Step 1 Complete: Application #${newApp.appId} submitted!\n\n👉 Switch to "2. LMO Officer" tab to perform initial scrutiny & dispatch to GATC.`);
  };

  // STEP 1-B: Owner 1-Click Renewal Payment & Submission
  const handleExecuteRenewalPayment = () => {
    if (!renewingInstrument) return;
    setIsProcessingRenewal(true);

    setTimeout(() => {
      const challanNo = `CHL-KA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const txId = `BEP-TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const renewAppId = `APP-RENEW-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      const renewApp = {
        appId: renewAppId,
        applicant: renewingInstrument.ownerName,
        traderName: loggedInTrader.proprietor,
        traderGstin: renewingInstrument.traderGstin || loggedInTrader.gstin,
        instrumentType: `${renewingInstrument.name} (Annual Re-Verification Renewal)`,
        capacity: renewingInstrument.capacity,
        serialNo: renewingInstrument.serialNumber,
        dealerName: renewingInstrument.manufacturer,
        dealerLicense: renewingInstrument.dealerLicenseNo || "DL-KA-LM-8890",
        feeAmount: "350",
        feeStatus: `Paid Online (e-Challan #${challanNo})`,
        submissionDate: new Date().toISOString().split('T')[0],
        assignedGatc: "Apex Metrology Labs (GATC-KA-09)",
        assignedLmo: "Shri. R. Suresh (LMO)",
        stage: "NEW_SUBMITTED",
        status: "1. Awaiting LMO Initial Scrutiny (Renewal)",
        location: renewingInstrument.location,
        gatcTestResult: null
      };

      setApplications([renewApp, ...applications]);
      setIsProcessingRenewal(false);
      setRenewalReceipt({
        appId: renewAppId,
        challanNo,
        txId,
        amount: "₹350.00",
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        instrument: renewingInstrument,
        method: renewalPaymentMethod === 'upi' ? 'UPI (Bharat e-Pay Instant)' : renewalPaymentMethod === 'card' ? 'Debit/Credit Card (RuPay)' : 'Internet Banking (Treasury)'
      });
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }, 900);
  };

  // STEP 2: LMO scrutinizes and dispatches to GATC
  const handleLmoDispatchToGatc = (appId) => {
    setApplications(applications.map(app => {
      if (app.appId === appId) {
        return {
          ...app,
          stage: "GATC_TESTING",
          status: "2. Under GATC Field Calibration & Testing"
        };
      }
      return app;
    }));
    setReviewingApp(null);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    alert(`Application #${appId} scrutiny passed!\n\nDispatched to GATC Testing Lab with GIS Smart Scheduling.\n\n👉 Switch to "3. GATC Test Lab" tab to calibrate and generate AI Report.`);
  };

  // STEP 3: GATC tests and submits report back to LMO
  const handleGatcTransmitToLmo = (appId) => {
    setApplications(applications.map(app => {
      if (app.appId === appId) {
        return {
          ...app,
          stage: "GATC_REPORT_READY",
          status: "3. GATC Report Ready (Awaiting Final LMO Approval)",
          gatcTestResult: {
            errorPercent: "+0.02%",
            mpeThreshold: "±0.05%",
            verdict: "PASS",
            recommendation: "Linear step calibration verified within MPE limits. Recommended for LMO statutory digital stamping."
          }
        };
      }
      return app;
    }));
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    alert(`Calibration complete & AI Report generated for Application #${appId}!\n\nReport transmitted back to LMO.\n\n👉 Switch back to "2. LMO Officer" tab for final statutory approval & digital certificate generation.`);
  };

  // STEP 4: LMO reviews GATC report and makes final approval
  const handleLmoFinalApprove = (app) => {
    const newInst = {
      id: `INST-KA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: app.instrumentType,
      category: "Commercial Verified Scale",
      accuracyClass: "Class III (Commercial)",
      capacity: app.capacity,
      manufacturer: app.dealerName,
      modelNumber: "DS-252",
      serialNumber: app.serialNo,
      ownerName: app.applicant,
      traderGstin: app.traderGstin || "29AABCB1234D1Z5",
      dealerLicenseNo: app.dealerLicense,
      location: app.location,
      verificationDate: new Date().toISOString().split('T')[0],
      expiryDate: "2027-09-29",
      status: "Active",
      daysToExpiry: 365,
      certNumber: `CERT/KA/LMO-04/2026/${Math.floor(10000 + Math.random() * 90000)}`,
      lmoOfficer: "Shri. R. Suresh, LMO Bengaluru East",
      gatcCenter: app.assignedGatc,
      lastToleranceError: app.gatcTestResult?.errorPercent || "+0.02% (Pass)",
      digilockerId: `DL-MET-29-${Math.floor(1000 + Math.random() * 9000)}`,
      qrCodeHash: `SMARTMET-KA-NEW-VERIFIED-${Math.floor(100 + Math.random() * 900)}`
    };

    setInstruments([newInst, ...instruments]);
    setApplications(applications.filter(a => a.appId !== app.appId));
    setReviewingApp(null);
    setViewingCertificate(newInst);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  // Citizen Lodge Grievance
  const handleCitizenGrievanceSubmit = (e) => {
    e.preventDefault();
    if (!citizenStoreName || !citizenAllegation) return;

    const newTicket = {
      id: `GRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      storeName: citizenStoreName,
      location: citizenLocation,
      allegation: citizenAllegation,
      date: new Date().toISOString().split('T')[0],
      status: "Assigned to LMO Flying Squad for Surprise Inspection",
      sla: "< 24 Hours Dispatch"
    };

    setGrievanceTicket(newTicket);
    setCitizenStoreName('');
    setCitizenAllegation('');
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
  };

  // Calculate GATC error
  const gatcError = (((gatcTestWeights.observed - gatcTestWeights.standard) / gatcTestWeights.standard) * 100).toFixed(3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* 1. Clear Top Gov Header */}
      <header className="bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white font-heading">SMART<span className="text-blue-400">MET</span></span>
                <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-bold rounded">
                  SIH 2026 (SIH26036)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Online Legal Metrology Verification System &bull; Team Blind Coders</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 hidden sm:flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Grid Active
            </span>
          </div>
        </div>
      </header>

      {/* 2. Interactive Section Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-4">
        <div className="max-w-6xl mx-auto space-y-3">
          
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-300 uppercase tracking-wider">Select Role Section:</span>
            <span className="text-slate-400 hidden sm:inline">Owner Applies &rarr; LMO Checks &rarr; GATC Tests &rarr; LMO Approves &bull; Citizen Verifies</span>
          </div>

          {/* 4 Clear Tab Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            
            {/* Tab 1: Owner */}
            <button
              onClick={() => setActiveTab('owner')}
              className={`p-3.5 rounded-2xl text-left transition flex items-center gap-3 border ${
                activeTab === 'owner'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div className={`p-2 rounded-xl ${activeTab === 'owner' ? 'bg-white/20' : 'bg-emerald-500/10 text-emerald-400'}`}>
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold">1. Instrument Owner</div>
                <div className="text-[10px] opacity-80">Apply & View Cert</div>
              </div>
            </button>

            {/* Tab 2: LMO */}
            <button
              onClick={() => setActiveTab('lmo')}
              className={`p-3.5 rounded-2xl text-left transition flex items-center gap-3 border ${
                activeTab === 'lmo'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30 ring-2 ring-purple-400/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div className={`p-2 rounded-xl ${activeTab === 'lmo' ? 'bg-white/20' : 'bg-purple-500/10 text-purple-400'}`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold">2. LMO Officer</div>
                <div className="text-[10px] opacity-80">
                  Scrutiny & Approval ({lmoInitialQueue.length + lmoFinalQueue.length})
                </div>
              </div>
            </button>

            {/* Tab 3: GATC */}
            <button
              onClick={() => setActiveTab('gatc')}
              className={`p-3.5 rounded-2xl text-left transition flex items-center gap-3 border ${
                activeTab === 'gatc'
                  ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-600/30 ring-2 ring-amber-400/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div className={`p-2 rounded-xl ${activeTab === 'gatc' ? 'bg-white/20' : 'bg-amber-500/10 text-amber-400'}`}>
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold">3. GATC Test Lab</div>
                <div className="text-[10px] opacity-80">Calibration & AI ({gatcQueue.length})</div>
              </div>
            </button>

            {/* Tab 4: Citizen QR */}
            <button
              onClick={() => setActiveTab('citizen')}
              className={`p-3.5 rounded-2xl text-left transition flex items-center gap-3 border ${
                activeTab === 'citizen'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div className={`p-2 rounded-xl ${activeTab === 'citizen' ? 'bg-white/20' : 'bg-blue-500/10 text-blue-400'}`}>
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold">4. Public Citizen</div>
                <div className="text-[10px] opacity-80">Live Camera Scanner</div>
              </div>
            </button>

          </div>
        </div>
      </div>

      {/* 3. Main Workspace */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 flex-1 space-y-6">
        
        {/* ========================================================= */}
        {/* SECTION 1: INSTRUMENT OWNER (TRADER)                      */}
        {/* ========================================================= */}
        {activeTab === 'owner' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Logged-in Trader Profile Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold mb-1">
                  <User className="w-3.5 h-3.5" /> Logged In: {loggedInTrader.proprietor} (Owner)
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {loggedInTrader.name}
                </h2>
                <p className="text-xs text-slate-400">
                  GSTIN: <span className="font-mono text-cyan-300 font-bold">{loggedInTrader.gstin}</span> &bull; Premise: {loggedInTrader.location}
                </p>
              </div>

              <button
                onClick={() => setShowOwnerApplyModal(true)}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5 self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" /> Apply for New Verification (₹450)
              </button>
            </div>

            {/* Sub-Section A: My Submitted Applications Status */}
            {myApplications.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> My Pending Verification Applications ({myApplications.length})
                  </h3>
                  <span className="text-[11px] text-slate-400">Live Stage Tracker</span>
                </div>

                <div className="space-y-2">
                  {myApplications.map((app) => (
                    <div key={app.appId} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-blue-400 font-bold">{app.appId}</span>
                          <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-bold">
                            {app.status}
                          </span>
                        </div>
                        <p className="text-white font-semibold mt-0.5">{app.instrumentType} ({app.capacity})</p>
                        <p className="text-[11px] text-slate-400">Submitted on {app.submissionDate} &bull; Fee: ₹{app.feeAmount} (Paid)</p>
                      </div>

                      <div className="text-[11px] text-slate-400 sm:text-right">
                        <span>Assigned Officer: <strong className="text-slate-200">{app.assignedLmo}</strong></span>
                        <div className="text-emerald-400 font-medium">Testing Center: {app.assignedGatc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Section B: My Active Registered Machines & Certificates */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white">My Active Registered Instruments ({myInstruments.length})</span>
                <span className="text-slate-400 text-[11px]">Private Registry</span>
              </div>

              <div className="divide-y divide-slate-800">
                {myInstruments.map((inst) => (
                  <div key={inst.id} className="p-5 hover:bg-slate-800/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-blue-400 font-bold">{inst.id}</span>
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold">
                          {inst.status}
                        </span>
                        <span className="text-[10px] text-slate-400">{inst.accuracyClass}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{inst.name}</h4>
                      <p className="text-xs text-slate-400">
                        Serial: <span className="font-mono text-cyan-300">{inst.serialNumber}</span> &bull; Capacity: <span className="text-slate-200">{inst.capacity}</span> &bull; Valid Until: <span className="text-amber-300 font-semibold">{inst.expiryDate}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => setViewingCertificate(inst)}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition"
                      >
                        <FileText className="w-3.5 h-3.5" /> View Official Certificate
                      </button>
                      <button
                        onClick={() => {
                          setRenewingInstrument(inst);
                          setRenewalReceipt(null);
                          setIsProcessingRenewal(false);
                        }}
                        className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> 1-Click Renew (₹350)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 2: LMO (LEGAL METROLOGY OFFICER - 2 STAGES)        */}
        {/* ========================================================= */}
        {activeTab === 'lmo' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* LMO Banner */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full text-xs font-semibold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Statutory Enforcement Desk
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  LMO Customer Scrutiny & Final Approval Desk
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Officer: <strong className="text-white">Shri. R. Suresh (Legal Metrology Officer, Bengaluru East Zone)</strong>
                </p>
              </div>
            </div>

            {/* STAGE A: Initial Applications Submitted by Owners */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Stage 1: New Owner Applications (Initial Scrutiny & Dispatch to GATC)
                  </h3>
                  <p className="text-[11px] text-slate-400">Review trader details and dispatch to GATC for field calibration testing.</p>
                </div>
                <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-mono font-bold">
                  {lmoInitialQueue.length} Pending
                </span>
              </div>

              {lmoInitialQueue.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No new applications awaiting initial scrutiny.</p>
              ) : (
                <div className="space-y-3">
                  {lmoInitialQueue.map((app) => (
                    <div key={app.appId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-purple-400 font-bold">{app.appId}</span>
                          <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px] font-bold">
                            Challan Fee: ₹{app.feeAmount} (Paid)
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">{app.applicant} &bull; {app.instrumentType}</h4>
                        <p className="text-slate-400 text-[11px]">Dealer: {app.dealerName} &bull; Location: {app.location}</p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => setReviewingApp(app)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg text-xs font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5 inline mr-1" /> View Dossier
                        </button>
                        <button
                          onClick={() => handleLmoDispatchToGatc(app.appId)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-md transition"
                        >
                          <Send className="w-3.5 h-3.5" /> Scrutinize & Dispatch to GATC Lab &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* STAGE B: Applications Returned from GATC with Test Reports */}
            <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Stage 2: Applications Returned from GATC with AI Test Reports (Final Approval)
                  </h3>
                  <p className="text-[11px] text-slate-400">GATC has calibrated the scale. LMO reviews test curve and gives final statutory digital signature.</p>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold">
                  {lmoFinalQueue.length} Ready
                </span>
              </div>

              {lmoFinalQueue.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No applications currently awaiting final statutory decision.</p>
              ) : (
                <div className="space-y-3">
                  {lmoFinalQueue.map((app) => (
                    <div key={app.appId} className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-emerald-400 font-bold">{app.appId}</span>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">
                            GATC Verdict: {app.gatcTestResult?.verdict} (Error: {app.gatcTestResult?.errorPercent})
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">{app.applicant} &bull; {app.instrumentType}</h4>
                        <p className="text-emerald-300 text-[11px] mt-0.5">{app.gatcTestResult?.recommendation}</p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => setReviewingApp(app)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg text-xs font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5 inline mr-1" /> View GATC Telemetry
                        </button>
                        <button
                          onClick={() => handleLmoFinalApprove(app)}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Digitally Sign & Approve Certificate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 3: GATC (TEST LAB)                                */}
        {/* ========================================================= */}
        {activeTab === 'gatc' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* GATC Banner */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold mb-2">
                  <Wrench className="w-3.5 h-3.5" /> Testing & Calibration Laboratory
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  GATC Calibration Rig & AI Smart Reporting
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Lab: <strong className="text-white">Apex Metrology Calibration Labs (GATC-KA-09, ISO/IEC 17025)</strong>
                </p>
              </div>

              <div className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-mono border border-slate-700">
                Dispatched Queue: {gatcQueue.length} Scale Inspections
              </div>
            </div>

            {/* List of Applications Dispatched to GATC by LMO */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Scales Dispatched by LMO for Field Testing:
              </h3>

              {gatcQueue.length === 0 ? (
                <div className="p-6 bg-slate-950 rounded-xl text-center text-xs text-slate-500">
                  No scales currently pending field calibration. (Submit an application in Tab 1 and dispatch it in Tab 2 to see it appear here).
                </div>
              ) : (
                gatcQueue.map((app) => (
                  <div key={app.appId} className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">{app.appId}</span>
                        <span className="font-bold text-white text-sm">{app.applicant}</span>
                      </div>
                      <p className="text-slate-300 mt-1">Scale: {app.instrumentType} &bull; Capacity: {app.capacity}</p>
                      <p className="text-slate-400 text-[11px]">Location: {app.location}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleGatcTransmitToLmo(app.appId)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-slate-950 font-black rounded-xl flex items-center gap-1.5 shadow-md transition"
                      >
                        <Sparkles className="w-4 h-4 text-slate-950" /> Test & Transmit AI Report to LMO &rarr;
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Interactive Calibration Rig Workbench */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left: Input Test Weights */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" /> Interactive Load Test Simulation
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Standard Certified Weight (kg):</label>
                    <input
                      type="number"
                      value={gatcTestWeights.standard}
                      onChange={(e) => setGatcTestWeights({ ...gatcTestWeights, standard: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Observed Reading on Trader Scale (kg):</label>
                    <input
                      type="number"
                      step="0.001"
                      value={gatcTestWeights.observed}
                      onChange={(e) => setGatcTestWeights({ ...gatcTestWeights, observed: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Calculated Tolerance Error:</span>
                    <span className={`font-mono font-bold text-sm ${Math.abs(parseFloat(gatcError)) <= 0.05 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {parseFloat(gatcError) >= 0 ? `+${gatcError}` : gatcError}% {Math.abs(parseFloat(gatcError)) <= 0.05 ? '(PASS)' : '(FAIL)'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setGatcAiReportDone(true);
                      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
                    }}
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <Sparkles className="w-4 h-4" /> Run AI Smart Report Synthesis
                  </button>
                </div>
              </div>

              {/* Right: AI Report Output */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> AI Report Output
                  </h3>

                  {gatcAiReportDone ? (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Report ID:</span>
                        <span className="font-mono text-cyan-400">GATC-RPT-2026-9041</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Permissible Error Limit:</span>
                        <span className="text-white">±0.05% (Class III Standard)</span>
                      </div>
                      <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300">
                        <strong>AI Summary Recommendation:</strong> Scale is within permissible limits (+0.02%). Recommended for LMO statutory digital stamping.
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 bg-slate-950/60 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                      Click <strong>"Run AI Smart Report Synthesis"</strong> on the left to preview the report.
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  Slide 2 Rule: "GATC tests parameters and AI summarizes; <strong className="text-white">LMO gives final approval</strong>."
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 4: CITIZEN QR SCANNER (REAL CAMERA & GRIEVANCE)   */}
        {/* ========================================================= */}
        {activeTab === 'citizen' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Top Banner */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold mb-2">
                  <QrCode className="w-3.5 h-3.5" /> Public Consumer Protection Portal
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  Live Camera QR Scanner & Grievance Lodging
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Slide 1 & 2 UVP: Public QR verification lets any citizen scan physical scale seals, verify DigiLocker certificates, and report fraud.
                </p>
              </div>
            </div>

            {/* Grid: Left Live Camera QR Scanner & Right Grievance Lodge */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7 Cols: Real Live Web Camera Scanner */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <LiveCameraQRScanner
                  instruments={instruments}
                  onOpenCertificate={(inst) => setViewingCertificate(inst)}
                />
              </div>

              {/* Right 5 Cols: Lodge Tampering / Short-Weight Report */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Report Short-Weight / Tampering</h3>
                      <p className="text-xs text-slate-400">Directly alerts the nearest LMO Flying Squad</p>
                    </div>
                  </div>

                  {grievanceTicket ? (
                    <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-5 h-5" /> Grievance Registered!
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Ticket ID: <strong className="text-white font-mono">{grievanceTicket.id}</strong>
                      </p>
                      <p className="text-emerald-300 text-[11px]">
                        Status: {grievanceTicket.status} ({grievanceTicket.sla})
                      </p>
                      <button
                        onClick={() => setGrievanceTicket(null)}
                        className="w-full mt-2 py-1.5 bg-slate-800 hover:bg-slate-750 text-white rounded-lg text-xs"
                      >
                        Lodge Another Report
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCitizenGrievanceSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1">Store / Establishment Name *</label>
                        <input
                          type="text"
                          required
                          value={citizenStoreName}
                          onChange={(e) => setCitizenStoreName(e.target.value)}
                          placeholder="e.g. Laxmi Vegetable Stall #4"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Market Location *</label>
                        <input
                          type="text"
                          required
                          value={citizenLocation}
                          onChange={(e) => setCitizenLocation(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Short-Weight Allegation *</label>
                        <textarea
                          rows={2}
                          required
                          value={citizenAllegation}
                          onChange={(e) => setCitizenAllegation(e.target.value)}
                          placeholder="Scale showed 1kg for 800g packet, seal broken..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/20 transition"
                      >
                        <Send className="w-4 h-4" /> Dispatch Flying Squad Raid
                      </button>
                    </form>
                  )}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  Slide 4: "Consumers get instant certification checks via QR code and direct tamper-flagging."
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* LMO: CUSTOMER SUBMISSION SCRUTINY & DECISION MODAL        */}
      {/* ========================================================= */}
      {reviewingApp && (
        <div className="modal-backdrop">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-850 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Customer Verification Dossier (Scrutiny Desk)</h3>
                  <p className="text-xs text-slate-400">Application #{reviewingApp.appId} &bull; Rule 14 Legal Metrology Act, 2009</p>
                </div>
              </div>
              <button
                onClick={() => setReviewingApp(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Customer Details */}
            <div className="p-6 overflow-y-auto space-y-5 bg-slate-950/60 text-xs">
              
              {/* Top Summary Banner */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-400 block text-[11px]">Applicant / Trader:</span>
                  <span className="font-bold text-white text-xs">{reviewingApp.applicant}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Trader GSTIN:</span>
                  <span className="font-mono text-cyan-300">{reviewingApp.traderGstin || "29AABCB1234D1Z5"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Submission Date:</span>
                  <span className="font-semibold text-slate-200">{reviewingApp.submissionDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Fee Payment Status:</span>
                  <span className="font-bold text-emerald-400">₹{reviewingApp.feeAmount} (Paid Online)</span>
                </div>
              </div>

              {/* 2 Column Details: Machine Specs & Dealer Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Machine Specs */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-purple-300 border-b border-slate-800 pb-1 flex items-center gap-1.5">
                    <Scale className="w-4 h-4" /> Instrument Specifications
                  </h5>
                  <div className="flex justify-between py-0.5"><span className="text-slate-400">Instrument Type:</span> <span className="text-white font-medium">{reviewingApp.instrumentType}</span></div>
                  <div className="flex justify-between py-0.5"><span className="text-slate-400">Capacity / Division:</span> <span className="text-white">{reviewingApp.capacity}</span></div>
                  <div className="flex justify-between py-0.5"><span className="text-slate-400">Serial Number:</span> <span className="font-mono text-cyan-300">{reviewingApp.serialNo}</span></div>
                  <div className="flex justify-between py-0.5"><span className="text-slate-400">Shop Location:</span> <span className="text-slate-200 truncate max-w-[180px]">{reviewingApp.location}</span></div>
                </div>

                {/* Dealer & Stamping License */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-purple-300 border-b border-slate-800 pb-1 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" /> Dealer Stamping Credentials
                  </h5>
                  <div className="flex justify-between py-0.5"><span className="text-slate-400">Dealer Name:</span> <span className="text-white font-medium">{reviewingApp.dealerName}</span></div>
                  <div className="flex justify-between py-0.5"><span className="text-slate-400">Stamping License No:</span> <span className="font-mono text-slate-200">{reviewingApp.dealerLicense}</span></div>
                  <div className="flex justify-between py-0.5"><span className="text-slate-400">Model Approval Status:</span> <span className="text-emerald-400 font-semibold">Verified (National Registry)</span></div>
                  <div className="flex justify-between py-0.5"><span className="text-slate-400">Testing Lab Assigned:</span> <span className="text-amber-300">{reviewingApp.assignedGatc}</span></div>
                </div>

              </div>

              {/* GATC Laboratory Calibration Report Review (if completed) */}
              {reviewingApp.gatcTestResult ? (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                  <h5 className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400" /> GATC Calibration Lab & AI Report Summary
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Observed Error:</span>
                      <span className="font-mono font-bold text-emerald-400">{reviewingApp.gatcTestResult.errorPercent}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Permissible Limit (MPE):</span>
                      <span className="font-mono text-slate-200">{reviewingApp.gatcTestResult.mpeThreshold}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Lab Verdict:</span>
                      <span className="font-bold text-emerald-300">{reviewingApp.gatcTestResult.verdict}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 pt-1 border-t border-emerald-500/20">
                    "{reviewingApp.gatcTestResult.recommendation}"
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-blue-950/20 border border-blue-800/30 rounded-xl text-blue-200 text-[11px]">
                  ℹ️ <strong>Stage 1 Status:</strong> Documents and fees verified. Ready to dispatch to GATC Lab for physical load testing.
                </div>
              )}

            </div>

            {/* Modal Decision Footer for LMO */}
            <div className="px-6 py-4 bg-slate-850 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline">
                {reviewingApp.stage === 'NEW_SUBMITTED' ? 'Initial Stage Action:' : 'Final Statutory Action:'}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {reviewingApp.stage === 'NEW_SUBMITTED' ? (
                  <button
                    onClick={() => handleLmoDispatchToGatc(reviewingApp.appId)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/30"
                  >
                    <Send className="w-4 h-4" /> Scrutinize & Dispatch to GATC Lab &rarr;
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => alert(`Application #${reviewingApp.appId} flagged for Repair & Retest.`)}
                      className="flex-1 sm:flex-none px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-rose-400 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition"
                    >
                      <FileX className="w-3.5 h-3.5" /> Send for Repair
                    </button>

                    <button
                      onClick={() => handleLmoFinalApprove(reviewingApp)}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Digitally Sign & Approve Certificate (DSC)
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Owner Application Modal */}
      {showOwnerApplyModal && (
        <div className="modal-backdrop">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Apply for Weighing Scale Verification</h3>
              <button onClick={() => setShowOwnerApplyModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOwnerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Scale Type & Category</label>
                <select
                  value={newTraderScale.name}
                  onChange={(e) => setNewTraderScale({ ...newTraderScale, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                >
                  <option value="Digital Countertop Weighing Scale (Class III)">Digital Countertop Weighing Scale (Class III - 30kg)</option>
                  <option value="Micro-Precision Carat Scale (Class I)">Micro-Precision Carat Scale (Class I - 220g)</option>
                  <option value="Fuel Dispensing Flow Unit (Class 0.5)">Fuel Dispensing Flow Unit (Class 0.5)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Capacity</label>
                  <input
                    type="text"
                    value={newTraderScale.capacity}
                    onChange={(e) => setNewTraderScale({ ...newTraderScale, capacity: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Authorized Dealer</label>
                  <input
                    type="text"
                    value={newTraderScale.dealer}
                    onChange={(e) => setNewTraderScale({ ...newTraderScale, dealer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Statutory Fee (Bharat e-Pay):</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">₹{newTraderScale.fee}.00</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20"
              >
                Submit Application & Pay ₹{newTraderScale.fee}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1-Click Renewal Bharat e-Pay Gateway Modal */}
      {renewingInstrument && (
        <div className="modal-backdrop">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-7 max-w-lg w-full space-y-5 animate-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Bharat e-Pay &bull; Statutory e-Challan</h3>
                  <p className="text-[11px] text-slate-400">Department of Legal Metrology, Government of India</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setRenewingInstrument(null);
                  setRenewalReceipt(null);
                }} 
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If Receipt is not yet generated, show payment checkout */}
            {!renewalReceipt ? (
              <div className="space-y-4 text-xs">
                
                {/* Instrument Summary Card */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-emerald-400 font-bold">{renewingInstrument.id}</span>
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full text-[10px] font-semibold">
                      Annual Re-Verification
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{renewingInstrument.name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                    <div>Serial: <strong className="text-slate-200">{renewingInstrument.serialNumber}</strong></div>
                    <div>Capacity: <strong className="text-slate-200">{renewingInstrument.capacity}</strong></div>
                    <div>Standard: <strong className="text-slate-200">{renewingInstrument.accuracyClass}</strong></div>
                    <div>Valid Until: <strong className="text-amber-300">{renewingInstrument.expiryDate}</strong></div>
                  </div>
                </div>

                {/* Government Statutory Fee Breakdown */}
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Statutory Fee Breakdown (e-Challan)
                  </div>
                  <div className="space-y-1.5 text-slate-400">
                    <div className="flex justify-between">
                      <span>Annual Re-Verification Stamping Fee (Rule 14):</span>
                      <span className="text-white font-mono">₹300.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GATC Calibration & Standards Cess:</span>
                      <span className="text-white font-mono">₹50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DigiLocker & Hologram QR Generation:</span>
                      <span className="text-emerald-400 font-semibold">₹0.00 (Exempt)</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-2 text-sm font-bold text-white">
                      <span>Total Statutory Payable:</span>
                      <span className="text-emerald-400 font-mono text-base">₹350.00</span>
                    </div>
                  </div>
                </div>

                {/* Payment Gateway Options */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Select Payment Method:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setRenewalPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                        renewalPaymentMethod === 'upi'
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span className="text-[11px] font-bold">UPI / QR</span>
                      <span className="text-[9px] text-slate-500">GPay, PhonePe</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRenewalPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                        renewalPaymentMethod === 'card'
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span className="text-[11px] font-bold">Debit / Card</span>
                      <span className="text-[9px] text-slate-500">RuPay, Visa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRenewalPaymentMethod('netbanking')}
                      className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                        renewalPaymentMethod === 'netbanking'
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-blue-400" />
                      <span className="text-[11px] font-bold">Net Banking</span>
                      <span className="text-[9px] text-slate-500">SBI, Treasury</span>
                    </button>
                  </div>
                </div>

                {/* Submit Payment CTA */}
                <button
                  type="button"
                  disabled={isProcessingRenewal}
                  onClick={handleExecuteRenewalPayment}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {isProcessingRenewal ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processing Bharat e-Pay Transaction...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Authorize Payment & Submit Renewal (₹350.00)
                    </>
                  )}
                </button>

              </div>
            ) : (
              /* Success / Official e-Challan Receipt View */
              <div className="space-y-4 text-xs animate-in fade-in duration-200">
                
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-300">Payment Successful & e-Challan Issued</h4>
                  <p className="text-[11px] text-slate-300">
                    Your re-verification application has been officially logged in the National Legal Metrology Registry.
                  </p>
                </div>

                {/* Receipt Details Table */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-medium">Application Number:</span>
                    <span className="font-mono font-bold text-blue-400">{renewalReceipt.appId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">e-Challan Number:</span>
                    <span className="font-mono font-bold text-emerald-400">{renewalReceipt.challanNo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Bharat e-Pay Txn ID:</span>
                    <span className="font-mono text-cyan-300">{renewalReceipt.txId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Amount Paid:</span>
                    <span className="font-bold text-white font-mono text-sm">{renewalReceipt.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Payment Method:</span>
                    <span className="text-slate-200">{renewalReceipt.method}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Date & Timestamp:</span>
                    <span className="text-slate-300">{renewalReceipt.date}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                    <span className="text-slate-400">Next Action:</span>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded font-semibold text-[10px]">
                      Awaiting LMO Scrutiny & GATC Dispatch
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={() => {
                    setRenewingInstrument(null);
                    setRenewalReceipt(null);
                  }}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Done &bull; View My Applications
                </button>

              </div>
            )}

          </div>
        </div>
      )}

      {/* Official Government Verification Certificate Modal */}
      {viewingCertificate && (
        <DigitalCertificateModal
          instrument={viewingCertificate}
          onClose={() => setViewingCertificate(null)}
        />
      )}

      {/* Floating Sahayak AI */}
      <AIChatbot
        onOpenScanner={() => setActiveTab('citizen')}
        onSelectRole={(role) => setActiveTab(role)}
      />

      {/* Clean Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SMARTMET &bull; Team Blind Coders &bull; SIH 2026 (SIH26036)</span>
          <span>Department of Legal Metrology, Government of India</span>
        </div>
      </footer>

    </div>
  );
}
