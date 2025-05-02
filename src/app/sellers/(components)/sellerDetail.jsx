"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  Package,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const sellersData = [
  {
    id: "1",
    name: "TechGadgets Pro",
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    rating: 4.8,
    totalSales: 12450,
    productsCount: 78,
    followers: 2340,
    category: "Electronics",
    joinedDate: "Jan 2020",
    verified: true,
    description:
      "TechGadgets Pro is your one-stop shop for all things tech. We specialize in high-quality electronics, gadgets, and accessories at competitive prices. Our team of tech enthusiasts carefully selects each product to ensure it meets our standards of quality and innovation.",
    contactInfo: {
      email: "contact@techgadgetspro.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Avenue, San Francisco, CA 94107",
    },
    ratingBreakdown: {
      5: 78,
      4: 15,
      3: 5,
      2: 1,
      1: 1,
    },
    products: [
      {
        id: 1,
        name: "Wireless Earbuds Pro",
        image: "/placeholder.svg?height=200&width=200",
        price: 129.99,
        rating: 4.9,
        sales: 2340,
        stock: 45,
        category: "Audio",
      },
      {
        id: 2,
        name: "Smart Watch X1",
        image: "/placeholder.svg?height=200&width=200",
        price: 199.99,
        rating: 4.7,
        sales: 1890,
        stock: 32,
        category: "Wearables",
      },
      {
        id: 3,
        name: "Bluetooth Speaker Mini",
        image: "/placeholder.svg?height=200&width=200",
        price: 79.99,
        rating: 4.6,
        sales: 1560,
        stock: 28,
        category: "Audio",
      },
      {
        id: 4,
        name: "Ultra HD Action Camera",
        image: "/placeholder.svg?height=200&width=200",
        price: 249.99,
        rating: 4.8,
        sales: 1230,
        stock: 15,
        category: "Cameras",
      },
      {
        id: 5,
        name: "Noise Cancelling Headphones",
        image: "/placeholder.svg?height=200&width=200",
        price: 179.99,
        rating: 4.9,
        sales: 2100,
        stock: 22,
        category: "Audio",
      },
      {
        id: 6,
        name: "Portable Power Bank 20000mAh",
        image: "/placeholder.svg?height=200&width=200",
        price: 49.99,
        rating: 4.7,
        sales: 3240,
        stock: 60,
        category: "Accessories",
      },
    ],
  },
  {
    id: "2",
    name: "Fashion Forward",
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    rating: 4.6,
    totalSales: 8970,
    productsCount: 124,
    followers: 1890,
    category: "Clothing",
    joinedDate: "Mar 2021",
    verified: true,
    description:
      "Fashion Forward brings you the latest trends in clothing and accessories. Our curated collections feature stylish, high-quality pieces that help you express your unique style. We work with ethical manufacturers to ensure our products are both fashionable and responsibly made.",
    contactInfo: {
      email: "hello@fashionforward.com",
      phone: "+1 (555) 987-6543",
      address: "456 Style Street, New York, NY 10001",
    },
    ratingBreakdown: {
      5: 70,
      4: 20,
      3: 7,
      2: 2,
      1: 1,
    },
    products: [
      {
        id: 1,
        name: "Premium Denim Jacket",
        image: "/placeholder.svg?height=200&width=200",
        price: 89.99,
        rating: 4.7,
        sales: 1240,
        stock: 35,
        category: "Outerwear",
      },
      {
        id: 2,
        name: "Casual Cotton T-Shirt",
        image: "/placeholder.svg?height=200&width=200",
        price: 29.99,
        rating: 4.5,
        sales: 2100,
        stock: 120,
        category: "Tops",
      },
      {
        id: 3,
        name: "Designer Sunglasses",
        image: "/placeholder.svg?height=200&width=200",
        price: 149.99,
        rating: 4.8,
        sales: 890,
        stock: 18,
        category: "Accessories",
      },
      {
        id: 4,
        name: "Leather Crossbody Bag",
        image: "/placeholder.svg?height=200&width=200",
        price: 79.99,
        rating: 4.6,
        sales: 760,
        stock: 25,
        category: "Bags",
      },
      {
        id: 5,
        name: "Slim Fit Chino Pants",
        image: "/placeholder.svg?height=200&width=200",
        price: 59.99,
        rating: 4.4,
        sales: 1450,
        stock: 45,
        category: "Bottoms",
      },
      {
        id: 6,
        name: "Minimalist Watch",
        image: "/placeholder.svg?height=200&width=200",
        price: 119.99,
        rating: 4.9,
        sales: 980,
        stock: 12,
        category: "Accessories",
      },
    ],
  },
];

