import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/export", exportRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("NotesNest API Running...");
});

app.use(notFound);

app.use(errorHandler);

export default app;