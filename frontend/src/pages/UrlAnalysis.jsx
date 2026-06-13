import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, Globe, Loader2, RefreshCw, AlertOctagon, CheckCircle2, XCircle } from "lucide-react";
import { analyzeUrl } from "../services/api";

export default function UrlAnalysis() {
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!urlInput.trim()) {
      setError("Please enter a URL to analyze.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeUrl(urlInput);
      setResult(res);
    } catch (err) {
      setError(err.message || "Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setUrlInput("");
    setResult(null);
    setError("");
  };

  const getRiskStyle = (score) => {
    if (score <= 25) return { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "glow-green", icon: ShieldCheck };
    if (score <= 50) return { color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "glow-blue", icon: ShieldCheck };
    if (score <= 75) return { color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", glow: "glow-yellow", icon: ShieldAlert };
    return { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", glow: "glow-red", icon: ShieldAlert };
  };

  const riskStyle = result ? getRiskStyle(result.risk_score) : null;
  const ResultIcon = riskStyle ? riskStyle.icon : null;

  // Simple client-side quick parse to display a checklist of structural characteristics
  const getUrlCharacteristics = (urlStr) => {
    if (!urlStr) return [];
    const lower = urlStr.toLowerCase();
    
    // Check elements
    const hasHttps = lower.startsWith("https://");
    const longUrl = urlStr.length > 75;
    const hasSuspiciousTld = /\.(xyz|top|club|info|gq|tk|cf|ml|ga|work|click)\b/.test(lower);
    const hasIp = /^[^\s]*\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(lower);
    const hasKeywords = /(login|verify|secure|bank|update|paypal|signin|refund)/.test(lower);

    return [
      { name: "SSL Connection (HTTPS)", status: hasHttps ? "secure" : "warning", desc: hasHttps ? "HTTPS enabled" : "Unencrypted connection" },
      { name: "URL Length Check", status: longUrl ? "warning" : "secure", desc: longUrl ? "URL is excessively long" : "URL length is normal" },
      { name: "Top-Level Domain", status: hasSuspiciousTld ? "warning" : "secure", desc: hasSuspiciousTld ? "Suspicious TLD registered" : "Common TLD registered" },
      { name: "IP Host check", status: hasIp ? "warning" : "secure", desc: hasIp ? "Uses raw IP address" : "Uses domain name host" },
      { name: "Brand Keyword spoofing", status: hasKeywords ? "warning" : "secure", desc: hasKeywords ? "Contains brand names or security keywords" : "No deceptive keywords detected" },
    ];
  };

  const characteristics = result ? getUrlCharacteristics(result.input_data) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative">
      <div className="cyber-grid" />
      
      {/* Title */}
      <div className="mb-10 text-left">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
          <Globe className="h-7 w-7 text-emerald-500" />
          URL Link Threat Analysis
        </h2>
        <p className="text-zinc-500 font-mono text-xs mt-1 uppercase">
          Evaluate links and domains using custom classification features
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Card */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="cyber-card p-6 text-left">
            <h3 className="text-md font-semibold text-white font-mono uppercase mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Inspect Link Address
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                className="flex-grow bg-zinc-950/80 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter link address (e.g. www.paypal-verification.xyz/login)..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !urlInput.trim()}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold px-6 rounded-lg text-sm transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center gap-1.5"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                <span>Analyze</span>
              </button>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={clearForm}
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors uppercase font-mono"
              >
                <RefreshCw className="h-3 w-3" /> Reset
              </button>
              <span className="text-[10px] text-zinc-500 font-mono">
                URLs will be classified into Legitimate, Phishing, Malware, or Defacement.
              </span>
            </div>
          </div>

          {/* Quick analysis checklist when result is present */}
          {result && (
            <div className="cyber-card p-6 text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 border-b border-zinc-800 pb-2">
                Static Heuristics Checklist
              </h3>
              <div className="flex flex-col gap-3">
                {characteristics.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-zinc-950/40 p-3 rounded border border-zinc-900 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      {item.status === "secure" ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-red-500" />
                      )}
                      <span className="text-zinc-300 font-semibold">{item.name}</span>
                    </div>
                    <span className={`text-[10px] uppercase font-bold ${item.status === 'secure' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-mono text-left">
              {error}
            </div>
          )}
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5">
          {loading && (
            <div className="cyber-card p-12 flex flex-col items-center justify-center gap-4 min-h-[400px]">
              <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
              <div className="text-center font-mono">
                <p className="text-white font-semibold">Running ML Feature Extraction...</p>
                <p className="text-xs text-zinc-500 mt-1">Analyzing TLDs, IP patterns, and token counts</p>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="cyber-card p-12 flex flex-col items-center justify-center gap-4 text-center border-dashed border-zinc-800 min-h-[400px]">
              <AlertOctagon className="h-12 w-12 text-zinc-600" />
              <div className="font-mono">
                <p className="text-zinc-400 font-semibold uppercase">Awaiting URL</p>
                <p className="text-xs text-zinc-600 mt-1">Provide a link address above to execute the URL classifier model</p>
              </div>
            </div>
          )}

          {!loading && result && riskStyle && ResultIcon && (
            <div className={`cyber-card p-6 border text-left transition-all ${riskStyle.border} ${riskStyle.glow}`}>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <ResultIcon className={`h-6 w-6 ${riskStyle.color}`} />
                  <div>
                    <h4 className="text-md font-bold text-white font-mono uppercase tracking-wider">
                      {result.classification}
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block -mt-1">
                      Scanned via URL Model
                    </span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase ${riskStyle.bg} ${riskStyle.color}`}>
                  {result.confidence} CONFIDENCE
                </span>
              </div>

              {/* Risk Score Circle */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full border border-zinc-800 bg-zinc-950">
                  <div className="absolute inset-2 rounded-full border border-dashed border-zinc-800"></div>
                  <span className={`text-xl font-mono font-black ${riskStyle.color}`}>
                    {result.risk_score}
                  </span>
                  <span className="absolute bottom-2 text-[9px] text-zinc-600 font-mono uppercase">
                    Risk
                  </span>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    {result.category}
                  </h5>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    This risk index reflects calculated probabilities from our Random Forest threat classifier.
                  </p>
                </div>
              </div>

              {/* Reasons */}
              <div>
                <h6 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
                  Key Risk Indicators:
                </h6>
                <ul className="flex flex-col gap-2 font-mono text-xs">
                  {result.reasons.map((reason, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 bg-zinc-950/60 p-2.5 border border-zinc-900 rounded text-zinc-400"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full mt-1.5 ${riskStyle.color}`}></span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
