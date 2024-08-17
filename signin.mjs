import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Initialize the database
const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

const router = express.Router();

// Signin route
router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    const db = await dbPromise;
    const user = await db.get(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (user) {
      res.status(200).json({ message: "Signin successful", user });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error signing in user" });
  }
});

export default router;
