"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { getDealsForSite, getDealsForSiteById } from "@/services/dealsService";
import { createOrder } from "@/services/orderService";
import { isLoggedIn } from "@/store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function DealDetailPage() {
  const loggedIn = isLoggedIn();
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(false);

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
      window.location.href = data.url;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create order");
      console.error("Error creating order:", error);
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleBuy = async () => {
    if (!loggedIn) {
      toast.error("Please log in to proceed with the order");
      return;
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
      {confirmationModal && (
        <ConfirmationModal
          title="Are you sure you want to buy this deal ?"
          description="You will be redirected to a payemnt page"
          open={confirmationModal}
          onOpenChange={setConfirmationModal}
          onConfirm={handleBuy}
        />
      )}
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
                            Rs.{item?.name}
                          </div>
                          <div className="font-semibold mt-2">
                            Rs.{item?.price}
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
