import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      badge: "New",
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      badge: "Trending",
    },
    {
      id: 3,
      name: "Leather Laptop Sleeve",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
    },
    {
      id: 4,
      name: "Portable Bluetooth Speaker",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      badge: "Sale",
    },
  ];

  return (
    <section className="w-full p-6 lg:px-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Products
          </h2>
          <p className="text-muted-foreground mt-1">
            Our most popular products based on sales
          </p>
        </div>
        <Link
          href="/products"
          className="text-primary hover:underline mt-2 md:mt-0"
        >
          View all products →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group"
          >
            <Card className="overflow-hidden border-border/40 transition-all hover:shadow-md">
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
                <h3 className="font-medium text-lg truncate">{product.name}</h3>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="font-semibold">${product.price.toFixed(2)}</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
