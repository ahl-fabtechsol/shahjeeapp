"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getUser, isLoggedIn } from "@/store/authStore";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const slides = [
  {
    title: "Explore Electronics",
    description: "Latest tech gadgets and smart devices in one place.",
    image:
      "https://images.unsplash.com/photo-1733506260573-2ddbf1db9b1a?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Fashion & Style",
    description: "Trendy outfits and accessories for every season.",
    image:
      "https://images.unsplash.com/photo-1726661025397-d6877dbf2da5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Home Decor",
    description: "Elegant furniture and decor ideas for modern homes.",
    image:
      "https://images.unsplash.com/photo-1726661025461-5635b785ec23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Hero() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const loggedIn = isLoggedIn();
  const user = getUser();

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 flex flex-col items-center text-center px-4"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Discover the World’s Best Products
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-10 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Shop smarter. Find quality and innovation at your fingertips.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button size="lg" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
          {loggedIn && user.role !== "B" ? (
            <Button size="lg" variant="outline" asChild>
              <Link href="/sellers">Find Sellers</Link>
            </Button>
          ) : (
            <Button size="lg" variant="outline" asChild>
              <Link href="/become-seller">Become a Seller</Link>
            </Button>
          )}
        </motion.div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full mx-auto p-4 lg:px-32"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="">
                <motion.div
                  className="w-full  overflow-hidden rounded-2xl shadow-lg border bg-white dark:bg-card transition-all"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="p-5 text-left">
                    <h3 className="text-2xl font-semibold">{slide.title}</h3>
                    <p className="text-muted-foreground mt-2">
                      {slide.description}
                    </p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </motion.div>
    </div>
  );
}
