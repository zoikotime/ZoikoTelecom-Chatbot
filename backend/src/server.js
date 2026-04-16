const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db");
const { seedKnowledgeBase } = require("./services/chatService");
const chatRoutes = require("./routes/chat.routes");

dotenv.config();

const app = express();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

connectDB();

seedKnowledgeBase().catch((error) => {
  console.log("Knowledge seed skipped:", error.message);
});

app.use(
  cors({
    origin: [CLIENT_ORIGIN, /localhost:\d+$/],
    methods: ["GET", "POST"],
  }),
);

app.use(express.json());
app.use("/api", chatRoutes);
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

const frontendDist = path.resolve(__dirname, "..", "..", "frontend", "dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }

    return res.sendFile(path.join(frontendDist, "index.html"));
  });
}

const PORT = Number(process.env.PORT || 5000);

const server = app.listen(PORT, () => {
  console.log(`Zoiko Telecom backend running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(
      `Port ${PORT} is already in use. Change PORT in your backend .env or stop the other server.`,
    );
    return;
  }

  console.log("Server failed to start:", error.message);
});
