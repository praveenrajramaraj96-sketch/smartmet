import React, { useState } from 'react';
import { 
  FileCheck2, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  User, 
  X,
  Upload,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApplicationsView({ applications, onAddNewApplication, onApproveApplication, currentRole }) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  
  // Application Form
  const [applicantName, setApplicantName] = useState('Sri Balaji Retail & Wholesale');
  const [instrumentType, setInstrumentType] = useState('Digital Countertop Weighing Scale');
  const [capacity, setCapacity] = useState('30 kg (e = 5 g)');
  const [serialNo, setSerialNo] = useState(`SN-IND-${Math.floor(100000 + Math.random() * 900000)}`);
  const [dealerLicense, setDealerLicense] = useState('DL-KA-BLR-88401');
  const [dealerName, setDealerName] = useState('Essae Precision Calibration Ltd.');
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [feeAmount, setFeeAmount] = useState(450);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = {
      appId: `APP-2026-KA-${Math.floor(10000 + Math.random() * 90000)}`,
      applicant: applicantName,
      traderName: applicantName,
      instrumentType,
      capacity,
      serialNo,
      dealerName,
      dealerLicense,
      feeAmount,
      feeStatus: "Paid Online (Razorpay / Bharat e-Pay)",
      submissionDate: new Date().toISOString().split('T')[0],
      assignedGatc: "Apex Metrology Calibration Labs (GATC-KA-09)",
      assignedLmo: "Shri. R. Suresh, LMO Bengaluru East",
      status: "Under LMO Review",
      location,
      urgency: "Normal"
    };

    onAddNewApplication(newApp);
    setShowApplyModal(false);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    alert(`Application #${newApp.appId} created and dispatched to LMO desk for scrutiny.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs font-semibold mb-2">
            <FileCheck2 className="w-3.5 h-3.5" /> Verification Workflow Engine
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Legal Metrology Stamping Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Track online verification applications, fee challans, scrutiny stages, and stamping issuances.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> New Verification Application
        </button>
      </div>

      {/* Applications Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {applications.map((app) => (
          <div key={app.appId} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-purple-400 font-bold">{app.appId}</span>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-bold">
                  {app.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">{app.applicant}</h4>
                <p className="text-xs text-slate-300">{app.instrumentType}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Serial No:</span>
                  <span className="font-mono text-cyan-300">{app.serialNo}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Capacity:</span>
                  <span className="text-white">{app.capacity}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Dealer:</span>
                  <span className="text-slate-300">{app.dealerName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Location:</span>
                  <span className="text-slate-300 truncate max-w-[150px]">{app.location}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800/80 pt-1.5 text-slate-400">
                  <span>Fee Challan:</span>
                  <span className="text-emerald-400 font-bold font-mono">₹{app.feeAmount} (Paid)</span>
                </div>
              </div>
            </div>

            {/* Role-Specific Action Buttons */}
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              {(currentRole === 'lmo' || currentRole === 'admin') ? (
                <button
                  onClick={() => onApproveApplication(app.appId)}
                  className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Approve & Issue Stamping Seal
                </button>
              ) : (
                <div className="w-full py-2 bg-slate-800 text-slate-400 rounded-xl text-center text-[11px] font-semibold flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Awaiting LMO Officer Scrutiny
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Application Modal */}
      {showApplyModal && (
        <div className="modal-backdrop">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Apply for Legal Metrology Stamping (Rule 14)</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Establishment / Trader Name</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Instrument Category & Model</label>
                <select
                  value={instrumentType}
                  onChange={(e) => setInstrumentType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                >
                  <option value="Digital Countertop Weighing Scale">Digital Countertop Weighing Scale (Class III)</option>
                  <option value="Micro-Precision Carat Analytical Scale">Micro-Precision Carat Analytical Scale (Class I)</option>
                  <option value="Fuel Dispensing Multi-Nozzle Unit">Fuel Dispensing Multi-Nozzle Unit (Class 0.5)</option>
                  <option value="Heavy Industrial Weighbridge (50T)">Heavy Industrial Weighbridge (50T - Class IV)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Max Capacity</label>
                  <input
                    type="text"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Serial Number</label>
                  <input
                    type="text"
                    value={serialNo}
                    onChange={(e) => setSerialNo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Dealer Stamping License</label>
                  <input
                    type="text"
                    value={dealerLicense}
                    onChange={(e) => setDealerLicense(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Premise Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-400 block text-[11px]">Prescribed Statutory Stamping Fee:</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">₹{feeAmount}.00 (Bharat e-Pay)</span>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">
                  Zero Cash
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Submit Application & Pay ₹{feeAmount}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
