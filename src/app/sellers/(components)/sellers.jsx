"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, TrendingUp, Package, Users, Search } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sellersData = [
  {
    id: 1,
    name: "TechGadgets Pro",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    totalSales: 12450,
    productsCount: 78,
    followers: 2340,
    category: "Electronics",
    joinedDate: "Jan 2020",
    verified: true,
  },
  {
    id: 2,
    name: "Fashion Forward",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    totalSales: 8970,
    productsCount: 124,
    followers: 1890,
    category: "Clothing",
    joinedDate: "Mar 2021",
    verified: true,
  },
  {
    id: 3,
    name: "Home Essentials",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.5,
    totalSales: 7650,
    productsCount: 92,
    followers: 1240,
    category: "Home & Kitchen",
    joinedDate: "Nov 2019",
    verified: true,
  },
  {
    id: 4,
    name: "Organic Delights",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    totalSales: 5430,
    productsCount: 45,
    followers: 980,
    category: "Food & Beverages",
    joinedDate: "Jul 2022",
    verified: true,
  },
  {
    id: 5,
    name: "Sports Universe",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    totalSales: 9870,
    productsCount: 112,
    followers: 1670,
    category: "Sports & Outdoors",
    joinedDate: "Feb 2021",
    verified: true,
  },
  {
    id: 6,
    name: "Beauty Bliss",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.4,
    totalSales: 6540,
    productsCount: 87,
    followers: 1120,
    category: "Beauty & Personal Care",
    joinedDate: "Apr 2020",
    verified: false,
  },
];

export function Sellers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filteredSellers = sellersData
    .filter(
      (seller) =>
        seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "sales") return b.totalSales - a.totalSales;
      if (sortBy === "products") return b.productsCount - a.productsCount;
      if (sortBy === "followers") return b.followers - a.followers;
      return 0;
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search sellers or categories..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="sales">Total Sales</SelectItem>
              <SelectItem value="products">Products Count</SelectItem>
              <SelectItem value="followers">Followers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredSellers.map((seller) => (
          <motion.div key={seller.id} variants={item}>
            <Link href={`/sellers/${seller.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Image
                        src={seller.image || "/placeholder.svg"}
                        alt={seller.name}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-background"
                      />
                      {seller.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-xl">{seller.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Joined {seller.joinedDate}
                      </p>
                      <Badge variant="outline">{seller.category}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span className="font-bold">{seller.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Rating
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-bold">
                          {seller.totalSales.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Sales
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-1 text-purple-500">
                        <Package className="h-4 w-4" />
                        <span className="font-bold">
                          {seller.productsCount}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Products
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-1 text-blue-500">
                        <Users className="h-4 w-4" />
                        <span className="font-bold">
                          {seller.followers.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Followers
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
    </div>
  );
}
