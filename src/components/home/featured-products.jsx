import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProducts({ data }) {
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
        {data?.map((product, index) => (
          <Link
            href={`/products/${product?._id}`}
            key={index}
            className="group"
          >
            <Card className="overflow-hidden border-border/40 transition-all hover:shadow-md">
              <div className="relative aspect-square">
                <Image
                  src={product?.images?.[0] || "/placeholder.svg"}
                  alt={product?.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  {product?.category?.name}
                </div>
                <h3 className="font-medium text-lg truncate">
                  {product?.name}
                </h3>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="font-semibold">
                  Rs.{product?.price?.toFixed(2)}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
