"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "@/services/adminUser";
import { s3Uploader } from "@/services/s3Uploader";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UserDialog({ open, mode, currentUser, onOpenChange }) {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const isView = mode === "view";
  const title =
    mode === "add"
      ? "Add New User"
      : mode === "edit"
      ? "Edit User"
      : "View User";
  const actionText = mode === "add" ? "Create" : "Update";

  const schema = z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().optional(),
      role: z.enum(["B", "M", "S"], {
        errorMap: () => ({ message: "Invalid role" }),
      }),
      image: z.any().optional(),
    })
    .superRefine((data, ctx) => {
      if (mode === "add" && (!data.image || data.image.length === 0)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["image"],
          message: "Image file is required",
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "Password is required",
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
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "B",
      image: null,
    },
  });

  const mutation = useMutation({
    mutationFn: (values) =>
      mode === "edit" && currentUser
        ? updateUser(currentUser._id, values)
        : createUser(values),
    onSuccess: () => {
      toast.success(mode === "edit" ? "Updated!" : "Created!");
      queryClient.invalidateQueries(["users"]);
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
      setUploading(false);
      setPreview(imageUrl);
    }

    mutation.mutate({
      name: values.name,
      email: values.email,
      role: values.role,
      password: values.password,
      image: imageUrl,
    });
  };

  useEffect(() => {
    if (!open) {
      reset();
      setPreview("");
      return;
    }
    if ((mode === "edit" || mode === "view") && currentUser) {
      reset({
        name: currentUser.name,
        email: currentUser.email,
        password: "",
        role: currentUser.role,
        image: null,
      });
      setPreview(currentUser.image || "");
    }
  }, [open, currentUser, mode, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isView
              ? "Review the user’s details below."
              : `Fill out the form to ${actionText.toLowerCase()} a user.`}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4"
        >
          <div className="md:col-span-2 flex flex-col items-center">
            <label htmlFor="image" className="relative group cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center transition group-hover:border-primary">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Avatar Preview"
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <UploadCloud className="w-10 h-10 text-gray-400" />
                )}
              </div>

              <input
                id="image"
                type="file"
                accept="image/*"
                disabled={isView}
                className="absolute inset-0 opacity-0 cursor-pointer"
                {...register("image")}
                onChange={(e) => {
                  register("image").onChange(e);
                  const file = e.target.files?.[0];
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
            {errors.image && (
              <p className="mt-2 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              disabled={isView}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              disabled={isView}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {!isView ||
            (mode !== "edit" && (
              <div className="flex flex-col md:col-span-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  disabled={isView}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            ))}

          <div className="flex flex-col md:col-span-2">
            <Label htmlFor="role">Role</Label>
            <Select
              id="role"
              disabled={isView}
              className="w-full"
              defaultValue={currentUser?.role || "B"}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B">User</SelectItem>
                <SelectItem value="S">Seller</SelectItem>
                <SelectItem value="M">Manager</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-2 md:col-span-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={uploading || mutation.isLoading || mutation.isPending}
            >
              Cancel
            </Button>
            {!isView && (
              <Button
                type="submit"
                disabled={uploading || mutation.isLoading || mutation.isPending}
              >
                {uploading || mutation.isLoading || mutation.isPending ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
                  </span>
                ) : (
                  actionText
                )}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
