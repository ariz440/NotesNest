import Message from "../models/Message.js";


// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message cannot be empty",
      });
    }

    const newMessage = await Message.create({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      message,
    });

    res.status(201).json(newMessage);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// Get All Messages (Everyone)
export const getMessages = async (req, res) => {
  try {

    const messages = await Message.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(messages);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// Delete Message
export const deleteMessage = async (req, res) => {
  try {

    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    // Owner or Admin can delete
    if (
      message.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await message.deleteOne();

    res.json({
      message: "Message deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// Update Message
export const updateMessage = async (req, res) => {
  try {

    const { message } = req.body;

    const existingMessage = await Message.findById(
      req.params.id
    );

    if (!existingMessage) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    // Only owner can edit
    if (
      existingMessage.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    existingMessage.message = message;

    const updatedMessage =
      await existingMessage.save();

    res.json(updatedMessage);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};