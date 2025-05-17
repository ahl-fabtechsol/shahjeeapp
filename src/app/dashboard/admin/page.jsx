"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Store,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAdminDashboardData } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboardPage() {
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["adminDashboardData"],
    queryFn: () => getAdminDashboardData(),
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

  const formatCurrency = (amount) => `Rs.${amount.toFixed(2)}`;
  const formatDate = (date) => new Date(date).toLocaleDateString();

  const getStatusBadge = (status) => {
    switch (status) {
      case "P":
        return <Badge variant="default">Pending</Badge>;
      case "U":
        return <Badge variant="secondary">Unpaid</Badge>;
      case "R":
        return <Badge variant="destructive">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getOrderStatusBadge = (status) => {
    switch (status) {
      case "P":
        return <Badge variant="default">Pending</Badge>;
      case "C":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "S":
        return <Badge variant="secondary">Shipped</Badge>;
      case "D":
        return <Badge variant="success">Delivered</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "B":
        return <Badge variant="default">Buyer</Badge>;
      case "S":
        return <Badge variant="secondary">Seller</Badge>;
      default:
        return <Badge>{role}</Badge>;
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
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive overview of platform performance and user activity.
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
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {data.totalBuyers} buyers, {data.totalSellers} sellers
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Stores
              </CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalStores}</div>
              <p className="text-xs text-muted-foreground">
                {data.totalCategories} categories
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
                Total Revenue
              </CardTitle>
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
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
            <CardDescription>
              Key metrics for orders and products
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  <span className="text-muted-foreground">Paid Orders</span>
                  <span className="font-medium">{data.paidOrders}</span>
                </div>
                <Progress
                  value={(data.paidOrders / data.totalOrders) * 100}
                  className="h-2"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active Products</span>
                  <span className="font-medium">{data.activeProducts}</span>
                </div>
                <Progress
                  value={(data.activeProducts / data.totalProducts) * 100}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest user reviews</CardDescription>
          </CardHeader>
          <CardContent>
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
                    <span className="font-medium">User Feedback</span>
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
                      Replied: {feedback.repliedText}
                    </p>
                  )}
                  {index < data.recentFeedbacks.length - 1 && (
                    <div className="border-t my-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="orders" className="space-y-4">
          <div className="w-full overflow-x-auto hide-scrollbar">
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
              <TabsTrigger
                className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
                value="buyers"
              >
                Recent Buyers
              </TabsTrigger>
              <TabsTrigger
                className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
                value="sellers"
              >
                Recent Sellers
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Latest order activity across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Code</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Buyer</TableHead>
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
                        <TableCell>
                          {getOrderStatusBadge(order.status)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(order.paymentStatus)}
                        </TableCell>
                        <TableCell>
                          {data.recentBuyers.find(
                            (b) => b._id === order.createdBy
                          )?.name || "Unknown"}
                        </TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="buyers">
            <Card>
              <CardHeader>
                <CardTitle>Recent Buyers</CardTitle>
                <CardDescription>Newly registered buyers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recentBuyers.map((buyer) => (
                      <TableRow key={buyer._id}>
                        <TableCell>{buyer.name}</TableCell>
                        <TableCell>{buyer.email}</TableCell>
                        <TableCell>{buyer.phone || "N/A"}</TableCell>
                        <TableCell>{getRoleBadge(buyer.role)}</TableCell>
                        <TableCell>{getStatusBadge(buyer.status)}</TableCell>
                        <TableCell>{formatDate(buyer.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sellers">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sellers</CardTitle>
                <CardDescription>Newly registered sellers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recentSellers.map((seller) => (
                      <TableRow key={seller._id}>
                        <TableCell>{seller.name}</TableCell>
                        <TableCell>{seller.email}</TableCell>
                        <TableCell>{seller.phone || "N/A"}</TableCell>
                        <TableCell>{getRoleBadge(seller.role)}</TableCell>
                        <TableCell>{getStatusBadge(seller.status)}</TableCell>
                        <TableCell>{formatDate(seller.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
