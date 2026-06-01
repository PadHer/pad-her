"use client";

import { useState } from "react";
import { EVENT_ATTENDEES, EVENTS } from "@/data/dummy";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Ticket } from "lucide-react";

// type Attendee = typeof EVENT_ATTENDEES[0];

const Page = () => {
  const [attendees, setAttendees] = useState(EVENT_ATTENDEES);
  const [eventFilter, setEventFilter] = useState("all");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const filtered = attendees.filter(a => eventFilter === "all" || a.eventId === eventFilter);

  const handleRemove = () => {
    if (deletingId) {
      const attendee = attendees.find(a => a.id === deletingId);
      setAttendees(prev => prev.filter(a => a.id !== deletingId));
      toast({ title: "Attendee Removed", description: `${attendee?.name} has been removed from ${attendee?.eventName}.` });
    }
    setIsDeleteOpen(false);
    setDeletingId(null);
  };

  const eventCounts = EVENTS.reduce<Record<string, number>>((acc, ev) => {
    acc[ev.id] = attendees.filter(a => a.eventId === ev.id).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">Event Attendees</h2>
          <p className="text-[#11111199] font-medium">View and manage registrations across all events.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-[#11111199] font-medium">Filter by event:</span>
          <Select value={eventFilter} onValueChange={setEventFilter}>
            <SelectTrigger className="w-56 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events ({attendees.length})</SelectItem>
              {EVENTS.map(ev => (
                <SelectItem key={ev.id} value={ev.id}>
                  {ev.title} ({eventCounts[ev.id] ?? 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {EVENTS.slice(0, 4).map(ev => (
          <div key={ev.id} className="bg-white rounded-xl border border-pink-100 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-1">
              <Ticket className="w-3.5 h-3.5 text-[#FF07A9]" />
              <span className="text-xs text-[#11111199] font-medium truncate">{ev.title}</span>
            </div>
            <p className="text-2xl font-display font-bold text-gray-900">{eventCounts[ev.id] ?? 0}</p>
            <p className="text-xs text-[#11111199]">registrations</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                <TableHead className="font-semibold text-gray-600">Email</TableHead>
                <TableHead className="font-semibold text-gray-600">Event</TableHead>
                <TableHead className="font-semibold text-gray-600">Registered</TableHead>
                {/* <TableHead className="font-semibold text-gray-600 text-center">Ticket</TableHead> */}
                <TableHead className="font-semibold text-gray-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(attendee => (
                <TableRow key={attendee.id} className="hover:bg-pink-50/30 transition-colors">
                  <TableCell className="font-bold text-gray-900">{attendee.name}</TableCell>
                  <TableCell className="text-[#11111199] text-sm">{attendee.email}</TableCell>
                  <TableCell className="text-gray-700 font-medium max-w-45 truncate">{attendee.eventName}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{format(new Date(attendee.registrationDate), "MMM dd, yyyy")}</TableCell>
                  {/* <TableCell className="text-center">
                    <Badge variant="outline" className={attendee.ticketType === "paid" ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-gray-100 text-gray-600 border-gray-200"}>
                      {attendee.ticketType === "paid" ? "Paid" : "Free"}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => { setDeletingId(attendee.id); setIsDeleteOpen(true); }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-[#11111199] py-10">No attendees for this event.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will remove this attendee&apos;s registration. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove} className="bg-red-600 hover:bg-red-700">Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
export default Page;