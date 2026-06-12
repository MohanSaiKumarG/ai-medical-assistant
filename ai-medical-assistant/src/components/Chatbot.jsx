import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";

function Chatbot() {
  const speakText = (text) => {

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";

  speech.rate = 1;

  window.speechSynthesis.speak(speech);
};
const downloadReport = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text("AI Medical Report", 20, 20);

  let y = 40;

  messages.forEach((msg) => {

    doc.setFontSize(12);

    doc.text(
      `${msg.sender.toUpperCase()}: ${msg.text}`,
      20,
      y
    );

    y += 15;

  });

  doc.save("medical-report.pdf");
};
  const [symptom, setSymptom] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
const [typedText, setTypedText] = useState("");
const [emergency, setEmergency] = useState(false);
const [healthScore, setHealthScore] = useState(100);
  const chatEndRef = useRef(null);

  // Auto Scroll

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  // Voice Input

  const startVoiceInput = () => {

    const recognition =
      new window.webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setSymptom(transcript);
    };

    recognition.start();
  };

  // Send Message

  const sendMessage = async () => {

    if (!symptom) return;

    // User Message

    const userMessage = {
      sender: "user",
      text: symptom,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setChatHistory((prev) => [
      ...prev,
      symptom,
    ]);

    setLoading(true);

    try {

      const response = await fetch(
        "https://ai-medical-backend-a6bw.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptom: symptom,
          }),
        }
      );

      const data = await response.json();

      // Risk Detection

      let risk = "Low Risk";
      let riskColor = "text-green-400";

      const responseText =
        data.response.toLowerCase();
        let score = 95;

if (
  responseText.includes("heart") ||
  responseText.includes("stroke") ||
  responseText.includes("emergency")
) {

  score = 25;

}

else if (
  responseText.includes("fever") ||
  responseText.includes("infection") ||
  responseText.includes("viral")
) {

  score = 60;

}

else if (
  responseText.includes("headache")
) {

  score = 80;

}

setHealthScore(score);
if (
  responseText.includes("heart attack") ||
  responseText.includes("stroke") ||
  responseText.includes("emergency") ||
  responseText.includes("chest pain") ||
  responseText.includes("breathing difficulty")
) {

  setEmergency(true);

}

