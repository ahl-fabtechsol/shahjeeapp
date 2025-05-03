"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageSquare, Search, Star, X } from "lucide-react";

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

// Sample feedback data
const feedbackData = [
  {
    id: 1,
    customer: {
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      name: "Wireless Headphones",
      id: "PRD-1234",
      image: "/placeholder.svg?height=80&width=80",
    },
    rating: 5,
    comment:
      "Excellent sound quality and comfortable to wear for long periods. The battery life is impressive, lasting me through an entire workday. The noise cancellation feature works better than expected.",
    date: "2023-04-15",
    status: "published",
    replied: true,
  },
  {
    id: 2,
    customer: {
      name: "James Rodriguez",
      email: "james.r@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      name: "Smart Watch",
      id: "PRD-5678",
      image: "/placeholder.svg?height=80&width=80",
    },
    rating: 4,
    comment:
      "Great features but battery life could be better. The fitness tracking is accurate and the sleep monitoring has helped me improve my sleep habits. Would recommend to others looking for a mid-range smart watch.",
    date: "2023-04-12",
    status: "published",
    replied: false,
  },
  {
    id: 3,
    customer: {
      name: "Sophia Chen",
      email: "sophia.c@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      name: "Bluetooth Speaker",
      id: "PRD-9012",
      image: "/placeholder.svg?height=80&width=80",
    },
    rating: 5,
    comment:
      "Amazing sound for such a compact speaker! The battery lasts all day and it's so easy to connect to my devices. I've taken it to the beach and it's survived sand and a few splashes of water.",
    date: "2023-04-10",
    status: "published",
    replied: false,
  },
  {
    id: 4,
    customer: {
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      name: "Fitness Tracker",
      id: "PRD-3456",
      image: "/placeholder.svg?height=80&width=80",
    },
    rating: 3,
    comment:
      "Does the job but the app is a bit clunky. Step counting seems accurate but heart rate monitoring is inconsistent. The sleep tracking feature is useful though.",
    date: "2023-04-08",
    status: "pending",
    replied: false,
  },
  {
    id: 5,
    customer: {
      name: "Olivia Johnson",
      email: "olivia.j@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: {
      name: "Wireless Earbuds",
      id: "PRD-7890",
      image: "/placeholder.svg?height=80&width=80",
    },
    rating: 2,
    comment:
      "Disappointed with the fit and they keep falling out of my ears. Sound quality is decent but not worth the hassle. The charging case is nice and compact though.",
    date: "2023-04-05",
    status: "published",
    replied: true,
  },
];

export default function SellerFeedbacksPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleSelectFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setReplyText("");
  };

  const handleReply = () => {
    // In a real app, you would send this to your API
    console.log(`Replying to feedback #${selectedFeedback.id}: ${replyText}`);
    setReplyText("");
    // Update the UI to show the feedback has been replied to
    setSelectedFeedback({ ...selectedFeedback, replied: true });
  };

  const filteredFeedback =
    activeTab === "all"
      ? feedbackData
      : activeTab === "pending"
      ? feedbackData.filter((f) => f.status === "pending")
      : activeTab === "published"
      ? feedbackData.filter((f) => f.status === "published")
      : activeTab === "unreplied"
      ? feedbackData.filter((f) => !f.replied)
      : feedbackData;

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
          <div className="flex items-center justify-between mb-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="unreplied">Unreplied</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search feedbacks..."
              className="flex-1"
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="highest">Highest rated</SelectItem>
                <SelectItem value="lowest">Lowest rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 overflow-auto max-h-[calc(100vh-300px)]">
            {filteredFeedback.map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleSelectFeedback(feedback)}
                className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                  selectedFeedback?.id === feedback.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/20"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <img
                      src={feedback.customer.avatar || "/placeholder.svg"}
                      alt={feedback.customer.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium">
                        {feedback.customer.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {feedback.date}
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
                    src={feedback.product.image || "/placeholder.svg"}
                    alt={feedback.product.name}
                    className="h-10 w-10 rounded object-cover mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium">
                      {feedback.product.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {feedback.product.id}
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-sm line-clamp-2">{feedback.comment}</p>

                <div className="mt-2 flex items-center justify-between">
                  <Badge
                    variant={
                      feedback.status === "pending" ? "outline" : "secondary"
                    }
                  >
                    {feedback.status}
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
                          selectedFeedback.customer.avatar || "/placeholder.svg"
                        }
                        alt={selectedFeedback.customer.name}
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <CardTitle>{selectedFeedback.customer.name}</CardTitle>
                        <CardDescription>
                          {selectedFeedback.customer.email}
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
                      src={selectedFeedback.product.image || "/placeholder.svg"}
                      alt={selectedFeedback.product.name}
                      className="h-16 w-16 rounded object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-medium">
                        {selectedFeedback.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedFeedback.product.id}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Customer Feedback
                    </h3>
                    <p className="text-sm bg-muted p-4 rounded-md">
                      {selectedFeedback.comment}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Check className="h-4 w-4 mr-2" /> Approve
                    </Button>
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" /> Reject
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" /> Feature
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Your Reply</h3>
                    {selectedFeedback.replied ? (
                      <div className="bg-muted p-4 rounded-md">
                        <p className="text-sm">
                          Thank you for your feedback! We're glad you're
                          enjoying our product and appreciate you taking the
                          time to share your experience.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Replied on {selectedFeedback.date}
                        </div>
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
                          <Button variant="outline">Cancel</Button>
                          <Button
                            onClick={handleReply}
                            disabled={!replyText.trim()}
                          >
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-xs text-muted-foreground">
                    Feedback received on {selectedFeedback.date}
                  </div>
                  <Select defaultValue={selectedFeedback.status}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
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
