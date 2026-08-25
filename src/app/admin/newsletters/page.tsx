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
import { Input } from "@/components/ui/input";
import { Search, UserX, UserCheck, Mail, Clock, Loader2 } from "lucide-react";
import {
  NewsletterSubscriber,
  useSubscribers,
  useUpdateSubscriberStatus,
} from "@/hooks/use-subscribe";

type SubscriberStatus = "active" | "requested" | "unsubscribed";

const Page = () => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { updateStatus, isPending: isUpdating } = useUpdateSubscriberStatus();

  const { data: subscribers = [], isLoading } = useSubscribers();

  const [search, setSearch] = useState("");

  const filtered = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(search.toLowerCase()),
  );

  const total = subscribers.length;

  const active = subscribers.filter(
    (subscriber) =>
      !subscriber.unsubscribedAt && !subscriber.unsubscribeRequestedAt,
  ).length;

  const requested = subscribers.filter(
    (subscriber) =>
      !subscriber.unsubscribedAt && subscriber.unsubscribeRequestedAt,
  ).length;

  const unsubscribed = subscribers.filter(
    (subscriber) => subscriber.unsubscribedAt,
  ).length;

  const getStatus = (subscriber: NewsletterSubscriber): SubscriberStatus => {
    if (subscriber.unsubscribedAt) {
      return "unsubscribed";
    }

    if (subscriber.unsubscribeRequestedAt) {
      return "requested";
    }

    return "active";
  };

  const handleUnsubscribe = async (subscriber: NewsletterSubscriber) => {
    setUpdatingId(subscriber.id);

    try {
      await updateStatus({
        id: subscriber.id,
        action: "unsubscribe",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleApproveRequest = async (subscriber: NewsletterSubscriber) => {
    setUpdatingId(subscriber.id);

    try {
      await updateStatus({
        id: subscriber.id,
        action: "unsubscribe",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleReactivate = async (subscriber: NewsletterSubscriber) => {
    setUpdatingId(subscriber.id);

    try {
      await updateStatus({
        id: subscriber.id,
        action: "reactivate",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">
            Newsletter
          </h2>

          <p className="text-[#11111199] font-medium">
            Manage newsletter subscribers.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#11111199]" />

          <Input
            placeholder="Search by email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#ff07a9]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#11111199]">Total</p>

              <p className="text-2xl font-display font-bold text-gray-900">
                {total}
              </p>
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-green-600" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#11111199]">Active</p>

              <p className="text-2xl font-display font-bold text-gray-900">
                {active}
              </p>
            </div>
          </div>
        </div>

        {/* Requests */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#11111199]">Requests</p>

              <p className="text-2xl font-display font-bold text-gray-900">
                {requested}
              </p>
            </div>
          </div>
        </div>

        {/* Unsubscribed */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <UserX className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#11111199]">
                Unsubscribed
              </p>

              <p className="text-2xl font-display font-bold text-gray-900">
                {unsubscribed}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">
                  Email
                </TableHead>

                <TableHead className="font-semibold text-gray-600">
                  Subscribed
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
                    colSpan={4}
                    className="text-center py-10 text-[#11111199]"
                  >
                    Loading subscribers...
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-10"
                  >
                    No subscribers match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((subscriber) => {
                  const status = getStatus(subscriber);

                  return (
                    <TableRow
                      key={subscriber.id}
                      className="hover:bg-pink-50/30 transition-colors"
                    >
                      <TableCell className="text-[#11111199] text-sm">
                        {subscriber.email}
                      </TableCell>

                      <TableCell className="text-gray-500 text-sm">
                        {format(new Date(subscriber.createdAt), "MMM dd, yyyy")}
                      </TableCell>

                      <TableCell className="text-center">
                        {status === "active" && (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 border-green-200"
                          >
                            Active
                          </Badge>
                        )}

                        {status === "requested" && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 border-yellow-200"
                          >
                            Unsubscribe Requested
                          </Badge>
                        )}

                        {status === "unsubscribed" && (
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-500 border-gray-200"
                          >
                            Unsubscribed
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        {status === "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs text-[#11101199] hover:bg-pink-50/30 cursor-pointer"
                            onClick={() => handleUnsubscribe(subscriber)}
                          >
                            {isUpdating && updatingId === subscriber.id ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <UserX className="w-3 h-3 mr-1 text-red-500" />
                            )}
                            {updatingId === subscriber.id
                              ? "Updating..."
                              : "Unsubscribe"}
                          </Button>
                        )}

                        {status === "requested" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs text-[#11101199] hover:bg-pink-50/30 cursor-pointer"
                            onClick={() => handleApproveRequest(subscriber)}
                          >
                            {isUpdating && updatingId === subscriber.id ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <UserX className="w-3 h-3 mr-1 text-red-500" />
                            )}
                            {updatingId === subscriber.id
                              ? "Updating..."
                              : "Approve"}
                          </Button>
                        )}

                        {status === "unsubscribed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs text-[#11101199] hover:bg-pink-50/30 cursor-pointer"
                            onClick={() => handleReactivate(subscriber)}
                          >
                            {isUpdating && updatingId === subscriber.id ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <UserCheck className="w-3 h-3 mr-1 text-green-600" />
                            )}
                            {updatingId === subscriber.id
                              ? "Updating..."
                              : "Reactivate"}
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
