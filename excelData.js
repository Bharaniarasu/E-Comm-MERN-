const { createWorker } = require("tesseract.js");
const XLSX = require("xlsx");

const imagePath = "./ghar.png";
const excelFileName = "output.xlsx";

// Function to perform OCR on the image and extract text.
async function extractTextFromImage() {
  try {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imagePath);
    await worker.terminate();
    return text;
  } catch (error) {
    console.error("Error extracting text from the image:", error);
    return null;
  }
}

// Function to create the Excel file and write text to it.
function writeToExcel(text) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([[text]]);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, excelFileName);
  console.log(
    "Text extracted from the image and written to Excel file successfully!"
  );
}

// Main function to extract text from image and write to Excel.
async function main() {
  const extractedText = await extractTextFromImage();
  if (extractedText) {
    writeToExcel(extractedText);
  }
}

main();
