import bwipjs from "bwip-js";

 const generateBarcodeBuffer = async (productCode) => {
  try {
    const png = await bwipjs.toBuffer({
      bcid: "code128", // Barcode type
      text: productCode, // Text to encode
      scale: 3, // 3x scaling factor
      height: 10, // Bar height, mm
      includetext: true, // Show text below barcode
      textxalign: "center", // Center align the text
    });
    return png;
  } catch (err) {
    throw new Error("Failed to generate barcode");
  }
  
};
export default generateBarcodeBuffer