import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
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

  return (
    <div className=" py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div className="flex items-center justify-between md:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="hidden md:block space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="electronics" />
                  <Label htmlFor="electronics">Electronics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fashion" />
                  <Label htmlFor="fashion">Fashion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="home" />
                  <Label htmlFor="home">Home & Garden</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="beauty" />
                  <Label htmlFor="beauty">Beauty</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sports" />
                  <Label htmlFor="sports">Sports & Fitness</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <Slider defaultValue={[0, 500]} min={0} max={1000} step={10} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm">$0</span>
                <span className="text-sm">$1000</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Rating</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating4" />
                  <Label htmlFor="rating4">4★ & above</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating3" />
                  <Label htmlFor="rating3">3★ & above</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating2" />
                  <Label htmlFor="rating2">2★ & above</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Shipping</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="freeShipping" />
                  <Label htmlFor="freeShipping">Free Shipping</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sameDay" />
                  <Label htmlFor="sameDay">Same Day Delivery</Label>
                </div>
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
              <div className="relative w-full sm:w-[250px]">
                <Input placeholder="Search products..." />
              </div>

              <Select defaultValue="featured">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <Card className="overflow-hidden border-border/40 transition-all hover:shadow-md h-full">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 right-2 z-10">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      {product.category}
                    </div>
                    <h3 className="font-medium text-lg truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : i < product.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="font-semibold">
                      ${product.price.toFixed(2)}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="w-10">
                1
              </Button>
              <Button variant="outline" size="sm" className="w-10">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-10">
                3
              </Button>
              <Button variant="outline" size="sm" className="w-10">
                4
              </Button>
              <Button variant="outline" size="sm" className="w-10">
                5
              </Button>
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
