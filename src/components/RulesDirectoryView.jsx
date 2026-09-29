import React, { useState } from 'react';
import { 
  BookOpen, 
  Scale, 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Search,
  ArrowRight
} from 'lucide-react';

export default function RulesDirectoryView() {
  const [selectedClass, setSelectedClass] = useState('III');
  const [calcInstrument, setCalcInstrument] = useState('counter');
  const [calcCapacity, setCalcCapacity] = useState('30');

  const accuracyClasses = [
    {
      id: 'I',
      name: 'Class I (Special Precision Accuracy)',
      eValue: 'e ≤ 1 mg',
      minDiv: '50,000 divisions',
      application: 'Precious Gold & Diamond Carat Scales, Pharmaceutical Micro-balances, Chemical Analytical Labs',
      mpe: '± 0.5e for 0 to 50,000e (Ultra-Strict ±0.001g)',
      stampingInterval: '12 Months (Mandatory Annual Stamping)'
    },
    {
      id: 'II',
      name: 'Class II (High Accuracy Precision)',
      eValue: '1 mg ≤ e ≤ 50 mg',
      minDiv: '100 to 100,000 divisions',
      application: 'Silver & Bullion Merchants, Silk Yarn Scales, Dairy Fat & SNF Milk Testing Instruments',
      mpe: '± 0.5e to ± 1.0e (±0.01g)',
      stampingInterval: '12 Months'
    },
    {
      id: 'III',
      name: 'Class III (Medium Accuracy - Commercial Trade)',
      eValue: '0.1 g ≤ e ≤ 2 g (or higher)',
      minDiv: '500 to 10,000 divisions',
      application: 'Grocery Counter Scales, Supermarkets, Fruit & Vegetable Mandis, LPG Cylinder Scales, Fuel Dispensers',
      mpe: '± 0.5e (0 to 500e), ± 1.0e (500 to 2000e), ± 1.5e (>2000e) (approx ±0.05% to ±0.1%)',
      stampingInterval: '12 Months or 24 Months (per State Notification)'
    },
    {
      id: 'IV',
      name: 'Class IIII / IV (Ordinary Accuracy - Heavy Bulk)',
      eValue: 'e ≥ 5 g',
      minDiv: '100 to 1,000 divisions',
      application: 'Heavy Vehicle Weighbridges (50T/100T), Crane Scales, Coal/Ore Freight Hoppers, Agricultural APMC Yards',
      mpe: '± 0.5e (0 to 50e), ± 1.0e (50 to 200e), ± 1.5e (>200e)',
      stampingInterval: '12 Months (Heavy Mechanical Load Testing)'
    }
  ];

  // Calculate Fee
  const calculateStampingFee = () => {
    let base = 200;
    if (calcInstrument === 'counter') base = 400;
    if (calcInstrument === 'gold') base = 1200;
    if (calcInstrument === 'weighbridge') base = 3500;
    if (calcInstrument === 'fuel') base = 1800;
    const gstAndCert = 50;
    return { fee: base, total: base + gstAndCert };
  };

  const currentFee = calculateStampingFee();

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Statutory Metrological Standards Reference
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Standards, Accuracy Classes & Statutory Fee Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Compliant with Legal Metrology Act 2009, Legal Metrology (General) Rules 2011 & OIML R 76 Recommendations.
          </p>
        </div>
      </div>

      {/* Grid: Accuracy Classes & Fee Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Accuracy Classes Selector */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" /> Metrological Accuracy Classification
          </h3>

          {/* Class Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {accuracyClasses.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className={`p-3 rounded-xl border text-left transition ${
                  selectedClass === cls.id
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                }`}
              >
                <div className="text-xs font-mono text-blue-400">CLASS {cls.id}</div>
                <div className="text-[11px] truncate mt-0.5">{cls.name.split(' ')[1]}</div>
              </button>
            ))}
          </div>

          {/* Selected Class Deep-Dive Details */}
          {(() => {
            const clsData = accuracyClasses.find(c => c.id === selectedClass);
            return (
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="font-bold text-white text-sm">{clsData.name}</h4>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono text-[10px]">
                    {clsData.stampingInterval}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Permissible Error Standard (MPE):</span>
                    <span className="font-semibold text-emerald-400 mt-0.5 block">{clsData.mpe}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Verification Scale Interval & Divisions:</span>
                    <span className="text-slate-200">{clsData.eValue} (Minimum {clsData.minDiv})</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Regulated Commercial Applications:</span>
                    <span className="text-slate-300">{clsData.application}</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Right: Statutory Stamping Fee Calculator */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Statutory Fee Calculator</h3>
                <p className="text-xs text-slate-400">Calculate official stamping fees per Schedule XI</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Instrument Category</label>
                <select
                  value={calcInstrument}
                  onChange={(e) => setCalcInstrument(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                >
                  <option value="counter">Commercial Bench / Counter Scale (Class III)</option>
                  <option value="gold">Jewellery Micro Analytical Balance (Class I)</option>
                  <option value="fuel">Fuel Dispensing Nozzle Flow Meter (Class 0.5)</option>
                  <option value="weighbridge">Industrial Weighbridge 50T/100T (Class IV)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Max Capacity (kg / tonnes / litres)</label>
                <input
                  type="text"
                  value={calcCapacity}
                  onChange={(e) => setCalcCapacity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Prescribed Verification Fee:</span>
                  <span className="font-bold text-white font-mono">₹{currentFee.fee}.00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cryptographic QR Stamping Seal:</span>
                  <span className="font-bold text-white font-mono">₹50.00</span>
                </div>
                <div className="flex justify-between text-white border-t border-slate-800 pt-2 font-bold text-sm">
                  <span>Total Payable:</span>
                  <span className="text-emerald-400 font-mono text-base">₹{currentFee.total}.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl text-[11px] text-blue-200">
            Zero cash handling. All fees credited directly to Consolidated Fund of State through Bharat e-Pay.
          </div>
        </div>

      </div>

    </div>
  );
}
