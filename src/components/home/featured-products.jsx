import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getAllProductsSite } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export default function FeaturedProducts() {
  const {
    data: productsData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryFn: () =>
      getAllProductsSite({ page: 1, limit: 10000, featured: true }),
    queryKey: ["siteProductsFeatured"],
    enabled: true,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
  if (isError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching Prodcuts data</p>
        <p>{error?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isLoading || isFetching || !productsData) {
    return (
      <div className="h-full mt-5 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

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
        {productsData?.results?.map((product, index) => (
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
                  ${product?.price?.toFixed(2)}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
