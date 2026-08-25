"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  useCreateVolunteerRole,
  useVolunteerRoles,
  useUpdateVolunteerRole,
  useDeleteVolunteerRole,
  VolunteerRole,
} from "@/hooks/use-volunteer-roles";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardGridSkeleton } from "@/components/Skeletons/Card";

const CreateRoleSchema = z.object({
  roleTitle: z.string().min(2, "Role title is required"),
  description: z.string().min(2, "Role description is required"),
  requirements: z.string().min(2, "Role requirements are required"),
  category: z.enum([
    "DIGITAL_ADVOCACY",
    "COMMUNITY_OUTREACH",
    "EDUCATION_AND_TRAINING",
  ]),
  slots: z.number().min(1, "At least one slot is required"),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
});

type CreateRoleInput = z.infer<typeof CreateRoleSchema>;

const Page = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<VolunteerRole | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { createRole, isPending } = useCreateVolunteerRole();
  const { data: allRoles, isLoading } = useVolunteerRoles();
  const { updateRole, isPending: isUpdating } = useUpdateVolunteerRole();
  const { deleteRole, isPending: isDeleting } = useDeleteVolunteerRole();

  const form = useForm<CreateRoleInput>({
    resolver: zodResolver(CreateRoleSchema),
    defaultValues: {
      roleTitle: "",
      description: "",
      requirements: "",
      category: "DIGITAL_ADVOCACY",
      slots: 0,
      applicationDeadline: "",
    },
  });

  useEffect(() => {
    if (editingRole) {
      form.reset({
        roleTitle: editingRole.roleTitle,
        description: editingRole.description,
        category: editingRole.category,
        requirements: editingRole.requirements,
        slots: editingRole.slots,
        applicationDeadline: editingRole.applicationDeadline
          ? new Date(editingRole.applicationDeadline).toISOString().slice(0, 16)
          : "",
      });

      setIsFormOpen(true);
    }
  }, [editingRole, form]);

  const onSuccess = () => {
    setIsFormOpen(false);
    setEditingRole(null);
    form.reset();
  };

  const onSubmit = async (values: CreateRoleInput) => {
    if (editingRole?.id) {
      await updateRole(
        {
          id: editingRole.id,
          data: values,
        },
        {
          onSuccess,
        },
      );

      return;
    }

    await createRole(values, {
      onSuccess,
    });
  };

  const handleDelete = (id: string) => {
    if (id) {
      deleteRole(id);
    }
    setIsDeleteOpen(false);
  };

  const isSaving = isPending || isUpdating;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">
            Volunteer Roles
          </h2>
          <p className="text-[#11111199] font-medium">
            Create and manage open volunteer positions.
          </p>
        </div>
        <Dialog
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open);
            if (!open) {
              setEditingRole(null);
              form.reset();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="border border-[#FF079A] text-[#FF079A] cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              New Role
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-125">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? "Edit Role" : "Create Volunteer Role"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 py-4"
              >
                {/* Role Title */}
                <FormField
                  control={form.control}
                  name="roleTitle"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Role Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Event Coordinator"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volunteer Category</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="DIGITAL_ADVOCACY">
                            Digital Advocacy
                          </SelectItem>

                          <SelectItem value="COMMUNITY_OUTREACH">
                            Community Outreach
                          </SelectItem>

                          <SelectItem value="EDUCATION_AND_TRAINING">
                            Education & Training
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="What will this volunteer do?"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Requirements */}
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Skills, location, availability..."
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Open Slots */}
                  <FormField
                    control={form.control}
                    name="slots"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Open Slots</FormLabel>
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

                  {/* Application Deadline */}
                  <FormField
                    control={form.control}
                    name="applicationDeadline"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Application Deadline</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="pt-2">
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
                      : editingRole
                        ? "Save Changes"
                        : "Create Role"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <CardGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allRoles?.map((role) => {
            const slotsLeft = Math.max(role.slots - role.applicantCount, 0);
            const requirements = role.requirements
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean);
            return (
              <div
                key={role.id}
                className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900 text-base leading-snug">
                    {role.roleTitle}
                  </h3>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => setEditingRole(role)}
                    >
                      <Pencil className="w-3.5 h-3.5 text-blue-600" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => {
                        setDeletingId(role.id);
                        setIsDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2.5">
                  <span className="font-semibold text-gray-700">
                    Description:{" "}
                  </span>
                  {role.description}
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2.5">
                  <span className="font-semibold text-gray-700">
                    Requirements:{" "}
                  </span>
                  <ul className="mt-4 space-y-3">
                    {requirements.map((r, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 font-open text-[10px] leading-5 text-[#393939CC]"
                      >
                        <span>{idx + 1}.</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col rounded-xl bg-[#F8F8F8] p-3 items-center">
                    <p className="font-open text-[11px] text-[#777777]">
                      Applicants
                    </p>

                    <p className="mt-1 font-open text-[20px] font-semibold text-[#111111]">
                      {role.applicantCount}
                    </p>
                  </div>

                  <div className="flex flex-col rounded-xl bg-[#F8F8F8] p-3 text-center">
                    <p className="font-open text-[11px] text-[#777777]">
                      Total Slots
                    </p>

                    <p className="mt-1 font-open text-[20px] font-semibold text-[#111111] text-center">
                      {role.slots}
                    </p>
                  </div>

                  <div className="flex flex-col rounded-xl bg-[#FFF9FB] p-3 text-center">
                    <p className="font-open text-[11px] text-[#777777]">
                      Slots Left
                    </p>

                    <p className="mt-1 font-open text-[20px] font-semibold text-[#FF07A9] text-center">
                      {slotsLeft}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {allRoles?.length === 0 && (
            <div className="col-span-3 text-center text-[#11111199] py-16 bg-white rounded-2xl border border-pink-100">
              No volunteer roles yet. Create one to start accepting
              applications.
            </div>
          )}
        </div>
      )}

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this volunteer role and cannot be
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
