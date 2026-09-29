import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Layers, 
  RefreshCw,
  Phone,
  Send,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GISSchedulerView({ instruments }) {
  const [selectedWard, setSelectedWard] = useState('Bengaluru East (Zone 4)');
  const [selectedInspector, setSelectedInspector] = useState('Shri. R. Suresh (LMO)');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedSuccess, setOptimizedSuccess] = useState(false);

  const stops = [
    {
      id: "STOP-01",
      name: "Sri Balaji Supermarket",
      category: "Grocery & Provisions",
      machine: "Essae DS-252 (Class III Counter Scale)",
      address: "100ft Road, Indiranagar",
      status: "Expiring in 5 Days",
      urgency: "High",
      coordinates: "12.9716° N, 77.5946° E",
      timeSlot: "10:30 AM - 11:15 AM",
      feeStatus: "Paid Online (₹450)"
    },
    {
      id: "STOP-02",
      name: "Tanishq Heritage Jewellery Store",
      category: "Precious Metals & Gold",
      machine: "Sartorius Entris II (Class I Micro-Scale)",
      address: "CMH Road, Indiranagar",
      status: "Annual Re-verification",
      urgency: "Medium",
      coordinates: "12.9782° N, 77.6408° E",
      timeSlot: "11:30 AM - 12:30 PM",
      feeStatus: "Paid Online (₹1,500)"
    },
    {
      id: "STOP-03",
      name: "Bharat Petroleum Retail Outlet #14",
      category: "Fuel Dispensing Point",
      machine: "Midco MPD-V4 (Class 0.5 Dispenser Nozzles)",
      address: "Old Airport Road, Domlur",
      status: "Expiring in 2 Days",
      urgency: "Critical",
      coordinates: "12.9601° N, 77.6480° E",
      timeSlot: "02:00 PM - 03:00 PM",
      feeStatus: "Paid Online (₹2,200)"
    },
    {
      id: "STOP-04",
      name: "Maa Durga Wholesale Provision Mandi",
      category: "Bulk Commercial Scales",
      machine: "Avery India 300kg Platform Scale",
      address: "Cambridge Layout, Ulsoor",
      status: "New Stamping Application",
      urgency: "Normal",
      coordinates: "12.9729° N, 77.6257° E",
      timeSlot: "03:30 PM - 04:15 PM",
      feeStatus: "Paid Online (₹850)"
    }
  ];

  const handleRunOptimizer = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizedSuccess(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI-Driven Field Route Clustering Engine
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            GIS Smart Inspection Scheduler & Route Dispatcher
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Automatically allocates inspections by geo-coordinates, expiring priority, and officer workload without manual conflicts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRunOptimizer}
            disabled={isOptimizing}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-purple-600/30 transition"
          >
            {isOptimizing ? (
              <>Running Traveling Salesman & Urgency Heuristic...</>
            ) : (
              <><Zap className="w-4 h-4 text-amber-300" /> Auto-Optimize Today's Route</>
            )}
          </button>
        </div>
      </div>

      {/* Grid: Interactive GIS Map Simulator & Stop Waypoint Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Simulated Visual Interactive Map with Waypoints */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold text-white">Live Ward Telemetry: {selectedWard}</span>
            </div>
            <span className="font-mono text-purple-400">Efficiency Score: 96.8%</span>
          </div>

          {/* Map Canvas Visualizer */}
          <div className="relative aspect-video sm:min-h-[420px] bg-slate-950 p-6 flex flex-col justify-between overflow-hidden">
            {/* Background Grid Map Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Simulated Road Network Vectors */}
            <svg className="absolute inset-0 w-full h-full stroke-blue-500/30 stroke-2 fill-none pointer-events-none">
              <path d="M 80,120 Q 220,180 340,140 T 560,260" strokeDasharray="6,6" className="animate-pulse" />
              <path d="M 140,320 L 340,140" strokeDasharray="4,4" />
            </svg>

            {/* Pins on Map */}
            <div className="relative z-10 grid grid-cols-2 gap-8 sm:gap-12 p-4">
              
              {/* Pin 1 */}
              <div className="p-3 bg-slate-900/90 border border-emerald-500/60 rounded-xl shadow-xl max-w-[200px] backdrop-blur-md transform hover:scale-105 transition">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">1</span>
                  <span>Sri Balaji Store (10:30)</span>
                </div>
                <p className="text-[10px] text-slate-300 truncate mt-1">Indiranagar 100ft Rd</p>
                <span className="inline-block mt-1 text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                  Class III Scale
                </span>
              </div>

              {/* Pin 2 */}
              <div className="p-3 bg-slate-900/90 border border-amber-500/60 rounded-xl shadow-xl max-w-[200px] backdrop-blur-md transform hover:scale-105 transition self-end justify-self-end">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">2</span>
                  <span>Tanishq Gold (11:30)</span>
                </div>
                <p className="text-[10px] text-slate-300 truncate mt-1">CMH Road Gold Hub</p>
                <span className="inline-block mt-1 text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                  Class I Precision
                </span>
              </div>

              {/* Pin 3 */}
              <div className="p-3 bg-slate-900/90 border border-rose-500/60 rounded-xl shadow-xl max-w-[200px] backdrop-blur-md transform hover:scale-105 transition">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-400">
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">3</span>
                  <span>BP Fuel Outlet (14:00)</span>
                </div>
                <p className="text-[10px] text-slate-300 truncate mt-1">Old Airport Road</p>
                <span className="inline-block mt-1 text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">
                  Fuel Nozzles
                </span>
              </div>

              {/* Pin 4 */}
              <div className="p-3 bg-slate-900/90 border border-blue-500/60 rounded-xl shadow-xl max-w-[200px] backdrop-blur-md transform hover:scale-105 transition justify-self-end">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400">
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">4</span>
                  <span>Maa Durga Mandi (15:30)</span>
                </div>
                <p className="text-[10px] text-slate-300 truncate mt-1">Cambridge Layout</p>
                <span className="inline-block mt-1 text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                  300kg Platform
                </span>
              </div>

            </div>

            {/* Bottom Route Summary Overlay */}
            <div className="relative z-10 p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs backdrop-blur-md">
              <div className="flex items-center gap-4 text-slate-300">
                <span>Total Distance: <strong className="text-white">12.4 km</strong></span>
                <span>Est Transit: <strong className="text-white">38 mins</strong></span>
                <span>Fuel Saved: <strong className="text-emerald-400">~2.8 L (AI Clustered)</strong></span>
              </div>
              <span className="text-[10px] font-mono text-purple-400 font-bold">GPS GEOLOCKED</span>
            </div>
          </div>
        </div>

        {/* Right: Inspection Stops Manifest & Action Drawer */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Inspection Itinerary</h3>
              <p className="text-xs text-slate-400">Officer: <strong className="text-white">{selectedInspector}</strong></p>
            </div>
            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs font-mono">
              4 Stops Queued
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1">
            {stops.map((stop, idx) => (
              <div 
                key={stop.id}
                className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-blue-400 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white text-xs">{stop.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    stop.urgency === 'Critical'
                      ? 'bg-rose-500/20 text-rose-400'
                      : stop.urgency === 'High'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {stop.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-0.5 pl-7">
                  <div>Instrument: <strong className="text-slate-200">{stop.machine}</strong></div>
                  <div>Address: <span className="text-slate-300">{stop.address}</span></div>
                  <div className="flex items-center justify-between pt-1 text-slate-500">
                    <span>Slot: <strong className="text-cyan-300">{stop.timeSlot}</strong></span>
                    <span className="text-emerald-400 font-semibold">{stop.feeStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => alert("Inspection route dispatched to LMO Mobile App via SMS & Push Notification with offline sync capability.")}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <Send className="w-4 h-4" /> Dispatch Route to Field Mobile Device
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
