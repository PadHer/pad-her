import { api } from "@/lib/axios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UploadResponse {
  url: string;
  publicId: string;
}

export const UploadService = {
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();

    formData.append("file", file);

    const { data } = await api.post<ApiResponse<UploadResponse>>(
      "/uploads/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data.data;
  },
};
