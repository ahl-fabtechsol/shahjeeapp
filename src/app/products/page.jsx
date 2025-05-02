"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterSidebar from "./(components)/filterSidebar";
import ProductCard from "./(components)/productCard";
import ProductSkeleton from "./(components)/productSkeleton";

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const products = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      badge: "New",
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      badge: "Trending",
      rating: 4.8,
      reviews: 256,
    },
    {
      id: 3,
      name: "Leather Laptop Sleeve",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      rating: 4.2,
      reviews: 64,
    },
    {
      id: 4,
      name: "Portable Bluetooth Speaker",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      badge: "Sale",
      rating: 4.6,
      reviews: 192,
    },
    {
      id: 5,
      name: "Ergonomic Office Chair",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Furniture",
      rating: 4.7,
      reviews: 87,
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Kitchen",
      rating: 4.4,
      reviews: 153,
    },
    {
      id: 7,
      name: "Wireless Charging Pad",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      rating: 4.3,
      reviews: 112,
    },
    {
      id: 8,
      name: "Fitness Tracker Band",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Sports & Fitness",
      badge: "Best Seller",
      rating: 4.9,
      reviews: 321,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredProducts(products);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="p-6 md:px-16 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start gap-6"
      >
        <div className="w-full md:w-64 space-y-6">
          <div className="flex items-center justify-between md:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search with these filters.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <FilterSidebar isMobile={true} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:block">
            <FilterSidebar isMobile={false} />
          </div>
        </div>

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {[...Array(8)].map((_, index) => (
                  <ProductSkeleton key={index} index={index} />
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
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
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
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </motion.div>

              {[1, 2, 3, 4, 5].map((page) => (
                <motion.div
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant={page === 1 ? "default" : "outline"}
                    size="sm"
                    className="w-10"
                  >
                    {page}
                  </Button>
                </motion.div>
              ))}

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
