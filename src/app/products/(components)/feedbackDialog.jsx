"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star as StarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeedback } from "@/services/feedbackService";
import { toast } from "sonner";

export default function FeedbackDialog({ isOpen, onClose, seller, product }) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (payload) => createFeedback(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["product", product]);
      toast.success("Feedback submitted successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to submit feedback."
      );
    },
  });

  function handleStarClick(value) {
    setRating(value);
  }

  function handleSubmit() {
    if (rating === 0 || message.trim() === "") {
      toast.error("Please provide a rating and feedback message.");
      return;
    }

    const payload = {
      rating,
      message,
      seller,
      product,
    };

    mutation.mutate(payload);

    setRating(0);
    setMessage("");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
          <DialogContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto"
            >
              <DialogHeader>
                <DialogTitle>Feedback</DialogTitle>
                <DialogDescription>
                  We'd love to hear your thoughts!
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center justify-center my-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <motion.button
                    key={value}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleStarClick(value)}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(0)}
                    className={`p-1 focus:outline-none transition-colors ${
                      (hover || rating) >= value
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <StarIcon size={32} />
                  </motion.button>
                ))}
              </div>

              <Textarea
                placeholder="Leave your feedback here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none h-32"
              />

              <DialogFooter className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={mutation.isLoading || mutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    rating === 0 ||
                    message.trim() === "" ||
                    mutation.isLoading ||
                    mutation.isPending
                  }
                >
                  {mutation.isLoading || mutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving…
                    </span>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
