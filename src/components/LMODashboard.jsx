import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CalendarCheck, 
  CheckCircle2, 
  XCircle, 
  FileCheck2, 
  Navigation, 
  MapPin, 
  Clock, 
  Sparkles, 
  AlertTriangle,
  UserCheck,
  Send,
  Eye
} from 'lucide-react';
import { SMART_SCHEDULER_SLOTS } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function LMODashboard({ applications, onApproveApplication, onRejectApplication, onOpenCertificate }) {
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'scheduler' | 'reports'
  const [selectedApp, setSelectedApp] = useState(applications[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = (app) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
      onApproveApplication(app.appId);
      alert(`Application #${app.appId} approved!\n\nOfficial Digital Verification Certificate generated & cryptographically signed by LMO with QR stamping seal.`);
    }, 800);
  };

  const handleAutoSchedule = () => {
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.5 } });
    alert("AI Smart Scheduling Engine re-calculated!\n\nAll pending inspections clustered into optimal 96% route efficiency slots by GPS ward.");
  };

  return (
    <div className="space-y-6">
      
      {/* Officer Header */}
      <div className="bg-gradient-to-r from-purple-950/50 via-slate-900 to-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Enforcement & Statutory Stamping Wing
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            LMO Officer Command & Decision Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Jurisdiction: <strong className="text-white">Bengaluru East & Central Enforcement Zone (LMO Officer: Shri. R. Suresh)</strong>
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'applications' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('scheduler')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'scheduler' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Smart Route Scheduler
          </button>
        </div>
      </div>

      {/* VIEW 1: Applications & GATC Approval Desk */}
      {activeTab === 'applications' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Applications List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Incoming Applications Dossier</span>
              <span>Sorted by Urgency & Expiry</span>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.appId}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                    selectedApp?.appId === app.appId
                      ? 'bg-purple-950/30 border-purple-500 shadow-lg'
                      : 'bg-slate-900 hover:bg-slate-850 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-purple-400 font-bold">{app.appId}</span>
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[10px] font-semibold">
                      {app.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{app.applicant}</h4>
                  <p className="text-xs text-slate-300">{app.instrumentType} ({app.capacity})</p>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 border-t border-slate-800/80">
                    <span>Fee: <strong className="text-emerald-400 font-semibold">₹{app.feeAmount} (Paid)</strong></span>
                    <span>Location: <strong className="text-slate-300">{app.location.split(',')[0]}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Selected Application Scrutiny & Decision Desk */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
            {selectedApp ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs text-purple-400 font-bold">{selectedApp.appId}</span>
                    <h3 className="text-lg font-bold text-white">{selectedApp.applicant}</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold">
                    Scrutiny Complete
                  </span>
                </div>

                {/* Instrument Specifications */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Instrument Type:</span>
                    <span className="font-semibold text-white mt-0.5 block">{selectedApp.instrumentType}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Serial Number:</span>
                    <span className="font-mono text-cyan-300 mt-0.5 block">{selectedApp.serialNo}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Dealer & Stamping License:</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">{selectedApp.dealerName} ({selectedApp.dealerLicense})</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Assigned GATC Testing Lab:</span>
                    <span className="font-semibold text-amber-300 mt-0.5 block">{selectedApp.assignedGatc}</span>
                  </div>
                </div>

                {/* GATC Calibration Summary Telemetry */}
                <div className="p-4 bg-purple-950/20 border border-purple-800/30 rounded-xl space-y-2 text-xs">
                  <h5 className="font-bold text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> AI GATC Test Telemetry Review:
                  </h5>
                  <p className="text-slate-300">
                    Standard weight tests at 5kg, 10kg, 20kg demonstrated maximum eccentricity error of <strong>+0.02%</strong> (Permissible threshold is ±0.05%). GATC recommended for statutory certification.
                  </p>
                </div>

                {/* Decision Actions */}
                <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                  <button
                    disabled={isProcessing}
                    onClick={() => handleApprove(selectedApp)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" /> 
                    {isProcessing ? "Signing with DSC..." : "Digitally Sign & Approve Stamping"}
                  </button>

                  <button
                    onClick={() => alert(`Application #${selectedApp.appId} flagged back to GATC / Repairer for re-calibration.`)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <XCircle className="w-4 h-4" /> Send for Repair
                  </button>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-500 text-center py-10">Select an application to review</p>
            )}
          </div>

        </div>
      )}

      {/* VIEW 2: AI Smart Route Scheduling Simulator */}
      {activeTab === 'scheduler' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> GIS AI Smart Inspection Allocator
                </h3>
                <p className="text-xs text-slate-400">
                  Auto-allocates verification requests based on expiry date, inspector GPS coordinates, and vehicle transit optimization (Slide 1 & Slide 3).
                </p>
              </div>

              <button
                onClick={handleAutoSchedule}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-600/20"
              >
                <Navigation className="w-3.5 h-3.5" /> Re-Run GIS Route Optimizer
              </button>
            </div>

            {/* Smart Schedule Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {SMART_SCHEDULER_SLOTS.map((slot) => (
                <div key={slot.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-purple-400 font-bold">{slot.id}</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">
                      {slot.travelEfficiency}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white">{slot.officer}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">{slot.ward}</p>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time Slot:</span>
                      <span className="font-semibold text-white">{slot.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Inspection Stops:</span>
                      <span className="font-semibold text-white">{slot.stops} Premises</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Travel Distance:</span>
                      <span className="font-semibold text-cyan-300">{slot.estimatedDistance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Priority Cluster:</span>
                      <span className="font-semibold text-amber-300 truncate max-w-[150px]">{slot.priorityWeights}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
