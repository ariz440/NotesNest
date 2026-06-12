import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
sendMessage,
getMessages,
deleteMessage,
updateMessage,
} from "../controllers/messageController.js";

const router = express.Router();

// Send Message
router.post(
"/",
protect,
sendMessage
);

// Get All Messages
router.get(
"/",
protect,
getMessages
);

// Update Message
router.put(
"/:id",
protect,
updateMessage
);

// Delete Message
router.delete(
"/:id",
protect,
deleteMessage
);

export default router;
