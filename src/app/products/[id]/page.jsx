"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getAllProductsSite,
  getProductDetailSite,
} from "@/services/productService";
import { useCartStore } from "@/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import StarRating from "../(components)/startRating";
import FeedbackDialog from "../(components)/feedbackDialog";

export default function ProductPage({ params }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const id = useParams().id;
  const [reviewModal, setReviewModal] = useState(false);

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
    isFetching: isProductFetching,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetailSite(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  const {
    data: relatedProducts,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
    error: relatedError,
    isFetching: isRelatedFetching,
  } = useQuery({
    queryKey: ["realtedProducts", id],
    queryFn: () =>
      getAllProductsSite({
        page: 1,
        limit: 10,
        category: productData?.results[0]?.category?._id,
      }),
    staleTime: 1000 * 60 * 5,
    enabled: !!id && !!productData?.results[0]?.category?._id,
  });

  const handleAddToCart = () => {
    const product = productData.results[0];
    const sellerId = product.createdBy;

    if (cart.length > 0 && cart[0].seller !== sellerId) {
      toast.error(
        "You can only add items from one seller at a time. Please clear your cart first."
      );
      return;
    }

    addToCart(product, sellerId, quantity);
    setAddedToCart(true);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    if (cart.length > 0) {
      const isProductInCart = cart.some(
        (item) => item.product._id === productData?.results[0]?._id
      );
      setAddedToCart(isProductInCart);
    }
  }, []);

  if (isProductError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching product data</p>
        <p>{productError?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isProductLoading || isProductFetching) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-7xl mx-auto py-8 px-4 sm:px-6"
    >
      {reviewModal && productData?.results[0]?._id && (
        <FeedbackDialog
          isOpen={reviewModal}
          onClose={() => setReviewModal(false)}
          seller={productData?.results[0]?.createdBy}
          product={productData?.results[0]?._id}
        />
      )}
      <motion.nav
        variants={slideUp}
        className="flex items-center text-sm mb-6 overflow-x-auto whitespace-nowrap pb-2"
      >
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
        <Link
          href="/products"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />

        <span className="font-medium truncate">
          {productData?.results[0]?.name}
        </span>
      </motion.nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div variants={slideUp} className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm">
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
                  src={
                    productData?.results[0]?.images[selectedImage] ||
                    "/placeholder.svg"
                  }
                  alt={productData?.results[0]?.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-md"
                        onClick={() => setWishlist(!wishlist)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            wishlist ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to wishlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-md"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share product</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-md opacity-80 hover:opacity-100"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0
                        ? productData?.results[0]?.images?.length - 1
                        : prev - 1
                    )
                  }
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-md opacity-80 hover:opacity-100"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === productData?.results[0]?.images?.length - 1
                        ? 0
                        : prev + 1
                    )
                  }
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {productData?.results[0]?.images?.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative aspect-square overflow-hidden rounded-lg border cursor-pointer ${
                  selectedImage === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${productData?.results[0]?.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={staggerChildren} className="space-y-6">
          <motion.div variants={slideUp}>
            <h1 className="text-3xl font-bold">
              {productData?.results[0]?.name}
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i <
                      Math.floor(
                        productData?.results[0]?.feedbackStats?.averageRating
                      )
                        ? "text-yellow-500 fill-yellow-500"
                        : i <
                          productData?.results[0]?.feedbackStats?.averageRating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {productData?.results[0]?.feedbackStats?.averageRating} (
                {productData?.results[0]?.feedbackStats?.count} reviews)
              </span>
            </div>
          </motion.div>

          <motion.div variants={slideUp} className="flex items-baseline">
            <span className="text-3xl font-bold">
              Rs.{productData?.results[0]?.price.toFixed(2)}
            </span>
          </motion.div>

          <motion.p
            variants={slideUp}
            className="text-muted-foreground leading-relaxed"
          >
            {productData?.results[0]?.description}
          </motion.p>

          <motion.div variants={slideUp} className="space-y-4">
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium">Availability:</div>
              <div
                className={
                  productData?.results[0]?.quantity > 0
                    ? "text-green-600 flex items-center"
                    : "text-red-600"
                }
              >
                {productData?.results[0]?.quantity > 0 && (
                  <Check className="h-4 w-4 mr-1" />
                )}
                {productData?.results[0]?.quantity > 0
                  ? `In Stock (${productData?.results[0].quantity} available)`
                  : "Out of Stock"}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium">Category:</div>
              <Link
                href={`/categories/${productData?.results[0]?.category?.name.toLowerCase()}`}
                className="text-primary hover:underline"
              >
                {productData?.results[0]?.category?.name}
              </Link>
            </div>
          </motion.div>

          <Separator />

          <motion.div
            variants={slideUp}
            className="flex items-center space-x-4"
          >
            <motion.div
              className="flex-1 relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence></AnimatePresence>
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {addedToCart ? "Added to Cart" : "Add to Cart"}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div variants={slideUp} className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews ({productData?.results[0]?.feedbackStats?.count})
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="description" className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="leading-relaxed">
                  {productData?.results[0]?.description}
                </p>
              </motion.div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i <
                              Math.floor(
                                productData?.results[0]?.feedbackStats
                                  ?.averageRating
                              )
                                ? "text-yellow-500 fill-yellow-500"
                                : i <
                                  productData?.results[0]?.feedbackStats
                                    ?.averageRating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm">
                        Based on {productData?.results[0]?.feedbackStats?.count}{" "}
                        reviews
                      </span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={() => setReviewModal(true)}>
                      Write a Review
                    </Button>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {productData?.results[0]?.feedbacks?.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4 bg-card/50"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">
                            {review?.createdBy?.name}
                          </h4>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed">
                        {review.message}
                      </p>
                      {review?.replied && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <span className="text-xs text-gray-400">Reply:</span>{" "}
                          {review?.repliedText}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>

      <motion.div variants={slideUp} className="space-y-6">
        <h2 className="text-2xl font-bold">You May Also Like</h2>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {relatedProducts?.results?.map((item, index) => {
              item._id === productData?.results[0]?._id ? (
                ""
              ) : (
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
                          <h3 className="font-medium truncate">
                            Related Product {index + 1}
                          </h3>
                          <StarRating
                            rating={item?.feedbacks?.averageRating}
                            reviews={item?.feedbacks?.count}
                          />
                          <div className="font-semibold mt-2">
                            Rs.{item?.price}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>
      </motion.div>
    </motion.div>
  );
}
