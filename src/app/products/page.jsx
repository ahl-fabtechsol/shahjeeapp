"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllProductsSite } from "@/services/productService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductCard from "./(components)/productCard";
import ProductSkeleton from "./(components)/productSkeleton";
import { getCategories } from "@/services/categoryService";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";

export default function ProductsPage() {
  const limit = 12;
  const {
    delayedSearch: search,
    handleSearchChange,
    searchValue,
  } = useDebouncedSearch();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
    isFetching: isCategoriesFetching,
  } = useQuery({
    queryKey: ["categories", { page, limit }],
    queryFn: () => getCategories({ page: 1, limit: 100 }),
    staleTime: 1000 * 60 * 5,
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
    isFetching: isProductsFetching,
  } = useQuery({
    queryKey: ["siteProducts", { page, limit, category, price, search }],
    queryFn: () =>
      getAllProductsSite({
        page,
        limit,
        category,
        price,
        search,
        store: "",
      }),
    staleTime: 1000 * 60 * 5,
    enabled: categoriesData && categoriesData.count > 0,
  });

  if (isCategoriesError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching categories data</p>
        <p>{categoriesError?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isProductsError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching products data</p>
        <p>{productsError?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  const totalPages = productsData ? Math.ceil(productsData.count / limit) : 1;

  return (
    <div className="p-6 md:px-16 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col  justify-between items-start gap-6"
      >
        <div className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col xl:flex-row justify-between items-start sm:items-center mb-6"
          >
            <h1 className="text-2xl font-bold">All Products</h1>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
              <div className="relative w-full sm:w-[250px]">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchValue}
                  onChange={(e) => {
                    handleSearchChange(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <Select
                value={category}
                onValueChange={(val) => {
                  setCategory(val === "all" ? "" : val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoriesData?.results.map((category, index) => (
                    <SelectItem value={category._id} key={index}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isProductsLoading ||
            isProductsFetching ||
            isCategoriesFetching ||
            isCategoriesLoading ? (
              <motion.div
                key="loading"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {[...Array(8)].map((_, idx) => (
                  <ProductSkeleton key={idx} index={idx} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
              >
                {productsData?.results.map((product, idx) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    index={idx}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

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
      </motion.div>
    </div>
  );
}
