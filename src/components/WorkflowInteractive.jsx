import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  CalendarCheck, 
  Wrench, 
  Sparkles, 
  ClipboardCheck, 
  ShieldCheck, 
  Download, 
  BellRing, 
  AlertTriangle,
  ArrowRight,
  Info,
  ChevronRight,
  Play,
  RotateCcw
} from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/mockData';

export default function WorkflowInteractive({ onJumpToRole }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = WORKFLOW_STEPS[activeStepIndex];

  const getActorBadgeColor = (type) => {
    switch (type) {
      case 'owner': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'lmo': return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'gatc': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'system': return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const stepDetailsData = [
    {
      step: 1,
      name: "Apply (Owner / Trader)",
      inputs: ["Weighing Machine Make/Model", "Dealer Stamping License", "Live Location Coordinates", "Online Verification Fee (₹450-₹3,500)"],
      outputs: ["Application Number (APP-2026-KA-XXXX)", "DigiLocker Linked e-Challan", "Pre-verification Dossier"],
      systemAction: "Validates GSTIN & Dealer License against National Legal Metrology database in real-time.",
      roleTarget: "owner"
    },
    {
      step: 2,
      name: "Check Application (LMO Desk)",
      inputs: ["Submitted Documents", "Manufacturer Model Approval Type", "Prescribed Fee Verification"],
      outputs: ["Application Verified / Scrutiny Passed", "Dispatched to Smart Scheduling Engine"],
      systemAction: "Performs automated discrepancy check; flags any prior non-compliance history or overdue penalties.",
      roleTarget: "lmo"
    },
    {
      step: 3,
      name: "Smart Scheduling (AI Engine)",
      inputs: ["Trader Geographic Location", "LMO & GATC Geo-routes", "Expiry Urgency Score", "Inspector Availability"],
      outputs: ["Optimized Time-Slot Allocation", "Route Map Dispatch to Field Inspector Mobile Device"],
      systemAction: "Eliminates overlapping travel; clusters nearby inspections to achieve 96% route efficiency.",
      roleTarget: "lmo"
    },
    {
      step: 4,
      name: "Test & Record (GATC Field Test)",
      inputs: ["Standard Calibration Test Weights", "Eccentricity & Repeatability Tests", "Geo-tagged Timestamped Scale Photo"],
      outputs: ["Raw Calibration Telemetry Data", "Permissible Error Delta % (e.g. +0.02%)"],
      systemAction: "Supports offline mobile sync: field inspectors can record calibration even in areas with zero network.",
      roleTarget: "gatc"
    },
    {
      step: 5,
      name: "Smart Reporting (AI Engine)",
      inputs: ["Raw GATC Telemetry", "Accuracy Class Tolerance Rules (OIML R 76 / Indian Metrology Rules)"],
      outputs: ["Automated Structured Summary Report", "Compliance Flag: PASS / REPAIR_REQUIRED"],
      systemAction: "AI synthesizes multi-point error readings into an unambiguous compliance scorecard in 2 seconds.",
      roleTarget: "gatc"
    },
    {
      step: 6,
      name: "Review GATC Report",
      inputs: ["AI Draft Report", "Inspector Observations"],
      outputs: ["GATC Technical Recommendation (Note: GATC recommends, LMO gives final statutory approval)"],
      systemAction: "Ensures constitutional separation of powers between private testing laboratories and statutory Government Officers.",
      roleTarget: "gatc"
    },
    {
      step: 7,
      name: "LMO Decides & Issues Certificate",
      inputs: ["GATC Recommended Report", "Statutory Stamping Seal Key"],
      outputs: ["Official Verification Certificate (Rule 14)", "DSC Digital Signature & QR Code Stamp Generation"],
      systemAction: "Cryptographically signs certificate and pushes verifiable record to National Public Metrology Blockchain/Ledger.",
      roleTarget: "lmo"
    },
    {
      step: 8,
      name: "Certificate Download & Public QR",
      inputs: ["Approved Certificate ID", "DigiLocker Integration Webhook"],
      outputs: ["Printable Watermarked Stamping Certificate", "Digital Stamping QR Code affixed to scale"],
      systemAction: "Pushes certificate directly to Trader's DigiLocker wallet; instantly searchable by consumers via QR lookup.",
      roleTarget: "citizen"
    },
    {
      step: 9,
      name: "Expiry Tracking & 1-Click Renew",
      inputs: ["Time-to-Expiry Telemetry", "Trader Notification Preferences (WhatsApp / SMS)"],
      outputs: ["Automated Expiry Alerts at 30, 15, 3 days", "Pre-filled 1-Click Re-verification Application"],
      systemAction: "Prevents accidental trader non-compliance and heavy late penalties through automated background scheduler.",
      roleTarget: "owner"
    },
    {
      step: "Repair",
      name: "Repair & Retest Exception Loop",
      inputs: ["Tolerance Failure Alert (> Permissible Error)", "Rejection Memo"],
      outputs: ["Repair Requisition to Licensed Repairer", "Scheduled Retest Date within 14 days"],
      systemAction: "Locks instrument certificate temporarily and alerts local LMO until verified re-calibration is completed.",
      roleTarget: "gatc"
    }
  ];

  const currentDetail = stepDetailsData[activeStepIndex];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> End-to-End Legal Metrology Architecture
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
            SMARTMET 9-Step Verification & Compliance Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Click on any phase below to trace the digital lifecycle from Trader Application to AI Testing, LMO Decision, and Consumer QR Validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : WORKFLOW_STEPS.length - 1))}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
          >
            Previous Phase
          </button>
          <button 
            onClick={() => setActiveStepIndex((prev) => (prev < WORKFLOW_STEPS.length - 1 ? prev + 1 : 0))}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
          >
            Next Phase <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Step Navigator Pipeline (matching Slide 2 Highway layout) */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl overflow-x-auto">
        <div className="min-w-[760px] space-y-4">
          
          {/* Persona Lane Headers */}
          <div className="grid grid-cols-12 gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
            <div className="col-span-3 text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Owner / Trader Lane
            </div>
            <div className="col-span-4 text-purple-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> LMO Enforcement Lane
            </div>
            <div className="col-span-5 text-amber-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> GATC Test Lab & AI Lane
            </div>
          </div>

          {/* Stepper Highway Grid */}
          <div className="grid grid-cols-5 gap-3">
            {WORKFLOW_STEPS.map((s, idx) => {
              const isCurrent = idx === activeStepIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`relative p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between min-h-[110px] ${
                    isCurrent 
                      ? 'bg-blue-900/40 border-blue-500 ring-2 ring-blue-500/30 shadow-lg' 
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {s.step}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getActorBadgeColor(s.actorType)}`}>
                      {s.actor.split(' ')[0]}
                    </span>
                  </div>

                  <div className="mt-2">
                    <h4 className={`text-xs font-bold leading-tight ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                      {s.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {s.actor}
                    </p>
                  </div>

                  <div className="mt-2 pt-1 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{s.timeline}</span>
                    {isCurrent && <span className="text-blue-400 font-bold">Active</span>}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Selected Step Deep-Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Step Execution Dossier */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                  {currentStep.step}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Phase {currentStep.step}: {currentStep.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Primary Actor: <strong className="text-white">{currentStep.actor}</strong> ({currentDetail.name})
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onJumpToRole(currentDetail.roleTarget)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" /> Test in {currentDetail.roleTarget.toUpperCase()} View
            </button>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/40">
            {currentStep.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Input Data Matrix */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span> Input Requirements & Telemetry
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentDetail.inputs.map((inp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Output Artifacts */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> System Outputs & Deliverables
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentDetail.outputs.map((out, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Automated System Logic Callout */}
          <div className="p-3.5 bg-blue-950/30 border border-blue-800/40 rounded-xl text-xs text-blue-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-white block">SMARTMET Core Engine Rule:</strong>
              {currentDetail.systemAction}
            </div>
          </div>
        </div>

        {/* Right: Technical Stack Integration for this step */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-amber-400" /> Slide 2 Architecture Stack
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-700/60 flex items-center justify-between">
                <span className="text-slate-400">Frontend Layer</span>
                <span className="font-semibold text-blue-300">React.js + Tailwind / CSS</span>
              </div>
              <div className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-700/60 flex items-center justify-between">
                <span className="text-slate-400">Backend Core</span>
                <span className="font-semibold text-emerald-300">Java Spring Boot + JWT</span>
              </div>
              <div className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-700/60 flex items-center justify-between">
                <span className="text-slate-400">Scheduling Engine</span>
                <span className="font-semibold text-amber-300">Spring Scheduler + GIS APIs</span>
              </div>
              <div className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-700/60 flex items-center justify-between">
                <span className="text-slate-400">Gov Vault Sync</span>
                <span className="font-semibold text-purple-300">DigiLocker REST API</span>
              </div>
              <div className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-700/60 flex items-center justify-between">
                <span className="text-slate-400">Infrastructure</span>
                <span className="font-semibold text-cyan-300">AWS EC2, Docker, MySQL</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase mb-1">Slide 2 Core Takeaway</h5>
            <p className="text-xs text-slate-300">
              "GATCs test & review parameters; AI automatically summarizes reports; <strong className="text-white">LMO gives final statutory approval</strong>."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
