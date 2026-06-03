import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./lib/db";
import bcrypt from "bcryptjs";
import { queueWorker } from "./services/queue-worker";
import fndrRoutes from "./routes/fndr";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Middleware to parse JWT and attach user info
// This is a placeholder. In a real app, you'd verify the JWT
// and extract user ID/role from it.
app.use((req, res, next) => {
  // For demonstration, we'll mock a user based on a header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    // In a real application, you would decode and verify the JWT
    // For now, let's mock user roles based on a simple token check
    if (token === "admin-token") {
      (req as any).user = { id: "mock-admin-id", email: "admin@example.com", role: "admin" };
    } else if (token === "client-token") {
      (req as any).user = { id: "mock-client-id", email: "client@example.com", role: "client" };
    } else {
      (req as any).user = null; // Invalid token
    }
  } else {
    (req as any).user = null; // No token
  }
  next();
});

app.use("/api/fndr", fndrRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/auth/me", async (req, res) => {
  if (!(req as any).user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // In a real application, you might fetch the user's role from the DB
  // to ensure it's up-to-date, or trust the JWT payload.
  // For this task, we will return the mocked role from the middleware.
  res.json({ user: (req as any).user });
});

// User creation endpoint
app.post("/users", async (req, res) => {
  if (!(req as any).user || (req as any).user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Only admins can add users" });
  }

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password, and role are required." });
  }

  if (role !== "admin" && role !== "client") {
    return res.status(400).json({ message: "Invalid role specified. Must be 'admin' or 'client'." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role;`,
      [email, hashedPassword, role]
    );
    res.status(201).json({ message: "User created successfully", user: result.rows[0] });
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === "23505") { // Unique violation for email
      return res.status(409).json({ message: "User with this email already exists." });
    }
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const result = await pool.query(
      `SELECT id, email, password_hash, role FROM users WHERE email = $1;`,
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // For this mock, we'll return a simple token based on role.
    // In a real app, you'd generate a proper JWT.
    const token = user.role === "admin" ? "admin-token" : "client-token";

    res.json({ message: "Login successful", token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


app.listen(PORT, () => {
  console.log(`Backend template listening on port ${PORT}`);
  // Start the queue worker
  queueWorker.start().catch(err => {
    console.error('Failed to start QueueWorker:', err);
  });
});
