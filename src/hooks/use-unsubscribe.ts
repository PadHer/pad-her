/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { publicApi } from "@/lib/axios";

type UnsubscribePayload = {
  email: string;
};

type UnsubscribeResponse = {
  success: boolean;
  message: string;
};

const requestUnsubscribe = async (
  data: UnsubscribePayload
): Promise<UnsubscribeResponse> => {
  const { data: response } = await publicApi.post<UnsubscribeResponse>(
    "/newsletter/unsubscribe",
    data
  );

  return response;
};

export const useUnsubscribe = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: requestUnsubscribe,

    onSuccess: (data) => {
      toast({
        title: "Unsubscribe Request Submitted",
        description: data.message,
      });
    },

    onError: (error: any) => {
      toast({
        title: "Request Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    unsubscribe: mutation.mutateAsync,
    ...mutation,
  };
};