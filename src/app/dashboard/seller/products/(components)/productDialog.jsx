"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2 } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "@/services/productService";
import { s3Uploader } from "@/services/s3Uploader";

export function ProductDialog({
  open,
  onOpenChange,
  categories = [],
  mode,
  selectedProduct,
}) {
  const queryClient = useQueryClient();
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [imageLoading, setImageLoading] = useState(false);

  const categoriesSchema = z
    .object({
      name: z.string().min(1, "Name is required"),
      productCode: z.string().min(1, "ProductCode is required"),
      description: z.string().optional(),
      price: z.number().positive("Price must be positive").optional(),
      quantity: z
        .number()
        .int()
        .positive("Quantity must be positive")
        .optional(),
      stockThreshold: z
        .number()
        .int()
        .positive("Stock threshold must be positive")
        .optional(),
      category: z.string().min(1, "Category is required"),
      status: z.enum(["A", "IA"]),
    })
    .refine(
      (data) =>
        data.quantity == null ||
        data.stockThreshold == null ||
        data.stockThreshold <= data.quantity,
      {
        message: "Stock threshold must not exceed quantity",
        path: ["stockThreshold"],
      }
    );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(categoriesSchema),
    defaultValues: {
      name: "",
      productCode: "",
      description: "",
      price: 0,
      quantity: 0,
      stockThreshold: 0,
      category: "",
      status: "A",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      mode === "add"
        ? createProduct(data)
        : updateProduct(selectedProduct._id, data),
    onSuccess: () => {
      toast.success(mode === "add" ? "Product created" : "Product updated");
      if (mode === "add") {
        reset();
      }
      queryClient.invalidateQueries(["products"]);

      setImages([]);
      onOpenChange(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || mode === "add"
          ? "Error creating product"
          : "Error updating product"
      );
    },
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-primary", "bg-primary/10");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary", "bg-primary/10");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary", "bg-primary/10");

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => {
      const id = Math.random().toString(36).substring(2, 15);
      return {
        id,
        file,
        url: URL.createObjectURL(file),
        name: file.name,
      };
    });

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleClose = () => {
    onOpenChange(false);
    setImages([]);
  };

  const onSubmit = async (data) => {
    if (images.length < 1)
      return toast.error("Please upload at least one image");
    let urls = [];
    setImageLoading(true);
    if (images.length > 0) {
      for (const image of images) {
        if (image.file) {
          const url = await s3Uploader(image.file, setImageLoading);
          urls.push(url);
        } else {
          urls.push(image.url);
        }
      }
    }
    mutation.mutate({
      ...data,
      images: urls,
    });
  };

  useEffect(() => {
    if (mode === "edit" && selectedProduct) {
      reset({
        name: selectedProduct.name,
        productCode: selectedProduct.productCode,
        description: selectedProduct.description,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
        stockThreshold: selectedProduct.stockThreshold,
        category: selectedProduct.category._id,
        status: selectedProduct.status,
      });
      setImages(
        selectedProduct.images.map((image) => ({
          id: Math.random().toString(36).substring(2, 15),
          url: image,
          name: image.split("/").pop(),
          file: null,
        }))
      );
    }
  }, [mode, selectedProduct, reset, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="productCode">Product Code</Label>
                <Input
                  {...register("productCode")}
                  className={errors.code ? "border-red-500" : ""}
                  id="productCode"
                  placeholder="Enter product code"
                />
                {errors.productCode && (
                  <p className="text-red-600 text-sm">
                    {errors.productCode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                className={errors.description ? "border-red-500" : ""}
                id="description"
                placeholder="Enter product description"
                rows={3}
              />
              {errors.description && (
                <p className="text-red-600 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  {...register("price", { valueAsNumber: true })}
                  className={errors.price ? "border-red-500" : ""}
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  {...register("quantity", { valueAsNumber: true })}
                  className={errors.quantity ? "border-red-500" : ""}
                  id="quantity"
                  type="number"
                  min="0"
                  placeholder="0"
                />
                {errors.quantity && (
                  <p className="text-red-600 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockThreshold">Stock Threshold</Label>
                <Input
                  {...register("stockThreshold", { valueAsNumber: true })}
                  className={errors.stockThreshold ? "border-red-500" : ""}
                  id="stockThreshold"
                  type="number"
                  min="0"
                  placeholder="0"
                />
                {errors.stockThreshold && (
                  <p className="text-red-600 text-sm">
                    {errors.stockThreshold.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1  gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  className="w-full"
                  value={watch("category")}
                  id="category"
                  onValueChange={(value) => setValue("category", value)}
                  defaultValue=""
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-600 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue="A"
                  value={watch("status")}
                  onValueChange={(value) => setValue("status", value)}
                  id="status"
                  className="w-full"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Active</SelectItem>
                    <SelectItem value="IA">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-600 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product Images</Label>
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Upload className="h-10 w-10 text-gray-400" />
                  </motion.div>
                  <p className="text-sm font-medium">
                    Drag and drop images here or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports: JPG, PNG, GIF (Max 5MB each)
                  </p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium">
                    Uploaded Images ({images.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <AnimatePresence>
                      {images.map((image) => (
                        <motion.div
                          key={image.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{
                            opacity: 0,
                            scale: 0.8,
                            transition: { duration: 0.2 },
                          }}
                          transition={{ duration: 0.3 }}
                          className="relative group aspect-square rounded-md overflow-hidden border"
                        >
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(image.id);
                              }}
                              className="bg-red-500 text-white p-1 rounded-full"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                            {image.name}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              disabled={mutation.isPending || imageLoading}
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button disabled={mutation.isPending || imageLoading} type="submit">
              {mutation.isPending || imageLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </span>
              ) : (
                "Save Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
