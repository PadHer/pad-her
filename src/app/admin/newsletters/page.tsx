"use client";

import { useState } from "react";
import { NEWSLETTER_SUBSCRIBERS } from "@/data/dummy";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search, UserX, UserCheck, Mail } from "lucide-react";

type Subscriber = typeof NEWSLETTER_SUBSCRIBERS[0];

const Page = () => {
  const [subscribers, setSubscribers] = useState(NEWSLETTER_SUBSCRIBERS);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const filtered = subscribers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const total = subscribers.length;
  const active = subscribers.filter(s => s.status === "active").length;
  const unsubscribed = total - active;

  const toggleStatus = (sub: Subscriber) => {
    const next = sub.status === "active" ? "unsubscribed" : "active";
    setSubscribers(prev => prev.map(s => s.id === sub.id ? { ...s, status: next } : s));
    toast({
      title: next === "unsubscribed" ? "Subscriber Removed" : "Subscriber Reactivated",
      description: `${sub.email} has been ${next === "unsubscribed" ? "unsubscribed from" : "re-added to"} the newsletter.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">Newsletter</h2>
          <p className="text-[#11111199] font-medium">Manage newsletter subscribers.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#11111199]" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#ff07a9]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#11111199]">Total</p>
              <p className="text-2xl font-display font-bold text-gray-900">{total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#11111199]">Active</p>
              <p className="text-2xl font-display font-bold text-gray-900">{active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <UserX className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#11111199]">Unsubscribed</p>
              <p className="text-2xl font-display font-bold text-gray-900">{unsubscribed}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                <TableHead className="font-semibold text-gray-600">Email</TableHead>
                <TableHead className="font-semibold text-gray-600">Subscribed</TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">Status</TableHead>
                <TableHead className="font-semibold text-gray-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(sub => (
                <TableRow key={sub.id} className="hover:bg-pink-50/30 transition-colors">
                  <TableCell className="font-bold text-gray-900">{sub.name}</TableCell>
                  <TableCell className="text-[#11111199] text-sm">{sub.email}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{format(new Date(sub.subscribedDate), "MMM dd, yyyy")}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={sub.status === "active" ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-500 border-gray-200"}>
                      {sub.status === "active" ? "Active" : "Unsubscribed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs text-[#11101199] hover:bg-pink-50/30 cursor-pointer"
                      onClick={() => toggleStatus(sub)}
                    >
                      {sub.status === "active" ? (
                        <><UserX className="w-3 h-3 mr-1 text-red-500" /> Unsubscribe</>
                      ) : (
                        <><UserCheck className="w-3 h-3 mr-1 text-green-600" /> Reactivate</>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-10">No subscribers match your search.</TableCell>
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