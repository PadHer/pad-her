



type EventType = "CAMPAIGN" | "OUTREACH" | "WORKSHOP";

export type Campaign = {
  id: string;
  title: string;
  type: EventType;
  date: string;
  location: string;
  description: string;
  capacity: number;
  imageUrl: string;
};

export const campaigns: Campaign[] = [
  {
    id: "cm1",
    imageUrl: "/images/Image-9.png",
    title: "Pads for Every Girl",
    date: "27-01-2025",
    location: "Queen's road Zaria, Kaduna, Nigeria",
    type: "CAMPAIGN",
    description: "",
    capacity: 10,
  },
  {
    id: "cm2",
    imageUrl: "/images/Image-4.png",
    title: "Empower with Hygiene",
    date: "15-02-2025",
    location: "Kawo, Kaduna North, Nigeria",
    type: "OUTREACH",
    description: "",
    capacity: 10,
  },
  {
    id: "cm3",
    imageUrl: "/images/Image-5.png",
    title: "Period Positivity",
    date: "10-03-2025",
    location: "Ahmadu Bello University, Samaru",
    type: "WORKSHOP",
    description: "",
    capacity: 10,
  },
];
