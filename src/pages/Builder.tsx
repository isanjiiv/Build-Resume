const handleExportPDF = async () => {
    // 1. Get the container element
    const templateComponent = document.querySelector('.resume-preview-container');
    if (!templateComponent) return;

    // 2. Open the print window
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // 3. COLLECT STYLES: This is the critical fix. 
    // We grab all Tailwind styles, fonts, and custom CSS from the current page.
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(style => style.outerHTML)
      .join('');

    // 4. Write the document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${resumeData.personalInfo.fullName || 'Download'}</title>
          
          ${styles}
          
          <style>
            /* Reset body for printing */
            body { 
              margin: 0; 
              padding: 0; 
              background: white;
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important; 
            }

            /* Force A4 sizing */
            @page { 
              size: A4; 
              margin: 0; 
            }

            /* Ensure the resume container takes up the full page without scaling issues */
            .resume-preview-container {
              width: 100% !important;
              max-width: 210mm !important; /* A4 Width */
              min-height: 297mm !important; /* A4 Height */
              margin: 0 auto !important;
              box-shadow: none !important;
              border: none !important;
              border-radius: 0 !important;
              transform: none !important;
            }
            
            /* Hide any scrollbars or interactive elements that might have been copied */
            ::-webkit-scrollbar { display: none; }
          </style>
        </head>
        <body>
          ${templateComponent.outerHTML}
          <script>
            // Wait slightly for styles/fonts to apply before printing
            window.onload = () => {
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };
