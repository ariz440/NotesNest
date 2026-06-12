export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      success: true,
      fileUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.originalname,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};