import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:3000/generate", { prompt });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      setResponse("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Gemini AI Prompt Generator</h2>
      <textarea
        rows={4}
        style={{ width: "100%", padding: 10 }}
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {response && (
        <div style={{ marginTop: 20, background: "#f0f0f0", padding: 15, borderRadius: 5 }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
