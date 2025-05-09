import { PageHeader } from "@/components/page-header";
import { TicketDetailsView } from "@/components/ticket-details-view";
import { mockTickets } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const ticket = mockTickets.find(t => t.id === params.id);

  return (
    <div className="container mx-auto">
      <PageHeader
        title={ticket ? `Ticket Details` : "Ticket Not Found"}
        actions={
          <Button asChild variant="outline">
            <Link href="/tickets">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Tickets
            </Link>
          </Button>
        }
      />
      <TicketDetailsView ticket={ticket} />
    </div>
  );
}
