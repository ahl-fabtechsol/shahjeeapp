"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  Heart,
  Share2,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function ProductPage({ params }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const id = useParams().id;

  const product = {
    id: id || "1",
    name: "Wireless Earbuds Pro",
    price: 79.99,
    originalPrice: 99.99,
    description:
      "Experience crystal-clear sound with our premium wireless earbuds. Featuring active noise cancellation, touch controls, and a comfortable fit for all-day wear.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600&text=Image+2",
      "/placeholder.svg?height=600&width=600&text=Image+3",
      "/placeholder.svg?height=600&width=600&text=Image+4",
    ],
    category: "Electronics",
    badge: "New",
    rating: 4.5,
    reviews: 128,
    stock: 15,
    specifications: [
      { name: "Battery Life", value: "Up to 8 hours (24 hours with case)" },
      { name: "Connectivity", value: "Bluetooth 5.2" },
      { name: "Water Resistance", value: "IPX4 (splash resistant)" },
      { name: "Noise Cancellation", value: "Active Noise Cancellation (ANC)" },
      { name: "Charging", value: "USB-C and Wireless Charging" },
      { name: "Microphones", value: "4 built-in microphones" },
    ],
    features: [
      "Active Noise Cancellation for immersive sound",
      "Transparency mode for hearing your surroundings",
      "Customizable touch controls",
      "Voice assistant compatibility",
      "Automatic ear detection",
      "Sweat and water resistant",
    ],
    colors: [
      { name: "Black", value: "bg-black" },
      { name: "White", value: "bg-white border" },
      { name: "Blue", value: "bg-blue-500" },
    ],
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-7xl mx-auto py-8 px-4 sm:px-6"
    >
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
        <Link
          href={`/categories/${product.category.toLowerCase()}`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
        <span className="font-medium truncate">{product.name}</span>
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
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {product.badge && (
              <Badge className="absolute top-3 right-3 z-10 shadow-md">
                {product.badge}
              </Badge>
            )}

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
                      prev === 0 ? product.images.length - 1 : prev - 1
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
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
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
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={staggerChildren} className="space-y-6">
          <motion.div variants={slideUp}>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : i < product.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </motion.div>

          <motion.div variants={slideUp} className="flex items-baseline">
            <span className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <Badge
                variant="outline"
                className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              >
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            )}
          </motion.div>

          <motion.p
            variants={slideUp}
            className="text-muted-foreground leading-relaxed"
          >
            {product.description}
          </motion.p>

          <motion.div variants={slideUp} className="space-y-4">
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium">Availability:</div>
              <div
                className={
                  product.stock > 0
                    ? "text-green-600 flex items-center"
                    : "text-red-600"
                }
              >
                {product.stock > 0 && <Check className="h-4 w-4 mr-1" />}
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium">Category:</div>
              <Link
                href={`/categories/${product.category.toLowerCase()}`}
                className="text-primary hover:underline"
              >
                {product.category}
              </Link>
            </div>
          </motion.div>

          <motion.div variants={slideUp}>
            <div className="w-24 text-sm font-medium mb-2">Color:</div>
            <div className="flex space-x-2">
              {product.colors.map((color, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-8 w-8 rounded-full ${
                    color.value
                  } cursor-pointer ${
                    index === 0 ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </motion.div>

          <Separator />

          <motion.div
            variants={slideUp}
            className="flex items-center space-x-4"
          >
            <div className="flex items-center border rounded-md">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </motion.div>
              <span className="w-12 text-center">{quantity}</span>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="flex-1 relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence>
                {addedToCart && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground rounded-md"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Added to Cart!
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="flex items-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg"
          >
            <Truck className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>
              Free shipping on orders over $50. Free returns within 30 days.
            </span>
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
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews ({product.reviews})
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
                <p className="leading-relaxed">{product.description}</p>
                <h3 className="text-lg font-medium mt-4">Key Features</h3>
                <ul className="grid gap-2">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>

            <TabsContent value="specifications" className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-md divide-y overflow-hidden"
              >
                {product.specifications.map((spec, index) => (
                  <motion.div
                    key={index}
                    className="flex py-3 px-4 bg-card/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-1/3 font-medium">{spec.name}</div>
                    <div className="w-2/3">{spec.value}</div>
                  </motion.div>
                ))}
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
                              i < Math.floor(product.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : i < product.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm">
                        Based on {product.reviews} reviews
                      </span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button>Write a Review</Button>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "John D.",
                      rating: 5,
                      date: "2 days ago",
                      comment:
                        "These earbuds are amazing! The sound quality is excellent and the noise cancellation works really well. Battery life is as advertised and they're very comfortable to wear for long periods.",
                    },
                    {
                      name: "Sarah M.",
                      rating: 4,
                      date: "1 week ago",
                      comment:
                        "Great earbuds for the price. The sound is clear and the battery lasts all day. The only downside is that the touch controls can be a bit sensitive sometimes.",
                    },
                  ].map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4 bg-card/50"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
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
                          {review.date}
                        </div>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </motion.div>
                  ))}

                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="outline">Load More Reviews</Button>
                    </motion.div>
                  </div>
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
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <CarouselItem
                key={id}
                className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/products/${id}`} className="block h-full">
                    <Card className="overflow-hidden border-border/40 transition-all hover:shadow-md h-full">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=300&width=300"
                          alt="Related product"
                          fill
                          className="object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium truncate">
                          Related Product {id}
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">
                            (42)
                          </span>
                        </div>
                        <div className="font-semibold mt-2">$49.99</div>
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
    </motion.div>
  );
}
