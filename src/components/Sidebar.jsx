import React from 'react';
import { 
  LayoutDashboard, 
  QrCode, 
  Scale, 
  FileCheck2, 
  MapPin, 
  Wrench, 
  ShieldAlert, 
  BookOpen, 
  Download, 
  Sparkles,
  Layers,
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function Sidebar({ activeSection, setActiveSection, currentRole, instrumentsCount, pendingAppsCount, grievancesCount }) {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, badge: null, roles: ['citizen', 'owner', 'lmo', 'gatc', 'admin'] },
    { id: 'qr_scanner', label: 'Scan & Verify QR', icon: QrCode, badge: 'Instant', roles: ['citizen', 'owner', 'lmo', 'gatc', 'admin'] },
    { id: 'registry', label: 'Instrument Registry', icon: Scale, badge: `${instrumentsCount}`, roles: ['owner', 'lmo', 'gatc', 'admin'] },
    { id: 'applications', label: 'Verification Requests', icon: FileCheck2, badge: pendingAppsCount > 0 ? `${pendingAppsCount}` : null, badgeColor: 'bg-blue-500/20 text-blue-300', roles: ['owner', 'lmo', 'admin'] },
    { id: 'scheduler', label: 'GIS Smart Scheduler', icon: MapPin, badge: 'AI Route', badgeColor: 'bg-purple-500/20 text-purple-300', roles: ['lmo', 'admin'] },
    { id: 'gatc_lab', label: 'GATC Calibration Lab', icon: Wrench, badge: 'AI Report', badgeColor: 'bg-amber-500/20 text-amber-300', roles: ['gatc', 'lmo', 'admin'] },
    { id: 'offices', label: 'Locate LMO / GATC', icon: MapPin, badge: 'Finder', badgeColor: 'bg-emerald-500/20 text-emerald-300', roles: ['citizen', 'owner', 'lmo', 'gatc', 'admin'] },
    { id: 'grievances', label: 'Tampering Grievances', icon: ShieldAlert, badge: grievancesCount > 0 ? `${grievancesCount}` : null, badgeColor: 'bg-rose-500/20 text-rose-300', roles: ['citizen', 'lmo', 'admin'] },
    { id: 'rules', label: 'Standards & Tariff Rules', icon: BookOpen, badge: 'OIML R76', roles: ['citizen', 'owner', 'lmo', 'gatc', 'admin'] },
    { id: 'certificates', label: 'DigiLocker Vault', icon: Download, badge: 'Verified', badgeColor: 'bg-emerald-500/20 text-emerald-300', roles: ['owner', 'lmo', 'admin'] },
    { id: 'sih_pitch', label: 'SIH 2026 Pitch Dossier', icon: Sparkles, badge: 'SIH26036', badgeColor: 'bg-amber-500/20 text-amber-300', roles: ['citizen', 'owner', 'lmo', 'gatc', 'admin'] },
    { id: 'lifecycle', label: '9-Step Interactive Flow', icon: Cpu, badge: 'PPT Mode', badgeColor: 'bg-indigo-500/20 text-indigo-300', roles: ['citizen', 'owner', 'lmo', 'gatc', 'admin'] }
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between p-4 hidden md:flex min-h-[calc(100vh-80px)]">
      <div className="space-y-6">
        
        {/* Navigation Group */}
        <div className="space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Portal Navigation
          </div>
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Real-world System Status Widget */}
        <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
            <span>National Grid Sync</span>
            <span className="text-emerald-400 font-mono">100% OK</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full w-full rounded-full"></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Latency: 24ms</span>
            <span>Uptime: 99.98%</span>
          </div>
        </div>

      </div>

      {/* Footer Role Details */}
      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> DigiLocker Connected
        </div>
        <p className="text-[10px] text-slate-500">Legal Metrology (General) Rules, 2011</p>
      </div>
    </aside>
  );
}
