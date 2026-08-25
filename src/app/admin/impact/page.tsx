"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, BarChart3, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  useAdminImpactStats,
  useCreateImpactStat,
  useUpdateImpactStat,
  type ImpactStat,
} from "@/hooks/use-impactStats";

const impactSchema = z.object({

  label: z.string().min(1, "Label is required"),

  value: z.coerce.number().int().min(0, "Value cannot be negative"),

  description: z.string().max(500, "Description is too long").optional(),

  icon: z.string().optional(),

  isActive: z.boolean(),
});

type ImpactFormData = z.infer<typeof impactSchema>;

const defaultValues: ImpactFormData = {
  label: "",
  value: 0,
  description: "",
  icon: "",
  isActive: true,
};

export default function ImpactPage() {
  const [open, setOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<ImpactStat | null>(null);

  const { data, isLoading, isError } = useAdminImpactStats();

  const createMutation = useCreateImpactStat();
  const updateMutation = useUpdateImpactStat();

  const form = useForm<ImpactFormData>({
    resolver: zodResolver(impactSchema),
    defaultValues,
  });

  const impactStats = data?.data ?? [];

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleOpenCreate = () => {
    setEditingStat(null);

    form.reset(defaultValues);

    setOpen(true);
  };

  const handleOpenEdit = (stat: ImpactStat) => {
    setEditingStat(stat);

    form.reset({
      label: stat.label,
      value: stat.value,
      description: stat.description ?? "",
      icon: stat.icon ?? "",
      isActive: stat.isActive,
    });

    setOpen(true);
  };

  const handleSubmit = async (values: ImpactFormData) => {
    if (editingStat) {
      await updateMutation.mutateAsync({
        id: editingStat.id,
        data: values,
      });
    } else {
      await createMutation.mutateAsync(values);
    }

    setOpen(false);
    setEditingStat(null);
    form.reset(defaultValues);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Yeseva" }}
          >
            Impact Stats
          </h1>

          <p className="text-[#11111199] font-medium mt-1">
            Manage the impact statistics displayed across the public website.
          </p>
        </div>

        <Dialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);

            if (!value) {
              setEditingStat(null);
              form.reset(defaultValues);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={handleOpenCreate}
              className="bg-[#FF07A9] hover:bg-[#ED006C] text-white font-medium cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Impact Stat
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-137.5 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                className="text-2xl"
                style={{ fontFamily: "Yeseva" }}
              >
                {editingStat ? "Edit Impact Stat" : "Add Impact Stat"}
              </DialogTitle>

              <DialogDescription>
                {editingStat
                  ? "Update the information displayed for this impact statistic."
                  : "Create a statistic that will be displayed on the public website."}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5 mt-4"
              >
                {/* Label */}
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>

                      <FormControl>
                        <Input placeholder="Girls Reached" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Key */}
                

                {/* Value */}
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>

                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="1250"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder="Girls who have received menstrual health support..."
                          className="min-h-25"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Icon */}
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>

                      <FormControl>
                        <Input placeholder="Users" {...field} />
                      </FormControl>

                      <p className="text-xs text-[#11111199]">
                        Optional icon name. The frontend can map this value to
                        an icon.
                      </p>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Active */}
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-xl border p-4">
                      <div>
                        <FormLabel className="text-sm font-semibold">
                          Publicly visible
                        </FormLabel>

                        <p className="text-xs text-[#11111199] mt-1">
                          Show this statistic on the public website.
                        </p>
                      </div>

                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FF07A9] hover:bg-[#ED006C] text-white"
                  >
                    {isSubmitting && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}

                    {editingStat ? "Save Changes" : "Create Stat"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#FF07A9] mb-4">
            <BarChart3 className="w-5 h-5" />
          </div>

          <p className="text-sm font-semibold text-[#11111199]">Total Stats</p>

          <p className="text-3xl font-bold text-gray-900 mt-1">
            {impactStats.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
            <Eye className="w-5 h-5" />
          </div>

          <p className="text-sm font-semibold text-[#11111199]">Active Stats</p>

          <p className="text-3xl font-bold text-gray-900 mt-1">
            {impactStats.filter((stat) => stat.isActive).length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-4">
            <EyeOff className="w-5 h-5" />
          </div>

          <p className="text-sm font-semibold text-[#11111199]">Hidden Stats</p>

          <p className="text-3xl font-bold text-gray-900 mt-1">
            {impactStats.filter((stat) => !stat.isActive).length}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-pink-50 bg-pink-50/30">
          <h2
            className="text-xl font-bold text-[#11111199]"
            style={{ fontFamily: "Yeseva" }}
          >
            Impact Statistics
          </h2>

          <p className="text-sm text-[#11111199] mt-1">
            These values are displayed on the public website.
          </p>
        </div>

        {isLoading ? (
          <div className="py-12 flex items-center justify-center text-[#11111199]">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Loading impact stats...
          </div>
        ) : isError ? (
          <div className="py-12 text-center text-red-500">
            Failed to load impact statistics.
          </div>
        ) : impactStats.length === 0 ? (
          <div className="py-16 text-center">
            <BarChart3 className="w-10 h-10 mx-auto text-gray-300 mb-3" />

            <h3 className="font-semibold text-gray-900">No impact stats yet</h3>

            <p className="text-sm text-[#11111199] mt-1">
              Add your first statistic to display it on the website.
            </p>

            <Button
              onClick={handleOpenCreate}
              className="mt-4 bg-[#FF07A9] hover:bg-[#ED006C] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Impact Stat
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {impactStats.map((stat) => (
              <div
                key={stat.id}
                className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5 hover:bg-pink-50/20 transition-colors"
              >
                {/* Icon */}
                <div className="w-12 h-12 shrink-0 rounded-full bg-pink-100 flex items-center justify-center text-[#FF07A9]">
                  <BarChart3 className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900">{stat.label}</h3>

                    <Badge
                      variant="outline"
                      className={
                        stat.isActive
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      {stat.isActive ? "Active" : "Hidden"}
                    </Badge>
                  </div>

                  {/* <p className="text-xs text-[#11111199] mt-1">{stat.key}</p> */}

                  {stat.description && (
                    <p className="text-sm text-gray-600 mt-2 max-w-2xl">
                      {stat.description}
                    </p>
                  )}
                </div>

                {/* Value */}
                <div className="md:w-32">
                  <p className="text-xs font-semibold text-[#11111199]">
                    Current Value
                  </p>

                  <p
                    className="text-2xl font-bold text-[#FF07A9]"
                    style={{ fontFamily: "Yeseva" }}
                  >
                    {stat.value.toLocaleString()}
                  </p>
                </div>

                {/* Action */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenEdit(stat)}
                  className="border-[#FF0080] text-[#FF07A9] hover:bg-[#FF07A9] hover:text-white cursor-pointer"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
