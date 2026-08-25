/* eslint-disable @typescript-eslint/no-explicit-any */

import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

type CurrencyType = "NGN" | "USD";

export type Donation = {
  id: string;
  donationAmount: number;
  currency: CurrencyType;
  donationType: string;
  donorName: string;
  donorEmail: string;
  isAnon: boolean;
  reference: string;
  status: "pending" | "successful" | "failed";
  createdAt: string;
};

type DonationsResponse = {
  success: boolean;
  donations: Donation[];
};

type UpdateDonationResponse = {
  success: boolean;
  message: string;
  donation: Donation;
};

export const useDonations = () => {
  return useQuery<Donation[]>({
    queryKey: ["donations"],

    queryFn: async () => {
      const { data } = await api.get<DonationsResponse>(
        "/donations"
      );

      return data.donations;
    },
  });
};

export const useUpdateDonationStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<
    UpdateDonationResponse,
    any,
    {
      id: string;
      action: "confirm";
    }
  >({
    mutationFn: async ({ id, action }) => {
      const { data } = await api.patch<UpdateDonationResponse>(
        `/donations/${id}`,
        {
          action,
        }
      );

      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });

      toast({
        title: "Donation Confirmed",
        description: data.message,
      });
    },

    onError: (error: any) => {
      toast({
        title: "Unable to confirm donation",
        description:
          error.response?.data?.message ||
          "Something went wrong while confirming the donation.",
        variant: "destructive",
      });
    },
  });

  return {
    updateStatus: mutation.mutateAsync,
    ...mutation,
  };
};