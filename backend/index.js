
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Fetch Google API key from environment variables
const googleApiKey = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(googleApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || !messages.length) {
    return res.status(400).json({
      success: false,
      message: "messages required",
    });
  }

  // Format the conversation for Gemini API
  
try {
  // Format the conversation for Gemini API
  var formattedMessages = messages.map((item) => {
    return `${item.from === "ai" ? "AI: " : "Human: "} ${item.text}`;
  }).join("\n");

  // Make your Gemini API call here using `formattedMessages`
  // const response = await callGeminiAPI(formattedMessages);

} catch (error) {
  console.error("API error:", error);

  // Add error message to conversation
  messages.push({
    from: "ai",
    text: "Oops, something went wrong"
  });
}

  // Define prompt for Gemini model
  const prompt = `The following is a conversation between a human and an AI assistant:\n${formattedMessages}\nAI:`;

  try {
    // Use the Gemini model to generate content
    const result = await model.generateContent(prompt);

    // Assuming the response structure includes a `response.text()`
    const answer = result.response.text().trim();

    res.status(200).json({
      success: true,
      data: answer,
    });
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
});
//  
// Start the server

app.listen(5000, () => console.log("Server is runing on port 5000"));
