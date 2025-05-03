"use client";

import { motion } from "framer-motion";
import { Package, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function BuyerOrdersPage() {
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
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full pl-8 md:w-64"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className=" justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            All Orders
          </TabsTrigger>
          <TabsTrigger
            value="processing"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Processing
          </TabsTrigger>
          <TabsTrigger
            value="shipped"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Shipped
          </TabsTrigger>
          <TabsTrigger
            value="delivered"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Delivered
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4"
          >
            {orders.map((order, index) => (
              <motion.div key={order.id} variants={item}>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.id}
                        </CardTitle>
                        <CardDescription>{order.date}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center space-x-4 rounded-md border p-4"
                        >
                          <div className="flex-shrink-0 rounded-md bg-muted p-2">
                            <Package className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="font-medium">
                            ${item.price.toFixed(2)}
                          </div>
                        </motion.div>
                      ))}
                      <div className="flex justify-between pt-4 border-t">
                        <div>
                          <p className="text-sm font-medium">Total</p>
                          <p className="text-sm text-muted-foreground">
                            Including shipping and taxes
                          </p>
                        </div>
                        <div className="text-xl font-bold">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Track Order</Button>
                        <Button>View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processing Orders</CardTitle>
              <CardDescription>
                Orders that are currently being processed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Filtered processing orders will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipped" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipped Orders</CardTitle>
              <CardDescription>Orders that have been shipped.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Filtered shipped orders will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
              <CardDescription>
                Orders that have been delivered.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Filtered delivered orders will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Processing":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10";
    case "Shipped":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/10";
    case "Delivered":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/10";
    case "Cancelled":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/10";
    default:
      return "";
  }
}

const orders = [
  {
    id: "ORD-7652",
    date: "May 2, 2023",
    status: "Processing",
    total: 149.99,
    items: [
      {
        name: "Premium Headphones",
        quantity: 1,
        price: 149.99,
      },
    ],
  },
  {
    id: "ORD-7651",
    date: "April 28, 2023",
    status: "Shipped",
    total: 329.98,
    items: [
      {
        name: "Smart Watch Series 5",
        quantity: 1,
        price: 299.99,
      },
      {
        name: "Watch Charging Cable",
        quantity: 1,
        price: 29.99,
      },
    ],
  },
  {
    id: "ORD-7650",
    date: "April 15, 2023",
    status: "Delivered",
    total: 29.99,
    items: [
      {
        name: "Laptop Sleeve Case",
        quantity: 1,
        price: 29.99,
      },
    ],
  },
  {
    id: "ORD-7649",
    date: "March 22, 2023",
    status: "Delivered",
    total: 49.99,
    items: [
      {
        name: "Wireless Charger",
        quantity: 1,
        price: 49.99,
      },
    ],
  },
];
