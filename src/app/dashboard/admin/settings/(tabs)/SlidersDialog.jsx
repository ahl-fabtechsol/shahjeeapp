"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { s3Uploader } from "@/services/s3Uploader";
import { createSlider, updateSlider } from "@/services/slidersService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SliderDialog({ mode, slider, open, onOpenChange }) {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const schema = z
    .object({
      name: z.string().min(1, "Name is required"),
      description: z.string().min(1, "Description is required"),
      image: z.any().optional(),
    })
    .superRefine((data, ctx) => {
      if (
        mode === "add" &&
        (!data.image ||
          !(data.image instanceof FileList) ||
          data.image.length === 0)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["image"],
          message: "Image file is required",
        });
      }
    });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "", image: null },
  });

  const mutation = useMutation({
    mutationFn: (values) => {
      return mode === "edit"
        ? updateSlider(slider?._id, values)
        : createSlider(values);
    },
    onSuccess: () => {
      toast.success(mode === "edit" ? "Updated!" : "Created!");
      queryClient.invalidateQueries(["sliders"]);
      onOpenChange(false);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error");
    },
  });

  const onSubmit = async (values) => {
    let imageUrl = preview;
    if (values.image && values.image[0]) {
      setUploading(true);
      imageUrl = await s3Uploader(values.image[0], setUploading);
      setPreview(imageUrl);
    }
    setValue("name", values.name);
    setValue("description", values.description);
    setValue("image", imageUrl);
    mutation.mutate({
      name: values.name,
      description: values.description,
      image: imageUrl,
    });
  };

  useEffect(() => {
    if (!open) {
      reset();
      setPreview("");
    }
    if (slider && (mode === "edit" || mode === "view")) {
      reset({
        name: slider.name,
        description: slider.description || "",
        image: null,
      });
      setPreview(slider.image);
    }
  }, [open, slider, mode, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Slider" : "Add Slider"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update your Slider details."
              : "Fill in to create a new Slider."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} disabled={mode === "view"} />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={3}
              disabled={mode === "view"}
            />
            {errors.description && (
              <p className="text-red-600 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              disabled={mode === "view"}
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                register("image").onChange(e);
                const file = e.target.files[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />
            {errors.image && (
              <p className="text-red-600 text-sm">{errors.image.message}</p>
            )}
            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="preview"
                  className="mt-2 h-24 object-cover rounded"
                />
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={uploading || mutation.isLoading || mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={uploading || mutation.isLoading || mutation.isPending}
            >
              {uploading || mutation.isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </span>
              ) : mode === "edit" ? (
                <>
                  {mutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating…
                    </span>
                  ) : (
                    "Update"
                  )}
                </>
              ) : (
                "Add"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
