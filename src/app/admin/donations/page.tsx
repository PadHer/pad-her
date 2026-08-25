"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import {
  Donation,
  useDonations,
  useUpdateDonationStatus,
} from "@/hooks/use-donations";

type DonationFilter = "all" | "pending" | "successful" | "failed";

const Page = () => {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<DonationFilter>("all");
  const { data: donations = [], isLoading } = useDonations();
  const { updateStatus, isPending: isComfirming } = useUpdateDonationStatus();

  const handleConfirm = async (donation: Donation) => {
    setConfirmingId(donation.id);
    try {
      await updateStatus({
        id: donation.id,
        action: "confirm",
      });
    } finally {
      setConfirmingId(null);
    }
  };

  const filteredDonations = donations.filter(
    (d) => filter === "all" || d.status === filter,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">
            Donations
          </h2>
          <p className="text-[#11111199] font-medium">
            Manage all platform donations and confirmations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(["all", "pending", "successful", "failed"] as const).map((f) => {
            const isActive = filter === f;

            return (
              <Button
                key={f}
                variant="outline"
                size="sm"
                onClick={() => setFilter(f)}
                className={`capitalize border border-[#FF0080] font-medium cursor-pointer font-open transition-colors ${
                  isActive
                    ? "bg-[#FF07A9] text-white hover:bg-[#FF07A9] hover:text-white"
                    : "text-[#FF07A9] hover:bg-[#FF07A9] hover:text-white"
                }`}
              >
                {f === "successful"
                  ? "confirmed"
                  : f === "failed"
                    ? "failed"
                    : f === "pending"
                      ? "pending"
                      : "all"}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">
                  Donor
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">
                  Donation Type
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-right">
                  Amount
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-[#11111199]"
                  >
                    Loading donations...
                  </TableCell>
                </TableRow>
              ) : filteredDonations.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                  >
                    No donations found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDonations.map((donation) => {
                  const isPending = donation.status === "pending";
                  const isSuccessful = donation.status === "successful";
                  const isFailed = donation.status === "failed";

                  return (
                    <TableRow
                      key={donation.id}
                      className="hover:bg-pink-50/30 transition-colors"
                    >
                      <TableCell className="font-bold text-gray-900 capitalize">
                        {donation.donorName}
                      </TableCell>

                      <TableCell className="text-[#11111199] text-sm text-center">
                        {donation.donorEmail}
                      </TableCell>

                      <TableCell className="font-medium text-gray-700 text-center">
                        {donation.donationType}
                      </TableCell>

                      <TableCell className="text-gray-500 text-sm text-center">
                        {format(new Date(donation.createdAt), "MMM dd, yyyy")}
                      </TableCell>

                      <TableCell className="text-right font-bold text-[#ff07a9]">
                        {donation.currency === "NGN" ? "₦" : "$"}
                        {donation.donationAmount.toLocaleString()}
                      </TableCell>

                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={
                            isSuccessful
                              ? "bg-green-100 text-green-800 border-green-200"
                              : isFailed
                                ? "bg-gray-100 text-gray-500 border-gray-200"
                                : "bg-amber-100 text-amber-800 border-amber-200"
                          }
                        >
                          {isSuccessful
                            ? "Confirmed"
                            : isFailed
                              ? "Failed"
                              : "Pending"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        {isPending && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isComfirming}
                            onClick={() => handleConfirm(donation)}
                            className="h-8 border border-[#FF0080] text-[#FF07A9] hover:bg-[#FF07A9] hover:text-white font-medium cursor-pointer font-open transition-colors"
                          >
                            {isComfirming && confirmingId === donation.id ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4 mr-1" />
                            )}

                            {isComfirming && confirmingId === donation.id
                              ? "Sending..."
                              : "Confirm"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default Page;
