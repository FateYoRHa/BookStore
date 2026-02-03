import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import authorRoutes from "./routes/author_route.js";
import userRoutes from "./routes/users_route.js";
import bookRoutes from "./routes/books_route.js";
import customerRoutes from "./routes/customer_route.js";
import orderRoutes from "./routes/orders_route.js";
import rateLimit from "./middleware/rateLimiterer.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(rateLimit)

//routes
app.use("/users", userRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`CONNECTED TO PORT ${PORT}`);
  });
});
