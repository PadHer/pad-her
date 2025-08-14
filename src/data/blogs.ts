export const blogs = [
  {
    id: 1,
    image: "/images/bg-blog.png",
    category: "Menstrual Myth",
    title: "Separating Facts from Fictions",
    link: "/blogs/menstrual-myths",
  },
  {
    id: 2,
    image: "/images/bg-blog-2.png",
    category: "Health Tips",
    title: "Hygiene Practices Every Teen Girl Should Know",
    link: "/blogs/hygiene-practices",
  },
  {
    id: 3,
    image: "/images/bg-blog-3.png",
    category: "Period Poverty",
    title: "The Silent Struggle: Period Poverty in Rural Areas",
    link: "/blogs/period-poverty",
  },
  {
    id: 4,
    image: "/images/bg-blog-4.png",
    category: "Awareness",
    title: "Raising Awareness Through School Campaigns",
    link: "/blogs/school-campaigns",
  },
    {
        id: 5,
        image: "/images/bg-blog-5.png",
        category: "Mental Health",
        title: "Coping with Period-Related Mood Swings",
        link: "/blogs/mental-health",
    },
    {
        id: 6,
        image: "/images/bg-blog-6.png",
        category: "Nutrition",
        title: "Nutrition Tips for a Healthy Menstrual Cycle",
        link: "/blogs/nutrition-tips",
    },

];

export type Blog = {
  id: number;
  image: string;
  category: string;
  title: string;
  link: string;
};
