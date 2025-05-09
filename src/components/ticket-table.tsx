"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Ticket } from "@/lib/mock-data";
import Link from "next/link";
import { Eye, Filter, ArrowUpDown } from "lucide-react";
import { format, parseISO } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

interface TicketTableProps {
  tickets: Ticket[];
}

export function TicketTable({ tickets }: TicketTableProps) {
  const [statusFilter, setStatusFilter] = React.useState<Set<Ticket['status']>>(new Set(['Open', 'In Progress']));
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof Ticket | 'updatedAtFormatted', direction: 'asc' | 'desc' } | null>(null);


  const toggleStatusFilter = (status: Ticket['status']) => {
    setStatusFilter(prev => {
      const newSet = new Set(prev);
      if (newSet.has(status)) {
        newSet.delete(status);
      } else {
        newSet.add(status);
      }
      return newSet;
    });
  };
  
  const getStatusVariant = (status: Ticket["status"]) => {
    switch (status) {
      case "Open":
        return "destructive";
      case "In Progress":
        return "secondary"; // Using secondary for a neutral-positive, can be adjusted
      case "Resolved":
        return "default"; // Default is usually primary, which might be too strong. Consider a custom success variant or outline.
      case "Closed":
        return "outline";
      default:
        return "default";
    }
  };

  const sortedAndFilteredTickets = React.useMemo(() => {
    let sortableTickets = [...tickets].map(ticket => ({
      ...ticket,
      updatedAtFormatted: format(parseISO(ticket.updatedAt), "MMM d, yyyy H:mm")
    }));

    if (statusFilter.size > 0) {
      sortableTickets = sortableTickets.filter(ticket => statusFilter.has(ticket.status));
    }

    if (sortConfig !== null) {
      sortableTickets.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
           return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        // Add more type checks if needed (e.g. for dates if not pre-formatted)
        return 0;
      });
    }
    return sortableTickets;
  }, [tickets, statusFilter, sortConfig]);

  const requestSort = (key: keyof Ticket | 'updatedAtFormatted') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };


  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Support Tickets</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(['Open', 'In Progress', 'Resolved', 'Closed'] as Ticket['status'][]).map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter.has(status)}
                onCheckedChange={() => toggleStatusFilter(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableCaption>A list of your recent support tickets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ticket ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('status')} className="px-0 hover:bg-transparent">
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('priority')} className="px-0 hover:bg-transparent">
                Priority <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
                <Button variant="ghost" onClick={() => requestSort('updatedAtFormatted')} className="px-0 hover:bg-transparent">
                    Last Updated <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredTickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(ticket.status)}>{ticket.status}</Badge>
              </TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>{ticket.updatedAtFormatted}</TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/tickets/${ticket.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
           {sortedAndFilteredTickets.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                No tickets match your current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
