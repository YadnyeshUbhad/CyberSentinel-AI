import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, Upload, Loader2, RefreshCw, FileWarning, HelpCircle } from "lucide-react";
import { analyzeText, analyzeFile } from "../services/api";

export default function TextAnalysis() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleTextAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeText(text);
      setResult(res);
    } catch (err) {
      setError(err.message || "Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const handleFileAnalyze = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeFile(file);
      setResult(res);
    } catch (err) {
      setError(err.message || "File analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const extension = droppedFile.name.split(".").pop().toLowerCase();
      if (extension === "txt" || extension === "pdf") {
        setFile(droppedFile);
        setError("");
      } else {
        setError("Only .txt and .pdf files are supported.");
      }
    }
  };

  const clearForm = () => {
    setText("");
    setFile(null);
    setResult(null);
    setError("");
  };

  // Helper to determine risk layout classes
  const getRiskStyle = (score) => {
    if (score <= 25) return { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "glow-green", icon: ShieldCheck };
    if (score <= 50) return { color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "glow-blue", icon: HelpCircle };
    if (score <= 75) return { color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", glow: "glow-yellow", icon: ShieldAlert };
    return { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", glow: "glow-red", icon: ShieldAlert };
  };

  const riskStyle = result ? getRiskStyle(result.risk_score) : null;
  const ResultIcon = riskStyle ? riskStyle.icon : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative">
      <div className="cyber-grid" />
      
      {/* Title */}
      <div className="mb-10 text-left">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
          <FileText className="h-7 w-7 text-emerald-500" />
          Text & Document Threat Analysis
        </h2>
        <p className="text-zinc-500 font-mono text-xs mt-1 uppercase">
          Evaluate SMS, Emails, WhatsApp messages, or upload documents for scam indicators
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input area */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Manual Text Card */}
          <div className="cyber-card p-6 text-left">
            <h3 className="text-md font-semibold text-white font-mono uppercase mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Manual Content Entry
            </h3>

            <textarea
              className="w-full h-48 bg-zinc-950/80 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Paste the SMS, email body, or message here to analyze..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setFile(null); // Clear file if typing
              }}
            />

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={clearForm}
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors uppercase font-mono"
              >
                <RefreshCw className="h-3 w-3" /> Reset
              </button>
              <button
                onClick={handleTextAnalyze}
                disabled={loading || !text.trim()}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold px-6 py-2.5 rounded-lg text-sm transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center gap-1.5"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                <span>Analyze Text</span>
              </button>
            </div>
          </div>

          {/* File Upload Card */}
          <div className="cyber-card p-6 text-left">
            <h3 className="text-md font-semibold text-white font-mono uppercase mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Document Upload Scanner
            </h3>

            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                dragActive
                  ? "border-emerald-500 bg-emerald-500/5"
                  : file
                  ? "border-cyan-500 bg-cyan-500/5"
                  : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/40"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".txt,.pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="flex flex-col items-center gap-2 cursor-pointer w-full">
                <Upload className={`h-10 w-10 ${file ? "text-cyan-400" : "text-zinc-500"}`} />
                <span className="text-sm text-zinc-300 font-medium">
                  {file ? file.name : "Drag & drop files here, or click to browse"}
                </span>
                <span className="text-xs text-zinc-600 font-mono">
                  SUPPORTS PDF, TXT (MAX 5MB)
                </span>
              </label>
            </div>

            {file && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setFile(null)}
                  className="text-xs text-red-400 hover:underline"
                >
                  Remove File
                </button>
                <button
                  onClick={handleFileAnalyze}
                  disabled={loading}
                  className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold px-6 py-2.5 rounded-lg text-sm transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  <span>Scan Document</span>
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-mono text-left">
              {error}
            </div>
          )}
        </div>

        {/* Results area */}
        <div className="lg:col-span-5">
          {loading && (
            <div className="cyber-card p-12 flex flex-col items-center justify-center gap-4 min-h-[400px]">
              <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
              <div className="text-center font-mono">
                <p className="text-white font-semibold">Running ML Inference...</p>
                <p className="text-xs text-zinc-500 mt-1">Analyzing TF-IDF vectors & signatures</p>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="cyber-card p-12 flex flex-col items-center justify-center gap-4 text-center border-dashed border-zinc-800 min-h-[400px]">
              <FileWarning className="h-12 w-12 text-zinc-600" />
              <div className="font-mono">
                <p className="text-zinc-400 font-semibold uppercase">Awaiting Input</p>
                <p className="text-xs text-zinc-600 mt-1">Provide message text or upload a document to begin threat scan</p>
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
                      Scanned via Text Model
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
                    Threat levels are evaluated using class probabilities outputted by the Scikit-learn model.
                  </p>
                </div>
              </div>

              {/* Reasons */}
              <div>
                <h6 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
                  Threat Indicators & Rationale:
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
