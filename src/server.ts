import dotenv from "dotenv";
dotenv.config();
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes";
import productsRoutes from "./Routes/productsRoutes";
// import categoryRoutes from "./Routes/categoryRoutes";
import cartRoutes from "./Routes/cartRoutes";
import orderRoutes from "./Routes/orderRoutes";
import authRoutes from "./Routes/authRoutes";
import adminRoutes from "./Routes/adminRoutes";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*", // for dev only
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(logger("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
// app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
