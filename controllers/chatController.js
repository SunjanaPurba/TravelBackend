const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chatWithGemini = async (req, res) => {
  // ✅ Declare userMessage here
  const userMessage = req.body?.message;
  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    // Prompt for Bangladesh travel
    const prompt = `
You are a travel guide specializing in Bangladesh. 
Answer questions only about Bangladesh travel destinations, culture, history, rivers, tea gardens, hilltops, beaches, or anything related to Bangladesh. 
Provide useful and factual information. 
User: ${userMessage}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply =
      response?.text ||
      response?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text ||
      "No reply";

    res.json({ reply });
  } catch (error) {
    console.error("❌ Gemini error:", error);
    res.status(500).json({ error: error.message || "AI error" });
  }
};

module.exports = { chatWithGemini };
