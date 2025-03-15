import PDFMerger from 'pdf-merger-js';
import path from 'path';

const mergepdfs = async (p1, p2) => {
  try {
    const merger = new PDFMerger();
    
    await merger.add(p1);  // Merge all pages of the first PDF
    await merger.add(p2);  // Merge all pages of the second PDF
let d=new Date().getTime();
   
    await merger.save(`public/${d}.pdf`); // Save merged PDF
      return d;
    
  } catch (error) {
    console.error('Error merging PDFs:', error);
  }
};

export { mergepdfs };  // Use ES module export
