"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  BarChart2,
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Truck,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SellerDashboardPage() {
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
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your store performance.
        </p>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
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
          <TabsTrigger
            value="notifications"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4"
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className="flex items-center text-green-500">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      12.5%
                    </span>
                    <span>from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className="flex items-center text-green-500">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      8.2%
                    </span>
                    <span>from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Products
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">248</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className="flex items-center text-green-500">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      4.3%
                    </span>
                    <span>new products</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className="flex items-center text-red-500">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      3.1%
                    </span>
                    <span>from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Compare sales performance over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <BarChart2 className="h-16 w-16" />
                  <span className="ml-4">Sales chart will appear here</span>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Feedbacks</CardTitle>
                <CardDescription>
                  Latest customer reviews and ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Emma Wilson",
                      product: "Wireless Headphones",
                      rating: 5,
                      comment:
                        "Excellent sound quality and comfortable to wear for long periods.",
                    },
                    {
                      name: "James Rodriguez",
                      product: "Smart Watch",
                      rating: 4,
                      comment:
                        "Great features but battery life could be better.",
                    },
                    {
                      name: "Sophia Chen",
                      product: "Bluetooth Speaker",
                      rating: 5,
                      comment: "Amazing sound for such a compact speaker!",
                    },
                  ].map((feedback, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{feedback.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feedback.product}
                      </span>
                      <p className="text-sm">{feedback.comment}</p>
                      {index < 2 && <div className="border-t my-2" />}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Fulfillment Status</CardTitle>
                <CardDescription>
                  Current order processing status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium">24</span>
                    </div>
                    <Progress value={24} max={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Processing</span>
                      <span className="font-medium">16</span>
                    </div>
                    <Progress value={16} max={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipped</span>
                      <span className="font-medium">52</span>
                    </div>
                    <Progress value={52} max={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Delivered</span>
                      <span className="font-medium">78</span>
                    </div>
                    <Progress value={78} max={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>
                  Your best-selling products this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Wireless Headphones",
                      sold: 124,
                      revenue: "$12,400",
                    },
                    { name: "Smart Watch", sold: 98, revenue: "$19,600" },
                    { name: "Bluetooth Speaker", sold: 87, revenue: "$8,700" },
                    { name: "Fitness Tracker", sold: 65, revenue: "$6,500" },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sold} sold
                        </p>
                      </div>
                      <p className="font-medium">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Overview</CardTitle>
                <CardDescription>Current shipping status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center">
                  <Truck className="h-9 w-9 text-primary p-1.5 bg-primary/10 rounded-full" />
                  <div className="ml-4">
                    <p className="text-sm font-medium">In Transit</p>
                    <p className="text-xs text-muted-foreground">
                      32 orders on the way
                    </p>
                  </div>
                  <div className="ml-auto font-medium">12%</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Standard Shipping
                    </span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Express Shipping
                    </span>
                    <span className="font-medium">24%</span>
                  </div>
                  <Progress value={24} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Next Day Delivery
                    </span>
                    <span className="font-medium">8%</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            <BarChart2 className="h-16 w-16" />
            <span className="ml-4">Analytics content will appear here</span>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            <BarChart2 className="h-16 w-16" />
            <span className="ml-4">Reports content will appear here</span>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            <BarChart2 className="h-16 w-16" />
            <span className="ml-4">Notifications content will appear here</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
