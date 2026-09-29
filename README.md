# SMARTMET — National Legal Metrology Online Verification System

**Smart India Hackathon 2026 | Problem Statement: SIH26036**  
*Theme: Miscellaneous | Category: Software | Team: Blind Coders*

![SMARTMET Banner](https://img.shields.io/badge/Gov%20of%20India-Legal%20Metrology-0066cc?style=for-the-badge)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 📌 Problem Statement (SIH26036)
India handles over **4 crore Legal Metrology verification events** every year. Yet instrument owners, Legal Metrology Officers (LMOs), and Government Approved Test Centres (GATCs) still depend on manual, fragmented processes with:
- Poor tracking and no single unified digital platform.
- Inconvenient physical office visits for traders.
- Lack of public transparency to detect counterfeit or tampered weighing instruments.

---

## 💡 Solution: SMARTMET Unified Platform
**SMARTMET** is a unified, real-time web portal that digitizes the entire legal metrology verification and stamping lifecycle across 4 integrated stakeholder portals:

### 1. 🏪 Instrument Owner (Trader Dashboard)
- **Data Isolation:** Private registry showing only the logged-in merchant's registered instruments.
- **Digital Applications:** Submit new scale verification requests with dealer license details and instant online fee payment via Bharat e-Pay.
- **1-Click Renewal:** Instant statutory 1-year annual re-verification with e-Challan payment breakdown (`₹350`) and receipt generation.
- **Digital Stamping Certificate:** Instant view and download of official DigiLocker-synced Government Verification Certificates.

### 2. 🛡️ Legal Metrology Officer (LMO Statutory Desk)
- **2-Stage Scrutiny & Approval Lifecycle:**
  - **Stage 1 (Initial Scrutiny):** Scrutinize customer submission dossiers (dealer licenses, specs, online challan receipts) and dispatch to nearest GATC lab via AI GIS smart scheduling.
  - **Stage 2 (Final Approval):** Review GATC laboratory calibration reports and digitally sign & approve certificates using DSC (Digital Signature Certificate) to generate hologram QR seals.

### 3. 🔬 GATC Testing Lab (Government Approved Test Centre)
- **Field Calibration Testing:** 3-point load calibration (Standard vs Observed Mass) and real-time tolerance deviation calculations against MPE limits.
- **AI Smart Calibration Report:** Automated verdict generation (`PASS`/`FAIL`) and direct electronic report transmission back to the LMO.

### 4. 📱 Public Citizen Portal (Consumer Protection Desk)
- **Live Camera QR Stamping Seal Scanner:** High-speed scanning using device webcams or mobile cameras to verify QR hologram seals and check certificate validity.
- **Photo Upload Decoder:** Scan saved photos of weighing scale QR codes.
- **Anti-Tampering Grievance Redressal:** Lodge short-weight or broken seal complaints with automated `< 24-hour` Flying Squad dispatch SLAs.

---

## 🛠️ Technology Stack
- **Frontend Framework:** React 19 + Vite 8
- **Styling & Design System:** Tailwind CSS v4 + Vanilla CSS GovTech design tokens
- **QR Scanning Engine:** `html5-qrcode` (Live webcam & image decoder)
- **Icons & UI Assets:** Lucide React
- **Micro-Interactions:** Canvas Confetti & custom animations
- **Typography:** Plus Jakarta Sans & Outfit (Google Fonts)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to project directory
cd SMARTMET

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build
```bash
# Compile production bundle
npm run build

# Preview production build
npm run preview
```

---

## 👥 Team Blind Coders (SIH 2026)
Developed for **Smart India Hackathon 2026** under Problem Statement **SIH26036**.
