"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  DollarSign,
  Users,
  Store,
  ShoppingBagIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { RecentUsers } from "./(tabs)/recentUsers";
import { RecentOrders } from "./(tabs)/recentOrders";
import { RecentSellers } from "./(tabs)/recentSellers";
import { RecentBuyers } from "./(tabs)/recentBuyers";
import { CustomTabs } from "@/components/customTabs";

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

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [currentTab, setCurrentTab] = useState("users");

  const tabData = [
    { value: "users", label: "Recent Users", content: <RecentUsers /> },
    { value: "orders", label: "Recent Orders", content: <RecentOrders /> },
    {
      value: "sellers",
      label: "Recent Sellers",
      content: <RecentSellers />,
    },
    { value: "buyers", label: "Recent Buyers", content: <RecentBuyers /> },
  ];

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
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,845</div>

              <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1 bg-green-500"
                  style={{ width: "100%" }}
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

              <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1 bg-blue-500"
                  style={{ width: "100%" }}
                ></div>
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

              <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1 bg-green-500"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">238</div>

              <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1 bg-green-500"
                  style={{ width: "100%" }}
                ></div>
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
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-7">
          <Card className="col-span-1 xl:col-span-4">
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
          <Card className="col-span-1 xl:col-span-3">
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
        <CustomTabs
          tabs={tabData}
          value={currentTab}
          onValueChange={setCurrentTab}
        />
      </motion.div>
    </div>
  );
}
