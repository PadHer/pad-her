"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LayoutDashboard,
  Heart,
  Calendar,
  FileText,
  Mail,
  Users,
  UserCheck,
  Ticket,
  Menu,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AdminLogoutButton } from "../LogoutButton/LogoutButton";
import Image from "next/image";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/overview", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/donations", label: "Donations", icon: Heart },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/newsletters", label: "Newsletter", icon: Mail },
    { href: "/admin/volunteer-roles", label: "Volunteer Roles", icon: Users },
    { href: "/admin/applicants", label: "Applicants", icon: UserCheck },
    { href: "/admin/attendees", label: "Event Attendees", icon: Ticket },
  ];

  const NavContent = () => (
    <div className="w-64 border-r border-slate-200 bg-white hidden md:flex flex-col justify-between sticky h-screen py-3">
      <ScrollArea>
        <div className="p-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-white border-border border rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Image
              src={"/logos/Main-Logo.png"}
              alt="PadHer Logo"
              priority
              height={32}
              width={32}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-playfair font-bold text-lg leading-none text-[#ff07a9]">
              Pad Her with Love
            </h1>
            <p className="text-xs text-[#11111199]">Admin Dashboard</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer",
                    isActive
                      ? "bg-[#ff07a9] text-primary-foreground shadow-md shadow-primary/25 font-open font-bold"
                      : "text-[#111111] hover:bg-muted hover:text-[#ED006C]",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-primary",
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        
      </ScrollArea>
      <div className="w-full p-6">
          <AdminLogoutButton />
        </div>
    </div>
  );
  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold">
              PadHer
            </span>
          </div>
          <span className="font-display font-bold text-lg">
            Pad Her with Love
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm pt-16">
          <NavContent />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 z-30">
        <NavContent />
      </aside>
    </>
  );
};

export default AdminSidebar;
