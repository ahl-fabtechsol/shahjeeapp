"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Clock,
  Check,
  Truck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

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

  const formatTimeRemaining = (endDate) => {
    if (!endDate) return "Limited time";

    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;

    if (diff <= 0) return "Deal ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days} days, ${hours} hours left`;
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours} hours, ${minutes} minutes left`;
    }
  };

  if (loading) {
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

  if (!deal) {
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
                    src={deal.images[selectedImage] || "/placeholder.svg"}
                    alt={deal.title}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant="destructive" className="text-sm font-bold">
                  {deal.discount}% OFF
                </Badge>
              </div>
            </motion.div>

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {deal.images.map((image, index) => (
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
                    alt={`${deal.title} - Image ${index + 1}`}
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
              <h1 className="text-3xl font-bold">{deal.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(deal.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">
                    {deal.rating} ({deal.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTimeRemaining(deal.dealEnds)}
                </div>
              </div>

              <div
                className="flex items-center gap-2 mt-4 cursor-pointer"
                onClick={() =>
                  (window.location.href = `/sellers/${deal.seller.id}`)
                }
              >
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={deal.seller.avatar || "/placeholder.svg"}
                    alt={deal.seller.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-sm font-medium hover:text-primary hover:underline">
                    {deal.seller.name}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                    {deal.seller.rating} • {deal.seller.productCount} products
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${deal.price}</span>
              <span className="text-lg text-muted-foreground line-through">
                ${deal.originalPrice}
              </span>
              <Badge
                variant="outline"
                className="ml-2 text-green-600 border-green-600"
              >
                Save ${(deal.originalPrice - deal.price).toFixed(2)}
              </Badge>
            </div>

            <p className="text-muted-foreground">{deal.description}</p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-green-600">
                <Check className="h-4 w-4" />
                <span>{deal.stock} in stock</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure transaction</span>
              </div>
            </div>

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

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-4">
              <p className="text-muted-foreground">{deal.description}</p>
            </TabsContent>
            <TabsContent value="features" className="py-4">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {deal.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(deal.specifications).map(
                  ([key, value], index) => (
                    <div key={index} className="flex">
                      <span className="font-medium w-1/3">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  )
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {relatedDeals.length > 0 && (
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
              {relatedDeals.map((relatedDeal) => (
                <motion.div
                  key={relatedDeal.id}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/deals/${relatedDeal.id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={relatedDeal.image || "/placeholder.svg"}
                          alt={relatedDeal.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="destructive" className="text-xs">
                            {relatedDeal.discount}% OFF
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1">
                          {relatedDeal.title}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <span className="font-bold">
                              ${relatedDeal.price}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              ${relatedDeal.originalPrice}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {relatedDeal.seller.name}
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
