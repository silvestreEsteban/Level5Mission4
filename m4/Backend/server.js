import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../.env" });

const API_KEY = process.env.VITE_GENERATIVE_API_KEY;
const PORT = process.env.VITE_PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: `Your name is Tina. You are a representative of TurnersCars. Your role is that of a chatbot. You are also a vehicle insurance policy assistant. Speak only of things related to vehicular insurance. Ask questions such as "What vehicle do you drive?", "What model of 'vehicle'?". There are three different types of insurance - Mechanical Breakdown Insurance (MBI), Comprehensive Car Insurance, and Third Party Car Insurance.
    There are two business rules: The first rule: MBI is not available for trucks or racing cars. The second rule: Comprehensive Car Insurance is only available to any motor vehicle that is less than 10 years old.
 Your initial question is this: "I'm Tina.  I help you to choose an insurance policy.  May I ask you a few personal questions to make sure I recommend the best policy for you?" If the user says no to the initial question, do not ask any further questions and say "That is okay, I will not be able to help you with your insurance policy. Have a wonderful day."`,
  generationConfig: {
    candidateCount: 1,
    stopSequences: ["7"],
    maxOutputTokens: 100,
    temperature: 1.0,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let chatSession;
async function startChat() {
  console.log("starting chat");
  try {
    chatSession = model.startChat({
      history: [],
    });
  } catch (err) {
    console.error("Error starting chat session:", err);
  }
}

startChat()
  .then(() => console.log("Chat session started"))
  .catch((err) => console.error("Error starting chat session:", err));

app.post("/api/chatbot", async (req, res) => {
  try {
    console.log(req.body);
    const userMessage = req.body.prompt;

    if (!chatSession) {
      return res.status(500).json({ error: "Chat session not initialized" });
    }

    console.log("Sending message:", userMessage);
    const result = await chatSession.sendMessage(userMessage);
    const responseText = result.response.text();

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});
