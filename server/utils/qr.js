const QRCode = require('qrcode');

const generateQRCodeDataUrl = async (text) => {
  try {
    const dataUrl = await QRCode.toDataURL(text);
    return dataUrl;
  } catch (err) {
    throw err;
  }
};

module.exports = { generateQRCodeDataUrl };