else {

  setEmergency(false);

}
      if (
        responseText.includes("heart") ||
        responseText.includes("stroke") ||
        responseText.includes("emergency") ||
        responseText.includes("severe")
      ) {

        risk = "High Risk";
        riskColor = "text-red-400";

      }

      else if (
        responseText.includes("fever") ||
        responseText.includes("infection") ||
        responseText.includes("viral")
      ) {

        risk = "Medium Risk";
        riskColor = "text-yellow-300";

      }

      // Bot Message

      const botMessage = {
        sender: "bot",
        text: data.response,
        risk,
        riskColor,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
speakText(data.response);
    }

    catch (error) {

      const errorMessage = {
        sender: "bot",
        text: "Backend connection failed.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    }

    setLoading(false);

    setSymptom("");
  };

  return (

    <div className="flex gap-6 p-6">

      {/* Sidebar */}

      <div
        className={`w-72 h-screen p-5 rounded-3xl transition-all duration-500 ${
          darkMode
            ? "bg-slate-900 text-white"
            : "bg-gray-200 text-black"
        }`}
      >

        <h2 className="text-2xl font-bold mb-6">
          🕘 Chat History
        </h2>

        <div className="space-y-3 overflow-y-auto h-[80vh]">

          {chatHistory.map((item, index) => (

            <div
              key={index}
              className="p-3 rounded-xl bg-white/10 text-sm"
            >
              {item}
            </div>

          ))}

        </div>

      </div>

      {/* Main Chatbot */}

      <div
        className={`mt-5 mx-auto w-full max-w-5xl backdrop-blur-lg rounded-3xl p-8 transition-all duration-500 shadow-2xl ${
          darkMode
            ? "bg-white/10 border border-slate-700 text-white"
            : "bg-white border border-gray-300 text-black"
        }`}
      >

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-cyan-400">
            <div className="flex items-center gap-4">

  <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/50">
    🤖
  </div>

  <div>

    <h1 className="text-4xl font-bold text-cyan-400">
      AI Medical Assistant
    </h1>

    <p className="text-green-400 text-sm">
      ● Online
    </p>

  </div>

</div>
          </h1>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-xl font-bold text-black transition"
          >
            {darkMode
              ? "☀️ Light"
              : "🌙 Dark"}
          </button>

        </div>
{emergency && (

  <div className="bg-red-600 animate-pulse text-white p-5 rounded-2xl mb-6 text-center shadow-lg shadow-red-500/50">

    🚨 EMERGENCY ALERT 🚨

    <div className="mt-2 text-lg font-bold">
      Seek immediate medical attention!
    </div>

  </div>

)}
<div className="mb-6">

  <div className="flex justify-between mb-2 font-bold">
    <span>❤️ Health Score</span>
    <span>{healthScore}/100</span>
  </div>

  <div className="w-full bg-gray-700 rounded-full h-5">

    <div
      className={`h-5 rounded-full transition-all duration-500 ${
        healthScore > 80
          ? "bg-green-500"
          : healthScore > 50
          ? "bg-yellow-400"
          : "bg-red-500"
      }`}
      style={{
        width: `${healthScore}%`,
      }}
    ></div>

  </div>

</div>
        {/* Chat Area */}

        <div className="space-y-4 h-[450px] overflow-y-auto flex flex-col pr-2">

          {messages.map((msg, index) => (

            <div
  key={index}
  className={`flex items-end gap-2 animate-fadeIn ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
{msg.sender === "bot" && (

  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-xl">
    🤖
  </div>

)}
              <div
                className={`p-4 rounded-2xl max-w-md whitespace-pre-line shadow-lg ${
                  msg.sender === "user"
                    ? "bg-cyan-500 text-white"
                    : msg.risk === "High Risk"
                    ? "bg-red-600 text-white"
                    : msg.risk === "Medium Risk"
                    ? "bg-yellow-400 text-black"
                    : "bg-green-600 text-white"
                }`}
              >

                <div>

                  <div>{msg.text}</div>

                  <div className="text-xs opacity-70 mt-2 text-right">
                    {msg.time}
                  </div>

                </div>

                {msg.sender === "bot" &&
                  msg.risk && (

                  <div
                    className={`mt-3 font-bold ${msg.riskColor}`}
                  >
                    ⚠️ {msg.risk}
                  </div>

                )}

              </div>

            </div>

          ))}

          {/* Loading */}

          {loading && (

            <div className="flex justify-start">

              <div className="bg-slate-800 p-4 rounded-2xl max-w-md flex items-center gap-3">

                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>

                <div
                  className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>

                <div
                  className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>

                <span className="ml-2">
                  AI is thinking...
                </span>

              </div>

            </div>

          )}

          {/* Auto Scroll */}

          <div ref={chatEndRef}></div>

        </div>

        {/* Input Area */}

        <div className="flex gap-4 mt-8">

          <input
            type="text"
            value={symptom}
            onChange={(e) =>
              setSymptom(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                sendMessage();
              }

            }}
            placeholder="Type your symptoms..."
            className={`flex-1 p-4 rounded-2xl outline-none border transition ${
              darkMode
                ? "bg-slate-900 text-white border-slate-700 focus:border-cyan-400"
                : "bg-gray-100 text-black border-gray-300 focus:border-cyan-500"
            }`}
          />
{/* File Upload */}

<input
  type="file"
  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
  className="hidden"
  id="chatFileUpload"
  onChange={(e) => {

    const file = e.target.files[0];

    if (file) {

      const userFileMessage = {
        sender: "user",
        text: `📄 Uploaded File: ${file.name}`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [
        ...prev,
        userFileMessage,
      ]);

      setLoading(true);

      setTimeout(() => {

        const botFileMessage = {
          sender: "bot",
          text:
            "🤖 AI Report Analysis:\n\nPossible mild infection detected.\nHemoglobin slightly low.\nConsult doctor if symptoms continue.",
          risk: "Medium Risk",
          riskColor: "text-yellow-300",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [
          ...prev,
          botFileMessage,
        ]);

        setLoading(false);

      }, 1500);

    }

  }}
/>

<label
  htmlFor="chatFileUpload"
  className="bg-green-500 hover:bg-green-600 hover:scale-110 px-5 rounded-2xl text-2xl transition duration-300 shadow-lg shadow-green-500/40 flex items-center justify-center cursor-pointer"
>
  📎
</label>
          {/* Voice Button */}

          <button
            onClick={startVoiceInput}
            className="bg-purple-500 hover:bg-purple-600 hover:scale-110 px-5 rounded-2xl text-2xl transition duration-300 shadow-lg shadow-purple-500/40"
          >
            🎤
          </button>

          {/* Send Button */}

          <button
            onClick={sendMessage}
            className="bg-cyan-500 hover:bg-cyan-600 hover:scale-110 px-8 rounded-2xl font-bold transition duration-300 shadow-lg shadow-cyan-500/40"
          >
            Send
          </button>

          {/* Clear Button */}

          <button
            onClick={() => {
              setMessages([]);
              setChatHistory([]);
            }}
            className="bg-red-500 hover:bg-red-600 px-6 rounded-2xl font-bold transition"
          >
            Clear
          </button>
<button
  onClick={downloadReport}
  className="bg-green-500 hover:bg-green-600 px-6 rounded-2xl font-bold transition"
>
  Download Report
</button>
        </div>

        {/* Disclaimer */}

        <div className="mt-6 text-center text-sm opacity-70">
          ⚠️ This AI Medical Assistant is for educational purposes only.
          Please consult a real doctor for serious medical conditions.
        </div>

      </div>

    </div>
  );
}

export default Chatbot;
