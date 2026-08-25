/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { api, publicApi } from "@/lib/axios";

type VolunteerCategory =
  | "DIGITAL_ADVOCACY"
  | "COMMUNITY_OUTREACH"
  | "EDUCATION_AND_TRAINING";

export type VolunteerRolePayload = {
  roleTitle: string;
  description: string;
  requirements: string;
  slots: number;
  category: VolunteerCategory;
  applicationDeadline?: string | null;
};

export type VolunteerRole = {
  id: string;
  roleTitle: string;
  description: string;
  requirements: string;
  slots: number;
  category: VolunteerCategory;
  applicationDeadline?: string | null;
  applicantCount: number;
  isOpen: boolean;
};

type ApiResponse = {
  volunteerRole: VolunteerRole;
  message: string;
};

/* ---------------- CREATE ---------------- */

const createVolunteerRole = async (data: VolunteerRolePayload) => {
  const { data: res } = await api.post<ApiResponse>(
    "/volunteer-opportunities",
    data,
  );

  return res;
};

export const useCreateVolunteerRole = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: createVolunteerRole,

    onSuccess: (data) => {
      toast({
        title: "Volunteer role created 🎉",
        description: data.message,
      });

      queryClient.invalidateQueries({
        queryKey: ["volunteer-opportunities"],
      });
    },

    onError: (error: any) => {
      toast({
        title: "Failed to create volunteer role",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return {
    createRole: mutation.mutateAsync,
    ...mutation,
  };
};

/* ---------------- GET ALL ---------------- */

export const useVolunteerRoles = () => {
  return useQuery({
    queryKey: ["volunteer-opportunities"],

    queryFn: async () => {
      const { data } = await api.get<VolunteerRole[]>(
        "/volunteer-opportunities",
      );

      return data;
    },
  });
};

/* ---------------- GET ALL PUBLIC ROLES ---------------- */

export const usePublicVolunteerRoles = () => {
  return useQuery({
    queryKey: ["volunteer-opportunities"],

    queryFn: async () => {
      const { data } = await publicApi.get<VolunteerRole[]>("/volunteer-roles");

      return data;
    },
  });
};

/* ---------------- UPDATE ---------------- */

type UpdateVolunteerRolePayload = {
  id: string;
  data: VolunteerRolePayload;
};

const updateVolunteerRole = async ({
  id,
  data,
}: UpdateVolunteerRolePayload) => {
  const { data: res } = await api.patch<ApiResponse>(
    `/volunteer-opportunities/${id}`,
    data,
  );

  return res;
};

export const useUpdateVolunteerRole = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: updateVolunteerRole,

    onSuccess: (data) => {
      toast({
        title: "Volunteer role updated",
        description: data.message,
      });

      queryClient.invalidateQueries({
        queryKey: ["volunteer-opportunities"],
      });
    },

    onError: (error: any) => {
      toast({
        title: "Failed to update volunteer role",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return {
    updateRole: mutation.mutateAsync,
    ...mutation,
  };
};

/* ---------------- DELETE ---------------- */

const deleteVolunteerRole = async (id: string) => {
  const { data } = await api.delete<ApiResponse>(
    `/volunteer-opportunities/${id}`,
  );

  return data;
};

export const useDeleteVolunteerRole = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteVolunteerRole,

    onSuccess: (data) => {
      toast({
        title: "Volunteer role deleted",
        description: data.message,
      });

      queryClient.invalidateQueries({
        queryKey: ["volunteer-opportunities"],
      });
    },

    onError: (error: any) => {
      toast({
        title: "Failed to delete volunteer role",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return {
    deleteRole: mutation.mutateAsync,
    ...mutation,
  };
};
