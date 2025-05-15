"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  Heart,
  Share2,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getDeals, getDealsForSiteById } from "@/services/dealsService";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const mockDeals = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear sound with our Premium Wireless Headphones. These headphones feature active noise cancellation technology that blocks out external noise, allowing you to immerse yourself in your music or podcasts without distractions. With a battery life of up to 40 hours, you can enjoy your audio content for days without needing to recharge.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    price: 129.99,
    originalPrice: 199.99,
    discount: 35,
    rating: 4.7,
    reviewCount: 128,
    stock: 42,
    seller: {
      id: "seller1",
      name: "AudioTech Pro",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      productCount: 24,
    },
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Foldable design for easy storage",
      "Premium comfort ear cushions",
    ],
    specifications: {
      Brand: "AudioTech",
      Model: "Pro X-500",
      Color: "Matte Black",
      Connectivity: "Bluetooth 5.0",
      "Battery Life": "Up to 40 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
    },
    dealEnds: "2023-12-31T23:59:59",
    relatedDeals: [2, 4, 6],
  },
  {
    id: "2",
    title: "Smart Home Security System",
    description:
      "Protect your home with our comprehensive Smart Home Security System. This advanced system includes door/window sensors, motion detectors, and HD cameras that can be monitored from your smartphone. The AI-powered monitoring system can distinguish between normal household activities and potential security threats, reducing false alarms while ensuring your home remains secure.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    price: 249.99,
    originalPrice: 349.99,
    discount: 28,
    rating: 4.5,
    reviewCount: 86,
    stock: 15,
    seller: {
      id: "seller2",
      name: "SecureHome",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.6,
      productCount: 18,
    },
    features: [
      "AI-powered monitoring",
      "HD security cameras",
      "Door/window sensors",
      "Motion detectors",
      "Smartphone app control",
      "24/7 monitoring option",
    ],
    specifications: {
      Brand: "SecureHome",
      Model: "Guardian Pro",
      Components: "Base Station, 2 Cameras, 4 Sensors",
      Connectivity: "Wi-Fi, Cellular Backup",
      Power: "Wired with battery backup",
      Storage: "Cloud + Local",
    },
    dealEnds: "2023-12-25T23:59:59",
    relatedDeals: [1, 4, 5],
  },
  {
    id: "4",
    title: 'Ultra HD Smart TV - 55"',
    description:
      "Transform your home entertainment with our Ultra HD Smart TV. This 55-inch television delivers stunning 4K resolution with HDR support, bringing your favorite movies, shows, and games to life with vibrant colors and incredible detail. The built-in smart platform gives you access to all your favorite streaming services, while the voice control feature allows you to search for content, adjust volume, and more using just your voice.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    price: 499.99,
    originalPrice: 699.99,
    discount: 28,
    rating: 4.8,
    reviewCount: 215,
    stock: 8,
    seller: {
      id: "seller4",
      name: "ElectroVision",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      productCount: 42,
    },
    features: [
      "4K Ultra HD Resolution",
      "HDR Support",
      "Smart TV Platform",
      "Voice Control",
      "Multiple HDMI and USB ports",
      "Slim Bezel Design",
    ],
    specifications: {
      Brand: "ElectroVision",
      Model: "EV-55UHD",
      "Screen Size": "55 inches",
      Resolution: "3840 x 2160 (4K)",
      "Refresh Rate": "120Hz",
      Connectivity: "Wi-Fi, Bluetooth, HDMI x4, USB x3",
      Audio: "20W Dolby Digital",
    },
    dealEnds: "2023-12-20T23:59:59",
    relatedDeals: [1, 2, 6],
  },
];

const mockRelatedDeals = [
  {
    id: "2",
    title: "Smart Home Security System",
    image: "/placeholder.svg?height=300&width=300",
    price: 249.99,
    originalPrice: 349.99,
    discount: 28,
    seller: {
      name: "SecureHome",
    },
  },
  {
    id: "4",
    title: 'Ultra HD Smart TV - 55"',
    image: "/placeholder.svg?height=300&width=300",
    price: 499.99,
    originalPrice: 699.99,
    discount: 28,
    seller: {
      name: "ElectroVision",
    },
  },
  {
    id: "6",
    title: "Fitness Smartwatch",
    image: "/placeholder.svg?height=300&width=300",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    seller: {
      name: "FitTech",
    },
  },
];

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedDeals, setRelatedDeals] = useState([]);
  const [quantity, setQuantity] = useState(1);

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
      getDeals({
        page: 1,
        limit: 100000,
        seller: dealData?.createdBy,
        search: "",
      }),
    staleTime: 1000 * 60 * 5,
    enabled: !!dealData?.createdBy,
    retry: 1,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundDeal = mockDeals.find((d) => d.id === id);
      if (foundDeal) {
        setDeal(foundDeal);
        setRelatedDeals(mockRelatedDeals);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleGoBack = () => {
    router.back();
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
    <div className="container mx-auto px-4 py-8">
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
              <span className="text-3xl font-bold">${dealData?.price}</span>
              <span className="text-lg text-muted-foreground line-through">
                $
                {getOriginalPrice(
                  dealData?.price,
                  dealData?.discountPercentage
                )}
              </span>
              <Badge
                variant="outline"
                className="ml-2 text-green-600 border-green-600"
              >
                Save $
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
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                >
                  +
                </Button>
              </div>

              <Button className="flex-1" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>

                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
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
                            ${item?.name}
                          </div>
                          <div className="font-semibold mt-2">
                            ${item?.price}
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
                              ${relatedDeal?.price}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              $
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
