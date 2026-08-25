"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Users, Banknote, Target, TrendingUp } from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";
import Link from "next/link";

export function Overview() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-[#11111199] font-medium">Loading dashboard...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-red-500 font-medium">
          Unable to load dashboard data.
        </p>
      </div>
    );
  }

  const { stats, monthlyData, recentDonations, trends, impactStats } = data;

  const ngnStats = stats.totalRaised;
  const usdStats = stats.totalRaised;
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-display font-bold mb-1 text-gray-900"
            style={{
              fontFamily: "Yeseva",
            }}
          >
            Platform Admin
          </h1>
          <p className="text-muted-foreground font-medium text-[#11111199]">
            Overview of all platform metrics and recent activities.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-[#ED006C] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#ff07a9]">
              <Banknote className="w-5 h-5" />
            </div>
            <BadgeTrend value={trends.totalRaised.value} />
          </div>
          <p className="text-sm font-semibold text-[#11111199]">Total Raised</p>
          <div className="text-3xl font-display font-bold text-gray-900">
            <p className="text-2xl font-bold text-gray-900">
              ₦{ngnStats.toLocaleString()}
            </p>

            {usdStats > 0 && (
              <p className="text-sm font-semibold text-gray-500">
                ${usdStats.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#ED006C] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <BadgeTrend value={trends.totalDonors.value} />
          </div>
          <p className="text-sm font-semibold text-[#11111199]">Total Donors</p>
          <p className="text-3xl font-display font-bold text-gray-900">
            {stats?.totalDonors?.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#ED006C] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <BadgeTrend value={trends.thisMonth.value} />
          </div>
          <p className="text-sm font-semibold text-[#11111199]">This Month</p>
          <div className="text-3xl font-display font-bold text-gray-900">
            <p className="text-2xl font-bold text-gray-900">
              ₦{stats.thisMonth.toLocaleString()}
            </p>

            {stats.thisMonth > 0 && (
              <p className="text-sm font-semibold text-gray-500">
                ${stats.thisMonth.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#ED006C] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm font-semibold text-[#11111199]">
            Pads Distributed
          </p>
          <p className="text-3xl font-display font-bold text-gray-900">
            {stats.padsDistributed.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
          <h2 className="text-xl font-display font-bold mb-6 text-[#11111199]">
            Donation Trends (Year to Date)
          </h2>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData ?? []}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E91E8C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#E91E8C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#9CA3AF",
                    fontSize: 12,
                  }}
                  tickFormatter={(value) => `₦${Number(value) / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [
                    `₦${Number(value ?? 0).toLocaleString()}`,
                    "Raised",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#E91E8C"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Breakdown */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
          <h2 className="text-xl font-display font-bold mb-6 text-[#11111199]">
            Impact Stats
          </h2>
          <div className="space-y-6">
            {impactStats.map((stat) => (
               <div key={stat.id}>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-700 truncate pr-4">
                      {stat.label}
                    </span>
                    <span className="text-[#ff07a9]">{stat.value}</span>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Table */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-pink-50 bg-pink-50/30 flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-[#11111199]">
            Recent Donations
          </h2>
          <Link
            href={"/admin/donations"}
            className="text-sm font-bold text-[#ff07a9] hover:text-[#ff07a9]/80 transition-colors cursor-pointer"
          >
            View All
          </Link>
        </div>

        <div className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">
                  Donor
                </TableHead>
                <TableHead className="font-semibold text-gray-600">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-600">
                  Donation Type
                </TableHead>
                <TableHead className="font-semibold text-gray-600">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDonations?.map((donation) => (
                <TableRow
                  key={donation.id}
                  className="hover:bg-pink-50/30 transition-colors"
                >
                  <TableCell className="font-bold text-gray-900">
                    {donation.name}
                  </TableCell>
                  <TableCell className="text-[#11111199] text-sm">
                    {donation.email}
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">
                    {donation.donationType}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {format(new Date(donation.date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right font-bold text-[#ff07a9]">
                    {donation.currency === "NGN" ? "₦" : "$"}
                    {donation.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function BadgeTrend({ value }: { value: number }) {
  const trend = Number(value.toFixed(1));

  const positive = trend > 0;
  const negative = trend < 0;
  const neutral = trend === 0;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-bold ${
        neutral
          ? "bg-gray-100 text-gray-600"
          : positive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
      }`}
    >
      {positive ? "↑" : negative ? "↓" : "→"}{" "}
      {Math.abs(trend).toFixed(1)}%
    </span>
  );
}
