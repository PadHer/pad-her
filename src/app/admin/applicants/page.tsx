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
import {
  useUpdateVolunteerApplicationStatus,
  useVolunteerApplication,
  useVolunteerApplications,
} from "@/hooks/use-applications";
import { ApplicantDetailsDrawer } from "@/components/Drawers/ApplicationDrawer";

type Status = "PENDING" | "ACCEPTED" | "REJECTED";

const STATUS_STYLES: Record<Status, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  ACCEPTED: "bg-green-100 text-green-800 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-200",
};

const Page = () => {
  const { data: applicants, isLoading } = useVolunteerApplications();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateVolunteerApplicationStatus();

  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(
    null,
  );
  const { data: selectedApplicant, isLoading: isApplicantLoading } =
    useVolunteerApplication(selectedApplicantId);
  const [filter, setFilter] = useState<"all" | Status>("all");

  const filtered = applicants?.filter(
    (a) => filter === "all" || a.status === filter,
  );

  const handleStatusChange = (status: Status) => {
    if (!selectedApplicantId) return;

    updateStatus({
      id: selectedApplicantId,
      status,
    });
  };

  const counts = {
    all: applicants?.length,
    PENDING: applicants?.filter((a) => a.status === "PENDING").length,
    ACCEPTED: applicants?.filter((a) => a.status === "ACCEPTED").length,
    REJECTED: applicants?.filter((a) => a.status === "REJECTED").length,
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">
            Volunteer Applicants
          </h2>
          <p className="text-[#11111199] font-medium">
            Review and manage applications for volunteer roles.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "PENDING", "ACCEPTED", "REJECTED"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="capitalize border border-[#FF07A9] text-[#FF07A9] hover:bg-[#FF07A9] hover:text-white font-medium cursor-pointer font-open transition-colors"
            >
              {f}{" "}
              <span className="ml-1.5 text-xs opacity-70">({counts[f]})</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">
                  Applicant
                </TableHead>

                <TableHead className="font-semibold text-gray-600">
                  Email
                </TableHead>

                <TableHead className="font-semibold text-gray-600">
                  Role
                </TableHead>

                <TableHead className="font-semibold text-gray-600">
                  Applied
                </TableHead>

                <TableHead className="text-center font-semibold text-gray-600">
                  Status
                </TableHead>

                <TableHead className="text-right font-semibold text-gray-600">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered?.map((applicant) => (
                <TableRow
                  key={applicant.id}
                  className="transition-colors hover:bg-pink-50/30"
                >
                  <TableCell className="font-bold text-gray-900">
                    {applicant.name}
                  </TableCell>

                  <TableCell className="text-sm text-[#11111199]">
                    {applicant.email}
                  </TableCell>

                  <TableCell className="font-medium text-gray-700">
                    {applicant.roleName}
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {format(new Date(applicant.appliedDate), "MMM dd, yyyy")}
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={STATUS_STYLES[applicant.status as Status]}
                    >
                      {applicant.status.charAt(0).toUpperCase() +
                        applicant.status.slice(1).toLowerCase()}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedApplicantId(applicant.id)}
                      className="h-8 text-xs text-[#333] border border-[#333] cursor-pointer"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filtered?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-[#11111199]"
                  >
                    No applicants match this filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <ApplicantDetailsDrawer
        applicant={selectedApplicant}
        isOpen={selectedApplicantId !== null}
        isLoading={isApplicantLoading}
        onClose={() => setSelectedApplicantId(null)}
        onStatusChange={handleStatusChange}
        isUpdating={isUpdatingStatus}
      />
    </div>
  );
};

export default Page;
