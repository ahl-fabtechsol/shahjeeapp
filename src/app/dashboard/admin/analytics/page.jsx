"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Calendar,
  DollarSign,
  ShoppingBag,
  Store,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

const sellers = [
  {
    id: "tech-store",
    name: "Tech Store",
    revenue: 345_670,
    orders: 2_348,
    growth: 5.1,
  },
  {
    id: "fashion-hub",
    name: "Fashion Hub",
    revenue: 198_220,
    orders: 1_237,
    growth: 3.8,
  },
];

const buyers = [
  {
    id: "alex-johnson",
    name: "Alex Johnson",
    spent: 12_545,
    orders: 43,
    growth: 2.4,
  },
  {
    id: "sara-lee",
    name: "Sara Lee",
    spent: 8_912,
    orders: 28,
    growth: 1.9,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function StatsGrid({
  revenue,
  orders,
  users,
  growthRevenue = 0,
  growthUsers = 0,
  growthOrders = 0,
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${revenue.toLocaleString()}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-green-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                {growthRevenue}%
              </span>
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-green-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                {growthUsers}%
              </span>
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-green-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                {growthOrders}%
              </span>
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="h-full flex items-center justify-center">
          <CardContent className="text-muted-foreground text-center">
            <Calendar className="mx-auto h-5 w-5 mb-2" />
            More metrics coming soon
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function AdminAnalyticsPage() {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const currentSeller = useMemo(
    () => sellers.find((s) => s.id === selectedSeller) ?? null,
    [selectedSeller]
  );
  const currentBuyer = useMemo(
    () => buyers.find((b) => b.id === selectedBuyer) ?? null,
    [selectedBuyer]
  );

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
        </div>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="seller">Seller</TabsTrigger>
            <TabsTrigger value="buyer">Buyer</TabsTrigger>
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

            <StatsGrid
              revenue={1_845_232}
              users={24_573}
              orders={87_342}
              growthRevenue={14.5}
              growthUsers={8.2}
              growthOrders={12.8}
            />
          </TabsContent>

          <TabsContent value="seller" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Seller Analytics</h2>
              <Select
                onValueChange={(val) => setSelectedSeller(val)}
                defaultValue={selectedSeller ?? undefined}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select seller" />
                </SelectTrigger>
                <SelectContent>
                  {sellers.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!currentSeller && (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <Store className="h-6 w-6 mr-2" />
                Pick a seller to view detailed stats
              </div>
            )}

            {currentSeller && (
              <StatsGrid
                revenue={currentSeller.revenue}
                orders={currentSeller.orders}
                users={0}
                growthRevenue={currentSeller.growth}
                growthOrders={currentSeller.growth / 2}
              />
            )}
          </TabsContent>

          <TabsContent value="buyer" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Buyer Analytics</h2>
              <Select
                onValueChange={(val) => setSelectedBuyer(val)}
                defaultValue={selectedBuyer ?? undefined}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select buyer" />
                </SelectTrigger>
                <SelectContent>
                  {buyers.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!currentBuyer && (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <Users className="h-6 w-6 mr-2" />
                Pick a buyer to view detailed stats
              </div>
            )}

            {currentBuyer && (
              <StatsGrid
                revenue={currentBuyer.spent}
                orders={currentBuyer.orders}
                users={1}
                growthRevenue={currentBuyer.growth}
                growthOrders={currentBuyer.growth / 2}
                growthUsers={0}
              />
            )}
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
                <ArrowRight className="h-4 w-4 mr-2" />
                View All
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
