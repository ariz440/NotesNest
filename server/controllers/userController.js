import User from "../models/User.js";

// Get Profile
export const getUserProfile = async (req, res) => {
try {


const user = await User.findById(req.user._id)
  .select("-password");

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

res.status(200).json(user);


} catch (error) {


res.status(500).json({
  message: error.message,
});


}
};

// Update Avatar
export const updateAvatar = async (req, res) => {
try {


const user = await User.findById(req.user._id);

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

if (!req.file) {
  return res.status(400).json({
    message: "Please select an image",
  });
}

user.avatar = `/uploads/${req.file.filename}`;

await user.save();

res.status(200).json({
  message: "Profile photo updated successfully",
  avatar: user.avatar,
});


} catch (error) {


res.status(500).json({
  message: error.message,
});


}
};

// Get All Users (Admin)
export const getAllUsers = async (req, res) => {
try {

const users = await User.find()
  .select("-password")
  .sort({ createdAt: -1 });

res.status(200).json(users);


} catch (error) {


res.status(500).json({
  message: error.message,
});


}
};

// Delete User (Admin)
export const deleteUser = async (req, res) => {
try {


const user = await User.findById(req.params.id);

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

await user.deleteOne();

res.status(200).json({
  message: "User deleted successfully",
});


} catch (error) {


res.status(500).json({
  message: error.message,
});


}
};

// Block / Unblock User
export const toggleBlockUser = async (req, res) => {
try {


const user = await User.findById(req.params.id);

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

user.isBlocked = !user.isBlocked;

await user.save();

res.status(200).json({
  message: user.isBlocked
    ? "User blocked successfully"
    : "User unblocked successfully",
  isBlocked: user.isBlocked,
});


} catch (error) {


res.status(500).json({
  message: error.message,
});


}
};
