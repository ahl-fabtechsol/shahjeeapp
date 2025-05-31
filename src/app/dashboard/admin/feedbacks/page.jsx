"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Star,
  Trash,
} from "lucide-react";
import { useState } from "react";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteFeedback,
  getFeedbacks,
  replyFeedback,
} from "@/services/feedbackService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AdminFeedbacksPage() {
  const queryClient = useQueryClient();
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [repliedText, setReplyText] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

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

  const deleteMutation = useMutation({
    mutationFn: (feedbackId) => deleteFeedback(feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
      setDeleteConfirmation(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error while deleting");
    },
  });

  const handleDelete = () => {
    toast.promise(deleteMutation.mutateAsync(selectedFeedback._id), {
      loading: "Deleting feedback...",
      success: "Feedback deleted successfully",
      error: (error) =>
        error?.response?.data?.message || "Error while deleting feedback",
    });
    setSelectedFeedback(null);
  };

  const handleReply = () => {
    const payload = {
      repliedText,
    };
    toast.promise(mutation.mutateAsync(payload), {
      loading: "Sending reply...",
      success: "Reply sent successfully",
      error: (error) =>
        error?.response?.data?.message || "Error while sending reply",
    });
    setReplyText("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "P":
        return "bg-green-50 text-green-700 border-green-200";
      case "R":
        return "bg-blue-50 text-blue-700 border-blue-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
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
      {deleteConfirmation && (
        <ConfirmationModal
          title="Delete Feedback"
          description="Are you sure you want to delete this feedback? This action cannot be undone."
          open={deleteConfirmation}
          onOpenChange={setDeleteConfirmation}
          onConfirm={handleDelete}
        />
      )}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Feedbacks</h1>
            <p className="text-muted-foreground">
              Manage and respond to user feedback across the platform.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {feedbackData?.results?.map((feedback, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedFeedback(feedback)}
                >
                  <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {renderStars(feedback.rating)}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setDeleteConfirmation(true)}
                            >
                              <Trash className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className={getStatusColor(feedback?.status)}
                        >
                          {feedback.status === "P" ? "Pending" : "Replied"}
                        </Badge>
                        {feedback.replied && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            Responded
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {feedback?.message}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={
                                feedback?.createdByDetails?.image ||
                                "/placeholder.svg"
                              }
                              alt={feedback?.createdByDetails?.name}
                            />
                            <AvatarFallback>
                              {feedback?.createdByDetails?.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {feedback?.createdByDetails?.name}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {new Date(feedback?.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {selectedFeedback && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(selectedFeedback?.rating)}
                  </div>
                  <CardDescription>
                    {new Date(selectedFeedback?.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className={getStatusColor(selectedFeedback.status)}
                >
                  {selectedFeedback.status === "P" ? "Pending" : "Replied"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      selectedFeedback.createdByDetails.image ||
                      "/placeholder.svg"
                    }
                    alt={selectedFeedback.createdByDetails.name}
                  />
                  <AvatarFallback>
                    {selectedFeedback.createdByDetails.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {selectedFeedback.createdByDetails.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedFeedback.createdByDetails.email}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <p>{selectedFeedback.message}</p>
              </div>

              {selectedFeedback.product && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Product:</span>
                  <span>{selectedFeedback?.product?.name}</span>
                </div>
              )}

              {selectedFeedback.sellerDetails && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Seller:</span>
                  <span>{selectedFeedback.sellerDetails?.name}</span>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Response</h3>
                <Textarea
                  placeholder="Write your response here..."
                  className="min-h-[100px]"
                  value={repliedText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={
                    deleteMutation.isLoading ||
                    deleteMutation.isPending ||
                    mutation.isLoading ||
                    mutation.isPending
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-4">
              <div className="flex gap-2">
                <Button
                  disabled={
                    deleteMutation.isLoading ||
                    deleteMutation.isPending ||
                    mutation.isLoading ||
                    mutation.isPending
                  }
                  onClick={() => setDeleteConfirmation(true)}
                  variant="outline"
                  className="text-red-600 hover:text-red-600"
                >
                  <Trash className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  disabled={
                    !repliedText ||
                    deleteMutation.isLoading ||
                    deleteMutation.isPending ||
                    mutation.isLoading ||
                    mutation.isPending
                  }
                  variant="outline"
                  onClick={() => setSelectedFeedback(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReply}
                  disabled={
                    !repliedText ||
                    deleteMutation.isLoading ||
                    deleteMutation.isPending ||
                    mutation.isLoading ||
                    mutation.isPending
                  }
                >
                  <MessageCircle className="h-4 w-4 mr-2" /> Send Response
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
