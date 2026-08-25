"use client";

import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Check,
  Clock3,
  HeartHandshake,
  MapPin,
  School,
  Smartphone,
} from "lucide-react";
import { VolunteerRole } from "@/hooks/use-volunteer-roles";
import RoleDetailsModal from "../Modals/RoleModal";

const categoryIcons = {
  DIGITAL_ADVOCACY: Smartphone,
  COMMUNITY_OUTREACH: MapPin,
  EDUCATION_AND_TRAINING: School,
};

type Props = {
  onApply?: (role: VolunteerRole) => void;
  opportunities: VolunteerRole[];
  isLoading?: boolean;
};

const VolunteerSection = ({ onApply, opportunities, isLoading }: Props) => {
  const hasOpportunities = opportunities?.length > 0;

  const [selectedRole, setSelectedRole] = useState<VolunteerRole | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-[#11111199] font-medium">Loading roles...</p>
      </div>
    );
  }

const handleViewRole = (role: VolunteerRole) => {
  setSelectedRole(role);
  setIsRoleModalOpen(true);
};

  const handleSelectRole = (opportunity: VolunteerRole) => {
    setSelectedRole(opportunity);

    onApply?.(opportunity);
    document
      .getElementById("volunteer-application")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplyForRole = (role: VolunteerRole) => {
  setSelectedRole(role);

  // Your existing role-selection logic
  handleSelectRole(role);

  // Scroll to application section
  document
    .getElementById("volunteer-application")
    ?.scrollIntoView({ behavior: "smooth" });
};

  return (
    <section className="w-full bg-white px-4 py-12 md:px-12 md:py-16">
      <div className="mx-auto w-full px-4 md:px-16">
        {/* Section heading */}
        <div className="mb-8">
          <p className="font-open text-[12px] font-semibold uppercase tracking-[0.08em] text-[#FF07A9]">
            Open roles
          </p>

          <h2
            className="mt-2 flex flex-wrap items-center gap-3 text-[30px] text-[#111111] md:text-[40px]"
            style={{ fontFamily: "Yeseva" }}
          >
            Volunteer Opportunities
            {!hasOpportunities && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAEEDA] px-3 py-1.5 font-open text-[11px] font-medium text-[#854F0B]">
                <Clock3 size={12} />
                Coming soon
              </span>
            )}
          </h2>

          <p className="mt-2 max-w-2xl font-open text-[14px] leading-6 text-[#39393999] md:text-[15px]">
            {hasOpportunities
              ? "Select a role that fits your skills, then fill in the application below."
              : "Active opportunities will appear here when available. In the meantime, let us know where you'd like to help."}
          </p>
        </div>

        {/* Active opportunities */}
        {hasOpportunities ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {opportunities.map((opportunity) => {
              const Icon = categoryIcons[opportunity.category] ?? Briefcase;
              const isSelected = selectedRole?.id === opportunity.id;

              return (
                <button
                  key={opportunity.id}
                  type="button"
                  onClick={() => handleViewRole(opportunity)}
                  className={`group relative overflow-hidden rounded-2xl border bg-white text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#FF07A9] ring-2 ring-[#FF07A9]"
                      : "border-[#E7E7E7] hover:border-[#CFCFCF]"
                  }`}
                >
                  {/* Selected indicator */}
                  {isSelected && (
                    <span className="absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF07A9]">
                      <Check size={14} className="text-white" />
                    </span>
                  )}

                  <div className="p-5">
                    {/* Category Icon */}
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff9fb]">
                      <Icon size={19} className="text-[#FF07A9]" />
                    </div>

                    {/* Category */}
                    <span className="mb-2 block font-open text-[11px] font-medium uppercase tracking-wide text-[#FF07A9]">
                      {opportunity.category}
                    </span>

                    {/* Role Title */}
                    <h3
                      className="text-[24px] text-[#111111]"
                      style={{ fontFamily: "Yeseva" }}
                    >
                      {opportunity.roleTitle}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 min-h-18 font-open text-[13px] leading-5 text-[#393939CC]">
                      {opportunity.description}
                    </p>

                    {/* Role Meta */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#fff9fb] px-2.5 py-1 font-open text-[11px] font-medium text-[#FF07A9]">
                        Remote
                      </span>
                    </div>

                    {/* Apply */}
                    <div className="mt-5 flex items-center gap-2 font-open text-[13px] font-semibold text-[#ED006C]">
                      View Role
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ED006C] transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRight size={14} className="text-white" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-[#D9D9D9] bg-[#FFFAFC] px-6 py-12 text-center md:px-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ED006C1A]">
              <HeartHandshake size={32} className="text-[#ED006C]" />
            </div>

            <h3
              className="text-[22px] text-[#111111]"
              style={{ fontFamily: "Yeseva" }}
            >
              No opportunities available right now
            </h3>

            <p className="mx-auto mt-2 max-w-md font-open text-[14px] leading-6 text-[#39393999]">
              Fill the form below and we&apos;ll notify you as soon as a role that
              matches your interests opens up.
            </p>
          </div>
        )}
      </div>
      <RoleDetailsModal
  role={selectedRole}
  isOpen={isRoleModalOpen}
  onClose={() => setIsRoleModalOpen(false)}
  onApply={handleApplyForRole}
/>
    </section>
  );
};

export default VolunteerSection;
