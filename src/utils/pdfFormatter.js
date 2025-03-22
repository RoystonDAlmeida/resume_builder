// src/utils/pdfFormatter.js
import jsPDF from 'jspdf';

/**
 * Helper function to add text to the PDF with automatic line wrapping.
 *
 * @param {jsPDF} doc - The jsPDF document instance.
 * @param {string} text - The text to add.
 * @param {number} x - The x-coordinate for the text.
 * @param {number} y - The y-coordinate for the text.
 * @param {number} maxWidth - The maximum width of the text area.
 * @param {number} lineHeight - The line height for the text.
 * @param {jsPDF} doc - The jsPDF document instance.
 * @param {number} leftMargin - The left margin for the text.
 */
const addWrappedText = (doc, text, x, y, maxWidth, lineHeight, leftMargin) => {
  const words = text.split(' ');
  let line = [];
  let testLine = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    testLine += words[i] + ' ';
    const testWidth = doc.getTextWidth(testLine);

    if (testWidth > maxWidth && i > 0) {
      doc.text(line.join(' '), x, currentY);
      line = [words[i]];
      testLine = words[i] + ' ';
      currentY += lineHeight;
      if (currentY > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        currentY = 20;
      }
    } else {
      line.push(words[i]);
    }
  }
  doc.text(line.join(' '), x, currentY);
  return currentY;
};

/**
 * Formats the resume data and generates a PDF document using jsPDF.
 *
 * @param {object} resumeData - The resume data object containing all the information.
 * @returns {jsPDF|undefined} - The jsPDF document instance or undefined if there's an error.
 */
