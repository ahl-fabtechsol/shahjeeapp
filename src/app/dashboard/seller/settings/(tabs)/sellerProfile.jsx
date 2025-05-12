"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  getUser as getUserApi,
  updateUser as updateUserApi,
} from "@/services/adminUser";
import { getUser } from "@/store/authStore";
import { s3Uploader } from "@/services/s3Uploader";
import { Loader2, Trash2, UploadCloud } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

export default function SellerProfile() {
  const userId = getUser()?._id;
  const qc = useQueryClient();

  const {
    data: user,
    isLoading: isFetching,
    isError: isFetchError,
    error: fetchError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserApi(userId),
    enabled: Boolean(userId),
    staleTime: 300_000,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email, phone: user.phone });
      setPreviewUrl(user.image);
    }
  }, [user, reset]);

  const updateMutation = useMutation({
    mutationFn: (payload) => updateUserApi(userId, payload),
    onSuccess: () => {
      qc.invalidateQueries(["user", userId]);
      toast.success("Profile updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Update failed");
    },
  });

  const onSubmit = async (values) => {
    let uploadedUrl = null;
    if (file) {
      try {
        setIsImageUploading(true);
        uploadedUrl = await s3Uploader(file, setIsImageUploading);
        setPreviewUrl(uploadedUrl);
        setFile(null);
      } catch {
        toast.error("Image upload failed");
        return;
      }
    } else {
      uploadedUrl = user.image;
    }
    updateMutation.mutate({ ...values, image: uploadedUrl });
  };

  if (isFetching) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  if (isFetchError) {
    return <div>Error loading profile: {String(fetchError)}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your profile details.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Avatar className="h-32 w-32">
                {previewUrl ? (
                  <AvatarImage src={previewUrl} alt="Profile Preview" />
                ) : (
                  <AvatarFallback>U</AvatarFallback>
                )}
              </Avatar>

              <div
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                    transition-opacity rounded-full flex items-center justify-center space-x-2"
              ></div>
            </div>

            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) {
                  setFile(f);
                  setPreviewUrl(URL.createObjectURL(f));
                }
              }}
              disabled={isImageUploading || updateMutation.isLoading}
            />

            <label
              htmlFor="file-input"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700
               text-white rounded-md text-sm font-medium shadow-sm transition
               focus:outline-none disabled:opacity-50"
            >
              {previewUrl ? "Change Photo" : "Upload Photo"}
            </label>
          </div>

          <Separator />
          <div className="grid gap-4">
            {["name", "email", "phone"].map((field) => (
              <div key={field}>
                <Label htmlFor={field}>
                  {field === "name"
                    ? "Full Name"
                    : field === "email"
                    ? "Email Address"
                    : "Phone Number"}
                </Label>
                <Input
                  id={field}
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  {...register(field)}
                />
                {errors[field] && (
                  <p className="text-xs text-red-500">
                    {errors[field].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 pt-5">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              reset();
              setFile(null);
              setPreviewUrl(
                user.image || "/placeholder.svg?height=64&width=64"
              );
            }}
            disabled={
              updateMutation.isPending ||
              updateMutation.isLoading ||
              isImageUploading
            }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              updateMutation.isPending ||
              updateMutation.isLoading ||
              isImageUploading
            }
          >
            {updateMutation.isPending ||
            updateMutation.isLoading ||
            isImageUploading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving…
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
