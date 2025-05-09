import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, LifeBuoy, MessageSquarePlus, TicketIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const quickLinks = [
    { href: "/submit-inquiry", icon: MessageSquarePlus, label: "Submit a New Inquiry", description: "Have a question or need help? Let us know." },
    { href: "/tickets", icon: TicketIcon, label: "View My Tickets", description: "Check the status of your existing support requests." },
    { href: "/knowledge-base", icon: LifeBuoy, label: "Explore Knowledge Base", description: "Find answers to common questions and helpful guides." },
    { href: "/chat", icon: Bot, label: "Chat with Assistant", description: "Get instant help from our AI-powered assistant." },
  ];

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Welcome to SupportZen"
        description="Your central hub for all support-related activities. We're here to help!"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {quickLinks.map((link) => (
          <Card key={link.href} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">{link.label}</CardTitle>
              <link.icon className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
              <Button asChild variant="outline" size="sm" className="mt-auto text-accent border-accent hover:bg-accent/10">
                <Link href={link.href}>
                  Go to {link.label.split(" ")[0]} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle>Need Assistance?</CardTitle>
          <CardDescription>Our team and resources are ready to assist you with any issues or questions you might have.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Self-Service Options</h3>
            <p className="text-muted-foreground mb-4">
              Many common questions can be resolved quickly by browsing our comprehensive Knowledge Base or checking our FAQs.
            </p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/knowledge-base">Explore Help Center</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image 
              src="https://picsum.photos/seed/supportteam/400/300" 
              alt="Support team illustration" 
              width={400} 
              height={300} 
              className="rounded-lg object-cover"
              data-ai-hint="support team" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
