const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Retry helper with exponential backoff
async function retryGeminiRequest(prompt, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
    } catch (error) {
      if (error.status === 503 && i < retries - 1) {
        console.warn(`⚠️ Gemini overloaded. Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        delay *= 2; // exponential backoff
      } else {
        throw error;
      }
    }
  }
}

const chatWithGemini = async (req, res) => {
  const userMessage = req.body?.message;
  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  // Travel-specific prompt
  const prompt = `
You are a travel guide specializing in Bangladesh. 
Answer questions only about Bangladesh travel destinations, culture, history, rivers, tea gardens, hilltops, beaches, or anything related to Bangladesh. 
Provide useful and factual information. 
User: ${userMessage}
`;

  try {
    const response = await retryGeminiRequest(prompt);

    const reply =
      response?.text ||
      response?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text ||
      "No reply";

    res.json({ reply });
  } catch (error) {
    console.error("❌ Gemini error:", error);
    if (error.status === 503) {
      res.status(503).json({
        error:
          "Gemini service is overloaded. Please try again in a few moments.",
      });
    } else {
      res.status(500).json({ error: error.message || "AI error" });
    }
  }
};

module.exports = { chatWithGemini };
