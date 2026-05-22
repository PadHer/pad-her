"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { api, publicApi } from "@/lib/axios";

export type DonationPayload = {
  donationAmount: number;
  donationType: string;
  donorName: string;
  donorEmail: string;
  isAnon: boolean;
};

export type Donation = DonationPayload & {
  id: string;
  reference: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
};

type ApiResponse = {
  donation: Donation;
  authorization_url: string;
  reference: string;
};

const initializeDonation = async (data: DonationPayload) => {
  const { data: res } = await publicApi.post<ApiResponse>("/donations/initialize", data);
  return res;
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
      queryClient.invalidateQueries({ queryKey: ["donations"] });
      // Redirect to Paystack authorization URL
      window.location.href = data.authorization_url;
    },
    onError: (error: any) => {
      toast({
        title: "Donation initialization failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
  return {
    initialize: mutation.mutateAsync,
    ...mutation,    
    };
};