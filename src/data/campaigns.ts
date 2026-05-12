type EventType = "Workshop" | "Campaign" | "Drive"

export type Campaign = {
  id: number
  image: string
  title: string
  type: EventType;
  date: string;
  location: string;
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    image: "/images/Image-9.png",
    title: "Pads for Every Girl",
    date: "27-01-2025",
    location: "Queen's road Zaria, Kaduna, Nigeria",
    type: "Campaign"
  },
  {
    id: 2,
    image: "/images/Image-4.png",
    title: "Empower with Hygiene",
    date: "15-02-2025",
    location: "Kawo, Kaduna North, Nigeria",
    type: "Drive"
  },
  {
    id: 3,
    image: "/images/Image-5.png",
    title: "Period Positivity",
    date: "10-03-2025",
    location: "Ahmadu Bello University, Samaru",
    type: "Workshop"
  },
];
