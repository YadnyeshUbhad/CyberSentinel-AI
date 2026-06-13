import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldAlert, BarChart3, FileText, Globe, Activity } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-[#07090f]/85 backdrop-blur-md px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <ShieldAlert className="h-7 w-7 text-emerald-500 filter drop-shadow-[0_0_5px_rgba(16,185,129,0.5)] transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <span className="font-bold text-lg md:text-xl tracking-wider text-white">
              CYBER<span className="text-emerald-500">SENTINEL</span>
            </span>
            <span className="text-[10px] block text-cyan-400 font-mono -mt-1 tracking-widest font-semibold uppercase">
              Threat Intelligence AI
            </span>
          </div>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1 md:gap-4">
          <Link
            to="/dashboard"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive("/dashboard")
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <Link
            to="/text"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive("/text")
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Analyze Text</span>
          </Link>

          <Link
            to="/url"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive("/url")
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Analyze URL</span>
          </Link>
        </div>

        {/* System Status badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono">
          <Activity className="h-3 w-3 animate-pulse text-emerald-400" />
          <span>ML ENGINE: ONLINE</span>
        </div>
      </div>
    </nav>
  );
}
