"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
}

export function DeleteStoryDialog({
  open,
  onOpenChange,
  title,
  isDeleting = false,
  onConfirm,
}: DeleteStoryDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-pink-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-playfair text-[#111111]">
            Delete this story?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#11111199]">
            {title ? `“${title}” will be` : "This story will be"} permanently
            deleted. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full border-pink-100 text-[#11111199] hover:bg-[#FFE8F7] hover:text-[#ED006C]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-full bg-red-600 text-white hover:bg-red-700"
            data-testid="button-confirm-delete-story"
          >
            {isDeleting ? "Deleting…" : "Delete story"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
