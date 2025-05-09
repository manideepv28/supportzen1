import { PageHeader } from "@/components/page-header";
import { TicketTable } from "@/components/ticket-table";
import { mockTickets } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function TicketsPage() {
  // In a real app, fetch tickets for the logged-in user
  const userTickets = mockTickets;

  return (
    <div className="container mx-auto">
      <PageHeader
        title="My Support Tickets"
        description="Track and manage your support requests."
        actions={
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/submit-inquiry">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Ticket
            </Link>
          </Button>
        }
      />
      <TicketTable tickets={userTickets} />
    </div>
  );
}
