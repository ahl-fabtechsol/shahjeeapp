"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { format } from "date-fns";

export function OrderDetailModal({ isOpen, onClose, order }) {
  if (!order) return null;

  const statusLabels = {
    P: "Pending",
    S: "Shipped",
    D: "Delivered",
    C: "Cancelled",
  };

  const paymentStatusLabels = {
    P: "Paid",
    U: "Unpaid",
    R: "Refunded",
  };

  const paymentModeLabels = {
    COD: "Cash on Delivery",
    O: "Online Payment",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DialogTitle className="text-center text-2xl font-bold">
              Order Details
            </DialogTitle>
          </motion.div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Order Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">
                  Order Code
                </Label>
                <p className="font-medium">{order.orderCode || "N/A"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Status</Label>
                <Badge
                  variant={
                    order.status === "P"
                      ? "default"
                      : order.status === "D"
                      ? "success"
                      : "secondary"
                  }
                >
                  {statusLabels[order.status] || "Unknown"}
                </Badge>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Payment Status
                </Label>
                <Badge
                  variant={
                    order.paymentStatus === "U" ? "destructive" : "success"
                  }
                >
                  {paymentStatusLabels[order.paymentStatus] || "Unknown"}
                </Badge>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Payment Mode
                </Label>
                <p className="font-medium">
                  {order.paymentMode
                    ? paymentModeLabels[order.paymentMode]
                    : "N/A"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Total Amount
                </Label>
                <p className="font-medium">
                  {order.totalAmount != null
                    ? `Rs.${order.totalAmount.toFixed(2)}`
                    : "N/A"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Item Count
                </Label>
                <p className="font-medium">{order.itemCount ?? "N/A"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Created At
                </Label>
                <p className="font-medium">
                  {order.createdAt
                    ? format(new Date(order.createdAt), "PPP, p")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Buyer Address</h3>
            {order.buyerAddress ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Name</Label>
                  <p className="font-medium">
                    {order.buyerAddress.name || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Phone</Label>
                  <p className="font-medium">
                    {order.buyerAddress.phone || "N/A"}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-sm text-muted-foreground">
                    Address Line 1
                  </Label>
                  <p className="font-medium">
                    {order.buyerAddress.addressLine1 || "N/A"}
                  </p>
                </div>
                {order.buyerAddress.addressLine2 && (
                  <div className="sm:col-span-2">
                    <Label className="text-sm text-muted-foreground">
                      Address Line 2
                    </Label>
                    <p className="font-medium">
                      {order.buyerAddress.addressLine2}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-sm text-muted-foreground">City</Label>
                  <p className="font-medium">
                    {order.buyerAddress.city || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">State</Label>
                  <p className="font-medium">
                    {order.buyerAddress.state || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Postal Code
                  </Label>
                  <p className="font-medium">
                    {order.buyerAddress.postalCode || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Country
                  </Label>
                  <p className="font-medium">
                    {order.buyerAddress.country || "N/A"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No address provided
              </p>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Products</h3>
            {order.products && order.products.length > 0 ? (
              <div className="space-y-3">
                {order.products.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">
                        {item.product?.name || "Unknown Product"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Category: {item.product?.category?.name || "N/A"}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {item.product?.price != null
                        ? `Rs.${item.product.price.toFixed(2)}`
                        : "N/A"}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No products available
              </p>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Created By</h3>
            {order.createdByDetails ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Name</Label>
                  <p className="font-medium">
                    {order.createdByDetails.name || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="font-medium">
                    {order.createdByDetails.email || "N/A"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No creator details provided
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 sticky bottom-0 bg-background z-10">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
