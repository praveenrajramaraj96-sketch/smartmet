import React from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Wrench, 
  QrCode, 
  Sparkles, 
  Bell, 
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';

export default function ThreeSectionHeader({ 
  activePortal, 
  setActivePortal, 
  onOpenScanner, 
  onOpenLifecycle, 
  notifications,
  onClearNotifications,
  unreadCount
}) {
  const portals = [
    {
      id: 'owner',
      title: '1. Instrument Owner (Trader)',
      subtitle: 'Apply, Renew, Pay & Download Cert',
      icon: Scale,
      activeColor: 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400',
      inactiveColor: 'text-slate-300 hover:text-white hover:bg-slate-850 bg-slate-900/80 border border-slate-800'
    },
    {
      id: 'lmo',
      title: '2. LMO (Legal Metrology Officer)',
      subtitle: 'Scrutiny, Smart Schedule & Digital DSC Seal',
      icon: ShieldCheck,
      activeColor: 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-400',
      inactiveColor: 'text-slate-300 hover:text-white hover:bg-slate-850 bg-slate-900/80 border border-slate-800'
    },
    {
      id: 'gatc',
      title: '3. GATC (Approved Test Centre)',
      subtitle: 'Calibration Rig & AI Smart Reporting',
      icon: Wrench,
      activeColor: 'bg-amber-600 text-slate-950 font-black shadow-lg shadow-amber-600/30 ring-2 ring-amber-400',
      inactiveColor: 'text-slate-300 hover:text-white hover:bg-slate-850 bg-slate-900/80 border border-slate-800'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Gov of India Ribbon */}
      <div className="bg-slate-900 px-4 sm:px-8 py-1 text-[11px] text-slate-400 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <span className="font-bold text-amber-400">सत्यमेव जयते</span>
          <span className="text-slate-600">|</span>
          <span>SIH 2026 Problem Statement: <strong className="text-white">SIH26036</strong> — Team Blind Coders</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Rule 14 Verification Grid Active
          </span>
          <span className="text-slate-400 hidden sm:inline">Legal Metrology Act, 2009</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Quick Title */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div 
            onClick={() => setActivePortal('owner')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Scale className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white font-heading tracking-tight">SMART<span className="text-blue-400">MET</span></span>
                <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] font-bold rounded">3-PILLAR GRID</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">National Legal Metrology Portal</p>
            </div>
          </div>

          {/* Quick Scanner & Flow shortcuts on mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenScanner}
              className="p-2 bg-blue-600 text-white rounded-lg text-xs flex items-center gap-1"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Core Section Selector Pills */}
        <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
          {portals.map((p) => {
            const Icon = p.icon;
            const isActive = activePortal === p.id;

            return (
              <button
                key={p.id}
                onClick={() => setActivePortal(p.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-left transition flex items-center gap-2.5 ${
                  isActive ? p.activeColor : p.inactiveColor
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-800 text-blue-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold leading-tight">{p.title}</div>
                  <div className="text-[10px] opacity-80 truncate max-w-[140px]">{p.subtitle}</div>
                </div>
                <div className="sm:hidden text-center w-full">
                  <span className="text-xs font-bold">{p.id.toUpperCase()}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Tools: QR Scanner & 9-Step Lifecycle Modal */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenScanner}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            title="Citizen QR Scanner Demo"
          >
            <QrCode className="w-4 h-4 text-emerald-400" /> Scan QR
          </button>
          <button
            onClick={onOpenLifecycle}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            title="9-Step Verification Workflow"
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> 9-Step Flow
          </button>
        </div>

      </div>
    </header>
  );
}
