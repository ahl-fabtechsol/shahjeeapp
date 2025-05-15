"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2, ChevronsUpDown } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { s3Uploader } from "@/services/s3Uploader";
import { createDeal, updateDeal } from "@/services/dealsService";

export function DealsDialog({
  open,
  onOpenChange,
  products = [],
  mode = "add",
  selectedDeal = null,
}) {
  const queryClient = useQueryClient();
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dealsSchema = z.object({
    dealCode: z.string().min(1, "Deal code is required"),
    description: z.string().min(1, "Description is required"),
    discountPercentage: z
      .number()
      .min(0, "Must be at least 0")
      .max(100, "Must be at most 100"),
    products: z.array(z.string()).nonempty("Select at least one product"),
    status: z.enum(["A", "IA", "S"]),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dealsSchema),
    defaultValues: {
      dealCode: "",
      description: "",
      discountPercentage: 0,
      products: [],
      status: "A",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      mode === "add" ? createDeal(data) : updateDeal(selectedDeal._id, data),
    onSuccess: () => {
      toast.success(mode === "add" ? "Deal created" : "Deal updated");
      queryClient.invalidateQueries(["deals"]);
      reset();
      setImages([]);
      setSelectedProducts([]);
      onOpenChange(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "An error occurred");
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
    const newImages = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(2, 15),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleClose = () => {
    onOpenChange(false);
    setImages([]);
    setSelectedProducts([]);
    reset();
  };

  const toggleProduct = (productId, checked) => {
    setSelectedProducts((current) => {
      let newSelection;

      if (checked) {
        newSelection = [...current, productId];
      } else {
        newSelection = current.filter((id) => id !== productId);
      }

      setValue("products", newSelection);
      return newSelection;
    });
  };

  const removeProduct = (productId) => {
    setSelectedProducts((current) => {
      const newSelection = current.filter((id) => id !== productId);
      setValue("products", newSelection);
      return newSelection;
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data) => {
    if (images.length < 1) {
      return toast.error("Please upload at least one image");
    }
    const urls = [];
    for (const image of images) {
      if (image.file) {
        setImageLoading(true);
        const url = await s3Uploader(image.file, setImageLoading);
        urls.push(url);
      } else {
        urls.push(image.url);
      }
    }
    mutation.mutate({ ...data, images: urls });
  };

  useEffect(() => {
    if (mode === "edit" && selectedDeal) {
      const productIds = selectedDeal.products.map((p) => p._id);
      reset({
        dealCode: selectedDeal.dealCode,
        description: selectedDeal.description,
        discountPercentage: selectedDeal.discountPercentage,
        products: productIds,
        status: selectedDeal.status,
      });
      setSelectedProducts(productIds);
      setImages(
        selectedDeal.images.map((url) => ({
          id: Math.random().toString(36).substring(2, 15),
          url,
          name: url.split("/").pop(),
          file: null,
        }))
      );
    }
  }, [mode, selectedDeal, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Deal" : "Edit Deal"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Fill in the details to add a new deal."
              : "Update the deal details."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="dealCode">Deal Name</Label>
            <Input id="dealCode" {...register("dealCode")} />
            {errors.dealCode && (
              <p className="text-red-600 text-sm">{errors.dealCode.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} rows={3} />
            {errors.description && (
              <p className="text-red-600 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="discountPercentage">Discount Percentage</Label>
            <Input
              id="discountPercentage"
              type="number"
              step="0.01"
              min="0"
              {...register("discountPercentage", { valueAsNumber: true })}
            />
            {errors.discountPercentage && (
              <p className="text-red-600 text-sm">
                {errors.discountPercentage.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="products">Products</Label>
            <div className="space-y-2">
              {/* Selected products display */}
              {selectedProducts.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedProducts.map((id) => {
                    const product = products.find((p) => p._id === id);
                    return (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {product?.name}
                        <button
                          type="button"
                          className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onClick={() => removeProduct(id)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}

              {/* Product selector */}
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-full border rounded-md"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full justify-between"
                    type="button"
                  >
                    <span>
                      {selectedProducts.length > 0
                        ? `${selectedProducts.length} product${
                            selectedProducts.length > 1 ? "s" : ""
                          } selected`
                        : "Select products"}
                    </span>
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-2">
                  <div className="mb-2">
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <ScrollArea className="h-72">
                    <div className="space-y-2">
                      {filteredProducts.length === 0 ? (
                        <p className="text-sm text-muted-foreground p-2">
                          No products found
                        </p>
                      ) : (
                        filteredProducts.map((product) => (
                          <div
                            key={product._id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`product-${product._id}`}
                              checked={selectedProducts.includes(product._id)}
                              onCheckedChange={(checked) =>
                                toggleProduct(product._id, checked)
                              }
                            />
                            <label
                              htmlFor={`product-${product._id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {product.name}
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CollapsibleContent>
              </Collapsible>
            </div>
            {errors.products && (
              <p className="text-red-600 text-sm">{errors.products.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue="A"
              onValueChange={(value) => setValue("status", value)}
              value={watch("status")}
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
              <p className="text-red-600 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div>
            <Label>Deal Images</Label>
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                </motion.div>
                <p className="text-sm font-medium">
                  Drag & drop or click to upload images
                </p>
                <p className="text-xs text-muted-foreground">
                  Max 5MB each (JPG, PNG, GIF)
                </p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                      className="relative group aspect-square rounded-md overflow-hidden border"
                    >
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                          className="bg-destructive text-destructive-foreground p-1 rounded-full"
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
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={
                mutation.isLoading || imageLoading || mutation.isPending
              }
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                mutation.isLoading || mutation.isPending || imageLoading
              }
            >
              {mutation.isLoading || mutation.isPending || imageLoading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </span>
              ) : mode === "add" ? (
                "Create Deal"
              ) : (
                "Update Deal"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
