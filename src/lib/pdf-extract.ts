export interface ExtractedPage {
  pageNumber: number;
  rawText: string;
  tokenCount: number;
}

export interface PdfExtractionResult {
  pageCount: number;
  pages: ExtractedPage[];
  needsOcr: boolean;
  summary: string;
}

/**
 * Extracts text from PDF buffer
 */
export async function extractPdfText(buffer: Buffer | Uint8Array): Promise<PdfExtractionResult> {
  const uint8 = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  
  try {
    // Dynamic import pdfjs-dist for SSR / edge safety
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    
    const loadingTask = pdfjs.getDocument({
      data: uint8,
      useSystemFonts: true,
      disableFontFace: true,
    });

    const doc = await loadingTask.promise;
    const pageCount = doc.numPages;
    const pages: ExtractedPage[] = [];

    let totalChars = 0;

    for (let i = 1; i <= pageCount; i++) {
      const page = await doc.getPage(i);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map((item: any) => ('str' in item ? item.str : ''))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();

      totalChars += pageText.length;
      const tokenCount = Math.ceil(pageText.split(/\s+/).filter(Boolean).length * 1.3);

      pages.push({
        pageNumber: i,
        rawText: pageText,
        tokenCount,
      });
    }

    // If avg characters per page is less than 30, flag as needs_ocr (scanned image)
    const avgChars = pageCount > 0 ? totalChars / pageCount : 0;
    const needsOcr = avgChars < 30;

    const firstPageSnippet = pages[0]?.rawText.slice(0, 200) || '';
    const summary = `Extracted ${pageCount} pages, total ${totalChars} chars. ${needsOcr ? 'Flagged as needs_ocr.' : 'Text extraction successful.'} Preview: "${firstPageSnippet}..."`;

    return {
      pageCount,
      pages,
      needsOcr,
      summary,
    };
  } catch (error) {
    // Fallback parser if pdfjs-dist fails on binary streams
    const textDecoder = new TextDecoder('utf-8', { fatal: false });
    const rawContent = textDecoder.decode(uint8);
    
    // Extract text streams using regex from PDF
    const textMatches = rawContent.match(/\((.*?)\)\s*Tj/g) || [];
    const extractedLines = textMatches.map(m => m.replace(/^\(/, '').replace(/\)\s*Tj$/, '').replace(/\\([()\\])/g, '$1'));
    const combinedText = extractedLines.join(' ').trim();

    const pages: ExtractedPage[] = [
      {
        pageNumber: 1,
        rawText: combinedText || 'Scanned Document (No digital text stream found)',
        tokenCount: Math.ceil(combinedText.split(/\s+/).length * 1.3),
      },
    ];

    const needsOcr = combinedText.length < 30;

    return {
      pageCount: 1,
      pages,
      needsOcr,
      summary: `Fallback stream extraction: ${combinedText.length} chars. Needs OCR: ${needsOcr}`,
    };
  }
}
