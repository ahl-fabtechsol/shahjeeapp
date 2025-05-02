import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

export const metadata = {
  title: "Product Details | GlobalMarket",
  description: "View product details and specifications",
};

export default function ProductPage({ params }) {
  // This would normally come from a database or API based on params.id
  const product = {
    id: params.id,
    name: "Wireless Earbuds Pro",
    price: 79.99,
    originalPrice: 99.99,
    description:
      "Experience crystal-clear sound with our premium wireless earbuds. Featuring active noise cancellation, touch controls, and a comfortable fit for all-day wear.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600&text=Image+2",
      "/placeholder.svg?height=600&width=600&text=Image+3",
      "/placeholder.svg?height=600&width=600&text=Image+4",
    ],
    category: "Electronics",
    badge: "New",
    rating: 4.5,
    reviews: 128,
    stock: 15,
    specifications: [
      { name: "Battery Life", value: "Up to 8 hours (24 hours with case)" },
      { name: "Connectivity", value: "Bluetooth 5.2" },
      { name: "Water Resistance", value: "IPX4 (splash resistant)" },
      { name: "Noise Cancellation", value: "Active Noise Cancellation (ANC)" },
      { name: "Charging", value: "USB-C and Wireless Charging" },
      { name: "Microphones", value: "4 built-in microphones" },
    ],
    features: [
      "Active Noise Cancellation for immersive sound",
      "Transparency mode for hearing your surroundings",
      "Customizable touch controls",
      "Voice assistant compatibility",
      "Automatic ear detection",
      "Sweat and water resistant",
    ],
  };

  return (
    <div className=" py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href="/products"
          className="text-muted-foreground hover:text-foreground"
        >
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href={`/categories/${product.category.toLowerCase()}`}
          className="text-muted-foreground hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.badge && (
              <Badge className="absolute top-2 right-2 z-10">
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-md border"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : i < product.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline">
            <span className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <Badge
                variant="outline"
                className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              >
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-24 text-sm">Availability:</div>
              <div
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 text-sm">Category:</div>
              <Link
                href={`/categories/${product.category.toLowerCase()}`}
                className="text-primary hover:underline"
              >
                {product.category}
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="rounded-none">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">1</span>
              <Button variant="ghost" size="icon" className="rounded-none">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Truck className="mr-2 h-4 w-4" />
            Free shipping on orders over $50
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Reviews ({product.reviews})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-4">
          <div className="space-y-4">
            <p>{product.description}</p>
            <h3 className="text-lg font-medium mt-4">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-4">
          <div className="border rounded-md divide-y">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex py-3 px-4">
                <div className="w-1/3 font-medium">{spec.name}</div>
                <div className="w-2/3">{spec.value}</div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : i < product.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">
                    Based on {product.reviews} reviews
                  </span>
                </div>
              </div>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-4">
              {/* This would normally be a map over actual reviews */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">John D.</h4>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 5
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    2 days ago
                  </div>
                </div>
                <p className="mt-2">
                  These earbuds are amazing! The sound quality is excellent and
                  the noise cancellation works really well. Battery life is as
                  advertised and they're very comfortable to wear for long
                  periods.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Sarah M.</h4>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    1 week ago
                  </div>
                </div>
                <p className="mt-2">
                  Great earbuds for the price. The sound is clear and the
                  battery lasts all day. The only downside is that the touch
                  controls can be a bit sensitive sometimes.
                </p>
              </div>

              <div className="text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* This would normally be a map over related products */}
          {[1, 2, 3, 4].map((id) => (
            <Link href={`/products/${id}`} key={id} className="group">
              <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Related product"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate">Related Product {id}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      (42)
                    </span>
                  </div>
                  <div className="font-semibold mt-2">$49.99</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
