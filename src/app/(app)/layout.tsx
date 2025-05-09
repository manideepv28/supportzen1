// src/app/(app)/layout.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Home,
  LifeBuoy,
  MessageSquarePlus,
  PanelLeft,
  Bell,
  Settings,
  TicketIcon,
  UserCircle,
  Users,
  PackageSearch,
  FileText
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { TooltipProvider } from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/submit-inquiry", icon: MessageSquarePlus, label: "Submit Inquiry" },
  { href: "/tickets", icon: TicketIcon, label: "My Tickets" },
  { href: "/chat", icon: Bot, label: "Chat Assistant" },
  { href: "/knowledge-base", icon: LifeBuoy, label: "Knowledge Base" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
];

const adminNavItems = [
  { href: "/admin/tickets", icon: FileText, label: "Manage Tickets" },
  { href: "/admin/users", icon: Users, label: "Manage Users" },
  { href: "/admin/products", icon: PackageSearch, label: "Manage Products (Example)" },
];


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sidebar-foreground">
            <Logo className="h-6 w-auto text-accent" />
            <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">SupportZen</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{ children: item.label, className: "ml-2" }}
                  >
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          
          {/* Example Admin Section (can be conditionally rendered based on user role) */}
          <SidebarMenu className="mt-auto pt-4 border-t border-sidebar-border">
             <SidebarMenuItem className="px-2 mb-1">
                <span className="text-xs font-medium text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">Admin</span>
             </SidebarMenuItem>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{ children: item.label, className: "ml-2" }}
                  >
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

        </SidebarContent>
        <SidebarFooter className="p-2">
          {/* Footer content if any, e.g. settings or profile button for collapsed state */}
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:p-2">
                <UserCircle className="mr-2 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden">User Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-16 sm:px-6">
          <SidebarTrigger className="md:hidden">
            <PanelLeft />
          </SidebarTrigger>
          <div className="flex-1">
            {/* Page specific title or search can go here */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/seed/supportzenuser/40/40" alt="User Avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>SZ</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

