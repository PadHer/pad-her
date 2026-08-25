"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export type ApplicationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED";

export type VolunteerApplication = {
  id: number;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  appliedDate: string;
  status: ApplicationStatus;
};

export type VolunteerApplicationDetails = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string | null;
  skills: string[];
  availability: string[];
  additionalNotes: string | null;
  status: ApplicationStatus;
  appliedDate: string;
  updatedAt: string;
  role: string;
};

/**
 * API response types
 */
type ApplicationsResponse = {
  data: VolunteerApplication[];
};

type ApplicationDetailsResponse = {
  data: VolunteerApplicationDetails;
};

type UpdateApplicationResponse = {
  data: VolunteerApplication;
};

/**
 * Fetch all volunteer applications
 */
export const useVolunteerApplications = (
  status?: ApplicationStatus
) => {
  return useQuery<VolunteerApplication[]>({
    queryKey: ["volunteer-applications", status],

    queryFn: async () => {
      const response = await axios.get<ApplicationsResponse>(
        "/api/admin/volunteers",
        {
          params: status ? { status } : undefined,
        }
      );

      return response.data.data;
    },
  });
};

/**
 * Fetch a single volunteer application
 */
export const useVolunteerApplication = (
  id?: number | null
) => {
  return useQuery<VolunteerApplicationDetails>({
    queryKey: ["volunteer-application", id],

    queryFn: async () => {
      const response =
        await axios.get<ApplicationDetailsResponse>(
          `/api/admin/volunteers/${id}`
        );

      return response.data.data;
    },

    enabled: !!id,
  });
};

/**
 * Update volunteer application status
 */
export const useUpdateVolunteerApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: number;
      status: ApplicationStatus;
    }) => {
      const response =
        await axios.patch<UpdateApplicationResponse>(
          `/api/admin/volunteers/${id}`,
          {
            status,
          }
        );

      return response.data.data;
    },

    onSuccess: (updatedApplication) => {
      // Refresh applications table
      queryClient.invalidateQueries({
        queryKey: ["volunteer-applications"],
      });

      // Refresh individual application
      queryClient.invalidateQueries({
        queryKey: [
          "volunteer-application",
          updatedApplication.id,
        ],
      });
    },
  });
};