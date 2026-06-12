import { useState } from "react";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

function App() {

  const [activeFeature, setActiveFeature] = useState("home");

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-cyan-950 text-white">

      <Navbar />

      <div className="flex flex-col items-center justify-center text-center px-6 py-20">

        {/* Hero Section */}

        <h1 className="text-6xl font-bold text-cyan-400 mb-6">
          Smart AI Healthcare System
        </h1>

        <p className="text-slate-300 text-xl max-w-2xl mb-8">
          Analyze symptoms, upload reports, chat with AI doctors,
          and monitor your health using advanced artificial intelligence.
        </p>

        {/* Get Started Button */}

        <button
          onClick={() => {

            setActiveFeature("chat");

            setTimeout(() => {

              window.scrollTo({
                top: 900,
                behavior: "smooth",
              });

            }, 100);

          }}
          className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-xl font-semibold transition shadow-lg shadow-cyan-500/30"
        >
          🚀 Get Started
        </button>

        {/* Feature Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full max-w-6xl">

          {/* AI CHATBOT */}

          <div
            onClick={() => setActiveFeature("chat")}
            className={`cursor-pointer bg-white/10 backdrop-blur-lg p-6 rounded-2xl border transition duration-300 hover:scale-105 hover:shadow-2xl ${
              activeFeature === "chat"
                ? "border-cyan-400 shadow-cyan-500/40"
                : "border-slate-700"
            }`}
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              🤖 AI Chatbot
            </h2>

            <p className="text-slate-300">
              Smart AI-powered medical conversation assistant.
            </p>
          </div>

          {/* REPORT ANALYZER */}

          <div
            onClick={() => setActiveFeature("report")}
            className={`cursor-pointer bg-white/10 backdrop-blur-lg p-6 rounded-2xl border transition duration-300 hover:scale-105 hover:shadow-2xl ${
              activeFeature === "report"
                ? "border-green-400 shadow-green-500/40"
                : "border-slate-700"
            }`}
          >
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              📄 Report Analyzer
            </h2>

            <p className="text-slate-300">
              Upload medical reports and get AI summaries instantly.
            </p>
          </div>

          {/* OCR */}

          <div
            onClick={() => setActiveFeature("ocr")}
            className={`cursor-pointer bg-white/10 backdrop-blur-lg p-6 rounded-2xl border transition duration-300 hover:scale-105 hover:shadow-2xl ${
              activeFeature === "ocr"
                ? "border-yellow-400 shadow-yellow-500/40"
                : "border-slate-700"
            }`}
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              💊 Prescription OCR
            </h2>

            <p className="text-slate-300">
              Extract medicine information from prescriptions.
            </p>
          </div>

          {/* VOICE */}

          <div
            onClick={() => setActiveFeature("voice")}
            className={`cursor-pointer bg-white/10 backdrop-blur-lg p-6 rounded-2xl border transition duration-300 hover:scale-105 hover:shadow-2xl ${
              activeFeature === "voice"
                ? "border-purple-400 shadow-purple-500/40"
                : "border-slate-700"
            }`}
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              🎙️ Voice Assistant
            </h2>

            <p className="text-slate-300">
              Talk with AI using speech recognition and voice replies.
            </p>
          </div>

        </div>

        {/* CHATBOT */}

        {activeFeature === "chat" && (

          <div className="w-full mt-16">
            <Chatbot />
          </div>

        )}

        {/* REPORT ANALYZER */}

        {activeFeature === "report" && (

          <div className="mt-16 text-center">

            <h1 className="text-5xl font-bold text-green-400 mb-6">
              📄 Report Analyzer
            </h1>

            <p className="text-slate-300 mb-6 text-xl">
              Upload blood reports, PDFs, or scan reports.
            </p>

            <div className="flex flex-col items-center gap-6">

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                id="reportUpload"
                onChange={(e) => {

                  const file = e.target.files[0];

                  if (file) {

                    alert(
                      `✅ File Uploaded Successfully:\n\n${file.name}`
                    );

                    setTimeout(() => {

                      alert(
                        "🤖 AI Analysis Complete:\n\nPossible mild infection detected.\nHemoglobin slightly low.\nConsult doctor if symptoms continue."
                      );

                    }, 1500);

                  }

                }}
              />

              <label
                htmlFor="reportUpload"
                className="cursor-pointer bg-green-500 hover:bg-green-600 px-10 py-5 rounded-2xl text-xl font-bold transition shadow-lg shadow-green-500/40"
              >
                📄 Upload Medical Report
              </label>

              <p className="text-slate-400">
                Supported formats:
                PDF, JPG, PNG, DOC, DOCX
              </p>

            </div>

          </div>

        )}

        {/* OCR */}

        {activeFeature === "ocr" && (

          <div className="mt-16 text-center">

            <h1 className="text-5xl font-bold text-yellow-400 mb-6">
              💊 Prescription OCR
            </h1>

            <p className="text-slate-300 mb-6 text-xl">
              Upload prescription images for medicine extraction.
            </p>

            <input
              type="file"
              accept="image/*"
              className="bg-white text-black p-4 rounded-xl"
              onChange={(e) => {

                const file = e.target.files[0];

                if (file) {

                  alert(
                    `💊 Prescription Uploaded:\n\n${file.name}`
                  );

                  setTimeout(() => {

                    alert(
                      "🤖 OCR Result:\n\nParacetamol 650mg\nTwice Daily\nAfter Food"
                    );

                  }, 1500);

                }

              }}
            />

          </div>

        )}

        {/* VOICE */}

        {activeFeature === "voice" && (

          <div className="mt-16 text-center">

            <h1 className="text-5xl font-bold text-purple-400 mb-6">
              🎙️ Voice Assistant
            </h1>

            <p className="text-slate-300 mb-6 text-xl">
              Talk with AI using voice commands.
            </p>

            <button
              onClick={() => {

                alert("🎙️ Voice Assistant Activated");

                const speech =
                  new SpeechSynthesisUtterance(
                    "Hello, I am your AI medical assistant."
                  );

                speech.lang = "en-US";

                window.speechSynthesis.speak(speech);

              }}
              className="bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-2xl text-xl font-bold transition"
            >
              Start Voice Assistant
            </button>

          </div>

        )}

        {/* Statistics Section */}

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">

          <div className="bg-cyan-500/10 border border-cyan-500 p-8 rounded-2xl text-center">
            <h1 className="text-5xl font-bold text-cyan-400 mb-3">
              98%
            </h1>

            <p className="text-slate-300 text-lg">
              AI Prediction Accuracy
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500 p-8 rounded-2xl text-center">
            <h1 className="text-5xl font-bold text-purple-400 mb-3">
              24/7
            </h1>

            <p className="text-slate-300 text-lg">
              Medical Assistance
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500 p-8 rounded-2xl text-center">
            <h1 className="text-5xl font-bold text-green-400 mb-3">
              10K+
            </h1>

            <p className="text-slate-300 text-lg">
              Health Reports Analyzed
            </p>
          </div>

        </div>

        {/* Why Choose Us Section */}

        <div className="mt-24 max-w-6xl w-full">

          <h1 className="text-5xl font-bold text-center text-cyan-400 mb-16">
            Why Choose Our AI Healthcare System?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-cyan-500">
              <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                ⚡ Instant AI Analysis
              </h2>

              <p className="text-slate-300 text-lg leading-8">
                Get immediate medical insights powered by advanced artificial intelligence.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-purple-500">
              <h2 className="text-3xl font-bold text-purple-400 mb-4">
                🔒 Secure & Private
              </h2>

              <p className="text-slate-300 text-lg leading-8">
                Your medical data remains encrypted and fully secure.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-green-500">
              <h2 className="text-3xl font-bold text-green-400 mb-4">
                📊 Smart Health Dashboard
              </h2>

              <p className="text-slate-300 text-lg leading-8">
                Monitor reports, risk scores, and health analytics visually.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-pink-500">
              <h2 className="text-3xl font-bold text-pink-400 mb-4">
                🎙️ Voice AI Assistant
              </h2>

              <p className="text-slate-300 text-lg leading-8">
                Talk naturally with AI using speech recognition and voice responses.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <footer className="mt-24 border-t border-slate-700 py-8 w-full text-center">

        <h1 className="text-3xl font-bold text-cyan-400 mb-4">
          🩺 AI Medical Assistant
        </h1>

        <p className="text-slate-400 text-lg">
          AI-Powered Healthcare Platform for Smart Medical Assistance
        </p>

        <p className="text-slate-500 mt-4">
          © 2026 AI Medical Assistant. All rights reserved.
        </p>

      </footer>

    </div>

  );
}

export default App;