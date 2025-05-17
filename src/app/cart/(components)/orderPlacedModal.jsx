"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/services/orderService";
import { isLoggedIn } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, CheckCircle2, Loader2, Package, Truck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function OrderPlacedModal({ isOpen, onClose, orderDetails }) {
  const loggedIn = isLoggedIn();
  const clearCart = useCartStore((state) => state.clearCart);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 6);

  const mutation = useMutation({
    mutationFn: (data) => createOrder(data),
    onSuccess: (data) => {
      toast.success("Order created successfully");
      window.location.href = data.url;
      clearCart();
      onClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create order");
      console.error("Error creating order:", error);
    },
  });

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
      description: `Your order will arrive on ${deliveryDate.toLocaleDateString()}`,
    },
  ];

  const handleSubmit = () => {
    if (!loggedIn) {
      toast.error("Please log in to proceed with the order");
      return;
    }
    const products = orderDetails?.items?.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));
    const seller = orderDetails?.items[0]?.seller;
    const totalAmount = orderDetails?.total;
    const itemCount = orderDetails?.items?.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const data = {
      products,
      seller,
      totalAmount,
      itemCount,
    };
    mutation.mutate(data);
  };

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
              Order Summary
            </DialogTitle>
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
                {orderDetails?.items?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-md flex-shrink-0">
                      <Image
                        src={item?.product?.images[0] || "/placeholder.svg"}
                        alt={item?.product?.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item?.product?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item?.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      Rs.{(item?.product?.price * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>Rs.{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              onClick={handleSubmit}
              disabled={mutation.isLoading || mutation.isPending}
            >
              {mutation.isLoading || mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing…
                </span>
              ) : (
                "Pay Order"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
