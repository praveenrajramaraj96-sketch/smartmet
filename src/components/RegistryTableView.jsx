import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegistryTableView({ instruments, onOpenCertificate, searchQuery, setSearchQuery }) {
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = instruments.filter(inst => {
    const matchesSearch = searchQuery === '' || 
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || inst.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Instrument ID,Name,Owner,Accuracy Class,Capacity,Verification Date,Expiry Date,Status\n" +
      instruments.map(i => `"${i.id}","${i.name}","${i.ownerName}","${i.accuracyClass}","${i.capacity}","${i.verificationDate}","${i.expiryDate}","${i.status}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SMARTMET_Registry_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5" /> Central Legal Metrology Database
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            National Instruments & Stamping Registry
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time searchable database of all verified, active, and expired weighing & measuring instruments.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center gap-2 transition self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" /> Export Registry (CSV)
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold">Filter Status:</span>
          {['ALL', 'Active', 'Expiring Soon', 'Under GATC Inspection', 'Tampered / Flagged'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                statusFilter === st
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="text-slate-400">
          Showing <strong className="text-white">{filtered.length}</strong> of {instruments.length} Instruments
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Instrument ID & Serial</th>
                <th className="py-3 px-4">Instrument Make & Type</th>
                <th className="py-3 px-4">Establishment / Trader</th>
                <th className="py-3 px-4">Accuracy Class</th>
                <th className="py-3 px-4">Stamping Expiry</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filtered.map((inst) => {
                const isActive = inst.status === 'Active';
                const isExpiring = inst.status === 'Expiring Soon';

                return (
                  <tr key={inst.id} className="hover:bg-slate-850/60 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-blue-400">{inst.id}</div>
                      <div className="font-mono text-[10px] text-slate-500">{inst.serialNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{inst.name}</div>
                      <div className="text-[11px] text-slate-400">{inst.manufacturer} ({inst.capacity})</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-200">{inst.ownerName}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[180px]">{inst.location}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-950 text-slate-300 rounded font-mono text-[10px] border border-slate-800">
                        {inst.accuracyClass}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">{inst.expiryDate}</div>
                      <div className="text-[10px] text-slate-500">{inst.daysToExpiry > 0 ? `${inst.daysToExpiry} days left` : 'Expired'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : isExpiring
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {inst.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onOpenCertificate(inst)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold rounded-lg transition inline-flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" /> Certificate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
