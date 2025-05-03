"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  BarChart2,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  LineChart,
  PieChart,
  ShoppingBag,
  Store,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminAnalyticsPage() {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive platform performance and business insights.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" /> Date Range
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Platform Performance</h2>
              <Select defaultValue="30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,845,231.89</div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="flex items-center text-green-500">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        14.5%
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
                      Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24,573</div>
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
                      Total Sellers
                    </CardTitle>
                    <Store className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="flex items-center text-green-500">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        4.3%
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
                      Total Orders
                    </CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87,342</div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="flex items-center text-green-500">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        12.8%
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
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Monthly revenue trends across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <LineChart className="h-16 w-16" />
                    <span className="ml-4">Revenue chart will appear here</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>User Acquisition</CardTitle>
                  <CardDescription>
                    New user registrations over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <BarChart2 className="h-16 w-16" />
                    <span className="ml-4">
                      User acquisition chart will appear here
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>
                    Distribution across product categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <div className="h-40 w-40 flex items-center justify-center text-muted-foreground">
                      <PieChart className="h-16 w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      {
                        category: "Electronics",
                        percentage: 35,
                        color: "bg-blue-500",
                      },
                      {
                        category: "Fashion",
                        percentage: 25,
                        color: "bg-green-500",
                      },
                      {
                        category: "Home & Garden",
                        percentage: 15,
                        color: "bg-yellow-500",
                      },
                      {
                        category: "Beauty",
                        percentage: 12,
                        color: "bg-purple-500",
                      },
                      {
                        category: "Other",
                        percentage: 13,
                        color: "bg-gray-500",
                      },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <span
                              className={`h-3 w-3 rounded-full ${item.color} mr-2`}
                            ></span>
                            {item.category}
                          </span>
                          <span>{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} className="h-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Distribution of payment methods used
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <div className="h-40 w-40 flex items-center justify-center text-muted-foreground">
                      <PieChart className="h-16 w-16" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        method: "Credit Card",
                        percentage: 55,
                        icon: CreditCard,
                      },
                      { method: "PayPal", percentage: 25, icon: CreditCard },
                      { method: "Apple Pay", percentage: 12, icon: CreditCard },
                      { method: "Other", percentage: 8, icon: CreditCard },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mr-3">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">{item.method}</p>
                            <p className="text-sm font-medium">
                              {item.percentage}%
                            </p>
                          </div>
                          <Progress
                            value={item.percentage}
                            className="h-1 mt-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>Key growth metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">User Growth</span>
                      <span className="font-medium">+24.8%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={78} max={100} className="h-2 flex-1" />
                      <span className="text-xs text-green-500 flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        12%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Seller Growth
                      </span>
                      <span className="font-medium">+18.5%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={65} max={100} className="h-2 flex-1" />
                      <span className="text-xs text-green-500 flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        8%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Revenue Growth
                      </span>
                      <span className="font-medium">+32.7%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={86} max={100} className="h-2 flex-1" />
                      <span className="text-xs text-green-500 flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        15%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Order Volume
                      </span>
                      <span className="font-medium">+28.3%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={75} max={100} className="h-2 flex-1" />
                      <span className="text-xs text-green-500 flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        10%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="mt-4">
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <LineChart className="h-16 w-16" />
              <span className="ml-4">
                Detailed revenue analytics will appear here
              </span>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-4">
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <Users className="h-16 w-16" />
              <span className="ml-4">User analytics will appear here</span>
            </div>
          </TabsContent>

          <TabsContent value="sellers" className="mt-4">
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <Store className="h-16 w-16" />
              <span className="ml-4">Seller analytics will appear here</span>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-4">
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <ShoppingBag className="h-16 w-16" />
              <span className="ml-4">Product analytics will appear here</span>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>
                  Actionable insights based on platform data
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <ArrowRight className="h-4 w-4 mr-2" /> View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Revenue Opportunity",
                  description:
                    "Electronics category shows 35% growth potential based on market trends.",
                  icon: TrendingUp,
                  color: "text-green-500 bg-green-50",
                },
                {
                  title: "User Retention Risk",
                  description:
                    "10% of new users from last month haven't completed their first purchase.",
                  icon: TrendingDown,
                  color: "text-red-500 bg-red-50",
                },
                {
                  title: "Seller Performance",
                  description:
                    "Top 5% of sellers generate 40% of platform revenue. Consider featured placement.",
                  icon: TrendingUp,
                  color: "text-blue-500 bg-blue-50",
                },
              ].map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4 rounded-md border p-4"
                >
                  <div className={`rounded-full p-2 ${insight.color}`}>
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{insight.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
