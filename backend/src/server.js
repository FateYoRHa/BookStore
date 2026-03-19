import helmet from "helmet";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import rateLimit from "./middleware/rateLimiterer.js";
import cookieParser from "cookie-parser";

import authRoutes from "./auth/auth_routes.js";
import commerceRoutes from "./routes/commerce_routes.js";
import coreRoutes from "./routes/core_routes.js";
import contentRoutes from "./routes/content_routes.js";
import engagementRoutes from "./routes/engagement_routes.js";
import adminRoutes from "./routes/admin_routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
// 1. Helmet for security headers
app.use(helmet());

// 2. CORS to allow cross-origin requests
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
// 3. Body parsers
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit);
// AUTH
app.use("/auth", authRoutes);
// ADMIN
app.use("/admin", adminRoutes);
//routes

app.use("/core", coreRoutes);

// COMMERCE
app.use("/commerce", commerceRoutes);
// CONTENT
app.use("/content", contentRoutes);
app.use("/engagement", engagementRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`CONNECTED TO PORT ${PORT}`);
  });
});
