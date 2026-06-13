import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TextAnalysis from "./pages/TextAnalysis";
import UrlAnalysis from "./pages/UrlAnalysis";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#05060b] text-zinc-100 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Container */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/text" element={<TextAnalysis />} />
            <Route path="/url" element={<UrlAnalysis />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
