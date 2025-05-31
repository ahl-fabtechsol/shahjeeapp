"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getDealsForSite, getDealsForSiteById } from "@/services/dealsService";
import { createOrder } from "@/services/orderService";
import { isLoggedIn } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function DealDetailPage() {
  const loggedIn = isLoggedIn();
  const clearCart = useCartStore((state) => state.clearCart);
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [buyerAddress, setBuyerAddress] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [paymentMode, setPaymentMode] = useState("COD");

  const {
    data: dealData,
    isLoading: dealLoading,
    isFetching: dealFetching,
    isError: dealError,
    error: dealErrorMessage,
  } = useQuery({
    queryKey: ["dealForSite", id],
    queryFn: () => getDealsForSiteById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    retry: 1,
  });

  const {
    data: relatedDealsData,
    isLoading: relatedDealsLoading,
    isFetching: relatedDealsFetching,
    isError: relatedDealsError,
    error: relatedDealsErrorMessage,
  } = useQuery({
    queryKey: ["relatedDeals", dealData?.createdBy],
    queryFn: () =>
      getDealsForSite({
        page: 1,
        limit: 100000,
        seller: dealData?.createdBy,
        search: "",
      }),
    staleTime: 1000 * 60 * 5,
    enabled: !!dealData?.createdBy,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: (data) => createOrder(data),
    onSuccess: (data) => {
      toast.success("Order created successfully");
      if (paymentMode === "O") {
        window.location.href = data.url;
      } else {
        clearCart();
        setConfirmationModal(false);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create order");
      console.error("Error creating order:", error);
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleAddressChange = (e) => {
    setBuyerAddress({ ...buyerAddress, [e.target.name]: e.target.value });
  };

  const handleBuy = () => {
    if (!loggedIn) {
      toast.error("Please log in to proceed with the order");
      return;
    }

    const requiredFields = [
      "name",
      "phone",
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "country",
    ];
    for (const field of requiredFields) {
      if (!buyerAddress[field]) {
        toast.error(`Please fill in ${field} for the buyer address`);
        return;
      }
    }

    const products = dealData?.products?.map((item) => ({
      product: item._id,
      quantity: 1,
    }));
    const seller = dealData?.createdBy;
    const totalAmount = dealData?.price;
    const itemCount = dealData?.products?.reduce((acc, item) => acc + 1, 0);

    const data = {
      products,
      seller,
      totalAmount,
      itemCount,
      buyerAddress,
      paymentMode,
    };
    mutation.mutate(data);
  };

  if (dealError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching product data</p>
        <p>{dealErrorMessage?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (relatedDealsError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching related data</p>
        <p>{relatedDealsErrorMessage?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (dealLoading || dealFetching) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={handleGoBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-40 ml-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-md" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-6 w-1/3" />
            </div>

            <Skeleton className="h-24 w-full" />

            <div>
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getOriginalPrice = (price, discount) => {
    if (discount) {
      return (price / (1 - discount / 100)).toFixed(2);
    }
    return price;
  };

  if (!dealData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Deal not found</h2>
        <p className="text-muted-foreground mb-8">
          The deal you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={handleGoBack}>Go back to deals</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-16 py-8">
      <Dialog open={confirmationModal} onOpenChange={setConfirmationModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DialogTitle className="text-center text-2xl font-bold">
                Confirm Order
              </DialogTitle>
            </motion.div>
          </DialogHeader>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={buyerAddress.name}
                    onChange={handleAddressChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={buyerAddress.phone}
                    onChange={handleAddressChange}
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    value={buyerAddress.addressLine1}
                    onChange={handleAddressChange}
                    placeholder="Street Address"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="addressLine2">
                    Address Line 2 (Optional)
                  </Label>
                  <Input
                    id="addressLine2"
                    name="addressLine2"
                    value={buyerAddress.addressLine2}
                    onChange={handleAddressChange}
                    placeholder="Apartment, suite, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={buyerAddress.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={buyerAddress.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={buyerAddress.postalCode}
                    onChange={handleAddressChange}
                    placeholder="Postal Code"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={buyerAddress.country}
                    onChange={handleAddressChange}
                    placeholder="Country"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMode">Payment Mode</Label>
                <Select value={paymentMode} onValueChange={setPaymentMode}>
                  <SelectTrigger id="paymentMode" className="w-full">
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COD">Cash on Delivery</SelectItem>
                    <SelectItem value="O">Online Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Order Summary</h3>
              <div className="space-y-3">
                {dealData?.products?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-md flex-shrink-0">
                      <Image
                        src={item?.images[0] || "/placeholder.svg"}
                        alt={item?.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">Qty: 1</p>
                    </div>
                    <div className="text-sm font-medium">
                      Rs.{item?.price?.toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>Rs.{dealData?.price?.toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter className="p-6 pt-0 sticky bottom-0 bg-background z-10">
            <Button
              variant="outline"
              onClick={() => setConfirmationModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBuy}
              disabled={mutation.isLoading || mutation.isPending}
            >
              {mutation.isLoading || mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing…
                </span>
              ) : (
                "Confirm Order"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={handleGoBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-muted-foreground ml-2">Back to deals</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <motion.div
              className="relative aspect-square rounded-lg overflow-hidden bg-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full"
                >
                  <Image
                    src={dealData?.images[selectedImage] || "/placeholder.svg"}
                    alt={dealData?.dealCode}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant="destructive" className="text-sm font-bold">
                  {dealData?.discountPercentage}% OFF
                </Badge>
              </div>
            </motion.div>

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {dealData?.images?.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-20 w-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${dealData?.dealCode} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h1 className="text-3xl font-bold line-clamp-1">
                {dealData?.dealCode}
              </h1>

              <div
                className="flex items-center gap-2 mt-4 cursor-pointer"
                onClick={() =>
                  (window.location.href = `/sellers/${dealData?.store}`)
                }
              >
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={dealData?.storeDetails?.image || "/placeholder.svg"}
                    alt={dealData?.storeDetails?.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-sm font-medium hover:text-primary hover:underline">
                    {dealData?.storeDetails?.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">Rs.{dealData?.price}</span>
              <span className="text-lg text-muted-foreground line-through">
                Rs.
                {getOriginalPrice(
                  dealData?.price,
                  dealData?.discountPercentage
                )}
              </span>
              <Badge
                variant="outline"
                className="ml-2 text-green-600 border-green-600"
              >
                Save Rs.
                {(
                  getOriginalPrice(
                    dealData?.price,
                    dealData?.discountPercentage
                  ) - dealData?.price
                ).toFixed(2)}
              </Badge>
            </div>

            <p className="text-muted-foreground">{dealData?.description}</p>

            <div className="flex items-center gap-4 flex-wrap">
              <Button
                className="flex-1"
                size="lg"
                disabled={mutation.isLoading || mutation.isPending}
                onClick={() => setConfirmationModal(true)}
              >
                {mutation.isLoading || mutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing…
                  </span>
                ) : (
                  <span className="flex item-center gap-2">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div variants={slideUp} className="space-y-6 my-10">
          <h2 className="text-2xl font-bold">Products in it</h2>

          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {dealData?.products?.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={`/products/${item?._id}`}
                      className="block h-full"
                    >
                      <Card className="overflow-hidden border-border/40 transition-all hover:shadow-md h-full">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={item?.images[0] || "/placeholder.svg"}
                            alt="Related product"
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-500"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="font-semibold mt-2">
                            {item?.name || "N/A"}
                          </div>
                          <div className="font-semibold mt-2">
                            Rs.{item?.price?.toFixed(2) || "N/A"}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </motion.div>

        {relatedDealsData?.results?.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Deals</h2>
              <Button variant="ghost" className="text-sm" asChild>
                <Link href="/deals">
                  View all deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDealsData?.results?.map((relatedDeal, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/deals/${relatedDeal?._id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={relatedDeal?.images[0] || "/placeholder.svg"}
                          alt={relatedDeal?.dealCode}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="destructive" className="text-xs">
                            {relatedDeal?.discountPercentage}% OFF
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1">
                          {relatedDeal?.dealCode}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <span className="font-bold">
                              Rs.{relatedDeal?.price}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              Rs.
                              {getOriginalPrice(
                                relatedDeal?.price,
                                relatedDeal?.discountPercentage
                              )}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {relatedDeal?.storeDetails?.name}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
