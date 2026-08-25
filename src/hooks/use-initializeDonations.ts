"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { publicApi } from "@/lib/axios";

export type DonationCurrency = "NGN" | "USD";

export type DonationType = "one-time" | "monthly";

export type DonationPayload = {
  donationAmount: number;
  currency: DonationCurrency;
  donationType: DonationType;
  donorName: string;
  donorEmail: string;
  isAnon: boolean;
};

export type Donation = DonationPayload & {
  id: string;
  reference: string;
  status: "pending" | "successful" | "failed";
  createdAt: string;
};

type ApiResponse = {
  success: boolean;
  donation?: Donation;
  authorization_url: string;
  reference: string;
  message?: string;
};

const initializeDonation = async (
  data: DonationPayload,
): Promise<ApiResponse> => {
  const { data: response } = await publicApi.post<ApiResponse>(
    "/donations/initialize",
    data,
  );

  return response;
};

export const useInitializeDonation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: initializeDonation,

    onSuccess: (data) => {
      toast({
        title: "Donation initialized 🎉",
        description: "Redirecting to payment gateway...",
      });

      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });

      // Redirect donor to Paystack
      window.location.href = data.authorization_url;
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      toast({
        title: "Donation initialization failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  return {
    initialize: mutation.mutateAsync,
    ...mutation,
  };
};