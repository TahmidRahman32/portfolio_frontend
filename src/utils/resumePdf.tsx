"use client";

import { pdf } from "@react-pdf/renderer";
import { ResumeData, ResumeTemplate } from "@/Types/Resume";
import ResumePDFDocument from "@/components/comonLayout/resume/ResumePDFDocument";

export async function downloadResumePdf(data: ResumeData, template: ResumeTemplate): Promise<void> {
   const blob = await pdf(<ResumePDFDocument data={data} template={template} />).toBlob();
   if (blob.size === 0 || blob.type !== "application/pdf") {
      throw new Error("PDF generation returned an invalid file");
   }

   const name = data.personalInfo.fullName.trim().replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").replace(/\s+/g, "_") || "resume";
   const url = URL.createObjectURL(blob);
   const anchor = document.createElement("a");
   anchor.href = url;
   anchor.download = `${name}_Resume.pdf`;
   anchor.style.display = "none";
   try {
      document.body.appendChild(anchor);
      anchor.click();
   } finally {
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
   }
}
