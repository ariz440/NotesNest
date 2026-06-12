import Note from "../models/Note.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalNotes = await Note.countDocuments({
      user: req.user._id,
    });

    const favoriteNotes = await Note.countDocuments({
      user: req.user._id,
      isFavorite: true,
    });

    const pinnedNotes = await Note.countDocuments({
      user: req.user._id,
      isPinned: true,
    });

    const archivedNotes = await Note.countDocuments({
      user: req.user._id,
      isArchived: true,
    });

    const recentNotes = await Note.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalNotes,
      favoriteNotes,
      pinnedNotes,
      archivedNotes,
      recentNotes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};