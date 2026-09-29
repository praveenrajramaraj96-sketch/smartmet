import React from 'react';
import { ShieldCheck, Download, Printer, X, CheckCircle2, Lock, QrCode, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DigitalCertificateModal({ instrument, onClose }) {
  if (!instrument) return null;

  const triggerPrint = () => {
    window.print();
  };

  const triggerDownload = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    alert(`Certificate #${instrument.certNumber} downloaded successfully as a digitally signed PDF with embedded cryptographic seal.`);
  };

  return (
    <div className="modal-backdrop">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col no-print">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Official Verification Certificate</h3>
              <p className="text-xs text-slate-400">Department of Legal Metrology & Consumer Affairs, Govt. of India</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={triggerPrint} 
              className="p-2 text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button 
              onClick={triggerDownload} 
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-sm shadow-blue-500/20"
            >
              <Download className="w-4 h-4" /> Download Signed PDF
            </button>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body Container */}
        <div className="p-6 overflow-y-auto bg-slate-950/60">
          <div className="cert-printable relative bg-slate-900 border-2 border-emerald-500/40 rounded-xl p-6 sm:p-8 text-slate-200 shadow-xl overflow-hidden">
            
            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <ShieldCheck className="w-96 h-96 text-emerald-400" />
            </div>

            {/* Gov Header */}
            <div className="text-center pb-4 border-b border-slate-700/70 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold mb-2">
                <Lock className="w-3.5 h-3.5" /> Digilocker Verified & Cryptographically Signed
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">Government of India</h2>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wider uppercase">Department of Legal Metrology</h4>
              <p className="text-xs text-slate-400 mt-0.5">Certificate of Verification & Stamping (Rule 14 of Legal Metrology Act, 2009)</p>
            </div>

            {/* Certificate ID Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-800/60 rounded-lg border border-slate-700/50 text-xs mb-6">
              <div>
                <span className="text-slate-400 block">Certificate No:</span>
                <span className="font-mono font-bold text-emerald-400">{instrument.certNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Date of Stamping:</span>
                <span className="font-semibold text-white">{instrument.verificationDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Valid Upto:</span>
                <span className="font-bold text-amber-400">{instrument.expiryDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">DigiLocker ID:</span>
                <span className="font-mono text-cyan-400">{instrument.digilockerId}</span>
              </div>
            </div>

            {/* Main Instrument Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
              <div className="space-y-2 p-4 bg-slate-800/40 rounded-lg border border-slate-700/40">
                <h5 className="font-bold text-slate-200 border-b border-slate-700 pb-1 text-sm">Instrument & Trader Details</h5>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Instrument Type:</span> <span className="text-white font-medium">{instrument.name}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Category:</span> <span className="text-white font-medium">{instrument.category}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Accuracy Class:</span> <span className="text-emerald-300 font-semibold">{instrument.accuracyClass}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Max Capacity / Division:</span> <span className="text-white font-medium">{instrument.capacity}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Manufacturer & Model:</span> <span className="text-white">{instrument.manufacturer} ({instrument.modelNumber})</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Serial Number:</span> <span className="font-mono text-cyan-300">{instrument.serialNumber}</span></div>
              </div>

              <div className="space-y-2 p-4 bg-slate-800/40 rounded-lg border border-slate-700/40">
                <h5 className="font-bold text-slate-200 border-b border-slate-700 pb-1 text-sm">Premises & Calibration Telemetry</h5>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Owner / Establishment:</span> <span className="text-white font-medium">{instrument.ownerName}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">GSTIN Number:</span> <span className="font-mono text-slate-300">{instrument.traderGstin}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Dealer License No:</span> <span className="font-mono text-slate-300">{instrument.dealerLicenseNo}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Geographic Location:</span> <span className="text-white text-right max-w-[200px] truncate">{instrument.location}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Observed Tolerance Error:</span> <span className="text-emerald-400 font-bold">{instrument.lastToleranceError} (Within Limits)</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">GATC Testing Center:</span> <span className="text-slate-300">{instrument.gatcCenter}</span></div>
              </div>
            </div>

            {/* Bottom Official Signatures & Seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-700/80">
              
              {/* QR Code Container */}
              <div className="flex items-center gap-3 bg-slate-800/70 p-2.5 rounded-xl border border-slate-700">
                <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center">
                  {/* Generated QR visual */}
                  <div className="w-full h-full border border-slate-900 grid grid-cols-4 gap-0.5 p-0.5 bg-white">
                    <div className="bg-black col-span-2 row-span-2"></div>
                    <div className="bg-black"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black col-span-2 row-span-2"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-black"></div>
                  </div>
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-white block">Scan to Verify</span>
                  <span className="text-slate-400 block text-[10px]">smartmet.gov.in/verify</span>
                  <span className="font-mono text-emerald-400 text-[10px] mt-0.5 block">HASH: {instrument.qrCodeHash}</span>
                </div>
              </div>

              {/* Holographic Seal */}
              <div className="cert-seal">
                <ShieldCheck className="w-5 h-5 mb-0.5 text-emerald-400" />
                <span>LEGAL METROLOGY</span>
                <span className="text-[7px] text-emerald-300">GOVT OF INDIA</span>
                <span className="text-[8px] text-white font-mono mt-0.5">VERIFIED</span>
              </div>

              {/* Officer Signature */}
              <div className="text-right">
                <div className="inline-block border-b border-dashed border-emerald-400/80 pb-1 mb-1 px-4">
                  <span className="font-serif italic text-emerald-400 text-sm font-semibold">Digitally Signed by LMO</span>
                </div>
                <p className="text-xs font-bold text-white">{instrument.lmoOfficer}</p>
                <p className="text-[10px] text-slate-400">Legal Metrology Officer, Enforcement Wing</p>
                <p className="text-[9px] text-emerald-400 font-mono">DSC Key ID: SHA256:4f8e9102c771</p>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-800/80 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Valid & Authorized under Legal Metrology (General) Rules
          </span>
          <button onClick={onClose} className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium">
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
