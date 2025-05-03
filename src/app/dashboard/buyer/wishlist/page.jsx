"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BuyerWishlistPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <div className="flex items-center justify-between my-3">
        <h2 className="text-3xl font-bold tracking-tight">Wishlist</h2>
        <Button variant="outline" size="sm">
          <Heart className="mr-2 h-4 w-4 fill-current" />
          Share Wishlist
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {wishlistItems.map((item, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative aspect-square">
                <Badge className="absolute top-2 right-2 z-10 bg-primary/90 hover:bg-primary">
                  {item.discount ? `${item.discount}% OFF` : "New"}
                </Badge>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Button size="sm" variant="secondary" className="mr-2">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </motion.div>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription>{item.category}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {item.oldPrice ? (
                    <>
                      <span className="text-lg font-bold">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

const wishlistItems = [
  {
    name: "Wireless Earbuds",
    category: "Electronics",
    description:
      "Premium wireless earbuds with noise cancellation and long battery life.",
    price: 89.99,
    oldPrice: 129.99,
    discount: 30,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Mechanical Keyboard",
    category: "Computer Accessories",
    description:
      "RGB mechanical keyboard with customizable switches for gaming and typing.",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Ultra HD Monitor",
    category: "Electronics",
    description: "32-inch 4K monitor with HDR support and adjustable stand.",
    price: 349.99,
    oldPrice: 399.99,
    discount: 12,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Leather Wallet",
    category: "Accessories",
    description:
      "Genuine leather wallet with RFID protection and multiple card slots.",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Smart Home Hub",
    category: "Smart Home",
    description:
      "Control all your smart home devices from one central hub with voice commands.",
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Fitness Tracker",
    category: "Wearables",
    description:
      "Track your steps, heart rate, sleep, and more with this waterproof fitness band.",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
  },
];
