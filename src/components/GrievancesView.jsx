import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  User, 
  Camera, 
  Phone,
  Zap,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GrievancesView({ grievances, onAddGrievance, currentRole }) {
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('Indiranagar Market, Bengaluru');
  const [allegation, setAllegation] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeName || !allegation) return;

    const newGrv = {
      id: `GRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      citizenName: citizenName || 'Verified Citizen',
      citizenPhone: '+91 98450 XXXXX',
      storeName,
      location,
      allegation,
      instrumentId: 'INST-VERIFY-REQ',
      date: new Date().toISOString().split('T')[0],
      status: 'Assigned to LMO Flying Squad for Surprise Inspection',
      priority: 'High'
    };

    onAddGrievance(newGrv);
    setSubmitted(true);
    setStoreName('');
    setAllegation('');
    setCitizenName('');
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-300 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Enforcement & Consumer Protection Desk
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Tampering, Fraud & Short-Weight Grievances
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time public lodging of unsealed scales, broken holograms, and short-weight fraud with 24-hour enforcement SLA.
          </p>
        </div>
      </div>

      {/* Grid: Lodge Grievance Form & Live Enforcement Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Lodge Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Lodge Short-Weight Grievance</h3>
              <p className="text-xs text-slate-400">Dispatches Flying Squad for Surprise Audit</p>
            </div>
          </div>

          {submitted ? (
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-5 h-5" /> Grievance Registered Successfully!
              </div>
              <p className="text-slate-300">
                A raid ticket has been issued to the local Legal Metrology Inspector. You will receive SMS updates upon case closure.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold"
              >
                Lodge Another Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Establishment / Trader Name *</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. City Sweets & Dry Fruits"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location / Market *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Allegation / Tampering Incident *</label>
                <textarea
                  rows={3}
                  required
                  value={allegation}
                  onChange={(e) => setAllegation(e.target.value)}
                  placeholder="e.g. Scale displayed 1000g for 850g product, missing stamping seal, modified calibration plate."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Complainant Name (Optional)</label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="Enter name or leave blank for anonymous"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/20 transition"
              >
                <Send className="w-4 h-4" /> Transmit Grievance to Flying Squad
              </button>
            </form>
          )}
        </div>

        {/* Right: Active Grievances Ledger */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Active Enforcement Radar
            </h3>
            <span className="text-xs font-mono text-slate-400">{grievances.length} Reports Under Investigation</span>
          </div>

          <div className="space-y-3">
            {grievances.map((grv) => (
              <div key={grv.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-rose-400 font-bold">{grv.id}</span>
                    <span className="font-bold text-white text-sm">{grv.storeName}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-[10px] font-bold">
                    {grv.priority} Priority
                  </span>
                </div>

                <p className="text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  {grv.allegation}
                </p>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{grv.location}</span>
                  </div>
                  <div className="text-emerald-400 font-semibold">
                    Status: {grv.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
