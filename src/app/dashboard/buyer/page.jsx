"use client";

import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Star, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBuyerDashboardData } from "@/services/dashboardService";

export default function BuyerDashboardPage() {
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["buyerDashboardData"],
    queryFn: () => getBuyerDashboardData(),
    enabled: true,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
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

  const data = dashboardData;

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const formatDate = (date) => new Date(date).toLocaleDateString();

  const getStatusBadge = (status) => {
    switch (status) {
      case "P":
        return <Badge variant="default">Pending</Badge>;
      case "U":
        return <Badge variant="secondary">Unpaid</Badge>;
      case "S":
        return <Badge variant="outline">Shipped</Badge>;
      case "D":
        return <Badge variant="success">Delivered</Badge>;
      case "C":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching product data</p>
        <p>{error?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="h-full mt-5 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Buyer Dashboard</h1>
        <p className="text-muted-foreground">
          Your shopping activity and order history at a glance.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6"
      >
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data.totalAmount)}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(data.totalPaidAmount)} paid
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {data.activeOrders} active
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Delivered Orders
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.deliveredOrders}</div>
              <p className="text-xs text-muted-foreground">
                {data.shippedOrders} shipped
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Feedback Given
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.feedbackCount}</div>
              <p className="text-xs text-muted-foreground">
                {data.repliedCount} replied
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Your current order progress</CardDescription>
          </CardHeader>
          <CardContent>
            {data.totalOrders > 0 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Active Orders</span>
                    <span className="font-medium">{data.activeOrders}</span>
                  </div>
                  <Progress
                    value={(data.activeOrders / data.totalOrders) * 100}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Shipped Orders
                    </span>
                    <span className="font-medium">{data.shippedOrders}</span>
                  </div>
                  <Progress
                    value={(data.shippedOrders / data.totalOrders) * 100}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Delivered Orders
                    </span>
                    <span className="font-medium">{data.deliveredOrders}</span>
                  </div>
                  <Progress
                    value={(data.deliveredOrders / data.totalOrders) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  You haven't placed any orders yet.
                </p>
                <Link href="/products">
                  <Button>Shop Now</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Your Feedback</CardTitle>
            <CardDescription>Feedback you've provided</CardDescription>
          </CardHeader>
          <CardContent>
            {data.feedbackCount > 0 ? (
              <div className="space-y-4">
                {data.recentFeedbacks.map((feedback, index) => (
                  <motion.div
                    key={feedback._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">Your Feedback</span>
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
                    <p className="text-sm">{feedback.message}</p>
                    {feedback.replied && (
                      <p className="text-sm text-muted-foreground">
                        Seller Replied: {feedback.repliedText}
                      </p>
                    )}
                    {index < data.recentFeedbacks.length - 1 && (
                      <div className="border-t my-2" />
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  You haven't left any feedback yet.
                </p>
                <Link href="/products">
                  <Button>Explore Products</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="w-full flex flex-nowrap min-w-max justify-start border-b bg-transparent p-0">
            <TabsTrigger
              className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
              value="orders"
            >
              Recent Orders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest order activity</CardDescription>
              </CardHeader>
              <CardContent>
                {data.recentOrders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order Code</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.recentOrders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order.orderCode}</TableCell>
                          <TableCell>
                            {formatCurrency(order.totalAmount)}
                          </TableCell>
                          <TableCell>{order.itemCount}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            {getStatusBadge(order.paymentStatus)}
                          </TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No recent orders found.
                    </p>
                    <Link href="/products">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
