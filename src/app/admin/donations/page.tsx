"use client";

import { useState } from "react";
import { ALL_DONATIONS } from "@/data/dummy";
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
import { useToast } from "@/components/ui/use-toast";
import { Check, Loader2 } from "lucide-react";

type Donation = (typeof ALL_DONATIONS)[0] & { status: string };

 const Page = () => {
  const [donations, setDonations] = useState<Donation[]>(ALL_DONATIONS as Donation[]);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed">("all");
  const [confirming, setConfirming] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleConfirm = async (donation: Donation) => {
    setConfirming((prev) => new Set(prev).add(donation.id));

    try {
      const res = await fetch("/api/donations/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationId: donation.id,
          donorName: donation.name,
          donorEmail: donation.email,
          amount: donation.amount,
          campaign: donation.campaign,
          date: format(new Date(donation.date), "MMMM dd, yyyy"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Confirmation failed");
      }

      setDonations((prev) =>
        prev.map((d) => (d.id === donation.id ? { ...d, status: "confirmed" } : d)),
      );

      toast({
        title: "Donation Confirmed",
        description: data.emailSent
          ? `Confirmation email sent to ${donation.email}`
          : `Confirmed — email delivery skipped (SMTP not configured)`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Could not confirm donation.",
        variant: "destructive",
      });
    } finally {
      setConfirming((prev) => {
        const next = new Set(prev);
        next.delete(donation.id);
        return next;
      });
    }
  };

  const filteredDonations = donations.filter(
    (d) => filter === "all" || d.status === filter,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">Donations</h2>
          <p className="text-[#11111199] font-medium">
            Manage all platform donations and confirmations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(["all", "pending", "confirmed"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize border border-[#FF0080] text-[#FF07A9] hover:bg-[#FF07A9] hover:text-white font-medium cursor-pointer font-open transition-colors"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">Donor</TableHead>
                <TableHead className="font-semibold text-gray-600">Email</TableHead>
                <TableHead className="font-semibold text-gray-600">Campaign</TableHead>
                <TableHead className="font-semibold text-gray-600">Date</TableHead>
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
              {filteredDonations.map((donation) => {
                const isPending = donation.status === "pending";
                const isLoading = confirming.has(donation.id);
                return (
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
                      {donation.campaign}
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {format(new Date(donation.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-right font-bold text-[#ff07a9]">
                      ₦{donation.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={
                          donation.status === "confirmed"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }
                      >
                        {donation.status === "confirmed" ? "Confirmed" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {isPending && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isLoading}
                          onClick={() => handleConfirm(donation)}
                          className="h-8 border border-[#FF0080] text-[#FF07A9] hover:bg-[#FF07A9] hover:text-white font-medium cursor-pointer font-open transition-colors"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4 mr-1" />
                          )}
                          {isLoading ? "Sending..." : "Confirm"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredDonations.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                  >
                    No donations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
export default Page;