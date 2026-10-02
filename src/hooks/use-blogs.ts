"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api, publicApi } from "@/lib/axios";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export enum BlogStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type BlogPostContent = {
  [key: string]: unknown;
};

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogPostContent;
  /** @nullable */
  featuredImage: string | null;
  author: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  /** @nullable */
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostInputContent = {
  [key: string]: unknown;
};

export interface BlogPostInput {
  /** @minLength 1 */
  title: string;
  /** @minLength 1 */
  slug: string;
  excerpt?: string;
  content: BlogPostInputContent;
  /** @nullable */
  featuredImage?: string | null;
  author?: string;
  /** @minLength 1 */
  category: string;
  tags?: string[];
  status?: BlogStatus;
}

export type BlogPostUpdateContent = {
  [key: string]: unknown;
};

export interface BlogPostUpdate {
  /** @minLength 1 */
  title?: string;
  /** @minLength 1 */
  slug?: string;
  excerpt?: string;
  content?: BlogPostUpdateContent;
  /** @nullable */
  featuredImage?: string | null;
  author?: string;
  /** @minLength 1 */
  category?: string;
  tags?: string[];
  status?: BlogStatus;
}

export type ListBlogPostsParams = {
  search?: string;
  category?: string;
  status?: BlogStatus;
  includeDrafts?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Query Keys                                                                  */
/* -------------------------------------------------------------------------- */

// Params are only appended when present so that invalidating the bare
// ["blog-posts"] key also refreshes every filtered list.
export const getListBlogPostsQueryKey = (params?: ListBlogPostsParams) =>
  params ? ["blog-posts", params] : ["blog-posts"];

export const getPublicBlogPostsQueryKey = (params?: ListBlogPostsParams) =>
  params ? ["public-blog-posts", params] : ["public-blog-posts"];

export const getGetBlogPostQueryKey = (id: string) => ["blog-post", id];

export const getHealthCheckQueryKey = () => ["health-check"];

export const getRelatedBlogPostsQueryKey = (
  slug: string,
  tags: string[],
) => [
  "related-blog-posts",
  slug,
  tags,
];

/* -------------------------------------------------------------------------- */
/* List Blog Posts                                                             */
/* -------------------------------------------------------------------------- */

export const useListBlogPosts = (params?: ListBlogPostsParams) => {
  return useQuery({
    queryKey: getListBlogPostsQueryKey(params),

    queryFn: async () => {
      const { data } = await api.get<BlogPost[]>("/blog-posts", {
        params,
      });

      return data;
    },

    placeholderData: keepPreviousData,
  });
};

/* -------------------------------------------------------------------------- */
/* Get Blog Post                                                               */
/* -------------------------------------------------------------------------- */

export const useGetBlogPost = (id: string) => {
  return useQuery({
    queryKey: getGetBlogPostQueryKey(id),

    queryFn: async () => {
      const { data } = await api.get<BlogPost>(`/blog-posts/${id}`);

      return data;
    },

    enabled: Boolean(id),
  });
};

/* -------------------------------------------------------------------------- */
/* Create Blog Post                                                            */
/* -------------------------------------------------------------------------- */

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: BlogPostInput) => {
      const { data } = await api.post<BlogPost>("/blog-posts", payload);

      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getListBlogPostsQueryKey(),
      });

      queryClient.setQueryData(getGetBlogPostQueryKey(data.id), data);
    },
  });
};

/* -------------------------------------------------------------------------- */
/* Update Blog Post                                                            */
/* -------------------------------------------------------------------------- */

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...payload }: BlogPostUpdate & { id: string }) => {
      const { data } = await api.patch<BlogPost>(
        `/blog-posts/${id}`,
        payload,
      );

      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getListBlogPostsQueryKey(),
      });

      queryClient.setQueryData(getGetBlogPostQueryKey(data.id), data);
    },
  });
};

/* -------------------------------------------------------------------------- */
/* Delete Blog Post                                                            */
/* -------------------------------------------------------------------------- */

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/blog-posts/${id}`);

      return data;
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: getListBlogPostsQueryKey(),
      });

      queryClient.removeQueries({
        queryKey: getGetBlogPostQueryKey(id),
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/* Publish Blog Post                                                           */
/* -------------------------------------------------------------------------- */

export const usePublishBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.patch<BlogPost>(
        `/blog-posts/${id}/publish`,
      );

      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getListBlogPostsQueryKey(),
      });

      queryClient.setQueryData(getGetBlogPostQueryKey(data.id), data);
    },
  });
};

/* -------------------------------------------------------------------------- */
/* Unpublish Blog Post                                                         */
/* -------------------------------------------------------------------------- */

export const useUnpublishBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.patch<BlogPost>(
        `/blog-posts/${id}/unpublish`,
      );

      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getListBlogPostsQueryKey(),
      });

      queryClient.setQueryData(getGetBlogPostQueryKey(data.id), data);
    },
  });
};

/* -------------------------------------------------------------------------- */
/* Health Check                                                                */
/* -------------------------------------------------------------------------- */

export const useHealthCheck = () => {
  return useQuery({
    queryKey: getHealthCheckQueryKey(),

    queryFn: async () => {
      const { data } = await api.get<{
        status: string;
        message: string;
      }>("/health");

      return data;
    },
  });
};


export const getPublicBlogPostQueryKey = (slug: string) => [
  "public-blog-post",
  slug,
];

export const useGetPublicBlogPost = (slug: string) => {
  return useQuery({
    queryKey: getPublicBlogPostQueryKey(slug),

    queryFn: async () => {
      const { data } = await publicApi.get<BlogPost>(
        `/blog/${slug}`,
      );

      return data;
    },

    enabled: Boolean(slug),
  });
};

export const usePublicBlogPosts = (params?: ListBlogPostsParams) => {
  return useQuery({
    queryKey: getPublicBlogPostsQueryKey(params),

    queryFn: async () => {
      const { data } = await publicApi.get<BlogPost[]>("/blog", {
        params,
      });

      return data;
    },
  });
};



export const useGetRelatedBlogPosts = (
  slug: string,
  tags: string[],
) => {
  return useQuery({
    queryKey: getRelatedBlogPostsQueryKey(slug, tags),

    queryFn: async () => {
      const { data } = await publicApi.get<BlogPost[]>(
        `/blog/${slug}/related`,
        {
          params: {
            tags: tags.join(","),
          },
        },
      );

      return data;
    },

    enabled: Boolean(slug && tags.length),
  });
};