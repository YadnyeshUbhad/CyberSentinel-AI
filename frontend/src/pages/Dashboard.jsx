import React, { useEffect, useState } from "react";
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Legend 
} from "recharts";
import { 
  Activity, ShieldAlert, ShieldCheck, Globe, Loader2, Server, 
  Clock, AlertTriangle, ChevronRight, FileText
} from "lucide-react";
import { getDashboardStats } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch dashboard data. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
        <p className="font-mono text-zinc-400 text-sm">Aggregating telemetry & logs...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="cyber-card p-8 max-w-md mx-auto border-red-500/20">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="font-mono text-white font-bold mb-2">TELEMETRY OFFLINE</h3>
          <p className="text-zinc-500 text-sm mb-6">{error || "Could not establish server connection."}</p>
          <button
            onClick={fetchStats}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-mono font-bold text-xs px-4 py-2 rounded uppercase"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // Calculate Text Scams
  const textScams = Math.max(0, stats.scam_detections - (stats.phishing_urls + stats.malware_urls + stats.defacement_urls));

  // Prepare Recharts Data
  const riskPieData = [
    { name: "Low Risk (0-25)", value: stats.risk_distribution.low, color: "#10b981" },
    { name: "Medium Risk (26-50)", value: stats.risk_distribution.medium, color: "#06b6d4" },
    { name: "High Risk (51-75)", value: stats.risk_distribution.high, color: "#eab308" },
    { name: "Critical Risk (76-100)", value: stats.risk_distribution.critical, color: "#ef4444" },
  ].filter(item => item.value > 0);

  // If riskPieData is empty, add a placeholder
  if (riskPieData.length === 0) {
    riskPieData.push({ name: "No Data", value: 1, color: "#27272a" });
  }

  const categoryBarData = [
    { name: "Phishing URLs", value: stats.phishing_urls, color: "#06b6d4" },
    { name: "Malware URLs", value: stats.malware_urls, color: "#ef4444" },
    { name: "Defacements", value: stats.defacement_urls, color: "#eab308" },
    { name: "Text Scams", value: textScams, color: "#a855f7" },
  ];

  // Helper formatting for dates
  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return "Just now";
    }
  };

  const getBadgeStyle = (classification) => {
    switch (classification) {
      case "Legitimate":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Phishing":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "Malware":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Defacement":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Scam":
      default:
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative">
      <div className="cyber-grid" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 text-left border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
            <Activity className="h-7 w-7 text-emerald-500" />
            Threat Monitoring Dashboard
          </h2>
          <p className="text-zinc-500 font-mono text-xs mt-1 uppercase">
            Aggregated metrics, model statistics, and historical logs
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <button 
            onClick={fetchStats} 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded transition-all"
          >
            <Clock className="h-3.5 w-3.5" /> Refresh Telemetry
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-left">
        {/* Card 1 */}
        <div className="cyber-card p-5 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 font-mono uppercase font-bold tracking-wider block">
              System Evaluations
            </span>
            <span className="text-3xl font-bold text-white block mt-1 font-mono">
              {stats.total_scans}
            </span>
            <span className="text-[10px] text-zinc-500 mt-1 block">Total scans requested</span>
          </div>
          <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg">
            <Server className="h-6 w-6 text-zinc-400" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="cyber-card p-5 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-red-500 font-mono uppercase font-bold tracking-wider block">
              Threats Blocked
            </span>
            <span className="text-3xl font-bold text-red-500 block mt-1 font-mono">
              {stats.scam_detections}
            </span>
            <span className="text-[10px] text-zinc-500 mt-1 block">Malicious items flagged</span>
          </div>
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <ShieldAlert className="h-6 w-6 text-red-400" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="cyber-card p-5 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold tracking-wider block">
              Legitimate Scans
            </span>
            <span className="text-3xl font-bold text-emerald-400 block mt-1 font-mono">
              {stats.legitimate_detections}
            </span>
            <span className="text-[10px] text-zinc-500 mt-1 block">Safe inputs verified</span>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="cyber-card p-5 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-cyan-400 font-mono uppercase font-bold tracking-wider block">
              Malicious Links
            </span>
            <span className="text-3xl font-bold text-cyan-400 block mt-1 font-mono">
              {stats.phishing_urls + stats.malware_urls + stats.defacement_urls}
            </span>
            <span className="text-[10px] text-zinc-500 mt-1 block">URL threats neutralized</span>
          </div>
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
            <Globe className="h-6 w-6 text-cyan-450" />
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10 text-left">
        {/* Pie chart */}
        <div className="cyber-card p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-6 border-b border-zinc-800 pb-2">
            Risk Classification Breakdown
          </h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0c0d14", borderColor: "#1f2937", borderRadius: "8px", fontFamily: "monospace", fontSize: "11px" }}
                  itemStyle={{ color: "#ffffff" }}
                />
                <Legend 
                  wrapperStyle={{ fontFamily: "monospace", fontSize: "11px", paddingTop: "15px" }} 
                  verticalAlign="bottom"
                  height={36}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar chart */}
        <div className="cyber-card p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-6 border-b border-zinc-800 pb-2">
            Threat Categories Log
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryBarData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#71717a" style={{ fontSize: "10px", fontFamily: "monospace" }} />
                <YAxis stroke="#71717a" style={{ fontSize: "10px", fontFamily: "monospace" }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0c0d14", borderColor: "#1f2937", borderRadius: "8px", fontFamily: "monospace", fontSize: "11px" }}
                  labelStyle={{ color: "#71717a" }}
                  itemStyle={{ color: "#ffffff" }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categoryBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="cyber-card p-6 text-left">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-6 border-b border-zinc-800 pb-2">
          Recent Threat Assessments
        </h3>

        <div className="overflow-x-auto">
          {stats.recent_scans.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 font-mono text-sm">
              No telemetry recordings available yet.
            </div>
          ) : (
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-semibold">Type</th>
                  <th className="pb-3 px-4 font-semibold">Assessment Sample</th>
                  <th className="pb-3 px-4 font-semibold">Classification</th>
                  <th className="pb-3 px-4 font-semibold">Risk Index</th>
                  <th className="pb-3 pl-4 font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_scans.map((scan) => (
                  <tr key={scan.scan_id} className="border-b border-zinc-900 hover:bg-zinc-900/35 transition-colors">
                    <td className="py-3.5 pr-4 flex items-center gap-1.5 text-zinc-300">
                      {scan.scan_type === "url" ? (
                        <>
                          <Globe className="h-4 w-4 text-cyan-400" />
                          <span>URL</span>
                        </>
                      ) : scan.scan_type === "file" ? (
                        <>
                          <FileText className="h-4 w-4 text-purple-400" />
                          <span>FILE</span>
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 text-emerald-400" />
                          <span>TEXT</span>
                        </>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 max-w-xs truncate" title={scan.input_data}>
                      {scan.input_data}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 border rounded-full text-[10px] font-bold ${getBadgeStyle(scan.classification)}`}>
                        {scan.classification}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-zinc-300">
                      {scan.risk_score}%
                    </td>
                    <td className="py-3.5 pl-4 text-zinc-500">
                      {formatTime(scan.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
