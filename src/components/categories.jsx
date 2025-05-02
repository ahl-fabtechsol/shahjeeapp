import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Shirt, Home, Palette, Car, Gift } from "lucide-react";

export default function Categories() {
  const categories = [
    {
      name: "Electronics",
      icon: <Laptop className="h-10 w-10" />,
      href: "/categories/electronics",
      color: "bg-blue-100 dark:bg-blue-950",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Fashion",
      icon: <Shirt className="h-10 w-10" />,
      href: "/categories/fashion",
      color: "bg-pink-100 dark:bg-pink-950",
      textColor: "text-pink-600 dark:text-pink-400",
    },
    {
      name: "Home & Garden",
      icon: <Home className="h-10 w-10" />,
      href: "/categories/home",
      color: "bg-green-100 dark:bg-green-950",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      name: "Beauty",
      icon: <Palette className="h-10 w-10" />,
      href: "/categories/beauty",
      color: "bg-purple-100 dark:bg-purple-950",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "Automotive",
      icon: <Car className="h-10 w-10" />,
      href: "/categories/automotive",
      color: "bg-orange-100 dark:bg-orange-950",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      name: "Gifts",
      icon: <Gift className="h-10 w-10" />,
      href: "/categories/gifts",
      color: "bg-red-100 dark:bg-red-950",
      textColor: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <section className="">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
        <p className="text-muted-foreground mt-2 max-w-[700px] mx-auto">
          Browse our wide range of products across popular categories
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link href={category.href} key={category.name}>
            <Card className="border-border/40 h-full transition-all hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <div className={`rounded-full p-4 mb-4 ${category.color}`}>
                  <div className={category.textColor}>{category.icon}</div>
                </div>
                <h3 className="font-medium">{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
