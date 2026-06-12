import Note from "../models/Note.js";
import generatePDF from "../utils/pdfGenerator.js";

export const exportNotePDF = async (req, res) => {
    try {

        const note = await Note.findById(req.params.id);

        if (!note) {

            return res.status(404).json({
                message: "Note not found",
            });

        }

        generatePDF(note, res);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};