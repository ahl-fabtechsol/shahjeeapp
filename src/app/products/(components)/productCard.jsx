"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { addToWishlist } from "@/services/adminUser";
import { getUser, setUser } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import StarRating from "./startRating";

const ProductCard = ({ product, index }) => {
  const user = getUser();
  const wishlist = user?.wishlist || [];
  const isInWishlist = wishlist.includes(product?._id);

  const wishListMutation = useMutation({
    mutationFn: (productId) => addToWishlist(productId),
    onSuccess: (data) => {
      toast.success("Product added to wishlist successfully!");
      setUser(data?.user);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add product to wishlist."
      );
    },
  });

  const handleWishlistClick = () => {
    if (!user) {
      toast.error("Please log in to add to wishlist.");
      return;
    }

    if (isInWishlist) {
      toast.info("This product is already in your wishlist.");
      return;
    }

    wishListMutation.mutate(product?._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
      }}
      className="transform-gpu"
    >
      <Link href={`/products/${product?._id}`} className="group block h-full">
        <Card className="overflow-hidden border-border/40 h-full bg-card/50 backdrop-blur-sm">
          <div className="relative aspect-square overflow-hidden">
            <motion.div>
              <Image
                src={product?.images[0] || "/placeholder.svg"}
                alt={product?.name || "Product Image"}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                        onClick={(e) => {
                          e.preventDefault();
                          handleWishlistClick();
                        }}
                        disabled={wishListMutation.isLoading}
                      >
                        {wishListMutation.isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Heart
                            size={16}
                            className={
                              isInWishlist ? "fill-red-500 text-red-500" : ""
                            }
                          />
                        )}
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isInWishlist ? "Already in wishlist" : "Add to wishlist"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">
              {product?.category?.name || "N/A"}
            </div>
            <h3 className="font-medium text-lg truncate group-hover:text-primary transition-colors">
              {product?.name || "Unknown Product"}
            </h3>
            <StarRating
              rating={product?.feedbacks?.averageRating || 0}
              reviews={product?.feedbacks?.count || 0}
            />
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="font-semibold text-lg">
              {product?.price != null
                ? `Rs.${product.price.toFixed(2)}`
                : "N/A"}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
