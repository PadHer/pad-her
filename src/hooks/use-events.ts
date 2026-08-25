/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { api, publicApi } from "@/lib/axios";

type EventType = "CAMPAIGN" | "OUTREACH" | "WORKSHOP";

export type Event = {
  id: string;
  title: string;
  type: EventType;
  date: string;
  location: string;
  description: string;
  capacity: number;
  imageUrl: string;
  imagePublicId: string;
  attendees: number;
  isOpen: boolean;
  createdAt: string;
};

export type EventPayload = {
  title: string;
  type: EventType;
  date: string;
  location: string;
  description: string;
  capacity?: number;
  imageUrl?: string;
  imagePublicId?: string;
};

type ApiResponse = {
  event: CreateEvent;
  message: string;
};

export type CreateEvent = EventPayload & {
  id: string;
  createdAt: string;
};

const createEvent = async (data: EventPayload) => {
  const { data: res } = await api.post<ApiResponse>("/events", data);
  return res;
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: (data) => {
      toast({
        title: "Event created successfully 🎉",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: any) => {
      toast({
        title: "Event creation failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
  return {
    createEvent: mutation.mutateAsync,
    ...mutation,
  };
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await api.get<Event[]>("/events");
      return data;
    },
  });
};

export const usePublicEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await publicApi.get<Event[]>("/events");
      return data;
    },
  });
};

type UpdatePayload = {
  id: string;
  data: EventPayload;
};

const updateEvent = async ({ data, id }: UpdatePayload) => {
  const { data: res } = await api.patch<ApiResponse>(`/events/${id}`, data);

  return res;
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: (data) => {
      toast({
        title: "Event updated successfully 🎉",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: any) => {
      toast({
        title: "Event update failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
  return {
    updateEvent: mutation.mutateAsync,
    ...mutation,
  };
};

/* ---------------- DELETE ---------------- */

const deleteEvent = async (id: string) => {
  const { data } = await api.delete<ApiResponse>(`/events/${id}`);

  return data;
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteEvent,

    onSuccess: (data) => {
      toast({
        title: "Event deleted",
        description: data.message,
      });

      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },

    onError: (error: any) => {
      toast({
        title: "Failed to delete event",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return {
    deleteEvent: mutation.mutateAsync,
    ...mutation,
  };
};
