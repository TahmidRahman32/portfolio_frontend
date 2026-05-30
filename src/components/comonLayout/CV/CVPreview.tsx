

// import { CVData, CVTemplate } from "../type/cv";
import { CVData, CVTemplate } from "@/Types/cv";
import CreativeTemplate from "./templates/CreativeTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

interface CVPreviewProps {
   data: CVData;
   template: CVTemplate;
}

export default function CVPreview({ data, template }: CVPreviewProps) {
   switch (template) {
      case "professional":
         return <ProfessionalTemplate data={data} />;
      case "modern":
         return <ModernTemplate data={data} />;
      case "creative":
         return <CreativeTemplate data={data} />;
      case "minimal":
         return <MinimalTemplate data={data} />;
      default:
         return <ProfessionalTemplate data={data} />;
   }
}
