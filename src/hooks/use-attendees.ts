"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";


export type EventRegistration = {
  id: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  location: string;
  whyInterest: string;
  isAgreed: boolean;
  registeredDate: string;

  event: {
    id: string;
    title: string;
    date: string;
    location: string;
  };
};

export type EventRegistrationsResponse = {
  success: boolean;
  data: EventRegistration[];
};


export const useAttendees = () => {
  return useQuery({
    queryKey: ["event-registrations"],

    queryFn: async () => {
      const { data } =
        await api.get<EventRegistrationsResponse>(
          "/attendees"
        );

      return data.data;
    },
  });
};