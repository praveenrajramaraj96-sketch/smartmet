import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Navigation, 
  Building2, 
  Search, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Wrench
} from 'lucide-react';

export default function OfficeLocatorView() {
  const [selectedState, setSelectedState] = useState('Karnataka');
  const [selectedDistrict, setSelectedDistrict] = useState('Bengaluru Urban');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'LMO' | 'GATC'

  const offices = [
    {
      id: "OFF-BLR-01",
      name: "Bengaluru East Legal Metrology Enforcement Office",
      type: "LMO",
      jurisdiction: "Indiranagar, Domlur, HAL, Whitefield, CV Raman Nagar",
      officerInCharge: "Shri. R. Suresh, Assistant Controller of Legal Metrology",
      address: "2nd Floor, Commercial Complex, 100ft Road, Indiranagar, Bengaluru - 560038",
      phone: "+91 80 2528 9011",
      email: "lmo.blreast@smartmet.gov.in",
      timing: "9:30 AM - 5:30 PM (Mon - Sat)",
      rating: "4.8 ★ (120+ Verifications/day)",
      facilities: ["Digital Stamping Counter", "Challan Verification Desk", "Grievance Redressal Cell", "Working Reference Standards Room"]
    },
    {
      id: "OFF-BLR-02",
      name: "Apex Metrology Calibration Labs (GATC-KA-09)",
      type: "GATC",
      jurisdiction: "Greater Bengaluru & Allied Industrial Corridors",
      officerInCharge: "Dr. K. N. Murthy (Director of Calibration)",
      address: "Plot #44, Peenya Industrial Area 2nd Stage, Bengaluru - 560058",
      phone: "+91 80 2839 4410",
      email: "calibration@apexmetrology.org",
      timing: "8:30 AM - 6:00 PM (Mon - Sat)",
      rating: "4.9 ★ (ISO/IEC 17025 Certified)",
      facilities: ["Class E2/F1 Heavy Mass Standards", "Electronic Load Cell Test Rig", "High-Flow Fuel Calibration Tower", "Mobile Calibration Van Dispatched"]
    },
    {
      id: "OFF-BLR-03",
      name: "Bengaluru Central & South Legal Metrology Division",
      type: "LMO",
      jurisdiction: "Jayanagar, Koramangala, BTM Layout, Electronic City",
      officerInCharge: "Smt. S. Manjula, Senior Inspector of Legal Metrology",
      address: "Food & Civil Supplies Bhavan, Gandhi Nagar, Bengaluru - 560009",
      phone: "+91 80 2225 1890",
      email: "lmo.blrcentral@smartmet.gov.in",
      timing: "9:30 AM - 5:30 PM (Mon - Sat)",
      rating: "4.7 ★ (150+ Verifications/day)",
      facilities: ["Flying Squad Unit", "Mobile Stamping Unit", "Consumer Court Case Desk"]
    },
    {
      id: "OFF-BLR-04",
      name: "South India Precision Calibration Hub (GATC-KA-14)",
      type: "GATC",
      jurisdiction: "Jewellery Corridor & Precious Measurement Labs",
      officerInCharge: "Er. Ramesh Babu (Technical Manager)",
      address: "Commercial Street Trade Complex, Tasker Town, Bengaluru - 560051",
      phone: "+91 80 2559 8812",
      email: "info@siprecisionlabs.in",
      timing: "9:00 AM - 7:00 PM",
      rating: "4.9 ★ (Class I Special Precision Lab)",
      facilities: ["Micro-Analytical Balance Testbench", "Carat Scale Verification Rig", "Laser Hologram Application Desk"]
    }
  ];

  const filtered = offices.filter(o => filterType === 'ALL' || o.type === filterType);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" /> Slide 2 Feature: Public Office Finder
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Locate Nearest LMO Enforcement & GATC Testing Centers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Find designated Legal Metrology Officers, Government Approved Test Centres, and Mobile Calibration Vans.
          </p>
        </div>
      </div>

      {/* State / District Filters */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-slate-400 font-semibold block text-[11px] mb-1">State / UT:</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
            >
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Bihar">Bihar</option>
              <option value="Kerala">Kerala (e-Maap Integrated)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block text-[11px] mb-1">District / Enforcement Zone:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
            >
              <option value="Bengaluru Urban">Bengaluru Urban (East/Central/South)</option>
              <option value="Bengaluru Rural">Bengaluru Rural</option>
              <option value="Mysuru">Mysuru Zone</option>
              <option value="Pune">Pune District</option>
              <option value="Chennai">Chennai Central</option>
            </select>
          </div>
        </div>

        {/* Office Type Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterType === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Offices ({offices.length})
          </button>
          <button
            onClick={() => setFilterType('LMO')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1 ${
              filterType === 'LMO' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> LMO Statutory
          </button>
          <button
            onClick={() => setFilterType('GATC')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1 ${
              filterType === 'GATC' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" /> GATC Test Labs
          </button>
        </div>
      </div>

      {/* Office Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((office) => {
          const isLmo = office.type === 'LMO';

          return (
            <div 
              key={office.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl space-y-4 shadow-xl transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    isLmo 
                      ? 'bg-purple-500/15 text-purple-300 border-purple-500/30' 
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}>
                    {isLmo ? <ShieldCheck className="w-3.5 h-3.5" /> : <Wrench className="w-3.5 h-3.5" />}
                    {isLmo ? 'Govt Statutory LMO Office' : 'GATC Approved Testing Lab'}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{office.rating}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">{office.name}</h4>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">{office.officerInCharge}</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-mono text-slate-200">{office.phone}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 truncate">{office.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{office.timing}</span>
                  </div>
                </div>

                {/* Available Facilities Tags */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Available Infrastructure:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {office.facilities.map((fac, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => alert(`Directions routed to: ${office.name}\n\nCoordinates mapped in Google Maps / GIS module.`)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <Navigation className="w-3.5 h-3.5" /> Navigate via GIS Map
                </button>
                <button
                  onClick={() => alert(`Contacting Officer: ${office.phone}`)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
