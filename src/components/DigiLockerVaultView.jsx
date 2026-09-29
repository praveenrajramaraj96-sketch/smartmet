import React from 'react';
import { 
  Download, 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  Printer, 
  FileText, 
  QrCode, 
  CheckCircle2,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DigiLockerVaultView({ instruments, onOpenCertificate }) {
  const handleDownloadAll = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    alert("Batch export initiated: All 5 Stamping Certificates bundled into a signed ZIP container with cryptographic signatures.");
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5" /> DigiLocker National Identity Repository
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            DigiLocker Stamping Certificate Vault
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Immutable digital certificates issued under Rule 14 of the Legal Metrology Act, 2009.
          </p>
        </div>

        <button
          onClick={handleDownloadAll}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20 transition self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Export All Certificates (ZIP)
        </button>
      </div>

      {/* Grid of Verified Certificate Dossiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {instruments.map((inst) => {
          const isActive = inst.status === 'Active';
          const isExpiring = inst.status === 'Expiring Soon';

          return (
            <div 
              key={inst.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl space-y-4 shadow-xl transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-blue-400 font-bold">{inst.certNumber}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : isExpiring 
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {inst.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm">{inst.name}</h4>
                  <p className="text-xs text-slate-300 truncate">{inst.ownerName}</p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Accuracy Class:</span>
                    <span className="font-semibold text-white">{inst.accuracyClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Stamping Date:</span>
                    <span className="text-slate-200">{inst.verificationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Valid Until:</span>
                    <span className="font-bold text-amber-300">{inst.expiryDate}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800/80 pt-1">
                    <span className="text-slate-400 text-[11px]">DigiLocker ID:</span>
                    <span className="font-mono text-cyan-400 text-[11px]">{inst.digilockerId}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex gap-2">
                <button
                  onClick={() => onOpenCertificate(inst)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <FileText className="w-3.5 h-3.5" /> View Certificate
                </button>
                <button
                  onClick={() => alert(`Direct DigiLocker URI: https://services.digilocker.gov.in/public/verify/${inst.digilockerId}`)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                  title="Open DigiLocker Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
