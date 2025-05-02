"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Package,
  Truck,
  Calendar,
  X,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export function OrderPlacedModal({ isOpen, onClose, orderDetails }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: CheckCircle2,
      label: "Order Confirmed",
      description: "Your order has been received",
    },
    {
      icon: Package,
      label: "Processing",
      description: "We're preparing your items",
    },
    { icon: Truck, label: "Shipping", description: "Your order is on the way" },
    {
      icon: Calendar,
      label: "Delivery",
      description: "Expected by May 10, 2025",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setProgress(100);
      }, 500);

      const stepTimer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(stepTimer);
            return prev;
          }
        });
      }, 800);

      return () => {
        clearTimeout(timer);
        clearInterval(stepTimer);
      };
    } else {
      setProgress(0);
      setCurrentStep(0);
    }
  }, [isOpen, steps.length]);

  if (!orderDetails) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-bold">
              Order Successfully Placed!
            </DialogTitle>
            <p className="text-center text-muted-foreground mt-2">
              Thank you for your purchase. Your order #
              {orderDetails.orderNumber} has been confirmed.
            </p>
          </motion.div>
        </DialogHeader>

        <div className="p-6">
          <div className="mb-8">
            <Progress value={progress} className="h-2" />

            <div className="grid grid-cols-4 gap-2 mt-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: index <= currentStep ? 1 : 0.5,
                    scale: index === currentStep ? 1.05 : 1,
                  }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                      index <= currentStep
                        ? "bg-green-100 text-green-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {<step.icon className="h-5 w-5" />}
                  </div>
                  <span className="text-xs font-medium">{step.label}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h3 className="font-medium">Order Summary</h3>

            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
              <AnimatePresence>
                {orderDetails.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-md flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4 mr-1" />
              Download Receipt
            </Button>

            <Button asChild>
              <Link href="/orders" className="flex items-center">
                Track Order
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
