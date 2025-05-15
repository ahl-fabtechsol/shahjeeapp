"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import { getDealsForSite } from "@/services/dealsService";
import { useQuery } from "@tanstack/react-query";

export default function DealsPage() {
  const {
    delayedSearch: search,
    searchValue,
    handleSearchChange,
  } = useDebouncedSearch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: dealsData,
    isLoading: dealsLoading,
    isFetching: dealsFetching,
    isError: dealsError,
    error: dealsErrorMessage,
  } = useQuery({
    queryKey: ["dealsForSite", { page, limit, search }],
    queryFn: () => getDealsForSite({ page, limit, search: search }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: true,
  });

  const totalPages = dealsData ? Math.ceil(dealsData?.count / limit) : 1;

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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const getOriginalPrice = (price, discount) => {
    if (discount) {
      return (price / (1 - discount / 100)).toFixed(2);
    }
    return price;
  };

  if (dealsError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching Deals</p>
        <p>{dealsErrorMessage?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Hot Deals</h1>
        <p className="text-muted-foreground">
          Discover amazing offers from our top sellers
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals or sellers..."
            className="pl-10"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {dealsFetching || dealsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video w-full">
                <Skeleton className="h-full w-full" />
              </div>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : dealsData?.results?.length > 0 ? (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {dealsData?.results?.map((deal, index) => (
              <motion.div key={index} variants={item}>
                <Link href={`/deals/${deal._id}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={deal?.images[0] || "/placeholder.svg"}
                        alt={deal?.dealCode || "Deal Image"}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="destructive"
                          className="text-sm font-bold"
                        >
                          {deal?.discountPercentage}% OFF
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg line-clamp-1">
                          {deal?.dealCode}
                        </h3>
                      </div>
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = `/sellers/${deal?.store}`;
                        }}
                      >
                        <div className="relative h-6 w-6 rounded-full overflow-hidden">
                          <Image
                            src={
                              deal?.storeDetails?.image || "/placeholder.svg"
                            }
                            alt={deal?.storeDetails?.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground hover:text-primary hover:underline">
                          {deal?.storeDetails?.name}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {deal?.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          ${deal?.price}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          $
                          {getOriginalPrice(
                            deal?.price,
                            deal?.discountPercentage
                          )}
                        </span>
                      </div>
                      <Button size="sm" variant="secondary">
                        View Deal
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <Button
                  key={pg}
                  variant={pg === page ? "default" : "outline"}
                  size="sm"
                  className="w-10"
                  onClick={() => setPage(pg)}
                >
                  {pg}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h3 className="text-xl font-medium mb-2">No deals found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </div>
  );
}
