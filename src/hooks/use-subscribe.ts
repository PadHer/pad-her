/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { api, publicApi } from "@/lib/axios";

// ---------------------------------------------
// Types
// ---------------------------------------------

export type SubscriberStatus = "reactivate" | "unsubscribe";

export type Subscriber = {
  email: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  unsubscribedAt: string | null;
  unsubscribeRequestedAt: string | null;
  status: SubscriberStatus;
};

type SubscribeResponse = {
  success: boolean;
  message: string;
  data?: NewsletterSubscriber;
};

type SubscribersResponse = {
  success: boolean;
  data: NewsletterSubscriber[];
};

type UpdateSubscriberStatusPayload = {
  id: string;
  action: SubscriberStatus;
};

type UpdateSubscriberStatusResponse = {
  success: boolean;
  message: string;
  data: NewsletterSubscriber;
};

// ---------------------------------------------
// Subscribe
// ---------------------------------------------

const subscribe = async (
  data: Subscriber
): Promise<SubscribeResponse> => {
  const { data: res } = await publicApi.post<SubscribeResponse>(
    "/newsletter",
    data
  );

  return res;
};

export const useSubscribe = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: subscribe,

    onSuccess: (data) => {
      toast({
        title: "Subscription Notification 🎉",
        description: data.message,
      });

      queryClient.invalidateQueries({
        queryKey: ["subscribers"],
      });
    },

    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description:
          error.response?.data?.error ||
          "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return {
    subscribe: mutation.mutate,
  ...mutation,
  };
};

// ---------------------------------------------
// Get all subscribers
// ---------------------------------------------

export const useSubscribers = () => {
  return useQuery({
    queryKey: ["subscribers"],

    queryFn: async () => {
      const { data: response } =
        await api.get<SubscribersResponse>("/subscribers");

      return response.data;
    },
  });
};

// ---------------------------------------------
// Update subscriber status
// ---------------------------------------------

const updateSubscriberStatus = async ({
  id,
  action,
}: UpdateSubscriberStatusPayload) => {
  const { data } =
    await api.patch<UpdateSubscriberStatusResponse>(
      `/subscribers/${id}`,
      { action }
    );

  return data;
};

export const useUpdateSubscriberStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: updateSubscriberStatus,

    onSuccess: (data) => {
      toast({
        title: "Subscriber updated",
        description: data.message,
      });

      queryClient.invalidateQueries({
        queryKey: ["subscribers"],
      });
    },

    onError: (error: any) => {
      toast({
        title: "Update failed",
        description:
          error.response?.data?.message ||
          "Unable to update subscriber status",
        variant: "destructive",
      });
    },
  });

  return {
    updateStatus: mutation.mutateAsync,
    ...mutation,
  };
};