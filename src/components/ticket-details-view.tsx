"use client";

import type { Ticket } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, UserCircle, Send, Paperclip } from "lucide-react";
import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TicketDetailsViewProps {
  ticket: Ticket | undefined;
}

export function TicketDetailsView({ ticket }: TicketDetailsViewProps) {
  const [reply, setReply] = useState("");
  const { toast } = useToast();

  if (!ticket) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Ticket Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The requested ticket could not be found. It might have been deleted or the ID is incorrect.</p>
        </CardContent>
      </Card>
    );
  }
  
  const handleReplySubmit = async () => {
    if (reply.trim() === "") return;
    // Simulate API call
    console.log("Replying to ticket:", ticket.id, "with:", reply);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // This is a mock update. In a real app, you'd refetch or update state more robustly.
    ticket.responses.push({
        author: ticket.customer.name, // Assuming user is replying
        message: reply,
        timestamp: new Date().toISOString(),
    });
    // Add a mock agent response
     ticket.responses.push({
        author: "Support Agent",
        message: "Thank you for your reply. We are looking into this.",
        timestamp: new Date(Date.now() + 5000).toISOString(), // 5 seconds later
    });
    ticket.updatedAt = new Date().toISOString();
    ticket.status = "In Progress";


    setReply("");
    toast({
      title: "Reply Sent",
      description: "Your reply has been added to the ticket.",
    });
  };


  const getStatusVariant = (status: Ticket["status"]) => {
    switch (status) {
      case "Open": return "destructive";
      case "In Progress": return "secondary";
      case "Resolved": return "default";
      case "Closed": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xl">
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <CardTitle className="text-2xl">{ticket.subject}</CardTitle>
              <CardDescription>Ticket ID: {ticket.id} {ticket.orderId && `| Order ID: ${ticket.orderId}`}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={getStatusVariant(ticket.status)} className="text-sm px-3 py-1">{ticket.status}</Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">{ticket.priority} Priority</Badge>
            </div>
          </div>
          <div className="text-xs text-muted-foreground pt-2">
            Created: {format(parseISO(ticket.createdAt), "MMM d, yyyy 'at' h:mm a")} | Last Updated: {format(parseISO(ticket.updatedAt), "MMM d, yyyy 'at' h:mm a")}
          </div>
           <div className="text-sm pt-1">
            Customer: {ticket.customer.name} ({ticket.customer.email})
            {ticket.agent && ` | Assigned to: ${ticket.agent.name}`}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-2">Initial Description:</h3>
          <p className="text-muted-foreground whitespace-pre-wrap bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
            {ticket.description}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Conversation History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ticket.responses.length === 0 && <p className="text-muted-foreground">No responses yet.</p>}
          {ticket.responses.map((response, index) => (
            <div key={index} className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={`https://picsum.photos/seed/${response.author.replace(/\s+/g, '')}/40/40`} data-ai-hint="user avatar" />
                <AvatarFallback>
                  {response.author.includes("Support") || response.author.includes("Bot") ? <Bot size={20}/> : <UserCircle size={20}/>}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted/50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-sm">{response.author}</p>
                  <p className="text-xs text-muted-foreground">{format(parseISO(response.timestamp), "MMM d, h:mm a")}</p>
                </div>
                <p className="text-sm whitespace-pre-wrap">{response.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {ticket.status !== 'Closed' && ticket.status !== 'Resolved' && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Add a Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type your reply here..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="min-h-[100px] mb-4"
            />
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">
                <Paperclip className="mr-2 h-4 w-4" /> Attach File
              </Button>
              <Button onClick={handleReplySubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Send className="mr-2 h-4 w-4" /> Send Reply
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      { (ticket.status === 'Closed' || ticket.status === 'Resolved') && (
         <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Ticket Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This ticket is currently {ticket.status.toLowerCase()}. If you need further assistance, please create a new ticket.</p>
             <Button asChild variant="outline" className="mt-4">
                <Link href="/submit-inquiry">Create New Ticket</Link>
             </Button>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
