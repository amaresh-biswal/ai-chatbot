const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const genAI = new GoogleGenerativeAI("AIzaSyCLSydwHtpwUV6muSaet_nhMnuOgAq6FJg");

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the project root

app.post("/api/search", async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([{ text: prompt }]);
    res.json({ result: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
