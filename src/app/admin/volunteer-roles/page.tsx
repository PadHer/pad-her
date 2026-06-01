"use client";

import { useState } from "react";
import { VOLUNTEER_ROLES } from "@/data/dummy";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus, Users } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type Role = (typeof VOLUNTEER_ROLES)[0];
type RoleForm = {
  title: string;
  description: string;
  requirements: string;
  openSlots: number;
};

const Page = () => {
  const [roles, setRoles] = useState(VOLUNTEER_ROLES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleForm>();

  const openNew = () => {
    setEditingRole(null);
    reset({ title: "", description: "", requirements: "", openSlots: 1 });
    setIsFormOpen(true);
  };

  const openEdit = (role: Role) => {
    setEditingRole(role);
    reset({
      title: role.title,
      description: role.description,
      requirements: role.requirements,
      openSlots: role.openSlots,
    });
    setIsFormOpen(true);
  };

  const onSubmit = (data: RoleForm) => {
    if (editingRole) {
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editingRole.id
            ? { ...r, ...data, openSlots: Number(data.openSlots) }
            : r,
        ),
      );
      toast({
        title: "Role Updated",
        description: `"${data.title}" has been updated.`,
      });
    } else {
      const newRole: Role = {
        ...data,
        openSlots: Number(data.openSlots),
        id: `vr_${Date.now()}`,
        applicationsCount: 0,
      };
      setRoles((prev) => [newRole, ...prev]);
      toast({
        title: "Role Created",
        description: `"${data.title}" is now open for applications.`,
      });
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (deletingId) {
      const role = roles.find((r) => r.id === deletingId);
      setRoles((prev) => prev.filter((r) => r.id !== deletingId));
      toast({
        title: "Role Deleted",
        description: `"${role?.title}" has been removed.`,
      });
    }
    setIsDeleteOpen(false);
    setDeletingId(null);
  };

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
        <Button
          className="border border-[#FF079A] text-[#FF079A]"
          onClick={openNew}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-gray-900 text-base leading-snug">
                {role.title}
              </h3>
              <div className="flex gap-1 shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => openEdit(role)}
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

            <p className="text-sm text-[#11111199] leading-relaxed">
              {role.description}
            </p>

            <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2.5">
              <span className="font-semibold text-gray-700">
                Requirements:{" "}
              </span>
              {role.requirements}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-sm">
                <Users className="w-3.5 h-3.5 text-[#FF079A]" />
                <span className="font-semibold text-[#FF079A]">
                  {role.applicationsCount}
                </span>
                <span className="text-[#11111199]">applications</span>
              </div>
              <Badge
                variant="outline"
                className={
                  role.openSlots > 0
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }
              >
                {role.openSlots} slot{role.openSlots !== 1 ? "s" : ""} open
              </Badge>
            </div>
          </div>
        ))}
        {roles.length === 0 && (
          <div className="col-span-3 text-center text-[#11111199] py-16 bg-white rounded-2xl border border-pink-100">
            No volunteer roles yet. Create one to start accepting applications.
          </div>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>
              {editingRole ? "Edit Role" : "Create Volunteer Role"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Role Title</Label>
              <Input
                {...register("title", { required: true })}
                placeholder="e.g. Event Coordinator"
              />
              {errors.title && (
                <p className="text-xs text-red-500">Title is required.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                {...register("description", { required: true })}
                placeholder="What will this volunteer do?"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Requirements</Label>
              <Textarea
                {...register("requirements")}
                placeholder="Skills, location, availability..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Open Slots</Label>
              <Input
                type="number"
                min={0}
                {...register("openSlots", { required: true, min: 0 })}
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
              <Button type="submit" className="button">
                {editingRole ? "Save Changes" : "Create Role"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;
