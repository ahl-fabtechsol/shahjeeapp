"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Store,
  Upload,
  CheckCircle,
  Users,
  LayoutDashboard,
  CreditCard,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { createSellerStore } from "@/services/sellerStore";
import { s3Uploader } from "@/services/s3Uploader";
import { toast } from "sonner";
import { logout } from "@/store/authStore";

const sellerStoreSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  category: z.string().optional(),
  about: z.string().optional(),
  image: z.string().optional(),
  coverImage: z.string().optional(),
});

export default function BecomeSellerPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sellerStoreSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      about: "",
      image: "",
      coverImage: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values) => createSellerStore(values),
    onSuccess: () => {
      toast.success("Created!");
      queryClient.invalidateQueries(["sellers"]);
      setIsSuccess(true);
      logout();
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error");
    },
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSelectChange = (name, value) => setValue(name, value);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImageUploading(true);
    try {
      const url = await s3Uploader(file, setIsImageUploading);
      setValue("image", url);
    } catch {
      toast.error("Image upload failed");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsCoverUploading(true);
    try {
      const url = await s3Uploader(file, setIsCoverUploading);
      setValue("coverImage", url);
    } catch {
      toast.error("Cover upload failed");
    } finally {
      setIsCoverUploading(false);
    }
  };

  const onSubmit = (data) => mutation.mutate(data);

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

  const formVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-screen bg-background"
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Success!</h2>
        <p className="text-muted-foreground mb-6">You are now a seller.</p>
        <Button onClick={() => router.push("/auth/login")}>Go to Login</Button>
      </motion.div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Become a Seller</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our marketplace and start selling your products to thousands of
          customers.
        </p>
      </motion.div>

      {mutation.isError && (
        <Alert variant="destructive" className="max-w-3xl mx-auto mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {mutation.error?.response?.data?.message || "Submission failed"}
          </AlertDescription>
        </Alert>
      )}

      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <Store className="mr-2" /> Basic Information
                  </h2>
                  {["name", "email", "phone"].map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                      <Input
                        id={field}
                        {...register(field)}
                        placeholder={field}
                      />
                      {errors[field] && (
                        <p className="text-sm text-destructive">
                          {errors[field].message}
                        </p>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold mb-6">Store Details</h2>
                  <div className="space-y-2">
                    <Label htmlFor="address">Store Address</Label>
                    <Input
                      id="address"
                      {...register("address")}
                      placeholder="123 Market St, City, State, ZIP"
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 w-full">
                    <Label>Store Category</Label>
                    <Select
                      className="w-full"
                      value={watch("category")}
                      onValueChange={(val) =>
                        handleSelectChange("category", val)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about">About Your Store</Label>
                    <Textarea
                      id="about"
                      rows={5}
                      {...register("about")}
                      placeholder="Tell customers about your store..."
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold mb-6">Store Images</h2>
                  {[
                    {
                      id: "image",
                      label: "Store Logo",
                      uploading: isImageUploading,
                      onChange: handleImageChange,
                    },
                    {
                      id: "coverImage",
                      label: "Cover Image",
                      uploading: isCoverUploading,
                      onChange: handleCoverChange,
                    },
                  ].map(({ id, label, uploading, onChange }) => {
                    const url = watch(id);
                    return (
                      <div key={id} className="space-y-4">
                        <Label htmlFor={id}>{label}</Label>
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                          <div className="flex flex-col items-center gap-2">
                            {url && (
                              <img
                                src={url}
                                alt={`${label} preview`}
                                className="mb-4 h-24 w-24 object-cover rounded"
                              />
                            )}

                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {uploading
                                ? `Uploading ${label}…`
                                : url
                                ? `${label} uploaded`
                                : `Drag & drop or click to upload ${label.toLowerCase()}`}
                            </p>

                            <input
                              id={id}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={onChange}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                document.getElementById(id).click()
                              }
                            >
                              Select File
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    Review & Submit
                  </h2>
                  <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "name",
                        "email",
                        "phone",
                        "address",
                        "category",
                        "about",
                      ].map((field) => (
                        <div key={field}>
                          <h3 className="font-medium text-sm text-muted-foreground">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </h3>
                          <p>{watch(field) || "Not provided"}</p>
                        </div>
                      ))}
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">
                          Images
                        </h3>
                        <p>
                          {watch("image") ? "Logo uploaded" : "No logo"} /{" "}
                          {watch("coverImage") ? "Cover uploaded" : "No cover"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button type="button" onClick={nextStep} className="ml-auto">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={mutation.isLoading || mutation.isPending}
                >
                  {mutation.isLoading || mutation.isPending ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Submitting..
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 grid md:grid-cols-3 gap-8"
      >
        {[
          {
            title: "Reach More Customers",
            description: "Gain access to our growing customer base...",
            icon: <Users className="h-10 w-10 text-primary" />,
          },
          {
            title: "Easy Store Management",
            description: "Manage products, orders, and customers with ease...",
            icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
          },
          {
            title: "Secure Payments",
            description: "Receive payments securely and on time...",
            icon: <CreditCard className="h-10 w-10 text-primary" />,
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.2, duration: 0.5 }}
            className="bg-card p-6 rounded-lg shadow-sm border"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground">{f.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
