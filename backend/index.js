// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const axios = require("axios");
// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // const openaiKey = process.env.OPENAI_KEY;
// const googleApiKey = process.env.GOOGLE_API_KEY;

// app.post("/chat", async (req, res) => {
//   const { messages } = req.body;

//   if (!Array.isArray(messages) || !messages.length) {
//     res.status(400).json({
//       success: false,
//       message: "messages required",
//     });
//     return;
//   }

//   let requiredPrompt =
//     "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n" +
//     messages
//       .map((item) => `${item.from == "ai" ? "AI: " : "Human: "}${item.text}`)
//       .join("\n") +
//     "\nAI: ";

//     // const reqUrl = "https://api.openai.com/v1/chat/completions"; 
//     const reqUrl = "https://api.deepmind.com/v1/chat/completions"; 

//     const reqBody = {
//       // model: "gpt-3.5-turbo", 
//       model: "gemini-v1",
//       messages: messages.map((item) => ({
//         role: item.from === "ai" ? "assistant" : "user", // Map from "ai" to "assistant"
//         content: item.text, // Text content of the message
//       })),
//       max_tokens: 200,
//       temperature: 0.6,
//     };

//   try {
//     const response = await axios.post(reqUrl, reqBody, {
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${googleApiKey}`,
//       },
//     });
//     const data = response.data;
//     // const answer = Array.isArray(data.choices) ? data.choices[0]?.text : "";
//     const answer = Array.isArray(data.choices) ? data.choices[0]?.content : ""; 

//     res.status(200).json({
//       success: true,
//       data: answer.trim(),
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "Something went wrong",
//       error: err,
//     });
//   }
// });

// app.listen(5000, () => console.log("Server is UP at 5000"));

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
  let formattedMessages = messages.map((item) => {
    return `${item.from === "ai" ? "AI: " : "Human: "} ${item.text}`;
  }).join("\n");

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

app.listen(5000, () => console.log("Server is UP at 5000"));