export function SellerDetail({ sellerId }) {
  const seller = sellersData.find((s) => s.id === sellerId) || sellersData[0];
  const [productCategory, setProductCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const router = useRouter();

  const filteredProducts = seller.products
    .filter(
      (product) =>
        productCategory === "all" ||
        product.category.toLowerCase() === productCategory.toLowerCase()
    )
    .sort((a, b) => {
      if (sortBy === "popular") return b.sales - a.sales;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  const categories = [
    "all",
    ...new Set(seller.products.map((p) => p.category.toLowerCase())),
  ];

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

  return (
    <div className="space-y-8">
      <motion.div
        className="relative h-64 md:h-80 rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={seller.coverImage || "/placeholder.svg"}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end gap-6">
          <div className="relative">
            <Image
              src={seller.image || "/placeholder.svg"}
              alt={seller.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-background"
            />
            {seller.verified && (
              <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
          <div className="text-white">
            <h1 className="text-3xl font-bold">{seller.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {seller.category}
              </Badge>
              <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full text-xs">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                <span>{seller.rating}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full text-xs">
                <Calendar className="h-3 w-3" />
                <span>Since {seller.joinedDate}</span>
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
              <CardTitle>About {seller.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{seller.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-5 w-5 fill-amber-500" />
                    <span className="font-bold text-xl">{seller.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Rating
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-bold text-xl">
                      {seller.totalSales.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Sales
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-1 text-purple-500">
                    <Package className="h-5 w-5" />
                    <span className="font-bold text-xl">
                      {seller.productsCount}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Products
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-1 text-blue-500">
                    <Users className="h-5 w-5" />
                    <span className="font-bold text-xl">
                      {seller.followers.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Followers
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold">
                Products ({filteredProducts.length})
              </h2>
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <Select
                  value={productCategory}
                  onValueChange={setProductCategory}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="priceLow">Price: Low to High</SelectItem>
                    <SelectItem value="priceHigh">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariant}>
                  <Card
                    className="overflow-hidden h-full cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 right-2">
                        {product.category}
                      </Badge>
                    </div>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <span className="font-bold text-lg">
                          ${product.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            Sales
                          </span>
                          <span className="font-medium">
                            {product.sales.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            In Stock
                          </span>
                          <span className="font-medium">
                            {product.stock} units
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
                <span>{seller.contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{seller.contactInfo.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{seller.contactInfo.address}</span>
              </div>
              <Button className="w-full mt-2">Contact Seller</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rating Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(seller.ratingBreakdown)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([rating, percentage]) => (
                  <div key={rating} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-4 text-sm">{rating}</span>
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500 ml-1" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Monthly Sales</h4>
                  <div className="h-[120px] bg-muted rounded-md flex items-end justify-between p-2">
                    {[65, 40, 75, 50, 85, 70].map((height, i) => (
                      <motion.div
                        key={i}
                        className="w-8 bg-primary rounded-sm"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Top Selling Categories
                  </h4>
                  <div className="space-y-2">
                    {Object.entries({
                      Audio: 45,
                      Wearables: 30,
                      Accessories: 15,
                      Cameras: 10,
                    }).map(([category, percentage]) => (
                      <div key={category} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{category}</span>
                          <span className="text-sm text-muted-foreground">
                            {percentage}%
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
