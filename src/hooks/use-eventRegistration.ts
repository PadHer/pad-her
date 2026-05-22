"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { api, publicApi } from "@/lib/axios";

export type EventRegistrationPayload = {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  location: string;
  whyInterest: string;
  isAgreed: boolean;
};

type ApiResponse = {
  registeration: EventRegistration;
  message: string;
};

export type EventRegistration = EventRegistrationPayload & {
  id: string;
  createdAt: string;
};

const registerForEvent = async (data: EventRegistrationPayload) => {
  const { data: res } = await publicApi.post<ApiResponse>("/event-registrations", data);
  return res;
};

export const useEventRegistration = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: registerForEvent,
    onSuccess: (data) => {
      toast({
        title: "Registration successful 🎉",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["event-registrations"] });
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
  return {
    register: mutation.mutateAsync,
    ...mutation,
  };
};

export const useEventRegistrations = () => {
  return useQuery({
    queryKey: ["event-registrations"],
    queryFn: async () => {
      const { data } = await api.get<EventRegistration[]>("/event-registrations");
      return data;
    },
  });
};