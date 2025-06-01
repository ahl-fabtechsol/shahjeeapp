"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Mail,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Star,
} from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProductsSite } from "@/services/productService";
import { getSellerStore } from "@/services/sellerStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function SellerDetail({ sellerId }) {
  const router = useRouter();

  const {
    data: storeData,
    isLoading: isStoreLoading,
    isFetching: isStoreFetching,
    isError: isStoreError,
    error: storeError,
  } = useQuery({
    queryKey: ["sellerStoreSite", sellerId],
    queryFn: () => getSellerStore(sellerId),
    enabled: !!sellerId,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: products,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ["storeProducts", sellerId],
    queryFn: () => getAllProductsSite({ page: 1, limit: 100, store: sellerId }),
    enabled: !!sellerId,
    staleTime: 1000 * 60 * 5,
  });
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isStoreError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching store data</p>
        <p>{storeError?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isStoreFetching || isStoreLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isProductsError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching product data</p>
        <p>{productsError?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isProductsFetching || isProductsLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        className="relative h-64 md:h-80 rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={storeData?.store?.coverImage || "/placeholder.svg"}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end gap-6">
          <div className="relative">
            <Image
              src={storeData?.store?.image || "/placeholder.svg"}
              alt={storeData?.store?.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-background"
            />
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold">{storeData?.store?.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {storeData?.store?.category}
              </Badge>

              <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full text-xs">
                <Calendar className="h-3 w-3" />
                <span>
                  Since{" "}
                  {new Date(storeData?.store.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2 space-y-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader>
              <CardTitle>About {storeData?.store?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{storeData?.store?.about}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-1 text-purple-500">
                    <Package className="h-5 w-5" />
                    <span className="font-bold text-xl">
                      {storeData?.store?.productCount}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Products
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold">
                Products ({products?.results?.length})
              </h2>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {products?.results?.map((product, index) => (
                <motion.div key={index} variants={itemVariant}>
                  <Card
                    className="overflow-hidden h-full cursor-pointer"
                    onClick={() => router.push(`/products/${product?._id}`)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={product?.images[0] || "/placeholder.svg"}
                        alt={product?.name}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 right-2">
                        {product?.category?.name}
                      </Badge>
                    </div>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{product?.name}</h3>
                        <span className="font-bold text-lg">
                          Rs.{product?.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span>{product?.feedbacks?.averageRating}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            In Stock
                          </span>
                          <span className="font-medium">
                            {product?.quantity} units
                          </span>
                        </div>
                      </div>

                      <Button className="w-full mt-4">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{storeData?.store?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{storeData?.store?.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{storeData?.store?.address}</span>
              </div>
              {/* <Button className="w-full mt-2">Contact Seller</Button> */}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
