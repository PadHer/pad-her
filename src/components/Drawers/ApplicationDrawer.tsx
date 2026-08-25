"use client";

import {
  CalendarDays,
  Mail,
  Phone,
  X,
} from "lucide-react";

import {
  VolunteerApplicationDetails,
  ApplicationStatus,
} from "@/hooks/use-applications";

type ApplicantDetailsDrawerProps = {
  applicant: VolunteerApplicationDetails | undefined;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onStatusChange: (status: ApplicationStatus) => void;
  isUpdating?: boolean;
};

export function ApplicantDetailsDrawer({
  applicant,
  isOpen,
  isLoading,
  onClose,
  onStatusChange,
  isUpdating,
}: ApplicantDetailsDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="font-open text-xs font-medium uppercase tracking-wide text-[#FF07A9]">
              Volunteer Application
            </p>

            <h2
              className="mt-1 text-2xl text-[#111111]"
              style={{ fontFamily: "Yeseva" }}
            >
              Application Details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading || !applicant ? (
            <div className="flex h-64 items-center justify-center text-sm text-gray-500">
              Loading application...
            </div>
          ) : (
            <div className="space-y-7 p-6">
              {/* Applicant */}
              <section>
                <h3
                  className="text-xl text-[#111111]"
                  style={{ fontFamily: "Yeseva" }}
                >
                  {applicant.name}
                </h3>

                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={16} className="text-[#FF07A9]" />
                    {applicant.email}
                  </div>

                  {applicant.phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone size={16} className="text-[#FF07A9]" />
                      {applicant.phone}
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CalendarDays
                      size={16}
                      className="text-[#FF07A9]"
                    />
                    Applied{" "}
                    {new Date(applicant.appliedDate).toLocaleDateString(
                      "en-NG",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
              </section>

              {/* Role */}
              <section className="rounded-2xl bg-[#fff9fb] p-5">
                <p className="font-open text-[11px] font-semibold uppercase tracking-wide text-[#FF07A9]">
                  Applied Role
                </p>

                <h3
                  className="mt-1 text-xl text-[#111111]"
                  style={{ fontFamily: "Yeseva" }}
                >
                  {applicant.role}
                </h3>
              </section>

              {/* Skills */}
              <section>
                <h3 className="font-open text-sm font-semibold text-gray-900">
                  Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {applicant.skills.length > 0 ? (
                    applicant.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-3 py-1.5 font-open text-xs text-gray-600"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">
                      No skills provided.
                    </p>
                  )}
                </div>
              </section>

              {/* Availability */}
              <section>
                <h3 className="font-open text-sm font-semibold text-gray-900">
                  Availability
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {applicant.availability.length > 0 ? (
                    applicant.availability.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-3 py-1.5 font-open text-xs text-gray-600"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">
                      No availability provided.
                    </p>
                  )}
                </div>
              </section>

              {/* Additional Notes */}
              {applicant.additionalNotes && (
                <section>
                  <h3 className="font-open text-sm font-semibold text-gray-900">
                    Additional Notes
                  </h3>

                  <p className="mt-3 rounded-xl bg-gray-50 p-4 font-open text-sm leading-6 text-gray-600">
                    {applicant.additionalNotes}
                  </p>
                </section>
              )}

              {/* Status */}
              <section className="border-t border-gray-100 pt-6">
                <h3 className="font-open text-sm font-semibold text-gray-900">
                  Application Status
                </h3>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => onStatusChange("PENDING")}
                    className={`rounded-xl border px-3 py-2.5 font-open text-xs font-medium transition ${
                      applicant.status === "PENDING"
                        ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    Pending
                  </button>

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => onStatusChange("ACCEPTED")}
                    className={`rounded-xl border px-3 py-2.5 font-open text-xs font-medium transition ${
                      applicant.status === "ACCEPTED"
                        ? "border-green-300 bg-green-50 text-green-700"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    Accepted
                  </button>

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => onStatusChange("REJECTED")}
                    className={`rounded-xl border px-3 py-2.5 font-open text-xs font-medium transition ${
                      applicant.status === "REJECTED"
                        ? "border-red-300 bg-red-50 text-red-700"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    Rejected
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}