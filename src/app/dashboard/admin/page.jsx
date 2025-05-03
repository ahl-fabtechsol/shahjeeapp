"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  ShoppingBag,
  Users,
  Store,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for charts
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { name: "Jan", total: 18000 },
  { name: "Feb", total: 22000 },
  { name: "Mar", total: 32000 },
  { name: "Apr", total: 28000 },
  { name: "May", total: 35000 },
  { name: "Jun", total: 42000 },
  { name: "Jul", total: 38000 },
  { name: "Aug", total: 45000 },
  { name: "Sep", total: 48000 },
  { name: "Oct", total: 52000 },
  { name: "Nov", total: 58000 },
  { name: "Dec", total: 65000 },
];

const userActivityData = [
  { name: "Mon", users: 520, sellers: 120 },
  { name: "Tue", users: 580, sellers: 130 },
  { name: "Wed", users: 650, sellers: 140 },
  { name: "Thu", users: 590, sellers: 135 },
  { name: "Fri", users: 620, sellers: 150 },
  { name: "Sat", users: 700, sellers: 160 },
  { name: "Sun", users: 680, sellers: 155 },
];

const recentUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    type: "User",
    status: "Active",
    date: "2 hours ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@example.com",
    type: "Seller",
    status: "Pending",
    date: "5 hours ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    type: "User",
    status: "Active",
    date: "1 day ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    type: "Seller",
    status: "Active",
    date: "2 days ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    type: "User",
    status: "Inactive",
    date: "3 days ago",
    avatar: "/placeholder.svg",
  },
];

const recentOrders = [
  {
    id: "ORD-7652",
    customer: "John Smith",
    product: "Premium Headphones",
    status: "Delivered",
    total: "$299.99",
    date: "2 hours ago",
  },
  {
    id: "ORD-7651",
    customer: "Lisa Johnson",
    product: "Smartphone Case",
    status: "Processing",
    total: "$24.99",
    date: "5 hours ago",
  },
  {
    id: "ORD-7650",
    customer: "Robert Brown",
    product: "Wireless Keyboard",
    status: "Shipped",
    total: "$89.99",
    date: "1 day ago",
  },
  {
    id: "ORD-7649",
    customer: "Emma Wilson",
    product: "Smart Watch",
    status: "Delivered",
    total: "$199.99",
    date: "2 days ago",
  },
  {
    id: "ORD-7648",
    customer: "James Taylor",
    product: "Bluetooth Speaker",
    status: "Processing",
    total: "$79.99",
    date: "3 days ago",
  },
];

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "Unusual login activity detected",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "error",
    message: "Payment gateway error reported",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "success",
    message: "System update completed successfully",
    time: "3 hours ago",
  },
  {
    id: 4,
    type: "warning",
    message: "High server load detected",
    time: "5 hours ago",
  },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your platform's performance and activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,845</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
              <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1 bg-green-500"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Sellers
              </CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,456</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
              <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700">
                <div className="h-1 bg-blue-500" style={{ width: "65%" }}></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$845,238</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUp className="mr-1 h-4 w-4" />
                <span>+24% from last month</span>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1 bg-green-500"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Issues
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center text-xs text-red-500">
                <ArrowDown className="mr-1 h-4 w-4" />
                <span>-8% from last month</span>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700">
                <div className="h-1 bg-red-500" style={{ width: "15%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={userActivityData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="sellers"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Recent Users</TabsTrigger>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.type === "Seller"
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                : "bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400"
                            }
                          >
                            {user.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.status === "Active"
                                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                : user.status === "Pending"
                                ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              order.status === "Delivered"
                                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                : order.status === "Processing"
                                ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-start p-4 rounded-lg ${
                        alert.type === "warning"
                          ? "bg-yellow-50 dark:bg-yellow-900/20"
                          : alert.type === "error"
                          ? "bg-red-50 dark:bg-red-900/20"
                          : "bg-green-50 dark:bg-green-900/20"
                      }`}
                    >
                      {alert.type === "warning" ? (
                        <AlertTriangle
                          className="h-5 w-5 mr-3 text-yellow-600 dark:text-yellow-400"
                          aria-hidden="true"
                        />
                      ) : alert.type === "error" ? (
                        <XCircle
                          className="h-5 w-5 mr-3 text-red-600 dark:text-red-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckCircle
                          className="h-5 w-5 mr-3 text-green-600 dark:text-green-400"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            alert.type === "warning"
                              ? "text-yellow-800 dark:text-yellow-200"
                              : alert.type === "error"
                              ? "text-red-800 dark:text-red-200"
                              : "text-green-800 dark:text-green-200"
                          }`}
                        >
                          {alert.message}
                        </p>
                        <p
                          className={`text-xs ${
                            alert.type === "warning"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : alert.type === "error"
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {alert.time}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={
                          alert.type === "warning"
                            ? "text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                            : alert.type === "error"
                            ? "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            : "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                        }
                      >
                        Resolve
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
