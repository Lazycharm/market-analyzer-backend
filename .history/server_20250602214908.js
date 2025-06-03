import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Low, JSONFile } from "lowdb";
import authRoutes from "./routes/auth.js";
import marketsRoutes from "./routes/markets.js";
import newsRoutes from "./routes/news.js";
import favoritesRoutes from "./routes/favorites.js";
import aiRoutes from "./routes/ai.js";
import analyzeRoutes from "./routes/analyze.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// LowDB setup
const adapter = new JSONFile("db.json");
const db = new Low(adapter);
await db.read();
// Initialize default structure if db.json was empty
db.data = db.data || { users: [], favorites: [] };
await db.write();

// Attach db instance to each request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/markets", marketsRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/ai-predict", aiRoutes);
app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => {
  res.send("Market Analyzer Backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
