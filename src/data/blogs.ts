export const blogs = [
  {
    id: 1,
    image: "/images/bg-blog-1.png",
    category: "Period Education",
    title: "Behind the Scenes: Volunteering with PadHer With Love"
  },
  {
    id: 2,
    image: "/images/bg-blog-2.png",
    category: "Menstrual Myth",
    title: "Separating Facts from Fictions",
    link: "/blogs/menstrual-myths",
  },
  {
    id: 3,
    // image: "/images/bg-blog-2.png",
    category: "Health Tips",
    title: "Hygiene Practices Every Teen Girl Should Know",
    link: "/blogs/hygiene-practices",
  },
  {
    id: 4,
    image: "/images/bg-blog-3.png",
    category: "Period Poverty",
    title: "The Silent Struggle: Period Poverty in Rural Areas",
    link: "/blogs/period-poverty",
  },
  {
    id: 5,
    // image: "/images/bg-blog-4.png",
    category: "Awareness",
    title: "Raising Awareness Through School Campaigns",
    link: "/blogs/school-campaigns",
  },
  {
    id: 6,
    image: "/images/bg-blog-3.png",
    category: "Mental Health",
    title: "Coping with Period-Related Mood Swings",
    link: "/blogs/mental-health",
  },
  {
    id: 7,
    // image: "/images/bg-blog-6.png",
    category: "Nutrition",
    title: "Nutrition Tips for a Healthy Menstrual Cycle",
    link: "/blogs/nutrition-tips",
  },
  {
    id: 8,
    image: "/images/bg-blog-2.png",
    category: "Community Stories",
    title: "What Every Girl Should Know Before Her First Period",
    link: "/blogs/first-period",
  },
  {
    id: 9,
    image: "/images/bg-blog-3.png",
    category: "Advocacy",
    title: "How You Can Advocate for Menstrual Equity",
    link: "/blogs/menstrual-equity",
  },
  {
    id: 10,
    // image: "/images/bg-blog-5.png",
    category: "Product Reviews",
    title: "Choosing the Right Menstrual Products for You",
    link: "/blogs/menstrual-products",
  },
  {
    id: 11,
    image: "/images/together.png",
    category: "Global Impact",
    title: "How PadHer With Love is Making a Difference Worldwide",
    link: "/blogs/global-impact",
  },
  {
    id: 12,
    // image: "/images/bg-blog-4.png",
    category: "Volunteer Stories",
    title: "A Day in the Life of a PadHer With Love Volunteer",
    link: "/blogs/volunteer-stories",
  },
  {
    id: 13,
    image: "/images/bg-blog-2.png",
    category: "Event Highlights",
    title: "Highlights from Our Recent Menstrual Health Workshop",
    link: "/blogs/event-highlights",
  }
];

export type Blog = {
  id: number;
  image?: string;
  category: string;
  title: string;
  link: string;
};
