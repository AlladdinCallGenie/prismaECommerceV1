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

/**
 * {
  "message": "LoggedIn Successfull...",
  "loggedInUser": {
    "id": 9,
    "username": "muhid165",
    "email": "shaikhmuhid165@gmail.com",
    "first_name": "muhid",
    "last_name": "shaikh",
    "password": "$2b$10$eAXhS6DlrDgQvK1Fj1sfz.MxLQEYiOWoCqTkIq6R8MSL/KnMxVjWi",
    "isDeleted": false,
    "createdAt": "2025-08-20T09:06:51.734Z",
    "last_login": "2025-08-25T11:35:59.882Z",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzU2MTIxNzU5LCJleHAiOjE3NTY3MjY1NTl9.iWjbicHCbA31kY-aBfAvR6rLhNZEazt9O6LVhmSeJkw",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWlraG11aGlkMTY1QGdtYWlsLmNvbSIsImlhdCI6MTc1NjEyMTc1OSwiZXhwIjoxNzU2MTI1MzU5fQ.GjTJ3vcNgZ0_LktU1htePlhqrc_fjU2bTkU02C-_zxA",
    "role": "ADMIN"
  }
}
 */

