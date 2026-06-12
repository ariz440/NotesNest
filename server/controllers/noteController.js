import Note from "../models/Note.js";

// Upload Note
export const createNote = async (req, res) => {
try {
const { title, fileName, fileUrl } = req.body;


const note = await Note.create({
  user: req.user._id,
  title,
  fileName,
  fileUrl,
  uploadedBy: req.user.name,
});

res.status(201).json(note);


} catch (error) {

res.status(500).json({
  message: error.message,
});


}
};

// Get All Notes
export const getNotes = async (req, res) => {
try {


const notes = await Note.find()
  .populate("user", "name email")
  .sort({ createdAt: -1 });

res.json(notes);


} catch (error) {


res.status(500).json({
  message: error.message,
});


}
};

// Get Single Note
export const getSingleNote = async (req, res) => {
try {


const note = await Note.findById(req.params.id);

if (!note) {
  return res.status(404).json({
    message: "Note not found",
  });
}

res.json(note);


} catch (error) {


res.status(500).json({
  message: error.message,
});


}
};

// Update Note
export const updateNote = async (req, res) => {
try {


const note = await Note.findById(req.params.id);

if (!note) {
  return res.status(404).json({
    message: "Note not found",
  });
}

if (
  note.user.toString() !== req.user._id.toString() &&
  req.user.role !== "admin"
) {
  return res.status(403).json({
    message: "Not authorized",
  });
}

note.title = req.body.title || note.title;

await note.save();

res.status(200).json({
  message: "Note updated successfully",
  note,
});


} catch (error) {


res.status(500).json({
  message: error.message,
});


}
};

// Delete Note
export const deleteNote = async (req, res) => {
try {


const note = await Note.findById(req.params.id);

if (!note) {
  return res.status(404).json({
    message: "Note not found",
  });
}

if (
  note.user.toString() !== req.user._id.toString() &&
  req.user.role !== "admin"
) {
  return res.status(403).json({
    message: "Not authorized",
  });
}

await note.deleteOne();

res.json({
  message: "Note deleted successfully",
});


} catch (error) {


res.status(500).json({
  message: error.message,
});


}
};
