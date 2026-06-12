import PDFDocument from "pdfkit";

const generatePDF = (note, res) => {
    const doc = new PDFDocument();

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${note.title}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(24).text(note.title);

    doc.moveDown();

    doc.fontSize(14).text(note.content);

    doc.end();
};

export default generatePDF;