import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// Signup Endpoint
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const db = req.db;
  await db.read();

  // Check if user already exists
  const existing = db.data.users.find((u) => u.username === username);
  if (existing) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashed
  };

  db.data.users.push(newUser);
  await db.write();

  res.status(201).json({ message: "User created" });
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const db = req.db;
  await db.read();

  const user = db.data.users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Sign a JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

export default router;
