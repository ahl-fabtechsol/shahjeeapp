"use client";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Calendar,
  CreditCard,
  DollarSign,
  ShoppingCart,
  Box,
} from "lucide-react";

export function OrderDetailDialog({ order, open, onOpenChange }) {
  if (!order) {
    order = {
      id: "ORD-2023-8756",
      status: "Delivered",
      customer: {
        name: "Alex Johnson",
        email: "alex@example.com",
        Image: "/placeholder.svg?height=40&width=40",
      },
      seller: {
        name: "Tech Store",
        id: "SELLER-458",
        Image: "/placeholder.svg?height=40&width=40",
      },
      date: "May 3, 2024",
      payment: "Visa •••• 4242",
      total: 249.99,
      items: 3,
      disputed: false,
    };
  }

  const stats = [
    { icon: Calendar, label: "Date", value: order.date },
    { icon: CreditCard, label: "Payment", value: order.payment },
    { icon: DollarSign, label: "Total", value: `$${order.total.toFixed(2)}` },
    { icon: ShoppingCart, label: "Items", value: order.items },
    { icon: Box, label: "Disputed", value: order.disputed ? "Yes" : "No" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          View Order Details
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-full rounded-lg overflow-hidden p-0">
        <DialogHeader className="p-0 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-80" />
          <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-6 py-5 text-white">
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Order {order.id}
              </DialogTitle>
              <DialogDescription className="mt-1 text-cyan-100 opacity-90">
                Transaction Overview
              </DialogDescription>
            </div>
            <Badge
              className={`uppercase text-xs font-medium py-1.5 px-3 rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.status}
            </Badge>
          </div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-5 space-y-6 bg-background"
        >
          <section>
            <h3 className="text-base font-semibold mb-2 text-foreground">
              <span className="inline-block w-1 h-5 bg-blue-500 rounded mr-2" />
              Parties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { role: "Customer", data: order.customer },
                { role: "Seller", data: order.seller },
              ].map(({ role, data }) => (
                <Card
                  key={role}
                  className="flex items-center gap-4 border border-blue-100 p-4 rounded-lg shadow"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={data.Image} alt={data.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {data.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-center font-medium leading-tight">
                      {data.name}
                    </p>
                    <p className="text-sm text-muted-foreground truncate text-center">
                      {role === "Customer" ? data.email : data.id}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="border-blue-100" />

          <section>
            <h3 className="text-base font-semibold mb-2 text-foreground">
              <span className="inline-block w-1 h-5 bg-blue-500 rounded mr-2" />
              Order Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>

        <DialogFooter className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
