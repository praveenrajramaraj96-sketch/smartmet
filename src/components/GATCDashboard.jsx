import React, { useState } from 'react';
import { 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Camera, 
  Scale, 
  Activity, 
  Layers, 
  FileCheck2,
  RefreshCcw,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GATCDashboard() {
  // Calibration Workbench State
  const [instrumentId, setInstrumentId] = useState('INST-KA-2026-9041 (Essae DS-252)');
  const [testWeight1, setTestWeight1] = useState(5.000); // 5kg
  const [observed1, setObserved1] = useState(5.001); // 5.001kg
  
  const [testWeight2, setTestWeight2] = useState(15.000); // 15kg
  const [observed2, setObserved2] = useState(15.003); // 15.003kg

  const [testWeight3, setTestWeight3] = useState(30.000); // 30kg max
  const [observed3, setObserved3] = useState(30.008); // 30.008kg

  const [eccentricityPass, setEccentricityPass] = useState(true);
  const [repeatabilityPass, setRepeatabilityPass] = useState(true);

  // AI Smart Report State
  const [aiReportGenerated, setAiReportGenerated] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [inspectorRemarks, setInspectorRemarks] = useState('All load cells functioning with high linearity. Seals intact.');

  // Calculation
  const error1 = (((observed1 - testWeight1) / testWeight1) * 100).toFixed(3);
  const error2 = (((observed2 - testWeight2) / testWeight2) * 100).toFixed(3);
  const error3 = (((observed3 - testWeight3) / testWeight3) * 100).toFixed(3);

  const maxError = Math.max(Math.abs(parseFloat(error1)), Math.abs(parseFloat(error2)), Math.abs(parseFloat(error3)));
  const isWithinTolerance = maxError <= 0.05; // 0.05% Class III standard limit

  const handleGenerateAiReport = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setAiReportGenerated(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 900);
  };

  const handleSubmitToLMO = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    alert("GATC Test Report & AI Summary dispatched to LMO Statutory Queue!\n\nStatus: Awaiting LMO Digital Stamping Decision.");
  };

  return (
    <div className="space-y-6">
      
      {/* GATC Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-semibold mb-2">
            <Wrench className="w-3.5 h-3.5" /> GATC Authorized Testing Laboratory
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Field Calibration & AI Smart Reporting Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Center: <strong className="text-white">Apex Metrology Calibration Labs (GATC-KA-09, ISO/IEC 17025 Certified)</strong>
          </p>
        </div>

        <div className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-mono border border-slate-700">
          Field Kit: OIML Class F1 Weights
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Calibration Workbench */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Physical Calibration Test Runs</h3>
                <p className="text-xs text-slate-400">Testing against National Reference Standards</p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              isWithinTolerance ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              Max Error: {maxError}% {isWithinTolerance ? '(PASS)' : '(FAIL)'}
            </span>
          </div>

          {/* Instrument Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Instrument Under Inspection</label>
            <input 
              type="text"
              value={instrumentId}
              onChange={(e) => setInstrumentId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-medium"
            />
          </div>

          {/* 3-Point Load Test Calibration Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400">3-Stage Step Load Calibration Matrix:</h4>
            
            <div className="space-y-2 text-xs">
              {/* Point 1 */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 items-center">
                <div>
                  <span className="text-slate-400 block text-[11px]">Standard Weight (1/6 Max):</span>
                  <span className="font-bold text-white">{testWeight1} kg</span>
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px]">Observed Scale Reading:</label>
                  <input
                    type="number"
                    step="0.001"
                    value={observed1}
                    onChange={(e) => setObserved1(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono"
                  />
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Calculated Error:</span>
                  <span className={`font-bold font-mono ${parseFloat(error1) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {parseFloat(error1) >= 0 ? `+${error1}` : error1}%
                  </span>
                </div>
              </div>

              {/* Point 2 */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 items-center">
                <div>
                  <span className="text-slate-400 block text-[11px]">Standard Weight (1/2 Max):</span>
                  <span className="font-bold text-white">{testWeight2} kg</span>
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px]">Observed Scale Reading:</label>
                  <input
                    type="number"
                    step="0.001"
                    value={observed2}
                    onChange={(e) => setObserved2(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono"
                  />
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Calculated Error:</span>
                  <span className={`font-bold font-mono ${parseFloat(error2) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {parseFloat(error2) >= 0 ? `+${error2}` : error2}%
                  </span>
                </div>
              </div>

              {/* Point 3 */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 items-center">
                <div>
                  <span className="text-slate-400 block text-[11px]">Standard Weight (Max Cap):</span>
                  <span className="font-bold text-white">{testWeight3} kg</span>
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px]">Observed Scale Reading:</label>
                  <input
                    type="number"
                    step="0.001"
                    value={observed3}
                    onChange={(e) => setObserved3(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono"
                  />
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Calculated Error:</span>
                  <span className={`font-bold font-mono ${parseFloat(error3) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {parseFloat(error3) >= 0 ? `+${error3}` : error3}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Qualitative Checks */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div 
              onClick={() => setEccentricityPass(!eccentricityPass)}
              className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                eccentricityPass ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
              }`}
            >
              <span>4-Corner Eccentricity Test</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>

            <div 
              onClick={() => setRepeatabilityPass(!repeatabilityPass)}
              className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                repeatabilityPass ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
              }`}
            >
              <span>3x Repeatability Deviation</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Trigger AI Smart Reporting */}
          <div className="pt-2">
            <button
              onClick={handleGenerateAiReport}
              disabled={isGeneratingAi}
              className="w-full py-2.5 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              {isGeneratingAi ? (
                <>Synthesizing Metrology Telemetry with AI...</>
              ) : (
                <><Sparkles className="w-4 h-4 text-slate-950" /> Generate AI Smart Report (Slide 1 & Slide 2 UVP)</>
              )}
            </button>
          </div>
        </div>

        {/* Right: AI Smart Report Output & Recommendation to LMO */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">AI Smart Report Output</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">
                GATC Review Draft
              </span>
            </div>

            {aiReportGenerated ? (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Generated Report ID:</span>
                    <span className="font-mono text-cyan-400">GATC-RPT-2026-9041</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Evaluated Accuracy Standard:</span>
                    <span className="text-white font-semibold">OIML R 76 / Class III</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Peak Tolerance Deviation:</span>
                    <span className="text-emerald-400 font-bold font-mono">+{maxError}% (Pass)</span>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-1">
                  <h5 className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> AI Recommendation to LMO:
                  </h5>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Instrument demonstrates linear repeatability and complies with Maximum Permissible Error (MPE) thresholds under Rule 14. <strong>Recommended for official digital stamping and certificate issuance.</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Inspector Additional Notes:</label>
                  <textarea
                    rows={2}
                    value={inspectorRemarks}
                    onChange={(e) => setInspectorRemarks(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="p-8 text-center space-y-3 bg-slate-950/60 rounded-xl border border-dashed border-slate-800">
                <FileCheck2 className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  Run test numbers on the workbench and click <strong>"Generate AI Smart Report"</strong> to preview the auto-summarized compliance dossier.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={handleSubmitToLMO}
              disabled={!aiReportGenerated}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                aiReportGenerated
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" /> Submit Report to LMO Approval Queue
            </button>
            <p className="text-[10px] text-slate-500 text-center">
              (GATC recommends findings; LMO issues statutory approval per Slide 2 Rule)
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
