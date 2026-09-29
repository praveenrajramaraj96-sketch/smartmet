import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  ChevronDown, 
  ChevronUp,
  Scale,
  ShieldCheck
} from 'lucide-react';

export default function AIChatbot({ onOpenScanner, onSelectRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am SMARTMET Sahayak, your AI Legal Metrology Assistant. How can I assist you today with weights & measures verification, stamping rules, or grievance lodging?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const samplePrompts = [
    "What are the permissible error limits for grocery scales?",
    "How do I apply for 1-click certificate renewal?",
    "How does the AI Smart Scheduler allocate LMO officers?",
    "How can a citizen report short-weight tampering?"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let botReply = "Under the Legal Metrology Act 2009 (Rule 14), all commercial weighing instruments must undergo periodic statutory verification by an authorized Legal Metrology Officer (LMO) with GATC testing support.";

      const lower = query.toLowerCase();
      if (lower.includes('error') || lower.includes('limit') || lower.includes('grocery') || lower.includes('tolerance')) {
        botReply = "For Class III commercial scales (like supermarket / grocery bench scales), the Maximum Permissible Error (MPE) is typically ±0.05% to ±0.1% of max capacity. For Class I gold scales, tolerance is an ultra-strict ±0.001g.";
      } else if (lower.includes('renew') || lower.includes('apply') || lower.includes('certificate')) {
        botReply = "Traders can submit new applications or 1-Click Renewals from the 'Instrument Owner' dashboard. Simply confirm machine specs, upload dealer stamping license, and pay the ₹450 statutory fee via Bharat e-Pay.";
      } else if (lower.includes('schedule') || lower.includes('lmo') || lower.includes('route')) {
        botReply = "SMARTMET AI Smart Scheduling automatically evaluates inspector GPS locations, expiration urgency, and road distance to cluster inspections into 96%+ efficiency routes without officer overlap.";
      } else if (lower.includes('tamper') || lower.includes('citizen') || lower.includes('report') || lower.includes('fraud')) {
        botReply = "Citizens can scan any weighing scale QR code using the 'Citizen / Consumer' interface to verify stamping validity. If tampered or unsealed, submit a report with photos to dispatch a local Flying Squad raid.";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full shadow-2xl flex items-center gap-2.5 transition transform hover:scale-105 border border-blue-400/30 group"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-bold pr-1.5 hidden sm:inline">Ask Sahayak AI</span>
        </button>
      ) : (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Chat Header */}
          <div className="p-3.5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  SMARTMET Sahayak <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h4>
                <p className="text-[10px] text-emerald-400">Legal Metrology AI Assistant (Online)</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/60 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2 bg-slate-900 border-t border-slate-800 overflow-x-auto whitespace-nowrap flex gap-1.5 text-[10px]">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700/80 transition flex-shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about stamping, rules, or testing..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
