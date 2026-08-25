import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import axios from "axios";
import { PaystackVerifyResponse } from "@/types/paystack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Paystack signature",
        },
        { status: 401 }
      );
    }

    // Verify that the request actually came from Paystack
    const hash = crypto
      .createHmac(
        "sha512",
        process.env.PAYSTACK_SECRET_KEY!
      )
      .update(body)
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(hash),
        Buffer.from(signature)
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Paystack signature",
        },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // We only need the charge.success event for successful donations
    if (event.event !== "charge.success") {
      return NextResponse.json(
        {
          success: true,
          message: "Event received",
        },
        { status: 200 }
      );
    }

    const paymentData = event.data;

    const reference = paymentData.reference;

    if (!reference) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment reference missing",
        },
        { status: 400 }
      );
    }

    // Find the donation in our database
    const donation = await prisma.donation.findUnique({
      where: { reference },
    });

    if (!donation) {
      console.error(
        `Donation not found for Paystack reference: ${reference}`
      );

      // Return 200 so Paystack doesn't repeatedly retry
      // an event for a transaction we don't recognize.
      return NextResponse.json(
        {
          success: true,
          message: "Donation not found",
        },
        { status: 200 }
      );
    }

    // Idempotency:
    // Don't process an already successful donation again.
    if (donation.status === "successful") {
      return NextResponse.json(
        {
          success: true,
          message: "Donation already processed",
        },
        { status: 200 }
      );
    }

    /*
     * Verify the transaction directly with Paystack.
     *
     * The webhook signature confirms that the request came
     * from Paystack, while this verification confirms the
     * actual transaction details.
     */
    const response = await axios.get<PaystackVerifyResponse>(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifiedPayment = response.data.data;

    // Confirm reference
    if (verifiedPayment.reference !== donation.reference) {
      console.error(
        `Reference mismatch for donation ${donation.id}`
      );

      return NextResponse.json(
        {
          success: false,
          message: "Payment reference mismatch",
        },
        { status: 400 }
      );
    }

    // Confirm amount
    if (verifiedPayment.amount !== donation.donationAmount) {
      console.error(
        `Amount mismatch for donation ${donation.id}`
      );

      await prisma.donation.update({
        where: { id: donation.id },
        data: {
          status: "failed",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Payment amount mismatch",
        },
        { status: 400 }
      );
    }

    // Confirm currency
    if (verifiedPayment.currency !== donation.currency) {
      console.error(
        `Currency mismatch for donation ${donation.id}`
      );

      await prisma.donation.update({
        where: { id: donation.id },
        data: {
          status: "failed",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Payment currency mismatch",
        },
        { status: 400 }
      );
    }

    // Confirm successful payment
    if (verifiedPayment.status !== "success") {
      return NextResponse.json(
        {
          success: true,
          message: "Payment is not successful",
        },
        { status: 200 }
      );
    }

    // Mark donation as successful
    await prisma.donation.update({
      where: { id: donation.id },
      data: {
        status: "successful",
      },
    });

    console.log(
      `Donation ${donation.reference} marked as successful`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Donation processed successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
          status?: number;
        };
      };

      console.error(
        "Donation initialization error:",
        axiosError.response?.data,
      );

      return NextResponse.json(
        {
          message:
            axiosError.response?.data?.message ||
            "Unable to initialize donation",
        },
        {
          status: axiosError.response?.status || 500,
        },
      );
    }

    console.error("Donation initialization error:", error);

    return NextResponse.json(
      {
        message: "Unable to initialize donation",
      },
      { status: 500 },
    );
  }
}