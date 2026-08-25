"use client";

import { VolunteerRole } from "@/hooks/use-volunteer-roles";
import { ArrowRight, Check, MapPin, X } from "lucide-react";

interface RoleDetailsModalProps {
  role: VolunteerRole | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (role: VolunteerRole) => void;
}

export default function RoleDetailsModal({
  role,
  isOpen,
  onClose,
  onApply,
}: RoleDetailsModalProps) {
  if (!isOpen || !role) return null;

  // Supports requirements stored as a newline-separated string
  const requirements = role.requirements
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const handleApply = () => {
    onApply(role);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-details-title"
        className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close role details"
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#393939] shadow-sm transition hover:bg-[#f5f5f5]"
        >
          <X size={18} />
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-[#fff9fb] px-6 pb-7 pt-8 sm:px-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <Check size={21} className="text-[#FF07A9]" />
            </div>

            <span className="font-open text-[11px] font-semibold uppercase tracking-wide text-[#FF07A9]">
              {role.category}
            </span>

            <h2
              id="role-details-title"
              className="mt-2 pr-10 text-[30px] leading-tight text-[#111111] sm:text-[36px]"
              style={{ fontFamily: "Yeseva" }}
            >
              {role.roleTitle}
            </h2>

            <div className="mt-4 flex items-center gap-1.5 font-open text-[12px] text-[#666666]">
                <MapPin size={14} className="text-[#FF07A9]" />
                Remote
              </div>
          </div>

          {/* Content */}
          <div className="px-6 py-7 sm:px-8">
            {/* About the Role */}
            <section>
              <h3
                className="text-[21px] text-[#111111]"
                style={{ fontFamily: "Yeseva" }}
              >
                About the Role
              </h3>

              <p className="mt-3 font-open text-[14px] leading-6 text-[#393939CC]">
                {role.description}
              </p>
            </section>

            {/* Requirements */}
            {requirements.length > 0 && (
              <section className="mt-7">
                <h3
                  className="text-[21px] text-[#111111]"
                  style={{ fontFamily: "Yeseva" }}
                >
                  What We&apos;re Looking For
                </h3>

                <ul className="mt-4 space-y-3">
                  {requirements.map((requirement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 font-open text-[14px] leading-5 text-[#393939CC]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fff0f8]">
                        <Check size={12} className="text-[#FF07A9]" />
                      </span>

                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* CTA */}
            <div className="mt-8 border-t border-[#E7E7E7] pt-6">
              <button
                type="button"
                onClick={handleApply}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#ED006C] px-6 py-3.5 font-open text-[14px] font-semibold text-white transition hover:bg-[#d90063]"
              >
                Apply for this Role

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}