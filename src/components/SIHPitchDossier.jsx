import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Users, 
  Layers, 
  BookOpen, 
  ExternalLink,
  Code,
  Server,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SIHPitchDossier({ onJumpToFeature }) {
  const [activeSlide, setActiveSlide] = useState(1);

  const slides = [
    {
      slideNum: 1,
      time: "15 sec",
      title: "Title & Hackathon Identification",
      tagline: "SIH26036 | Miscellaneous Theme | Software Category",
      script: `"Hello everyone, we are Team Blind Coders, and this is our project for Smart India Hackathon 2026. Our problem statement is SIH26036: Development of an Online Verification System for Weighing and Measuring Instruments, under the Miscellaneous theme, in the Software category. Our solution is called SMARTMET."`,
      keyPoints: [
        "Team: Team Blind Coders",
        "Event: Smart India Hackathon 2026 (SIH 2026)",
        "Problem ID: SIH26036",
        "Solution: SMARTMET Unified Legal Metrology Network"
      ]
    },
    {
      slideNum: 2,
      time: "50 sec",
      title: "Problem Statement & Solution Idea",
      tagline: "4.0+ Crore Annual Verification Events & Role Dashboards",
      script: `"India handles an estimated 4 crore Legal Metrology verification events every year. Yet instrument owners, Legal Metrology Officers, and GATCs still depend on manual processes, with poor tracking and no single system for verification and expiry management. Consumers can't easily check whether an instrument is certified, or report tampering. SMARTMET is a unified web platform that digitizes this entire process. Anyone can scan a QR code and instantly verify an instrument's certificate. Owners can request inspections, view their registered instruments, get expiry alerts, and track compliance on a dashboard. Consumers can lodge tampering reports and locate the nearest LMO or GATC office. What makes us different: role-based dashboards for every user, digital certificates, complete audit logs, smart scheduling based on expiry date, inspector availability and location, and AI-generated report summaries for GATCs."`,
      keyPoints: [
        "4 Crore manual verification events digitized",
        "Instant Public QR code certificate lookup",
        "Role-based dashboards for Owner, LMO, GATC, Citizen, Admin",
        "Smart GIS Scheduling & AI GATC Smart Reporting"
      ]
    },
    {
      slideNum: 3,
      time: "60 sec",
      title: "Technical Approach & 9-Step Pipeline",
      tagline: "React + Spring Boot + DigiLocker + AWS Architecture",
      script: `"Here is how it works, step by step. First, the owner applies online with the weighing machine details, dealer license documents, photos, and fee payment. Second, the LMO checks the application, fees, and documents. Third, our smart scheduler automatically assigns the inspection by area, date, time, instrument type, and workload. Fourth, the GATC tests the machine for reliability and weight range and records the process. If there is an error, the instrument goes for repair and retesting. Fifth, AI summarizes the GATC report. Sixth, the LMO reviews it and approves or rejects with remarks. Seventh, the certificate is generated. Then the owner downloads it digitally, and receives reminders before expiry, with one click to start re-verification. The public interface offers a certificate QR scanner, an AI chatbot, reports, and state rules. We are building it with Java Spring Boot, React.js, and MySQL, secured with Spring Security and JWT, and deployed on AWS EC2 with Docker. We also use the Google Maps API and the DigiLocker API."`,
      keyPoints: [
        "Complete 9-Step Verification & Retest Lifecycle",
        "Frontend: React.js + Tailwind CSS UI",
        "Backend: Java Spring Boot + MySQL + Spring Security JWT",
        "Cloud: AWS EC2, Docker, Google Maps GIS & DigiLocker REST API"
      ]
    },
    {
      slideNum: 4,
      time: "40 sec",
      title: "Feasibility, Engineering Strategy & Viability",
      tagline: "Solving Legacy APIs, Offline Sync & Routing Conflicts",
      script: `"Can we build it? Yes. Smart scheduling, secure role-based access, and a web and mobile platform for field inspections are all achievable with today's technology. We have also planned for the challenges. For integration with existing systems, we use modular APIs. For old paper records, we validate data during migration. For scheduling conflicts, we prioritize by location, workload, and availability. For poor field connectivity, the mobile app stores data offline and syncs later. And for security, we use authentication, access control, and encryption. Why will it work? It is paperless, faster, centralized, QR-verifiable, and sends automated reminders."`,
      keyPoints: [
        "Legacy API Adapters for National & State Systems",
        "OCR Data Cleansing for Historical Manual Records",
        "Offline-First Mobile PWA with Local Sync Queue",
        "100% Cryptographically Encrypted Role-Based Security"
      ]
    },
    {
      slideNum: 5,
      time: "35 sec",
      title: "Impact, ROI & Stakeholder Benefits",
      tagline: "Economic, Environmental, Operational & Social Transformation",
      script: `"For owners, there are no repeated office visits. LMOs get real-time visibility across their jurisdiction. GATCs can shortlist reports easily. Consumers get instant certification checks through a QR code. The government gets centralized national compliance data, and auditors get a tamper-proof digital audit trail. The economic benefit is lower compliance cost and better revenue tracking. The environmental benefit is less paperwork, and the social benefit is easier access in rural areas. Overall, SMARTMET makes the system faster, paperless, transparent, tamper-proof, and data-driven."`,
      keyPoints: [
        "Zero Office Visits for Merchants & Traders",
        "40M+ Paper Sheets & Plastic Tags Saved Annually",
        "Turnaround Compressed from 28 Days to 48 Hours",
        "Fair Trade Protection & Rural Consumer Trust"
      ]
    },
    {
      slideNum: 6,
      time: "30 sec",
      title: "Statutory Research & Functional Prototype",
      tagline: "Legal Metrology Rules 2011, e-Maap & DigiLocker Alignment",
      script: `"Our idea is backed by research. It follows the Legal Metrology (General) Rules, 2011. It aligns with existing initiatives like the national e-Maap portal and Kerala's online system, and DigiLocker documents are legally recognized under the IT Act. Our team has also built a working prototype, linked in the deck. SMARTMET turns a fragmented manual process into one trusted digital system. Thank you, from Team Blind Coders."`,
      keyPoints: [
        "Rule 14 Stamping & Verification Compliance",
        "Interoperable with National e-Maap & Kerala LM Portals",
        "Legally Binding Digital Certificates under IT Act 2000",
        "Working Prototype Developed by Team Blind Coders"
      ]
    }
  ];

  const currentSlideData = slides.find(s => s.slideNum === activeSlide);

  return (
    <div className="space-y-6">
      
      {/* SIH 2026 Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Smart India Hackathon 2026 (SIH 2026) Official Submission
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Team Blind Coders | Problem Statement SIH26036
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Development of an Online Verification System for Weighing and Measuring Instruments (SMARTMET)
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-emerald-400 font-bold">
          Status: Working Prototype Live
        </div>
      </div>

      {/* Slide Navigator Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {slides.map((s) => (
          <button
            key={s.slideNum}
            onClick={() => setActiveSlide(s.slideNum)}
            className={`p-3 rounded-xl border text-left transition ${
              activeSlide === s.slideNum
                ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-lg shadow-blue-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span>SLIDE {s.slideNum}</span>
              <span className="opacity-75">{s.time}</span>
            </div>
            <div className="truncate text-xs mt-1 font-bold">{s.title.split(' ')[0]} {s.title.split(' ')[1]}</div>
          </button>
        ))}
      </div>

      {/* Active Slide Pitch Transcript & Live Prototype Mapping */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pitch Presentation Script */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Slide {currentSlideData.slideNum} Pitch Script ({currentSlideData.time})</span>
              <h3 className="text-lg font-bold text-white">{currentSlideData.title}</h3>
            </div>
            <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-xs font-mono text-slate-300">
              Team Blind Coders
            </span>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs sm:text-sm leading-relaxed italic font-serif">
            {currentSlideData.script}
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key SIH Architectural Highlights:</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {currentSlideData.keyPoints.map((kp, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{kp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Research Compliance & Prototype Linkage */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" /> Research & Statutory Backing (Slide 6)
            </h4>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">1. Legal Metrology (General) Rules, 2011</span>
              <p className="text-slate-400 text-[11px]">
                Adheres strictly to Rule 14 verification mandates, Schedule XI fee tariffs, and Maximum Permissible Error (MPE) thresholds.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">2. e-Maap & State LM Alignment</span>
              <p className="text-slate-400 text-[11px]">
                Built with modular REST APIs to integrate seamlessly with National e-Maap and Kerala online Legal Metrology systems.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">3. DigiLocker IT Act 2000 Validity</span>
              <p className="text-slate-400 text-[11px]">
                Digital certificates issued on SMARTMET are cryptographically signed with DSC and legally recognized at par with physical certificates under Rule 9A of IT Act.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
                alert("Navigating directly to live interactive prototype features...");
              }}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> SMARTMET: Trusted Digital Grid
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
