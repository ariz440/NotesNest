import express from "express";
import protect from "../middleware/authMiddleware.js";
import { exportNotePDF } from "../controllers/exportController.js";

const router = express.Router();

router.get("/:id/pdf", protect, exportNotePDF);

export default router;