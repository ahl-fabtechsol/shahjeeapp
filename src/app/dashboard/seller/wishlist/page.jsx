"use client";

import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWishlist, removeFromWishlist } from "@/services/adminUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setUser } from "@/store/authStore";

export default function BuyerWishlistPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: wishlistItems,
    error: wishlistError,
    isLoading: isWishlistLoading,
    isError: isWishlistError,
    isFetching: isWishlistFetching,
  } = useQuery({
    queryFn: () => getWishlist(),
    queryKey: ["sellerWishlist"],
    retry: 1,
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });

  const removeFromWishListMutation = useMutation({
    mutationFn: (productId) => removeFromWishlist(productId),
    onSuccess: (data) => {
      toast.success("Product removed from wishlist successfully!");
      setUser(data?.user);
      queryClient.invalidateQueries({
        queryKey: ["sellerWishlist"],
      });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to remove product from wishlist."
      );
    },
  });

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishListMutation.mutate(productId);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (isWishlistError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching wishlist data</p>
        <p>{wishlistError?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  console.log(wishlistItems);

  if (isWishlistLoading || isWishlistFetching) {
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
        {wishlistItems?.wishlist?.map((item, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative aspect-square">
                <Image
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader
                className="p-4 cusror-pointer "
                onClick={() => router.push(`/products/${item._id}`)}
              >
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    Rs.{item.price.toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={() => handleRemoveFromWishlist(item._id)}
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
