import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Initialize the database
const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

const router = express.Router();

// Create users table if it doesn't exist
dbPromise.then(async (db) => {
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT,
      lastname TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
});

// Signup route
router.post("/api/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = await dbPromise;
    await db.run(
      `INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`,
      [firstname, lastname, email, password]
    );
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") {
      res.status(409).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Error signing up user" });
    }
  }
});

export default router;
