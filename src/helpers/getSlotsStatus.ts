import { VolunteerRole } from "@/hooks/use-volunteer-roles";


export const getVolunteerRoleStatus = (role: VolunteerRole) => {
  const slotsFilled = (role.applicantCount ?? 0) >= role.slots;

  const deadlinePassed =
    role.applicationDeadline &&
    new Date() >= new Date(role.applicationDeadline);

  if (slotsFilled || deadlinePassed) {
    return "closed";
  }

  return "open";
};
