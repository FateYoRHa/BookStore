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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(rateLimit);
app.use(cookieParser());
// AUTH
app.use("/auth/", authRoutes);
//routes

app.use("/core/", coreRoutes);

// COMMERCE
app.use("/commerce/", commerceRoutes);
// CONTENT
app.use("/content/", contentRoutes);
app.use("/engagement/", engagementRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`CONNECTED TO PORT ${PORT}`);
  });
});
