import { PageHeader } from "@/components/page-header";
import { EmailPreviewCard } from "@/components/email-preview-card";

const mockNotifications = [
  {
    subject: "Your Support Ticket #TKT-001 Has Been Received",
    senderName: "SupportZen Team",
    senderEmail: "support@supportzen.com",
    recipientName: "Alice Wonderland",
    recipientEmail: "alice@example.com",
    date: "2 days ago",
    previewText: "Thank you for contacting SupportZen! We have received your support ticket regarding 'Cannot reset password'. Our team will review your request and get back to you as soon as possible.\n\nYour Ticket ID: TKT-001\nYou can track its status here: [Link to ticket]",
    avatarSeed: "supportzenlogo",
  },
  {
    subject: "Update on Your Support Ticket #TKT-002",
    senderName: "Jane Doe (Support Agent)",
    senderEmail: "jane.doe@supportzen.com",
    recipientName: "Bob The Builder",
    recipientEmail: "bob@example.com",
    date: "3 hours ago",
    previewText: "I'm currently looking into your issue regarding 'Late Delivery for Order ORD-456'. I'll provide an update as soon as I have more information.\n\nThank you for your patience.",
    avatarSeed: "janedoe",
  },
  {
    subject: "Your Support Ticket #TKT-003 Has Been Resolved",
    senderName: "SupportZen Team",
    senderEmail: "support@supportzen.com",
    recipientName: "Carol Danvers",
    recipientEmail: "carol@example.com",
    date: "8 days ago",
    previewText: "Your support ticket concerning 'Question about product features' has been marked as resolved. We hope our assistance was helpful!\n\nIf you have any further questions, feel free to open a new ticket.",
    avatarSeed: "supportzenlogo",
  },
];


export default function NotificationsPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Email Notifications"
        description="This is a UI mock-up demonstrating automated email responses and ticket status updates."
      />
      <div className="space-y-6">
        {mockNotifications.map((notification, index) => (
          <EmailPreviewCard 
            key={index}
            subject={notification.subject}
            senderName={notification.senderName}
            senderEmail={notification.senderEmail}
            recipientName={notification.recipientName}
            recipientEmail={notification.recipientEmail}
            date={notification.date}
            previewText={notification.previewText}
            avatarSeed={notification.avatarSeed}
          />
        ))}
      </div>
    </div>
  );
}
