/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { api, publicApi } from "@/lib/axios";

export type VolunteerPayload = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  skills?: string[];
  additionalNotes?: string;
  availability?: string[];
  opportunityId?: string;
};

export type Volunteer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  skills?: string[];
  additionalNotes?: string;
  availability?: string[];
  opportunityId?: string;
};

type ApiResponse = {
  volunteer: Volunteer;
  message: string;
};

const volunteerApplication = async (data: VolunteerPayload) => {
  const { data: res } = await publicApi.post<ApiResponse>("/volunteer", data);
  return res;
};

export const useVolunteerApplication = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: volunteerApplication,
    onSuccess: (data) => {
      toast({
        title: "Application submitted 🎉",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Application failed",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    },
  });
  return {
    apply: mutation.mutateAsync,
    ...mutation,
  };
};

export const useVolunteers = () => {
  return useQuery({
    queryKey: ["volunteers"],
    queryFn: async () => {
      const { data } = await api.get<Volunteer[]>("/volunteers");
      return data;
    },
  });
};
