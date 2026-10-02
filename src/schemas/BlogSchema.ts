import { z } from "zod";

export enum BlogStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export const blogPostContentSchema = z.record(z.string(), z.unknown());

export const blogPostInputSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: blogPostContentSchema,
  featuredImage: z.string().nullable().optional(),
  author: z.string().optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  status: z.nativeEnum(BlogStatus).optional(),
});

export type BlogPostFormValues = z.infer<typeof blogPostInputSchema>;

export const blogPostUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: blogPostContentSchema.optional(),
  featuredImage: z.string().nullable().optional(),
  author: z.string().optional(),
  category: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  status: z.nativeEnum(BlogStatus).optional(),
});