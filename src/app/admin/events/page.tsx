"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CreateEvent,
  useCreateEvent,
  useEvents,
  useUpdateEvent,
  useDeleteEvent,
} from "@/hooks/use-events";
import { getEventStatus } from "@/helpers/getEventStatus";
import { TableSkeleton } from "@/components/Skeletons/Table";
import { useUploadImage } from "@/hooks/use-uploads";
import Image from "next/image";
import { Label } from "@/components/ui/label";

const CreateEventSchema = z.object({
  title: z.string().min(2, "Event title is required"),
  type: z.enum(["CAMPAIGN", "OUTREACH", "WORKSHOP"]),
  date: z.string().min(2, "Event date is required"),
  location: z.string().min(2, "Event location is required"),
  description: z.string().min(2, "Event description is required"),
  capacity: z.number().optional(),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
});

type CreateEventInput = z.infer<typeof CreateEventSchema>;

const Page = () => {
  const { createEvent, isPending } = useCreateEvent();
  const { data: events, isLoading } = useEvents();
  const { updateEvent, isPending: isUpdating } = useUpdateEvent();
  const { deleteEvent, isPending: isDeleting } = useDeleteEvent();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CreateEvent | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutateAsync: uploadImage, isPending: uploading } = useUploadImage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<CreateEventInput>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      title: "",
      type: "CAMPAIGN",
      date: format(new Date(), "yyyy-MM-dd"),
      location: "",
      description: "",
      capacity: 1,
      imageUrl: "",
      imagePublicId: "",
    },
  });

  useEffect(() => {
    if (editingEvent) {
      form.reset({
        title: editingEvent.title,
        type: editingEvent.type,
        location: editingEvent.location,
        description: editingEvent.description,
        capacity: editingEvent.capacity,
        imageUrl: editingEvent.imageUrl,
        imagePublicId: editingEvent.imagePublicId,
        date: editingEvent.date
          ? new Date(editingEvent.date).toISOString().slice(0, 16)
          : "",
      });

      setIsFormOpen(true);
    }
  }, [editingEvent, form]);

  useEffect(() => {
  return () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
  };
}, [previewUrl]);

  const onSuccess = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
    form.reset();
  };

  const onSubmit = async (values: CreateEventInput) => {
  let imageUrl = values.imageUrl;
  let imagePublicId = values.imagePublicId;

  if (selectedFile) {
    const uploaded = await uploadImage(selectedFile);

    imageUrl = uploaded.url;
    imagePublicId = uploaded.publicId;
  }

  const data = {
    ...values,
    imageUrl,
    imagePublicId,
  };

  if (editingEvent?.id) {
    await updateEvent(
      {
        id: editingEvent.id,
        data,
      },
      {
        onSuccess,
      },
    );

    return;
  }

  await createEvent(data, {
    onSuccess,
  });
};

  const handleDelete = (id: string) => {
    if (id) {
      deleteEvent(id);
    }
    setIsDeleteOpen(false);
  };

  const isSaving = isPending || isUpdating || uploading;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">
            Events
          </h2>
          <p className="text-[#11111199] font-medium">
            Manage campaigns, outreach, and workshops.
          </p>
        </div>

        <Button
          onClick={() => setIsFormOpen(true)}
          className="border border-[#FF07A9] text-[#FF07A9]"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
          <div className="p-0 overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-600">
                    Title
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 text-center">
                    Type
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 text-center">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 text-center">
                    Location
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 text-center">
                    Capacity
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 text-center">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.map((ev) => (
                  <TableRow
                    key={ev.id}
                    className="hover:bg-pink-50/30 transition-colors"
                  >
                    <TableCell className="font-bold text-gray-900">
                      {ev.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="capitalize text-[#11111199] text-center"
                      >
                        {ev.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm text-center">
                      {format(new Date(ev.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-gray-700 text-center">
                      {ev.location}
                    </TableCell>
                    <TableCell className="text-gray-700 text-center">
                      {ev.attendees} / {ev.capacity}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          getEventStatus(ev.date) === "completed"
                            ? "bg-gray-100 text-gray-800 text-center"
                            : "bg-green-100 text-green-800 text-center"
                        }
                      >
                        {getEventStatus(ev.date)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 cursor-pointer"
                          onClick={() => setEditingEvent(ev)}
                        >
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 hover:text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setDeletingId(ev.id);
                            setIsDeleteOpen(true);
                          }}
                        >
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
      )}

      <Dialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) {
            setEditingEvent(null);
            form.reset();
          }
        }}
      >
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit Event" : "Create New Event"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="label">Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Event title" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="w-full h-30 shrink-0">
                <Label className="label mb-3">Event Flyer</Label>

                <Label
                  htmlFor="event-flyer"
                  className="w-full h-full border-[#8A8C8E] border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors overflow-hidden"
                >
                  {previewUrl ? (
                    <Image
                      width={128}
                      height={128}
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 mb-2 text-[#8A8C8E]" />
                      <span className="text-xs text-[#8A8C8E]">
                        Upload Image
                      </span>
                    </>
                  )}

                  <input
                    id="event-flyer"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      setSelectedFile(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }}
                  />
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <FormField
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="label">Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CAMPAIGN">Campaign</SelectItem>
                          <SelectItem value="OUTREACH">Outreach</SelectItem>
                          <SelectItem value="WORKSHOP">Workshop</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="date"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="label">Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="location"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="label">Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Lagos" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="capacity"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="label">Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="e.g. 5"
                          {...field}
                          onChange={(event) =>
                            field.onChange(event.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name={"description"}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="label">Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Event description..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                  className="button-secondary"
                >
                  Cancel
                </Button>
                <Button type="submit" className="button" disabled={isSaving}>
                  {isSaving
                    ? "Saving..."
                    : editingEvent
                      ? "Save Changes"
                      : "Create Event"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the event. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingId) {
                  handleDelete(deletingId);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;
