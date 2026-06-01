"use client";

import { useState } from "react";
import { VOLUNTEER_APPLICANTS } from "@/data/dummy";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// type Applicant = typeof VOLUNTEER_APPLICANTS[0];
type Status = "pending" | "accepted" | "rejected";

const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  accepted: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};

const Page = () => {
  const [applicants, setApplicants] = useState(VOLUNTEER_APPLICANTS);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const { toast } = useToast();

  const filtered = applicants.filter(a => filter === "all" || a.status === filter);

  const changeStatus = (id: string, newStatus: Status, name: string) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    const label = newStatus === "accepted" ? "accepted" : newStatus === "rejected" ? "rejected" : "set to pending";
    toast({
      title: "Status Updated",
      description: `${name}'s application has been ${label}.`,
    });
  };

  const counts = {
    all: applicants.length,
    pending: applicants.filter(a => a.status === "pending").length,
    accepted: applicants.filter(a => a.status === "accepted").length,
    rejected: applicants.filter(a => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">Volunteer Applicants</h2>
          <p className="text-[#11111199] font-medium">Review and manage applications for volunteer roles.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "accepted", "rejected"] as const).map(f => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="capitalize border border-[#FF07A9] text-[#FF07A9] hover:bg-[#FF07A9] hover:text-white font-medium cursor-pointer font-open transition-colors"
            >
              {f} <span className="ml-1.5 text-xs opacity-70">({counts[f]})</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">Applicant</TableHead>
                <TableHead className="font-semibold text-gray-600">Email</TableHead>
                <TableHead className="font-semibold text-gray-600">Role</TableHead>
                <TableHead className="font-semibold text-gray-600">Applied</TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">Status</TableHead>
                <TableHead className="font-semibold text-gray-600 text-right">Update Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(applicant => (
                <TableRow key={applicant.id} className="hover:bg-pink-50/30 transition-colors">
                  <TableCell className="font-bold text-gray-900">{applicant.name}</TableCell>
                  <TableCell className="text-[#11111199] text-sm">{applicant.email}</TableCell>
                  <TableCell className="text-gray-700 font-medium">{applicant.roleName}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{format(new Date(applicant.appliedDate), "MMM dd, yyyy")}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={STATUS_STYLES[applicant.status as Status]}>
                      {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={applicant.status}
                      onValueChange={(val) => changeStatus(applicant.id, val as Status, applicant.name)}
                    >
                      <SelectTrigger className="w-36 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="accepted">Accept</SelectItem>
                        <SelectItem value="rejected">Reject</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-[#11111199] py-10">No applicants match this filter.</TableCell>
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