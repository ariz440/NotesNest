import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
createNote,
getNotes,
getSingleNote,
deleteNote,
updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

// Upload Note + Get All Notes
router
.route("/")
.post(protect, createNote)
.get(protect, getNotes);

// Get Single Note + Update + Delete
router
.route("/:id")
.get(protect, getSingleNote)
.put(protect, updateNote)
.delete(protect, deleteNote);

export default router;
