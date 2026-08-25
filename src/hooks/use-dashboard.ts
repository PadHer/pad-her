"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export type DashboardStats = {
  totalRaised: number;
  totalDonors: number;
  thisMonth: number;
  padsDistributed: number;
};

export type Trend = {
  value: number;
  direction: "up" | "down" | "neutral";
};

export type DashboardTrends = {
  totalRaised: Trend;
  totalDonors: Trend;
  thisMonth: Trend;
};

export type DashboardImpactStat = {
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

export type MonthlyDonationData = {
  month: string;
  amount: number;
};

export type RecentDonation = {
  id: string;
  name: string;
  email: string;
  amount: number;
  currency: string;
  donationType: string;
  date: string;
};

export type DashboardData = {
  stats: DashboardStats;
  trends: DashboardTrends;
  impactStats: DashboardImpactStat[];
  monthlyData: MonthlyDonationData[];
  recentDonations: RecentDonation[];
};

type DashboardResponse = {
  success: boolean;
  data: DashboardData;
};

const getDashboardData = async (): Promise<DashboardData> => {
  const { data: response } =
    await api.get<DashboardResponse>(
      "/dashboard"
    );

  return response.data;
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
};