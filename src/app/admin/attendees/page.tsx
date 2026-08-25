"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ticket } from "lucide-react";
import { useAttendees } from "@/hooks/use-attendees";
import { useEvents } from "@/hooks/use-events";

const Page = () => {
  const { data: attendees, isLoading } = useAttendees();
  const { data: events } = useEvents();
  const [eventFilter, setEventFilter] = useState("all");

  const filtered = attendees?.filter(
    (a) => eventFilter === "all" || a.event.id === eventFilter,
  );

  const eventCounts =
    attendees?.reduce<Record<string, number>>((acc, attendee) => {
      const eventId = attendee.event.id;

      acc[eventId] = (acc[eventId] ?? 0) + 1;

      return acc;
    }, {}) ?? {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">
            Event Attendees
          </h2>
          <p className="text-[#11111199] font-medium">
            View and manage registrations across all events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-[#11111199] font-medium">
            Filter by event:
          </span>
          <Select value={eventFilter} onValueChange={setEventFilter}>
            <SelectTrigger className="w-56 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All Events ({attendees?.length ?? 0})
              </SelectItem>
              {events?.map((ev) => (
                <SelectItem key={ev.id} value={ev.id}>
                  {ev.title} ({eventCounts[ev.id] ?? 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {events?.slice(0, 4).map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-xl border border-pink-100 shadow-sm p-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <Ticket className="w-3.5 h-3.5 text-[#FF07A9]" />
              <span className="text-xs text-[#11111199] font-medium truncate">
                {ev.title}
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-gray-900">
              {eventCounts[ev.id] ?? 0}
            </p>
            <p className="text-xs text-[#11111199]">registrations</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-600">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-600">
                  Event
                </TableHead>
                <TableHead className="font-semibold text-gray-600">
                  Registered
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-10 text-[#11111199]"
                  >
                    Loading attendees...
                  </TableCell>
                </TableRow>
              ) : filtered?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-10 text-[#11111199]"
                  >
                    No attendees for this event.
                  </TableCell>
                </TableRow>
              ) : (
                filtered?.map((attendee) => (
                  <TableRow
                    key={attendee.id}
                    className="hover:bg-pink-50/30 transition-colors"
                  >
                    <TableCell className="font-bold text-gray-900">
                      {attendee.fullName}
                    </TableCell>

                    <TableCell className="text-[#11111199] text-sm">
                      {attendee.emailAddress}
                    </TableCell>

                    <TableCell className="text-gray-700 font-medium max-w-45 truncate">
                      {attendee.event.title}
                    </TableCell>

                    <TableCell className="text-gray-500 text-sm">
                      {format(
                        new Date(attendee.registeredDate),
                        "MMM dd, yyyy",
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default Page;
