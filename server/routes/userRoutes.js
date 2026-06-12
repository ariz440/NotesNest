import express from "express";
import protect, { admin } from "../middleware/authMiddleware.js";
import upload from "../utils/multerConfig.js";

import {
getUserProfile,
updateAvatar,
getAllUsers,
deleteUser,
toggleBlockUser,
} from "../controllers/userController.js";

const router = express.Router();

// Profile
router.get(
"/profile",
protect,
getUserProfile
);

// Update Avatar
router.put(
"/avatar",
protect,
upload.single("avatar"),
updateAvatar
);

// Get All Users (Admin)
router.get(
"/all",
protect,
admin,
getAllUsers
);

// Delete User (Admin)
router.delete(
"/:id",
protect,
admin,
deleteUser
);

// Block / Unblock User (Admin)
router.put(
"/block/:id",
protect,
admin,
toggleBlockUser
);

export default router;
