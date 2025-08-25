import dotenv from "dotenv";
dotenv.config(); // Load env variables
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ──────────────────────
// 🔐 Global Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ──────────────────────
// 📦 Route Imports
import userRoutes from "./routes/user.routes.js";
import skillRoutes from "./routes/skillOffer.routes.js";
import matchRequestRoutes from "./routes/matchRequest.routes.js";
import messageRoutes from "./routes/message.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

// ──────────────────────
// 🔗 Route Mounting
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/match-requests", matchRequestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/transactions", transactionRoutes);

// ──────────────────────
// 🚨 Fallback

// 404 handler
app.use( (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});


export { app };
