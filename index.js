const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GoogleGenAI,
  httpOptions: { apiVersion: "v1alpha" },
});


app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

  
    res.json({ response: result?.text || "No response text found." });
  } catch (error) {
    console.error("Error calling AI model:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
