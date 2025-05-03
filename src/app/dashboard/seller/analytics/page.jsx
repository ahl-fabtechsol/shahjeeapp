"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart2,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  LineChart,
  Package,
  PieChart,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

export default function SellerAnalyticsPage() {
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
              Track your store performance and customer insights.
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
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Performance Overview</h2>
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
                    <CardTitle className="text-sm font-medium">
                      Orders
                    </CardTitle>
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
                      Customers
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="flex items-center text-green-500">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        5.3%
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
                      Conversion Rate
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2%</div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="flex items-center text-red-500">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        0.4%
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
                    Monthly revenue and order trends
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <LineChart className="h-16 w-16" />
                    <span className="ml-4">Sales chart will appear here</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>
                    Products with the highest sales volume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Wireless Headphones",
                        sold: 124,
                        revenue: "$12,400",
                        growth: 15,
                      },
                      {
                        name: "Smart Watch",
                        sold: 98,
                        revenue: "$19,600",
                        growth: 8,
                      },
                      {
                        name: "Bluetooth Speaker",
                        sold: 87,
                        revenue: "$8,700",
                        growth: 12,
                      },
                      {
                        name: "Fitness Tracker",
                        sold: 65,
                        revenue: "$6,500",
                        growth: -3,
                      },
                      {
                        name: "Wireless Earbuds",
                        sold: 54,
                        revenue: "$8,100",
                        growth: 5,
                      },
                    ].map((product, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center"
                      >
                        <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center mr-3">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">{product.name}</p>
                            <p className="font-medium">{product.revenue}</p>
                          </div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{product.sold} sold</span>
                            <span
                              className={`flex items-center ${
                                product.growth >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {product.growth >= 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {Math.abs(product.growth)}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>
                    Revenue distribution by product category
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
                        percentage: 45,
                        color: "bg-blue-500",
                      },
                      {
                        category: "Accessories",
                        percentage: 30,
                        color: "bg-green-500",
                      },
                      {
                        category: "Wearables",
                        percentage: 15,
                        color: "bg-yellow-500",
                      },
                      {
                        category: "Other",
                        percentage: 10,
                        color: "bg-red-500",
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
                      <BarChart2 className="h-16 w-16" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        method: "Credit Card",
                        percentage: 65,
                        icon: CreditCard,
                      },
                      { method: "PayPal", percentage: 20, icon: CreditCard },
                      { method: "Apple Pay", percentage: 10, icon: CreditCard },
                      { method: "Other", percentage: 5, icon: CreditCard },
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
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>
                    Where your customers are coming from
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        source: "Direct",
                        visits: 4320,
                        percentage: 40,
                        growth: 12,
                      },
                      {
                        source: "Organic Search",
                        visits: 3250,
                        percentage: 30,
                        growth: 8,
                      },
                      {
                        source: "Social Media",
                        visits: 1620,
                        percentage: 15,
                        growth: 24,
                      },
                      {
                        source: "Referrals",
                        visits: 1080,
                        percentage: 10,
                        growth: -5,
                      },
                      {
                        source: "Email",
                        visits: 540,
                        percentage: 5,
                        growth: 3,
                      },
                    ].map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {index + 1}
                            </Badge>
                            <span className="font-medium">{source.source}</span>
                          </div>
                          <div
                            className={`flex items-center text-xs ${
                              source.growth >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {source.growth >= 0 ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(source.growth)}%
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{source.visits.toLocaleString()} visits</span>
                          <span>{source.percentage}%</span>
                        </div>
                        <Progress value={source.percentage} className="h-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="mt-4">
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <LineChart className="h-16 w-16" />
              <span className="ml-4">
                Detailed sales analytics will appear here
              </span>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-4">
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <Package className="h-16 w-16" />
              <span className="ml-4">
                Product performance analytics will appear here
              </span>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="mt-4">
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <Users className="h-16 w-16" />
              <span className="ml-4">Customer analytics will appear here</span>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Insights</CardTitle>
                <CardDescription>
                  Actionable insights based on your store data
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
                  title: "Sales Opportunity",
                  description:
                    "Your conversion rate has dropped by 0.4%. Consider reviewing your checkout process.",
                  icon: TrendingDown,
                  color: "text-red-500 bg-red-50",
                },
                {
                  title: "Product Insight",
                  description:
                    "Wireless Headphones are your best-selling product. Consider expanding this product line.",
                  icon: TrendingUp,
                  color: "text-green-500 bg-green-50",
                },
                {
                  title: "Customer Behavior",
                  description:
                    "65% of your revenue comes from returning customers. Focus on retention strategies.",
                  icon: Users,
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
