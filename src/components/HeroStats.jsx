import React from 'react';
import { 
  Scale, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  Sparkles, 
  TrendingUp, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  FileCheck2,
  Cpu
} from 'lucide-react';

export default function HeroStats({ onSelectRole, onOpenWorkflow, onOpenScanner }) {
  return (
    <div className="space-y-6">
      {/* High-Impact Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        {/* Decorative Grid BG */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>National Digital Transformation Initiative (DoCA)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-heading">
              Smart Legal Metrology <br />
              <span className="gradient-text-primary">Verification & Stamping</span> Platform
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Converting India's estimated <strong className="text-white">4 Crore (40 Million) annual manual verification events</strong> into a unified, transparent, tamper-proof digital lifecycle with instant QR validation, smart GIS scheduling, and AI-powered calibration reporting.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenScanner}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
              >
                <QrCode className="w-4 h-4" /> Instant QR Scanner Demo
              </button>

              <button
                onClick={onOpenWorkflow}
                className="px-5 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition"
              >
                <Cpu className="w-4 h-4 text-emerald-400" /> Explore 9-Step Lifecycle
              </button>
            </div>

            {/* Quick Badges from PPT */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero Office Visits</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>AI Smart Scheduling</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>DigiLocker Synced</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Tamper-Proof Audit</span>
              </div>
            </div>
          </div>

          {/* Quick Persona Selector Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
              <span>Interactive Role Simulators</span>
              <span className="text-blue-400 text-[11px] font-normal">Select to switch view</span>
            </div>

            <div 
              onClick={() => onSelectRole('citizen')}
              className="p-3.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 rounded-2xl cursor-pointer transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 group-hover:bg-blue-500/20 text-blue-400 rounded-xl transition">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition">Citizen / Consumer</h4>
                  <p className="text-[11px] text-slate-400">Scan scale QR codes, verify seals, report fraud</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
            </div>

            <div 
              onClick={() => onSelectRole('owner')}
              className="p-3.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 rounded-2xl cursor-pointer transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition">Instrument Owner (Trader)</h4>
                  <p className="text-[11px] text-slate-400">Apply, pay online, 1-click renew & get cert</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
            </div>

            <div 
              onClick={() => onSelectRole('lmo')}
              className="p-3.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/50 rounded-2xl cursor-pointer transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/10 group-hover:bg-purple-500/20 text-purple-400 rounded-xl transition">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-400 transition">LMO Enforcement Officer</h4>
                  <p className="text-[11px] text-slate-400">AI smart route scheduler & digital certificate issuance</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
            </div>

            <div 
              onClick={() => onSelectRole('gatc')}
              className="p-3.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl cursor-pointer transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-400 rounded-xl transition">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition">GATC Approved Test Lab</h4>
                  <p className="text-[11px] text-slate-400">Calibration workbench & AI Smart Report generator</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Live National Legal Metrology Impact Ticker */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Annual Target Volume</span>
            <Scale className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-heading">4.0+ Crore</div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" /> Across 28 States & 8 UTs
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Verification Turnaround</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-heading">48 Hours</div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Reduced from <span className="line-through text-rose-400">28 days</span> manual delay
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Active Instruments</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-heading">1.28 Crore</div>
          <p className="text-[11px] text-emerald-400 mt-0.5">
            100% Cryptographic QR Tagged
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Consumer Grievance SLA</span>
            <Smartphone className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-heading">98.8%</div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Flying Squad inspection dispatched &lt;24h
          </p>
        </div>
      </div>
    </div>
  );
}
