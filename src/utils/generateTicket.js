import { PDFDocument, rgb } from 'pdf-lib';
import QRCode from 'qrcode';

const generateTicketPDF = async (conference, presenter) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText(`Conference: ${conference.title}`, {
        x: 50,
        y: 350,
        size: 30,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Presenter: ${presenter.username}`, {
        x: 50,
        y: 320,
        size: 20,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Email: ${presenter.email}`, {
        x: 50,
        y: 290,
        size: 20,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Department: ${presenter.department}`, {
        x: 50,
        y: 260,
        size: 20,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Phone Number: ${presenter.phoneNo}`, {
        x: 50,
        y: 230,
        size: 20,
        color: rgb(0, 0, 0),
    });

    const qrCodeDataUrl = await QRCode.toDataURL(`Conference ID: ${conference._id}\nPresenter: ${presenter.username}`);
    const qrImage = await pdfDoc.embedPng(qrCodeDataUrl);
    page.drawImage(qrImage, {
        x: 350,
        y: 50,
        width: 200,
        height: 200,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ticket.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default generateTicketPDF;
