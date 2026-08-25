import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  startOfMonth,
  startOfYear,
  endOfMonth,
  subMonths,
} from "date-fns";

const toNaira = (amount: number) => amount / 100;

const calculateTrend = (
  current: number,
  previous: number
) => {
  if (previous === 0) {
    return {
      value: current > 0 ? 100 : 0,
      direction: current > 0 ? "up" : "neutral",
    };
  }

  const percentage =
    ((current - previous) / previous) * 100;

  return {
    value: Math.abs(Number(percentage.toFixed(1))),
    direction:
      percentage > 0
        ? "up"
        : percentage < 0
        ? "down"
        : "neutral",
  };
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const now = new Date();

    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);

    const previousMonth = subMonths(now, 1);

    const previousMonthStart =
      startOfMonth(previousMonth);

    const previousMonthEnd =
      endOfMonth(previousMonth);

    const yearStart = startOfYear(now);

    /*
     * Fetch donations needed for dashboard calculations.
     *
     * Only successful donations should contribute
     * to financial statistics.
     */
    const [
      successfulDonations,
      currentMonthDonations,
      previousMonthDonations,
      impactStats,
    ] = await Promise.all([
      prisma.donation.findMany({
        where: {
          status: "successful",
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.donation.findMany({
        where: {
          status: "successful",
          createdAt: {
            gte: currentMonthStart,
            lte: currentMonthEnd,
          },
        },
      }),

      prisma.donation.findMany({
        where: {
          status: "successful",
          createdAt: {
            gte: previousMonthStart,
            lte: previousMonthEnd,
          },
        },
      }),

      prisma.impactStat.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
    ]);

    /*
     * Total raised
     */
    const totalRaised = successfulDonations.reduce(
      (total, donation) => {
        if (donation.currency === "NGN") {
          return total + toNaira(donation.donationAmount);
        }

        return total + donation.donationAmount;
      },
      0
    );

    /*
     * Current month
     */
    const thisMonth = currentMonthDonations.reduce(
      (total, donation) => {
        if (donation.currency === "NGN") {
          return total + toNaira(donation.donationAmount);
        }

        return total + donation.donationAmount;
      },
      0
    );

    /*
     * Previous month
     */
    const previousMonthTotal =
      previousMonthDonations.reduce(
        (total, donation) => {
          if (donation.currency === "NGN") {
            return total + toNaira(donation.donationAmount);
          }

          return total + donation.donationAmount;
        },
        0
      );

    /*
     * Donors
     *
     * Using donor email gives us unique donors rather
     * than counting every donation transaction.
     */
    const totalDonors = new Set(
      successfulDonations.map(
        (donation) => donation.donorEmail.toLowerCase()
      )
    ).size;

    const currentMonthDonors = new Set(
      currentMonthDonations.map(
        (donation) => donation.donorEmail.toLowerCase()
      )
    ).size;

    const previousMonthDonors = new Set(
      previousMonthDonations.map(
        (donation) => donation.donorEmail.toLowerCase()
      )
    ).size;

    /*
     * Monthly donation data
     */
    const monthlyMap = new Map<
      string,
      number
    >();

    successfulDonations
      .filter(
        (donation) =>
          donation.createdAt >= yearStart
      )
      .forEach((donation) => {
        const month = donation.createdAt.toLocaleString(
          "en-US",
          { month: "short" }
        );

        const amount =
          donation.currency === "NGN"
            ? toNaira(donation.donationAmount)
            : donation.donationAmount;

        monthlyMap.set(
          month,
          (monthlyMap.get(month) ?? 0) + amount
        );
      });

    const monthlyData = Array.from(
      { length: 12 },
      (_, index) => {
        const date = new Date(
          now.getFullYear(),
          index,
          1
        );

        const month = date.toLocaleString(
          "en-US",
          { month: "short" }
        );

        return {
          month,
          amount: monthlyMap.get(month) ?? 0,
        };
      }
    );

    /*
     * Recent donations
     */
    const recentDonations =
      successfulDonations
        .slice(0, 5)
        .map((donation) => ({
          id: donation.id,
          name: donation.isAnon
            ? "Anonymous"
            : donation.donorName,
          email: donation.isAnon
            ? "Anonymous"
            : donation.donorEmail,
          amount:
            donation.currency === "NGN"
              ? toNaira(donation.donationAmount)
              : donation.donationAmount,
          currency: donation.currency,
          donationType: donation.donationType,
          date: donation.createdAt,
        }));

    return NextResponse.json({
      success: true,

      data: {
        stats: {
          totalRaised,
          totalDonors,
          thisMonth,
          padsDistributed:
            impactStats.find(
              (stat) =>
                stat.key === "pads-distributed"
            )?.value ?? 0,
        },

        trends: {
          totalRaised: calculateTrend(
            totalRaised,
            totalRaised -
              thisMonth +
              previousMonthTotal
          ),

          totalDonors: calculateTrend(
            currentMonthDonors,
            previousMonthDonors
          ),

          thisMonth: calculateTrend(
            thisMonth,
            previousMonthTotal
          ),
        },

        impactStats,

        monthlyData,

        recentDonations,
      },
    });
  } catch (error) {
    console.error(
      "Error fetching dashboard data:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
      },
      { status: 500 }
    );
  }
}