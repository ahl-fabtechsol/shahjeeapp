"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const mockDeals = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    description: "Noise cancelling with 40 hour battery life",
    image: "/placeholder.svg?height=300&width=300",
    price: 129.99,
    originalPrice: 199.99,
    discount: 35,
    seller: {
      id: "seller1",
      name: "AudioTech Pro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    featured: true,
  },
  {
    id: "2",
    title: "Smart Home Security System",
    description: "Complete home protection with AI monitoring",
    image: "/placeholder.svg?height=300&width=300",
    price: 249.99,
    originalPrice: 349.99,
    discount: 28,
    seller: {
      id: "seller2",
      name: "SecureHome",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "3",
    title: "Organic Skincare Bundle",
    description: "All-natural ingredients for radiant skin",
    image: "/placeholder.svg?height=300&width=300",
    price: 79.99,
    originalPrice: 119.99,
    discount: 33,
    seller: {
      id: "seller3",
      name: "NaturalGlow",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "4",
    title: 'Ultra HD Smart TV - 55"',
    description: "Crystal clear display with smart features",
    image: "/placeholder.svg?height=300&width=300",
    price: 499.99,
    originalPrice: 699.99,
    discount: 28,
    seller: {
      id: "seller4",
      name: "ElectroVision",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    featured: true,
  },
  {
    id: "5",
    title: "Professional Kitchen Knife Set",
    description: "Chef-quality knives for home cooking",
    image: "/placeholder.svg?height=300&width=300",
    price: 89.99,
    originalPrice: 149.99,
    discount: 40,
    seller: {
      id: "seller5",
      name: "CulinaryExperts",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "6",
    title: "Fitness Smartwatch",
    description: "Track your health and fitness goals",
    image: "/placeholder.svg?height=300&width=300",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    seller: {
      id: "seller6",
      name: "FitTech",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
];

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredDeals = [...mockDeals];

      if (searchQuery) {
        filteredDeals = filteredDeals.filter(
          (deal) =>
            deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deal.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      switch (sortBy) {
        case "priceAsc":
          filteredDeals.sort((a, b) => a.price - b.price);
          break;
        case "priceDesc":
          filteredDeals.sort((a, b) => b.price - a.price);
          break;
        case "discount":
          filteredDeals.sort((a, b) => b.discount - a.discount);
          break;
        case "featured":
        default:
          filteredDeals.sort(
            (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
          );
          break;
      }

      setDeals(filteredDeals);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, sortBy]);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Sort by
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("featured")}>
              Featured
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("priceAsc")}>
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("priceDesc")}>
              Price: High to Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("discount")}>
              Biggest Discount
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
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
      ) : deals.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {deals.map((deal) => (
            <motion.div key={deal.id} variants={item}>
              <Link href={`/deals/${deal.id}`}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="destructive"
                        className="text-sm font-bold"
                      >
                        {deal.discount}% OFF
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg line-clamp-1">
                        {deal.title}
                      </h3>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = `/sellers/${deal.seller.id}`;
                      }}
                    >
                      <div className="relative h-6 w-6 rounded-full overflow-hidden">
                        <Image
                          src={deal.seller.avatar || "/placeholder.svg"}
                          alt={deal.seller.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground hover:text-primary hover:underline">
                        {deal.seller.name}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {deal.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">${deal.price}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${deal.originalPrice}
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
