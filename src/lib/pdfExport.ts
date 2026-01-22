import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// A4 dimensions in points (72 DPI)
const A4_WIDTH_PT = 595;
const A4_HEIGHT_PT = 842;

// Padding for multi-page splits (in mm)
const PAGE_MARGIN_MM = 0;

interface ExportOptions {
  filename?: string;
  scale?: number;
}

/**
 * Export HTML element to PDF with proper A4 multi-page support
 * Uses html2canvas for high-fidelity rendering and jsPDF for PDF generation
 */
export async function exportToPDF(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const { filename = 'Resume.pdf', scale = 2 } = options;

  // Capture the element with html2canvas
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: A4_WIDTH_PT,
    windowWidth: A4_WIDTH_PT,
    scrollX: 0,
    scrollY: 0,
    // Remove height constraint to capture full content
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  
  // Calculate dimensions
  const imgWidth = A4_WIDTH_MM;
  const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width;
  
  // Calculate number of pages needed
  const pageHeight = A4_HEIGHT_MM - (PAGE_MARGIN_MM * 2);
  const totalPages = Math.ceil(imgHeight / pageHeight);

  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  if (totalPages === 1) {
    // Single page - just add the image
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  } else {
    // Multi-page - split the image across pages
    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }

      // Calculate the position to show the correct part of the image
      const yOffset = -(page * pageHeight);
      
      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
    }
  }

  // Download the PDF
  pdf.save(filename);
}

/**
 * Generate a sanitized filename from user's name
 */
export function generateFilename(fullName?: string): string {
  if (!fullName || fullName.trim() === '') {
    return 'Resume.pdf';
  }
  return `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;
}
