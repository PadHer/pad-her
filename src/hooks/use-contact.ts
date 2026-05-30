// hooks/useContactMessage.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicApi } from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";

export type ContactMessagePayload = {
  fullName: string;
  organisation?: string;
  emailAddress: string;
  phoneNumber?: string;
  typeOfEnquiry: string;
  website?: string;
  message: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
};

const submitContactMessage = async (
  data: ContactMessagePayload
)=> {
  const response = await publicApi.post<ApiResponse>(
    "/contact",
    data
  );

  return response.data;
};

export const useContactMessage = () => {
  const { toast } = useToast();
    const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submitContactMessage,

    onSuccess: (data) => {
      toast({
        title: "Message sent successfully 🎉",
        description: data.message || "Message sent successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
    },

    onError: (error: any) => {
      const status = error?.response?.status;

      const message =
        error?.response?.data?.message ||
        "Something went wrong";

      if (status === 400) {
        toast({
          title: "Invalid request",
          description: message,
        });
        return;
      }

      if (status === 429) {
        toast({
          title: "Too many requests",
          description: "Please try again later.",
        });
        return;
      }

      toast({
        title: "Error",
        description: message,
      });
    },
  });
  return {
    submitMessage: mutation.mutateAsync,
    ...mutation,
  }
};