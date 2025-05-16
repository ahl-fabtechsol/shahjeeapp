"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Package, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getSellerStores } from "@/services/sellerStore";
import { useQuery } from "@tanstack/react-query";

export function Sellers({ search }) {
  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data: sellers,
    isLoading: isSellersLoading,
    isFetching: isSellersFetching,
    error: sellersError,
    isError: isSellersError,
  } = useQuery({
    queryKey: ["sellerStoresSite", { page, limit, search }],
    queryFn: () => getSellerStores({ page, limit, seller: "", search }),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

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

  if (isSellersError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching sellers data</p>
        <p>{sellersError?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isSellersFetching || isSellersLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const totalPages = sellers ? Math.ceil(sellers.count / limit) : 1;

  return (
    <div className="space-y-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sellers?.results?.map((seller, index) => (
          <motion.div key={index} variants={item}>
            <Link href={`/sellers/${seller?._id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 overflow-hidden rounded-full border-4 border-background relative">
                      <Image
                        src={seller?.image || "/placeholder.svg"}
                        alt={seller?.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-xl">{seller?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Joined{" "}
                        {new Date(seller?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }
                        )}
                      </p>
                      <Badge variant="outline">{seller?.category}</Badge>
                    </div>
                  </div>

                  <div className=" mt-6">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-1 text-purple-500">
                        <Package className="h-4 w-4" />
                        <span className="font-bold">
                          {seller?.productCount}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Products
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Seller</Button>
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
    </div>
  );
}
