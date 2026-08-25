/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@tanstack/react-query";
import { UploadService } from "@/services/uploads.service";
import { useToast } from "@/components/ui/use-toast";

export function useUploadImage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: UploadService.uploadImage,

    onError: (error: any) => {
      toast({
        title: "Upload failed",
        description:
          error?.response?.data?.message ?? "Unable to upload image.",
      });
    },
  });
}
