"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSellerStores, updateSellerStore } from "@/services/sellerStore";
import { getUser } from "@/store/authStore";
import { s3Uploader } from "@/services/s3Uploader";
import { toast } from "sonner";
import { Loader2, Store } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Toys & Games",
  "Books & Media",
  "Food & Grocery",
  "Health & Wellness",
  "Art & Crafts",
  "Automotive",
  "Other",
];

const storeSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  about: z.string().min(1, "About is required"),
  category: z.string().min(1, "Category is required"),
});

const SellerStore = () => {
  const userId = getUser()?._id;
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      about: "",
      category: "",
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const imageInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const {
    data: storeData,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["store", userId],
    queryFn: () => getSellerStores({ seller: userId }),
    enabled: Boolean(userId),
    staleTime: 300_000,
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateSellerStore(storeData?.results[0]?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["store", userId]);
      toast.success("Store updated successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Update failed");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
    imageInputRef.current.value = null;
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
    coverInputRef.current.value = null;
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverImagePreview(null);
  };

  const onSubmit = async (values) => {
    let uploadedImage = imagePreview;
    let uploadedCover = coverImagePreview;

    if (imageFile) {
      try {
        setFileLoading(true);
        uploadedImage = await s3Uploader(imageFile, setFileLoading);
        setImageFile(null);
      } catch {
        toast.error("Image upload failed");
        return;
      }
    }

    if (coverFile) {
      try {
        setFileLoading(true);
        uploadedCover = await s3Uploader(coverFile, setFileLoading);
        setCoverFile(null);
      } catch {
        toast.error("Cover image upload failed");
        return;
      }
    }

    updateMutation.mutate({
      ...values,
      image: uploadedImage,
      coverImage: uploadedCover,
    });
  };

  useEffect(() => {
    if (!storeData) return;
    const s = storeData.results?.[0];
    if (s) {
      reset({
        name: s.name,
        email: s.email,
        phone: s.phone,
        address: s.address,
        about: s.about,
        category: s.category,
      });
      if (s.image) setImagePreview(s.image);
      if (s.coverImage) setCoverImagePreview(s.coverImage);
      if (s.category) setValue("category", s.category);
    }
  }, [storeData, reset]);

  if (isFetching) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    toast.error(error?.response?.data?.message || "Error while fetching");
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching store data</p>
        <p>{error?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Settings</CardTitle>
        <CardDescription>
          Manage your store information and preferences.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              placeholder="Your Store Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="store-email">Store Email</Label>
            <Input
              id="store-email"
              type="email"
              placeholder="store@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="store-phone">Store Phone</Label>
            <Input
              id="store-phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="store-address">Store Address</Label>
            <Input
              id="store-address"
              placeholder="123 Store Street, City, Country"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-600 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="store-about">About Store</Label>
            <Textarea
              id="store-about"
              placeholder="Tell customers about your store"
              className="min-h-[120px]"
              {...register("about")}
            />
            {errors.about && (
              <p className="text-red-600 text-sm">{errors.about.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="store-category">Store Category</Label>
            <Select
              value={watch("category")}
              onValueChange={(value) => setValue("category", value)}
              className="w-full"
            >
              <SelectTrigger id="store-category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.category && (
              <p className="text-red-600 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Store Images</Label>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Store Logo</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="h-32 w-32 rounded-md border overflow-hidden bg-muted">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Logo Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <Store className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        disabled={fileLoading}
                        onClick={() => imageInputRef.current.click()}
                      >
                        Upload
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        disabled={fileLoading || !imagePreview}
                        onClick={removeImage}
                      >
                        Remove
                      </Button>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={imageInputRef}
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Cover Image</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="h-32 w-48 rounded-md border overflow-hidden bg-muted">
                    {coverImagePreview ? (
                      <img
                        src={coverImagePreview}
                        alt="Cover Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <Store className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        disabled={fileLoading}
                        onClick={() => coverInputRef.current.click()}
                      >
                        Upload
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        disabled={fileLoading || !coverImagePreview}
                        onClick={removeCover}
                      >
                        Remove
                      </Button>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={coverInputRef}
                      onChange={handleCoverChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-5">
          <Button
            variant="outline"
            disabled={
              fileLoading ||
              updateMutation.isLoading ||
              updateMutation.isPending
            }
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              fileLoading ||
              updateMutation.isLoading ||
              updateMutation.isPending
            }
          >
            {updateMutation.isLoading || updateMutation.isPending ? (
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
};

export default SellerStore;
