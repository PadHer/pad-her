/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { publicApi, api  } from "@/lib/axios";

export type ImpactStat = {
  id: string;
  key: string;
  label: string;
  value: number;
  description: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};


export type CreateImpactStatPayload = {
  label: string;
  value: number;
  description?: string;
  icon?: string;
  isActive?: boolean;
};

export type UpdateImpactStatPayload = Partial<CreateImpactStatPayload>;

type ImpactResponse = {
  success: boolean;
  data: ImpactStat[];
};

type SingleImpactResponse = {
  success: boolean;
  message: string;
  data: ImpactStat;
};

const getAdminImpactStats = async () => {
  const { data } = await api.get<ImpactResponse>(
    "/impact"
  );

  return data;
};

const createImpactStat = async (
  payload: CreateImpactStatPayload
) => {
  const { data } = await api.post<SingleImpactResponse>(
    "/impact",
    payload
  );

  return data;
};

const updateImpactStat = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateImpactStatPayload;
}) => {
  const response = await api.patch<SingleImpactResponse>(
    `/impact/${id}`,
    data
  );

  return response.data;
};

export const useAdminImpactStats = () => {
  return useQuery({
    queryKey: ["admin-impact-stats"],
    queryFn: getAdminImpactStats,
  });
};

export const useCreateImpactStat = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: createImpactStat,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-impact-stats"],
      });

      queryClient.invalidateQueries({
        queryKey: ["impact-stats"],
      });

      toast({
        title: "Impact stat created",
        description: "The impact statistic was created successfully.",
      });
    },

    onError: (error: any) => {
      toast({
        title: "Creation failed",
        description:
          error.response?.data?.message ||
          "Unable to create impact statistic.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateImpactStat = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateImpactStat,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-impact-stats"],
      });

      queryClient.invalidateQueries({
        queryKey: ["impact-stats"],
      });

      toast({
        title: "Impact stat updated",
        description: "The impact statistic was updated successfully.",
      });
    },

    onError: (error: any) => {
      toast({
        title: "Update failed",
        description:
          error.response?.data?.message ||
          "Unable to update impact statistic.",
        variant: "destructive",
      });
    },
  });
};

const getImpactStats = async () => {
  const { data } = await publicApi.get<ImpactResponse>("/impact");

  return data;
};

export const useImpactStats = () => {
  return useQuery({
    queryKey: ["impact-stats"],
    queryFn: getImpactStats,
  });
};