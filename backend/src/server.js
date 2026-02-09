import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import rateLimit from "./middleware/rateLimiterer.js";

import authorRoutes from "./routes/core/author_route.js";
import userRoutes from "./routes/core/users_route.js";
import bookRoutes from "./routes/core/books_route.js";
import customerRoutes from "./routes/core/customer_route.js";
import orderRoutes from "./routes/commerce/orders_route.js";
import categoryRoutes from "./routes/core/category_route.js"
import contentRoutes from "./routes/content_routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(rateLimit)

//routes
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes)
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

app.use("/content/", contentRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`CONNECTED TO PORT ${PORT}`);
  });
});
