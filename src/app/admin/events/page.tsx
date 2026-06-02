/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { EVENTS } from "@/data/dummy";
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useForm, Controller } from "react-hook-form";

type EventType = typeof EVENTS[0];

const Page = () => {
  const [events, setEvents] = useState(EVENTS);
  const { toast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, control } = useForm<Omit<EventType, "id" | "attendees" | "status">>();

  const openNewForm = () => {
    setEditingEvent(null);
    reset({
      title: "",
      type: "campaign",
      date: format(new Date(), "yyyy-MM-dd"),
      location: "",
      description: "",
      capacity: 100,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (ev: EventType) => {
    setEditingEvent(ev);
    reset({
      title: ev.title,
      type: ev.type as any,
      date: ev.date,
      location: ev.location,
      description: ev.description,
      capacity: ev.capacity,
    });
    setIsFormOpen(true);
  };

  const onSubmit = (data: any) => {
    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? { ...e, ...data } : e));
      toast({ title: "Event Updated", description: "The event has been updated successfully." });
    } else {
      const newEvent: EventType = {
        ...data,
        id: `ev_${Date.now()}`,
        attendees: 0,
        status: "upcoming"
      };
      setEvents(prev => [newEvent, ...prev]);
      toast({ title: "Event Created", description: "The new event has been created successfully." });
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (deletingId) {
      setEvents(prev => prev.filter(e => e.id !== deletingId));
      toast({ title: "Event Deleted", description: "The event has been removed." });
    }
    setIsDeleteOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">Events</h2>
          <p className="text-[#11111199] font-medium">Manage campaigns, outreach, and workshops.</p>
        </div>
        
        <Button onClick={openNewForm} className="border border-[#FF07A9] text-[#FF07A9]">
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">Title</TableHead>
                <TableHead className="font-semibold text-gray-600">Type</TableHead>
                <TableHead className="font-semibold text-gray-600">Date</TableHead>
                <TableHead className="font-semibold text-gray-600">Location</TableHead>
                <TableHead className="font-semibold text-gray-600">Capacity</TableHead>
                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                <TableHead className="font-semibold text-gray-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((ev) => (
                <TableRow key={ev.id} className="hover:bg-pink-50/30 transition-colors">
                  <TableCell className="font-bold text-gray-900">{ev.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize text-[#11111199]">{ev.type}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">{format(new Date(ev.date), "MMM dd, yyyy")}</TableCell>
                  <TableCell className="text-gray-700">{ev.location}</TableCell>
                  <TableCell className="text-gray-700">{ev.attendees} / {ev.capacity}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={ev.status === 'completed' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}>
                      {ev.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEditForm(ev)}>
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-red-600 hover:bg-red-50" onClick={() => { setDeletingId(ev.id); setIsDeleteOpen(true); }}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...register("title", { required: true })} placeholder="Event title" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="campaign">Campaign</SelectItem>
                        <SelectItem value="outreach">Outreach</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" {...register("date", { required: true })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input {...register("location", { required: true })} placeholder="e.g. Lagos" />
              </div>
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input type="number" {...register("capacity", { required: true, valueAsNumber: true })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea {...register("description")} placeholder="Event description..." />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="button-secondary">Cancel</Button>
              <Button type="submit" className="button">Save Event</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the event. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

export default Page;