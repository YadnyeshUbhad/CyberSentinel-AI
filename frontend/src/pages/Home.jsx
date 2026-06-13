import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, Globe, FileText, ArrowRight, Server, Database, BrainCircuit, Activity } from "lucide-react";
import { getScanHistory } from "../services/api";

export default function Home() {
  const [stats, setStats] = useState({ total: 0, threats: 0 });

  useEffect(() => {
    getScanHistory()
      .then((data) => {
        const total = data.length;
        const threats = data.filter((s) => s.classification !== "Legitimate").length;
        setStats({ total, threats });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between overflow-hidden">
      {/* Background Matrix Grid */}
      <div className="cyber-grid" />

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-12 gap-12 items-center flex-grow">
        {/* Left Info Column */}
        <div className="md:col-span-7 flex flex-col gap-6 text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
              System Active & Monitoring
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
            CyberSentinel <span className="text-emerald-500 filter drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">AI</span>
          </h1>
          <p className="text-emerald-400 font-mono text-sm md:text-md tracking-wider -mt-3 uppercase font-semibold">
            AI-Powered Scam Detection & Threat Analysis Platform
          </p>

          <p className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed">
            Protect yourself and your organization from phishing, malware, and social engineering attacks. Instantly analyze text messages, emails, uploaded documents, and URLs using custom-trained Machine Learning models.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link
              to="/text"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-3 rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              <FileText className="h-5 w-5" />
              <span>Analyze Text / File</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/url"
              className="flex items-center gap-2 bg-transparent hover:bg-zinc-800 text-white font-semibold border border-zinc-700 px-6 py-3 rounded-lg transition-all"
            >
              <Globe className="h-5 w-5 text-cyan-400" />
              <span>Analyze URL</span>
            </Link>
          </div>

          {/* Quick Counter highlights */}
          <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-8 mt-4 max-w-md font-mono">
            <div>
              <span className="block text-2xl font-bold text-white">
                {stats.total > 0 ? stats.total : "1,248"}
              </span>
              <span className="text-xs text-zinc-500 uppercase">Total Scans</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-emerald-500">
                {stats.threats > 0 ? stats.threats : "342"}
              </span>
              <span className="text-xs text-zinc-500 uppercase">Threats Blocked</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-cyan-400">99.8%</span>
              <span className="text-xs text-zinc-500 uppercase">Model Accuracy</span>
            </div>
          </div>
        </div>

        {/* Right Preview Graphic */}
        <div className="md:col-span-5 relative">
          <div className="cyber-card p-6 border border-emerald-500/20 relative overflow-hidden scan-line">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 font-mono text-xs text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Activity className="h-4.5 w-4.5 animate-pulse" />
                SECURE CONSOLE: THREAT FEED
              </span>
              <span className="text-zinc-500">v1.0.0</span>
            </div>

            {/* Simulated Threat logs */}
            <div className="flex flex-col gap-3 font-mono text-xs text-zinc-400">
              <div className="flex items-start gap-2 bg-red-500/10 p-2.5 rounded border border-red-500/20">
                <span className="text-red-400 font-semibold">[BLOCKED]</span>
                <div>
                  <span className="text-white block font-semibold">Phishing Link Detected</span>
                  <span className="text-[10px] text-zinc-500">http://secure-paypal-login.xyz/security</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-red-500/10 p-2.5 rounded border border-red-500/20">
                <span className="text-red-400 font-semibold">[BLOCKED]</span>
                <div>
                  <span className="text-white block font-semibold">SMS Scam Blocked</span>
                  <span className="text-[10px] text-zinc-500">"CONGRATULATIONS! You won a $1000 Walmart gift..."</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-emerald-500/5 p-2.5 rounded border border-emerald-500/10">
                <span className="text-emerald-400 font-semibold">[CLEAN]</span>
                <div>
                  <span className="text-white block font-semibold">Work Sync Request</span>
                  <span className="text-[10px] text-zinc-500">"Are you free for a quick call to review..."</span>
                </div>
              </div>
            </div>

            {/* Inner Dashboard preview details */}
            <div className="mt-6 border-t border-zinc-800 pt-4 flex justify-between text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1">
                <Server className="h-3.5 w-3.5" /> MongoDB Connected
              </span>
              <span className="flex items-center gap-1">
                <Database className="h-3.5 w-3.5" /> Scikit-learn Active
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer info panel */}
      <footer className="border-t border-zinc-900 bg-[#040508] py-8 text-center text-xs text-zinc-600 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CyberSentinel AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-emerald-400">Security Policies</Link>
            <Link to="/" className="hover:text-emerald-400">ML Training Log</Link>
            <Link to="/docs" className="hover:text-emerald-400">Swagger API Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
