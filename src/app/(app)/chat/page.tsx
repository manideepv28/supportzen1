import { PageHeader } from "@/components/page-header";
import { ChatInterface } from "@/components/chat-interface";

export default function ChatPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Chat with Our Assistant"
        description="Get instant answers to your questions from our AI-powered chatbot."
      />
      <ChatInterface />
    </div>
  );
}
