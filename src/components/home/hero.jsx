"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getSliders } from "@/services/slidersService";
import { getUser, isLoggedIn } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function Hero() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const loggedIn = isLoggedIn();
  const user = getUser();
  const {
    data: slidersData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryFn: () => getSliders(),
    queryKey: ["siteProductsFeatured"],
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });
  if (isError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching Sliders data</p>
        <p>{error?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="h-full mt-5 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

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
            {slidersData?.results?.map((slide, index) => (
              <CarouselItem key={index} className="">
                <motion.div
                  className="w-full  overflow-hidden rounded-2xl shadow-lg border bg-white dark:bg-card transition-all"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src={slide?.image}
                    alt={slide?.name}
                    className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="p-5 text-left">
                    <h3 className="text-2xl font-semibold">{slide?.name}</h3>
                    <p className="text-muted-foreground mt-2">
                      {slide?.description}
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