const formatResumeToPdf = (resumeData) => {
  // Create a new jsPDF document instance.
  const doc = new jsPDF();
  const fontSize = 14;
  const lineHeight = 10;
  const leftMargin = 20; // Changed to 20px
  const tabSpace = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Set default font and size
  doc.setFont('times', 'normal');
  doc.setFontSize(fontSize);
  doc.setTextColor('black');

  if (!resumeData) {
    alert('Please fill all the fields!'); // Notify the user if data is missing.
    return;
  }

  let currentY = 20;

  // --- CV Heading ---
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  const cvHeading = 'CURRICULUM VITAE';
  const cvHeadingWidth = doc.getTextWidth(cvHeading);
  const cvHeadingX = (pageWidth - cvHeadingWidth) / 2;
  doc.text(cvHeading, cvHeadingX, currentY);
  currentY += 10;

  // --- Name and Contact Information ---
  doc.setFontSize(fontSize);
  doc.setFont('times', 'normal');
  const labelWidth = doc.getTextWidth('Contact Number: Contact Number: '); // Width of the longest label
  doc.text(`Name`, leftMargin, currentY);
  doc.text(`:`, leftMargin + labelWidth, currentY);
  doc.text(`${resumeData.fullName}`, leftMargin + labelWidth + tabSpace, currentY);
  currentY += lineHeight;
  doc.text(`Contact Number`, leftMargin, currentY);
  doc.text(`:`, leftMargin + labelWidth, currentY);
  doc.text(`${resumeData.phoneNumber}`, leftMargin + labelWidth + tabSpace, currentY);
  currentY += lineHeight;
  doc.text(`Email`, leftMargin, currentY);
  doc.text(`:`, leftMargin + labelWidth, currentY);
  doc.text(`${resumeData.email}`, leftMargin + labelWidth + tabSpace, currentY);
  currentY += lineHeight;
  doc.text(`LinkedIn`, leftMargin, currentY);
  doc.text(`:`, leftMargin + labelWidth, currentY);
  doc.text(`${resumeData.linkedin}`, leftMargin + labelWidth + tabSpace, currentY);
  currentY += 10;

  // --- Objective ---
  doc.setFont('times', 'bold');
  doc.text('Objective:', leftMargin, currentY);
  currentY += lineHeight;
  doc.setFont('times', 'normal');
  let objectiveY = currentY;
  const objectiveLines = resumeData.objective.split('\n');
  objectiveLines.forEach((line) => {
    objectiveY = addWrappedText(doc, line, leftMargin, objectiveY, 170, lineHeight / 1.5, leftMargin);
  });
  currentY = objectiveY + 10; // Add space after the entire objective block

  // --- Educational Qualifications ---
  if (currentY > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFont('times', 'bold');
  doc.text('Educational Qualifications:', leftMargin, currentY, { underline: true });
  currentY += lineHeight;

  // Table Headers
  const tableHeaders = ['Board/University', 'Degree', 'Year Passed', 'Percentage'];
  const boardWidth = (pageWidth - 2 * leftMargin) * 0.25; // 30% for Board/University
  const degreeWidth = (pageWidth - 2 * leftMargin) * 0.35; // 40% for Degree
  const yearWidth = (pageWidth - 2 * leftMargin) * 0.25; // 15% for Year Passed
  const percentageWidth = (pageWidth - 2 * leftMargin) * 0.15; // 15% for Percentage
  let tableX = leftMargin;
  doc.setFont('times', 'bold');
  doc.text(tableHeaders[0], tableX, currentY);
  tableX += boardWidth;
  doc.text(tableHeaders[1], tableX, currentY);
  tableX += degreeWidth;
  doc.text(tableHeaders[2], tableX, currentY);
  tableX += yearWidth;
  doc.text(tableHeaders[3], tableX, currentY);
  currentY += lineHeight;
  doc.setFont('times', 'normal');

  // Table Rows
  if (resumeData.educationSection && Array.isArray(resumeData.educationSection)) {
    resumeData.educationSection.forEach((education) => {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      tableX = leftMargin;
      doc.text(education.universityName || education.insituteName || '', tableX, currentY);
      tableX += boardWidth;
      doc.text(education.name || '', tableX, currentY);
      tableX += degreeWidth;
      doc.text(education.YearOfPassing ? education.YearOfPassing.split('-')[0] : '', tableX, currentY);
      tableX += yearWidth;
      doc.text(education.percentage || '', tableX, currentY);
      currentY += (lineHeight / 1.5);
    });
  }
  currentY += 5;

  // --- Technical Skills ---
  if (currentY > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFont('times', 'bold');
  doc.text('Technical Skills:', leftMargin, currentY);
  currentY += lineHeight;
  doc.setFont('times', 'normal');
  if (resumeData.technicalSkills && Array.isArray(resumeData.technicalSkills)) {
    resumeData.technicalSkills.forEach((skill) => {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFont('times', 'bold');
      const categoryWidth = doc.getTextWidth(`• ${skill.category}: `);
      doc.text(`• ${skill.category}: `, leftMargin, currentY);
      doc.setFont('times', 'normal');
      currentY = addWrappedText(doc, skill.subcategory, leftMargin + categoryWidth, currentY, 170, lineHeight, leftMargin);
      currentY += (lineHeight / 2);
    });
  }
  currentY += 5;

  // --- Soft Skills ---
  if (currentY > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFont('times', 'bold');
  doc.text('Soft Skills:', leftMargin, currentY);
  currentY += lineHeight;
  doc.setFont('times', 'normal');
  if (resumeData.softSkills) {
    const softSkills = resumeData.softSkills.split(',');
    softSkills.forEach((skill) => {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(`• ${skill.trim()}`, leftMargin, currentY);
      currentY += (lineHeight / 1.5);
    });
  }
  currentY += 10;

  // --- Work Experience ---
  const innerLeftMargin = 30;
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (currentY > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFont('times', 'bold');
  doc.text('Work Experience: ', leftMargin, currentY);
  currentY += lineHeight;
  doc.setFont('times', 'normal');
  if (resumeData.workExperiences && Array.isArray(resumeData.workExperiences)) {
    resumeData.workExperiences.forEach((experience) => {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }

      const labelWidthExperience = doc.getTextWidth('Job involved the following:');
      doc.text(`Company`, innerLeftMargin, currentY);
      doc.text(`:`, innerLeftMargin + labelWidthExperience, currentY);
      doc.text(experience.companyName, innerLeftMargin + labelWidthExperience + tabSpace, currentY);
      currentY += (lineHeight / 1.5);

      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }

      doc.text(`Position`, innerLeftMargin, currentY);
      doc.text(`:`, innerLeftMargin + labelWidthExperience, currentY);
      doc.text(experience.jobTitle, innerLeftMargin + labelWidthExperience + tabSpace, currentY);
      currentY += (lineHeight / 1.5);

      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(`Period`, innerLeftMargin, currentY);
      doc.text(`:`, innerLeftMargin + labelWidthExperience, currentY);
      doc.text(
        `${formatDate(experience.fromDate)} upto ${experience.toDate ? formatDate(experience.toDate) : 'Present'}`,
        innerLeftMargin + labelWidthExperience + tabSpace,
        currentY
      );
      currentY += lineHeight;

      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFont('times', 'bold');
      doc.text(`Job involved the following:`, leftMargin, currentY);
      currentY += lineHeight;
      doc.setFont('times', 'normal');
      if (experience.responsibilities) {
        const jobDescriptions = experience.responsibilities.split('\n\n');
        jobDescriptions.forEach((description) => {
          if (currentY > pageHeight - 20) {
            doc.addPage();
            currentY = 20;
          }
          if(description.trim() !== ""){
            const cleanDescription = description.replace(/^\d+\.\s*/, '').trim();
            const initialY = currentY;
            currentY = addWrappedText(doc, `• ${cleanDescription}`, leftMargin, currentY, pageWidth - 2 * leftMargin, lineHeight * 0.8, leftMargin);

            currentY += lineHeight / 1.5; // Minimal spacing for single-line bullet points
          }
        });
      }      
      currentY += 20;
    });
  }

  return doc;
};

export { formatResumeToPdf };