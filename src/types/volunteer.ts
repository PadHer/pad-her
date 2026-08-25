type CATEGORIES = "DIGITAL_ADVOCACY" | "COMMUNITY_OUTREACH" | "EDUCATION_AND_TRAINING";

export type VolunteerRole = {
  id: string;
  title: string;
  category: CATEGORIES;
  description: string;
  icon: React.ElementType;
  mode: string;
  location?: string;
  availability?: string[];
};

export type CreateVolunteerRole = {
  title: string;
  description: string;
  requirements: string;
  category: CATEGORIES;
  slots: number;
  applicationDeadline: string;
}

export const VOLUNTEER_CATEGORIES = [
  {
    value: "DIGITAL_ADVOCACY",
    label: "Digital Advocacy",
  },
  {
    value: "COMMUNITY_OUTREACH",
    label: "Community Outreach",
  },
  {
    value: "EDUCATION_AND_TRAINING",
    label: "Education & Training",
  },
] as const;
