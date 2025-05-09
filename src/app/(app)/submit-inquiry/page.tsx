import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";

export default function SubmitInquiryPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Contact Support"
        description="Have a question or need assistance? Fill out the form below."
      />
      <ContactForm />
    </div>
  );
}
