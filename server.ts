import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, persona, location, language } = req.body;
      const systemInstruction = `You are AI Saathi, a friendly and helpful assistant for underserved communities in India.
The user is a ${persona} located in ${location}.
The user prefers to communicate in ${language}. You must understand and process any language the user inputs.
Always respond in ${language} unless the user explicitly asks you to speak in a different language.
Keep your responses short, simple, actionable, and easy to understand for someone with low digital literacy.
Avoid technical jargon.
Structure your responses with emojis for visual cues where appropriate.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  app.post("/api/schemes", async (req, res) => {
    try {
      const { persona, state, age, language } = req.body;
      const prompt = `You are an expert on Indian Government Schemes. Based on the following user profile, provide a comprehensive list of all highly relevant government schemes tailored strictly for this occupation (e.g., only farmer schemes for farmers, only artisan schemes for artisans). Do not include generic schemes unless highly applicable.
User Profile:
- Occupation: ${persona}
- State: ${state}
- Age: ${age}

Respond in ${language}. Understand any language inputs for state or occupation.
Format the response as a JSON array of objects with the following fields:
- "name": Scheme name
- "whoCanApply": Short description of eligibility
- "mainBenefit": What the scheme provides
- "documents": Array of strings (required documents)
- "process": Short description of how to apply
- "confidence": A string like "High" or "Medium" based on eligibility match.

Ensure the output is valid JSON without markdown wrapping.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.2,
        },
      });

      res.json(JSON.parse(response.text || "[]"));
    } catch (error: any) {
      console.error("========== SCHEMES API ERROR ==========");
      console.error("Timestamp:", new Date().toISOString());
      console.error("Request Body:", JSON.stringify(req.body));
      console.error("API Key Present:", !!process.env.GEMINI_API_KEY);
      console.error("Error Name:", error?.name);
      console.error("Error Message:", error?.message);
      console.error("Error Stack:", error?.stack);
      if (error?.status) console.error("Status Code:", error.status);
      if (error?.response) console.error("API Response Details:", JSON.stringify(error.response, null, 2));
      console.error("=======================================");
      
      res.status(500).json({ 
        error: "Failed to find schemes",
        debugMessage: error?.message || "Unknown error",
        apiKeyPresent: !!process.env.GEMINI_API_KEY
      });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    // Only start Vite in dev mode
    import("vite").then(({ createServer }) => {
      createServer({
        server: { middlewareMode: true },
        appType: "spa",
      }).then((vite) => {
        app.use(vite.middlewares);
      });
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only start the server locally if not in a Vercel environment
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

export default app;