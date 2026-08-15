import fs from 'fs';
import path from 'path';

function createSimplePdf(title, pagesContent) {
  // Construct minimal valid PDF with text streams
  const objects = [];
  let offset = 0;
  const offsets = [];

  function addObject(content) {
    const objNum = objects.length + 1;
    offsets.push(offset);
    const str = `${objNum} 0 obj\n${content}\nendobj\n`;
    objects.push(str);
    offset += Buffer.byteLength(str, 'utf-8');
    return objNum;
  }

  // Header
  let pdf = "%PDF-1.4\n";
  offset = Buffer.byteLength(pdf, 'utf-8');

  const fontObj = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  const pageObjNums = [];

  for (let i = 0; i < pagesContent.length; i++) {
    const pageText = pagesContent[i];
    // Clean stream
    const escapedText = pageText.replace(/[\(\)\\]/g, '\\$&').replace(/\n/g, ' ');
    const streamContent = `BT /F1 14 Tf 50 700 Td (${escapedText}) Tj ET`;
    const length = Buffer.byteLength(streamContent, 'utf-8');
    
    const contentObj = addObject(`<< /Length ${length} >>\nstream\n${streamContent}\nendstream`);
    
    const pageObj = addObject(`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 ${fontObj} 0 R >> >> /MediaBox [0 0 612 792] /Contents ${contentObj} 0 R >>`);
    pageObjNums.push(pageObj);
  }

  // Pages parent object
  const pagesList = pageObjNums.map(n => `${n} 0 R`).join(' ');
  const pagesRootObj = addObject(`<< /Type /Pages /Kids [${pagesList}] /Count ${pagesContent.length} >>`);

  // Catalog object
  const catalogObj = addObject(`<< /Type /Catalog /Pages ${pagesRootObj} 0 R >>`);

  // XREF
  const xrefOffset = offset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let o of offsets) {
    xref += String(o).padStart(10, '0') + " 00000 n \n";
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return pdf + objects.join('') + xref + trailer;
}

const docs = [
  {
    dir: 'content/subjects/database-systems/slides',
    name: 'chapter-01.pdf',
    title: 'Chapter 1: Relational Model & Keys',
    pages: [
      'Database Systems - Chapter 1: Relational Model Concepts and Schema Definitions.',
      'Primary Key uniquely identifies each row in a relation. It cannot contain NULL values.',
      'Foreign Key references the primary key of another table to maintain Referential Integrity.',
      'Integrity constraints enforce domain consistency, entity integrity, and referential integrity.'
    ]
  },
  {
    dir: 'content/subjects/database-systems/slides',
    name: 'chapter-02.pdf',
    title: 'Chapter 2: SQL Queries & Joins',
    pages: [
      'Chapter 2: SQL DDL, DML, DQL and Relational Algebra mapping.',
      'INNER JOIN returns only rows that satisfy the matching condition in both tables.',
      'LEFT OUTER JOIN preserves all rows from the left table with NULLs for unmatched right rows.',
      'GROUP BY aggregates rows by specified columns and HAVING filters grouped results.'
    ]
  },
  {
    dir: 'content/subjects/database-systems/slides',
    name: 'chapter-03.pdf',
    title: 'Chapter 3: Normalization & BCNF',
    pages: [
      'Chapter 3: Normalization, Functional Dependencies X -> Y.',
      'First Normal Form 1NF requires all attributes to have atomic values and no repeating groups.',
      'Second Normal Form 2NF requires 1NF and no partial dependencies on a composite primary key.',
      'Third Normal Form 3NF requires 2NF and no transitive functional dependencies X -> Y -> Z.',
      'BCNF requires that for every functional dependency X -> A, X must be a superkey.'
    ]
  },
  {
    dir: 'content/subjects/database-systems/past-exams',
    name: 'midterm-2025.pdf',
    title: 'Database Midterm Exam 2025',
    pages: [
      'Database Systems Midterm Examination 2025 Past Paper. Part 1: Multiple Choice questions on ER and Relational.',
      'Part 2: SQL Query optimization and Relational Algebra equivalences.'
    ]
  },
  {
    dir: 'content/subjects/computer-networks/slides',
    name: 'chapter-01.pdf',
    title: 'Chapter 1: OSI & TCP/IP Architecture',
    pages: [
      'Computer Networks - Chapter 1: OSI 7-Layer Reference Model vs TCP/IP Architecture.',
      'Physical, Data Link, Network, Transport, Session, Presentation, Application layers.',
      'Data Link Layer uses MAC addresses and Ethernet frames. Error detection uses CRC.'
    ]
  },
  {
    dir: 'content/subjects/computer-networks/past-exams',
    name: 'final-2025.pdf',
    title: 'Computer Networks Final Exam 2025',
    pages: [
      'Computer Networks Final Examination Past Exam Paper 2025.',
      'Section A: Subnetting, CIDR, Transport Layer Handshakes and Congestion Control.'
    ]
  }
];

for (const doc of docs) {
  fs.mkdirSync(doc.dir, { recursive: true });
  const pdfContent = createSimplePdf(doc.title, doc.pages);
  fs.writeFileSync(path.join(doc.dir, doc.name), pdfContent, 'utf-8');
  console.log(`Generated ${path.join(doc.dir, doc.name)} (${doc.pages.length} pages)`);
}
