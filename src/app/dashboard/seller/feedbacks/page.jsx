"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, MessageSquare, Search, Star, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFeedbacks, replyFeedback } from "@/services/feedbackService";
import { toast } from "sonner";

export default function SellerFeedbacksPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: feedbackData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => getFeedbacks({ page: 1, limit: 100000 }),
    enabled: !!page,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: (payload) => replyFeedback(selectedFeedback._id, payload),
    onSuccess: (data) => {
      toast.success("Reply sent successfully");
      queryClient.invalidateQueries(["feedbacks"]);
      setReplyText("");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error while replying");
    },
  });

  const handleSelectFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setReplyText("");
  };

  const handleReply = () => {
    if (!replyText.trim()) {
      toast.error("Reply text cannot be empty");
      return;
    }
    const repliedText = replyText;
    const payload = {
      repliedText,
    };
    mutation.mutate(payload);
  };

  if (isLoading || isFetching) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    toast.error(error?.response?.data?.message || "Error while fetching");
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching feedbacks data</p>
        <p>{error?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Customer Feedbacks
        </h1>
        <p className="text-muted-foreground">
          Manage and respond to customer reviews and ratings for your products.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="md:w-1/2 lg:w-2/5 flex flex-col">
          <div className="space-y-3 overflow-auto max-h-[calc(100vh-200px)]">
            {feedbackData?.results?.map((feedback, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleSelectFeedback(feedback)}
                className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                  selectedFeedback?._id === feedback?._id
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/20"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <img
                      src={
                        feedback?.createdByDetails?.image || "/placeholder.svg"
                      }
                      alt={feedback?.createdByDetails?.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium">
                        {feedback?.createdByDetails?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(feedback?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < feedback.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center">
                  <img
                    src={feedback?.product?.images[0] || "/placeholder.svg"}
                    alt={feedback?.product?.name}
                    className="h-10 w-10 rounded object-cover mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium">
                      {feedback?.product?.name}
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-sm line-clamp-2">{feedback?.message}</p>

                <div className="mt-2 flex items-center justify-between">
                  <Badge
                    variant={feedback?.status === "P" ? "outline" : "secondary"}
                  >
                    {feedback.status === "P" ? "Pending" : "Replied"}
                  </Badge>
                  {feedback.replied ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      <Check className="h-3 w-3 mr-1" /> Replied
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      Awaiting reply
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 lg:w-3/5">
          {selectedFeedback ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <img
                        src={
                          selectedFeedback?.createdByDetails?.image ||
                          "/placeholder.svg"
                        }
                        alt={selectedFeedback?.createdByDetails?.name}
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <CardTitle>
                          {selectedFeedback?.createdByDetails?.name}
                        </CardTitle>
                        <CardDescription>
                          {selectedFeedback?.createdByDetails?.email}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < selectedFeedback.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <img
                      src={
                        selectedFeedback?.product?.images[0] ||
                        "/placeholder.svg"
                      }
                      alt={selectedFeedback?.product?.name}
                      className="h-16 w-16 rounded object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-medium">
                        {selectedFeedback?.product?.name}
                      </h3>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Customer Feedback
                    </h3>
                    <p className="text-sm bg-muted p-4 rounded-md">
                      {selectedFeedback?.message}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Your Reply</h3>
                    {selectedFeedback.replied ? (
                      <div className="bg-muted p-4 rounded-md">
                        <p className="text-sm">
                          {selectedFeedback?.repliedText}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Type your reply here..."
                          className="min-h-[120px]"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            disabled={mutation.isLoading || mutation.isPending}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleReply}
                            disabled={
                              !replyText.trim() ||
                              mutation.isLoading ||
                              mutation.isPending
                            }
                          >
                            {mutation?.isLoading || mutation?.isPending ? (
                              <span className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving…
                              </span>
                            ) : (
                              "Send Reply"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-xs text-muted-foreground">
                    Feedback received on{" "}
                    {new Date(selectedFeedback?.createdAt).toLocaleDateString()}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center border rounded-lg p-8">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No feedback selected
                </h3>
                <p className="text-muted-foreground">
                  Select a feedback from the list to view details and respond
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
