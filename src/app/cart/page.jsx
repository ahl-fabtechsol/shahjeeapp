"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  CreditCard,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { OrderPlacedModal } from "./(components)/orderPlacedModal";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const incrementQuantity = useCartStore((state) => state.increaseQuantity);
  const decrementQuantity = useCartStore((state) => state.decreaseQuantity);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 79.99,
      quantity: 1,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 199.99,
      quantity: 1,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Leather Laptop Sleeve",
      price: 49.99,
      quantity: 2,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const subtotal = cart?.reduce(
    (total, item) => total + item?.product?.price * item.quantity,
    0
  );
  const total = subtotal;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "discount20") {
      setDiscount(subtotal * 0.2);
      setCouponSuccess("20% discount applied successfully!");
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponError("Invalid coupon code");
      setCouponSuccess("");
    }
  };

  const handleCheckout = () => {
    setShowOrderModal(true);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-center p-4">Quantity</th>
                      <th className="text-right p-4">Price</th>
                      <th className="text-right p-4">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <AnimatePresence>
                      {cart?.map((item, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                          transition={{ duration: 0.3 }}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-4">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative h-16 w-16 overflow-hidden rounded-md"
                              >
                                <Image
                                  src={
                                    item?.product?.images[0] ||
                                    "/placeholder.svg"
                                  }
                                  alt={item?.product?.name}
                                  fill
                                  className="object-cover"
                                />
                              </motion.div>
                              <div>
                                <Link
                                  href={`/products/${item?.product?._id}`}
                                  className="font-medium hover:underline"
                                >
                                  {item?.product?.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() =>
                                    decrementQuantity(
                                      item?.product?._id,
                                      item?.seller
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">
                                  {item?.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() =>
                                    incrementQuantity(
                                      item?.product?._id,
                                      item?.seller
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            Rs.{item?.product?.price?.toFixed(2)}
                          </td>
                          <td className="p-4 text-right font-medium">
                            Rs.
                            {(item?.product?.price * item.quantity).toFixed(2)}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/products"
                className="flex items-center text-primary hover:underline"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border rounded-lg p-6 space-y-6 shadow-sm sticky top-4"
            >
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs.{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>Rs.{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground text-center pt-2">
                  <CreditCard className="h-4 w-4" />
                  Secure checkout powered by Stripe
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4"
          >
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </motion.div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </motion.div>
      )}

      <OrderPlacedModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        orderDetails={{
          items: cart,
          total: total,
        }}
      />
    </div>
  );
}
