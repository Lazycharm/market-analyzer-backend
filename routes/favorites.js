import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Middleware to verify JWT
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// GET /api/favorites
// Returns favorites for the logged-in user
router.get("/", authenticate, async (req, res) => {
  const db = req.db;
  await db.read();
  const userId = req.user.id;
  const favs = db.data.favorites.filter((f) => f.userId === userId);
  res.json(favs);
});

// POST /api/favorites
// Body: { symbol, name, change }
router.post("/", authenticate, async (req, res) => {
  const db = req.db;
  await db.read();
  const userId = req.user.id;
  const { symbol, name, change } = req.body;

  if (!symbol || !name) {
    return res.status(400).json({ message: "Missing symbol or name" });
  }

  const newFav = {
    id: Date.now().toString(),
    userId,
    symbol,
    name,
    change: change || 0
  };
  db.data.favorites.push(newFav);
  await db.write();
  res.status(201).json(newFav);
});

// DELETE /api/favorites/:id
router.delete("/:id", authenticate, async (req, res) => {
  const db = req.db;
  await db.read();
  const userId = req.user.id;
  const favId = req.params.id;

  const index = db.data.favorites.findIndex(
    (f) => f.id === favId && f.userId === userId
  );
  if (index === -1) {
    return res.status(404).json({ message: "Favorite not found" });
  }
  db.data.favorites.splice(index, 1);
  await db.write();
  res.json({ message: "Deleted" });
});

export default router;
