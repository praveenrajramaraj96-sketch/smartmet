import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Shield, 
  Scale, 
  QrCode, 
  MapPin, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  activeSection, 
  setActiveSection, 
  searchQuery, 
  setSearchQuery,
  notifications,
  onClearNotifications
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roles = [
    { id: 'citizen', title: 'Citizen & Consumer', org: 'Public Portal', icon: QrCode, badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'owner', title: 'Instrument Owner / Trader', org: 'Sri Balaji Supermarket (GSTIN: 29AABCB1234D1Z5)', icon: Scale, badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { id: 'lmo', title: 'Legal Metrology Officer (LMO)', org: 'Bengaluru East Enforcement Ward (Zone 4)', icon: Shield, badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 'gatc', title: 'GATC Testing Lab Inspector', org: 'Apex Metrology Calibration Labs (ISO 17025)', icon: FileText, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'admin', title: 'DoCA Central Administrator', org: 'Ministry of Consumer Affairs, New Delhi', icon: Sparkles, badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' }
  ];

  const activeRoleData = roles.find(r => r.id === currentRole) || roles[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      {/* Official Government of India Top Stripe */}
      <div className="bg-slate-950 px-4 sm:px-8 py-1 text-[11px] text-slate-400 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-400">सत्यमेव जयते</span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-300 font-medium">Department of Consumer Affairs, Legal Metrology Division</span>
          <span className="sm:hidden text-slate-300">Govt. of India</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            National Verification Grid: Online
          </span>
          <span className="hidden md:inline text-slate-500">Toll Free: 1800-11-4000</span>
          <span className="text-slate-300 hover:text-white cursor-pointer">Help & FAQs</span>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveSection('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Scale className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-white font-heading tracking-tight">SMART<span className="text-blue-400">MET</span></span>
                <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold rounded">LIVE v2.4</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">National Legal Metrology Portal</p>
            </div>
          </div>
        </div>

        {/* Global Instant Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search serial no, certificate #, trader GSTIN, or scale..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white text-xs"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Right Controls: Role Switcher, Notifications, User */}
        <div className="flex items-center gap-3">
          
          {/* Real-time Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs transition"
            >
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-slate-400">Active View:</div>
                <div className="text-xs font-bold text-white leading-tight">{activeRoleData.title}</div>
              </div>
              <span className={`sm:hidden px-2 py-0.5 rounded text-[10px] font-bold border ${activeRoleData.badgeColor}`}>
                {activeRoleData.title.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  Switch Portal Role
                </div>
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = r.id === currentRole;
                  return (
                    <div
                      key={r.id}
                      onClick={() => {
                        setCurrentRole(r.id);
                        setShowRoleDropdown(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition flex items-start gap-2.5 ${
                        isSelected ? 'bg-blue-600/20 border border-blue-500/40 text-white' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="p-1.5 bg-slate-800 rounded-lg text-blue-400 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold">{r.title}</div>
                        <div className="text-[10px] text-slate-400 truncate">{r.org}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white">Live System Alerts</span>
                  <button 
                    onClick={onClearNotifications}
                    className="text-[10px] text-blue-400 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2 text-xs">
                  {notifications.length === 0 ? (
                    <p className="text-slate-500 text-center py-4 text-xs">No new notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">{n.title}</span>
                          <span className="text-[9px] text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-slate-400 text-[10px]">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
