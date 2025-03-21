// src/utils/pdfPreview.js
import { formatResumeToPdf } from './pdfFormatter';

/**
 * Generates a PDF blob from the given resume data.
 *
 * @param {object} resumeData - The resume data object to format.
 * @returns {Blob|null} - A PDF blob if successful, null otherwise.
 */
const generatePdf = (resumeData) => {
  // Format the resume data into a jsPDF document using the formatResumeToPdf function.
  const doc = formatResumeToPdf(resumeData);
  let pdfBlob = null;
  if (doc) {
    pdfBlob = doc.output('blob');
  }

  return pdfBlob;
};

/**
 * Shows the PDF preview in an iframe by creating a URL for the blob.
 *
 * @param {Blob|null} pdfBlob - The PDF blob to preview.
 * @param {object} pdfPreviewUrl - The ref object for the PDF preview URL.
 * @param {object} pdfPreviewVisible - The ref object controlling the dialog visibility.
 */
const showPdfPreview = (pdfBlob, pdfPreviewUrl, pdfPreviewVisible) => {
  if (!pdfBlob) {
    return;
  }
  // Create an object URL for the PDF blob.
  pdfPreviewUrl.value = URL.createObjectURL(pdfBlob);

  // Set the visibility flag to true to show the preview dialog.
  pdfPreviewVisible.value = true;
};

/**
 * Downloads the PDF by creating a temporary link and triggering a click.
 *
 * @param {Blob|null} pdfBlob - The PDF blob to download.
 * @param {function} closePdfPreview - The function to close the PDF preview dialog.
 */
const downloadPdf = (pdfBlob, closePdfPreview) => {
  if (pdfBlob) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'resume.pdf';
    link.click();

    // Revoke the object URL to free up memory.
    URL.revokeObjectURL(link.href);
  }
  
  // Close the PDF preview dialog after downloading.
  closePdfPreview();
};

// Export the functions to be used in other files.
export { generatePdf, showPdfPreview, downloadPdf };