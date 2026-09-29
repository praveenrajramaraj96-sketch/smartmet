import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Leaf, 
  DollarSign, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  Activity,
  Layers,
  Sparkles,
  Lock
} from 'lucide-react';

export default function AdminAnalytics() {
  const [activeSection, setActiveSection] = useState('impact'); // 'impact' | 'feasibility' | 'audittrail'

  const auditEvents = [
    {
      id: "LOG-9921",
      timestamp: "2026-09-29 11:42:04",
      actor: "Shri. R. Suresh (LMO-KA-04)",
      action: "DIGITAL_SIGNATURE_APPLIED",
      target: "CERT/KA/LMO-04/2026/88921",
      hash: "0x8fa9...41c2",
      status: "IMMUTABLE_VERIFIED"
    },
    {
      id: "LOG-9920",
      timestamp: "2026-09-29 10:15:30",
      actor: "Apex Metrology Labs (GATC-KA-09)",
      action: "AI_SMART_REPORT_SUBMITTED",
      target: "APP-2026-KA-10928",
      hash: "0x33b1...908e",
      status: "IMMUTABLE_VERIFIED"
    },
    {
      id: "LOG-9919",
      timestamp: "2026-09-29 09:30:12",
      actor: "Citizen: Ananya Sharma",
      action: "GRIEVANCE_LODGED_SHORTWEIGHT",
      target: "GRV-2026-089 (Maa Durga Store)",
      hash: "0x77d0...114f",
      status: "DISPATCHED_TO_FLYING_SQUAD"
    },
    {
      id: "LOG-9918",
      timestamp: "2026-09-29 08:00:00",
      actor: "SMARTMET AI Scheduler Engine",
      action: "GIS_ROUTE_OPTIMIZED_DISPATCH",
      target: "Zone-4 Inspection Ward",
      hash: "0x110e...88aa",
      status: "SCHEDULE_SYNCED"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Admin Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> Department of Consumer Affairs (DoCA) National Command
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Strategic Impact, Feasibility & Audit Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time pan-India Legal Metrology enforcement analytics & governance benchmarks
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveSection('impact')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeSection === 'impact' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Slide 4 Impact & Benefits
          </button>
          <button
            onClick={() => setActiveSection('feasibility')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeSection === 'feasibility' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Slide 3 Feasibility & Strategy
          </button>
          <button
            onClick={() => setActiveSection('audittrail')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeSection === 'audittrail' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tamper-Proof Audit Trail
          </button>
        </div>
      </div>

      {/* SECTION 1: Slide 4 Potential Impact & Multidimensional Benefits */}
      {activeSection === 'impact' && (
        <div className="space-y-6">
          
          {/* Stakeholder Impact Matrix (from Slide 4) */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" /> Stakeholder Impact Matrix (Slide 4)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Instrument Owners (Traders)
                </div>
                <p className="text-slate-300">
                  Zero repeated office visits. Instant digital applications, online fee payment, automated expiry notifications, and 1-click renewals.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span> Legal Metrology Officers (LMOs)
                </div>
                <p className="text-slate-300">
                  Real-time jurisdiction-wide enforcement visibility. AI-optimized daily GIS inspection routes and tamper-proof DSC digital certificate issuance.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> GATC Testing Centers
                </div>
                <p className="text-slate-300">
                  Standardized calibration recording with AI Smart Report generation, eliminating manual paperwork and error recalculations.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Citizens & Consumers
                </div>
                <p className="text-slate-300">
                  Instant certificate verification by scanning QR code on any scale. Direct tampering & short-weight grievance lodging for swift enforcement.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span> Govt (DoCA Ministry)
                </div>
                <p className="text-slate-300">
                  Centralized national compliance database across 28 states & 8 UTs with transparent revenue tracking and compliance heatmaps.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span> Statutory Auditors
                </div>
                <p className="text-slate-300">
                  OCR-backed verification and tamper-proof cryptographic audit trail for every verification event and fee receipt.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid (Economic, Environmental, Operational, Social) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <DollarSign className="w-4 h-4" /> Economic Value
              </div>
              <p className="text-slate-300">
                Drastically lower compliance cost for small traders and eliminated revenue leakages through unified Bharat e-Pay fee collection.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Leaf className="w-4 h-4" /> Environmental Impact
              </div>
              <p className="text-slate-300">
                100% paperless digital certificates saving over 40 million paper sheets and plastic physical stamping tags annually.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <Activity className="w-4 h-4" /> Operational Agility
              </div>
              <p className="text-slate-300">
                Automated error calculations, zero human data-entry typos, and turnaround times compressed from 28 days to 48 hours.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <Users className="w-4 h-4" /> Social Trust & Access
              </div>
              <p className="text-slate-300">
                QR-based consumer trust in rural & urban markets alike, protecting fair trade for honest merchants and consumers.
              </p>
            </div>
          </div>

          {/* Overall Impact Banner from Slide 4 Bottom */}
          <div className="p-4 bg-gradient-to-r from-blue-900/60 via-emerald-900/40 to-slate-900 border border-slate-700 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-bold text-white text-sm">SMARTMET OVERALL NATIONAL IMPACT:</span>
            <div className="flex flex-wrap items-center gap-3 font-semibold">
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Faster Turnaround
              </span>
              <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Transparent
              </span>
              <span className="px-2.5 py-1 bg-teal-500/20 text-teal-300 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fully Paperless
              </span>
              <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Tamper-Proof Cryptographic
              </span>
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Data-Driven Governance
              </span>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: Slide 3 Feasibility, Challenges & Strategies */}
      {activeSection === 'feasibility' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Engineering Feasibility & Challenge Mitigation (Slide 3)
            </h3>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Viable Implementation
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/40 space-y-1">
                <span className="text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Challenge 1: Legacy Metrology Integration
                </span>
                <p className="text-slate-300">
                  Fragmented state-level standalone databases and outdated on-premise systems.
                </p>
                <div className="pt-2 text-emerald-400 font-semibold border-t border-slate-800">
                  &rarr; Strategy: Modular REST/GraphQL APIs with state-level adapters and microservices.
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/40 space-y-1">
                <span className="text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Challenge 2: Historical Manual Data Migration
                </span>
                <p className="text-slate-300">
                  Decades of physical paper ledger records with inconsistent naming conventions.
                </p>
                <div className="pt-2 text-emerald-400 font-semibold border-t border-slate-800">
                  &rarr; Strategy: AI/OCR document ingestion pipeline with automated data-cleansing validation.
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/40 space-y-1">
                <span className="text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Challenge 3: Officer Availability & Route Conflicts
                </span>
                <p className="text-slate-300">
                  High inspector travel times and overlapping field inspection routes.
                </p>
                <div className="pt-2 text-emerald-400 font-semibold border-t border-slate-800">
                  &rarr; Strategy: Priority-based GIS clustering algorithm considering expiry and geographic proximity.
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/40 space-y-1">
                <span className="text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Challenge 4: Poor Field Internet Connectivity
                </span>
                <p className="text-slate-300">
                  Rural APMC mandis and remote petrol outlets with zero 4G/5G signals.
                </p>
                <div className="pt-2 text-emerald-400 font-semibold border-t border-slate-800">
                  &rarr; Strategy: Offline-first Mobile PWA with encrypted local SQLite and auto-sync on connectivity.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Tamper-Proof Audit Trail Ledger */}
      {activeSection === 'audittrail' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" /> Tamper-Proof Cryptographic Verification Ledger
            </h3>
            <span className="text-xs font-mono text-slate-400">SHA-256 Audit Trail Synced</span>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {auditEvents.map((evt) => (
              <div key={evt.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-400 font-bold">{evt.id}</span>
                    <span className="font-semibold text-white">{evt.action}</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-mono">
                      {evt.status}
                    </span>
                  </div>
                  <p className="text-slate-400">{evt.actor} &rarr; Target: <strong className="text-slate-300">{evt.target}</strong></p>
                </div>

                <div className="text-right sm:text-right font-mono text-[11px] text-slate-400">
                  <div>{evt.timestamp}</div>
                  <div className="text-slate-500 text-[10px]">Hash: {evt.hash}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
