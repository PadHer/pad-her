import { NextResponse } from "next/server";
import crypto from "node:crypto";
import prisma from "@/lib/db";

interface DonationRequest {
  donationAmount: number;
  donationType: string;
  donorName: string;
  donorEmail: string;
  isAnon: boolean;
}

export async function POST(req: Request) {
  try {
    const {
      donationAmount,
      donationType,
      donorName,
      donorEmail,
      isAnon,
    }: DonationRequest = await req.json();

    // Basic server-side validation
    if (!donationAmount || !donationType || !donorName || !donorEmail) {
      return NextResponse.json(
        { error: "Missing required donation fields." },
        { status: 400 }
      );
    }

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        donationAmount,
        donationType,
        donorName,
        donorEmail,
        isAnon,
        reference: crypto.randomUUID(),
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, donation });
  } catch (error: any) {
    console.error("Donation API error:", error);
    return NextResponse.json(
      { error: "Failed to create donation." },
      { status: 500 }
    );
  }
}
