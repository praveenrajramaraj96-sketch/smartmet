import React from 'react';
import { 
  Shield, 
  QrCode, 
  Calendar, 
  FileText, 
  Sparkles, 
  Users, 
  AlertCircle, 
  BarChart3, 
  CheckCircle2, 
  Bell,
  Smartphone,
  Layers,
  Scale
} from 'lucide-react';

export default function Navbar({ currentRole, setCurrentRole, activeTab, setActiveTab, unreadAlertsCount }) {
  const roles = [
    { id: 'citizen', label: 'Citizen / Consumer', icon: QrCode, badge: 'Public App' },
    { id: 'owner', label: 'Instrument Owner (Trader)', icon: Scale, badge: 'Trader Hub' },
    { id: 'lmo', label: 'LMO (Legal Metrology Officer)', icon: Shield, badge: 'Enforcement' },
    { id: 'gatc', label: 'GATC Test Lab', icon: FileText, badge: 'Calibrator' },
    { id: 'admin', label: 'Govt (DoCA) & Auditor', icon: BarChart3, badge: 'National BI' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Gov Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-blue-900 to-emerald-700 py-1 px-4 text-xs font-medium text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Govt of India</span>
          <span className="hidden sm:inline">Ministry of Consumer Affairs, Food & Public Distribution | Department of Legal Metrology</span>
          <span className="sm:hidden">SMARTMET Portal (DoCA)</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            National Registry Online
          </span>
          <span className="text-white/60">|</span>
          <span className="cursor-pointer hover:underline">English</span>
          <span className="text-white/60">/</span>
          <span className="cursor-pointer hover:underline">हिंदी</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center justify-between">
            <div 
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-white font-heading">
                    SMART<span className="text-blue-400">MET</span>
                  </span>
                  <span className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded text-[10px] font-bold">
                    PROTOTYPE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Unified National Legal Metrology & Verification Network
                </p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button 
                onClick={() => setActiveTab('workflow')}
                className={`p-2 rounded-lg text-xs font-semibold ${activeTab === 'workflow' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
              >
                9-Step Flow
              </button>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Platform Home
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'workflow' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 9-Step Lifecycle
            </button>
            <button
              onClick={() => setActiveTab('roleview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'roleview' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" /> Role Dashboard
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'analytics' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> Impact & Feasibility
            </button>
          </div>

          {/* Role Switcher Pill */}
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 p-1.5 rounded-xl">
            <span className="text-[11px] text-slate-400 font-semibold pl-2 hidden sm:inline">Active Persona:</span>
            <select
              value={currentRole}
              onChange={(e) => {
                setCurrentRole(e.target.value);
                setActiveTab('roleview');
              }}
              className="bg-slate-900 border border-slate-600 text-white text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <div className="relative">
              <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
                <Bell className="w-4 h-4" />
              </div>
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
