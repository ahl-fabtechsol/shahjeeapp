"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CreditCard,
  DollarSign,
  Package,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BuyerDashboardPage() {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, Alex!
        </h2>
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className=" justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Spent
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,248.56</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    2 arriving this week
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Wishlist Items
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    3 items on sale now
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Loyalty Points
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">456</div>
                  <p className="text-xs text-muted-foreground">
                    44 points until next reward
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={item} initial="hidden" animate="show">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  You have made 12 orders this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={order.image || "/placeholder.svg"}
                          alt={order.product}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">
                          {order.product}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Order #{order.id}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        ${order.total.toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
          >
            <motion.div variants={item} className="col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {deliveryProgress.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="font-medium">{item.product}</div>
                          <div className="text-sm text-muted-foreground">
                            #{item.id}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.status}
                        </div>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist Highlights</CardTitle>
                  <CardDescription>
                    Items you might want to purchase soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wishlistItems.map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 rounded-md border p-4"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

const recentOrders = [
  {
    id: "ORD-7652",
    product: "Premium Headphones",
    total: 149.99,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "ORD-7651",
    product: "Smart Watch Series 5",
    total: 299.99,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "ORD-7650",
    product: "Laptop Sleeve Case",
    total: 29.99,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "ORD-7649",
    product: "Wireless Charger",
    total: 49.99,
    image: "/placeholder.svg?height=64&width=64",
  },
];

const deliveryProgress = [
  {
    id: "ORD-7652",
    product: "Premium Headphones",
    status: "Out for delivery",
    progress: 80,
  },
  {
    id: "ORD-7651",
    product: "Smart Watch Series 5",
    status: "Processing",
    progress: 30,
  },
  {
    id: "ORD-7650",
    product: "Laptop Sleeve Case",
    status: "Shipped",
    progress: 60,
  },
];

const wishlistItems = [
  {
    name: "Wireless Earbuds",
    price: 89.99,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Ultra HD Monitor",
    price: 349.99,
    image: "/placeholder.svg?height=64&width=64",
  },
];
