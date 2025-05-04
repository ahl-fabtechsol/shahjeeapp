"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Clock,
  Filter,
  Flag,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Sample feedback data
const feedbacks = [
  {
    id: "fb-1001",
    type: "Product Review",
    title: "Great quality product!",
    message:
      "I'm very impressed with the quality of this product. It exceeded my expectations in every way.",
    rating: 5,
    status: "Published",
    user: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: "Wireless Headphones X1",
    date: "2023-05-01",
    helpful: 24,
    unhelpful: 2,
    flagged: false,
    responded: true,
  },
  {
    id: "fb-1002",
    type: "Product Review",
    title: "Disappointed with durability",
    message:
      "The product looks nice but broke after just two weeks of normal use. I expected better quality for the price.",
    rating: 2,
    status: "Published",
    user: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: "Smart Watch Pro",
    date: "2023-04-28",
    helpful: 18,
    unhelpful: 3,
    flagged: false,
    responded: false,
  },
  {
    id: "fb-1003",
    type: "Seller Feedback",
    title: "Excellent customer service",
    message:
      "The seller was very responsive and helped me resolve an issue with my order quickly. Would buy from them again!",
    rating: 5,
    status: "Published",
    user: {
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seller: "TechGadgets Store",
    date: "2023-04-25",
    helpful: 12,
    unhelpful: 0,
    flagged: false,
    responded: true,
  },
  {
    id: "fb-1004",
    type: "Platform Feedback",
    title: "Website navigation issues",
    message:
      "I find it difficult to navigate the website on mobile. The menu is confusing and it takes too many clicks to find products.",
    rating: 3,
    status: "Under Review",
    user: {
      name: "Emily Wilson",
      email: "emily.w@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-22",
    helpful: 31,
    unhelpful: 5,
    flagged: false,
    responded: false,
  },
  {
    id: "fb-1005",
    type: "Product Review",
    title: "Average product, good price",
    message:
      "The product is okay for the price. Nothing special but gets the job done.",
    rating: 3,
    status: "Published",
    user: {
      name: "David Lee",
      email: "david.l@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: "Bluetooth Speaker Mini",
    date: "2023-04-20",
    helpful: 7,
    unhelpful: 2,
    flagged: false,
    responded: true,
  },
  {
    id: "fb-1006",
    type: "Product Review",
    title: "Inappropriate content",
    message: "[Content removed due to violation of community guidelines]",
    rating: 1,
    status: "Flagged",
    user: {
      name: "Anonymous User",
      email: "anonymous@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    product: "Gaming Laptop X7",
    date: "2023-04-18",
    helpful: 0,
    unhelpful: 15,
    flagged: true,
    responded: false,
  },
  {
    id: "fb-1007",
    type: "Seller Feedback",
    title: "Slow shipping",
    message:
      "The products are good but shipping took much longer than advertised. Better communication would help.",
    rating: 3,
    status: "Published",
    user: {
      name: "Jennifer Adams",
      email: "jennifer.a@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seller: "HomeGoods Plus",
    date: "2023-04-15",
    helpful: 19,
    unhelpful: 3,
    flagged: false,
    responded: true,
  },
  {
    id: "fb-1008",
    type: "Platform Feedback",
    title: "Great new feature suggestion",
    message:
      "I would love to see a feature that allows comparing multiple products side by side. This would make shopping decisions easier.",
    rating: 4,
    status: "Under Review",
    user: {
      name: "Robert Chen",
      email: "robert.c@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-12",
    helpful: 42,
    unhelpful: 1,
    flagged: false,
    responded: false,
  },
];

export default function AdminFeedbacksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const getFilteredFeedbacks = () => {
    let filtered = feedbacks.filter(
      (feedback) =>
        feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab !== "all") {
      filtered = filtered.filter((feedback) => {
        if (activeTab === "product") return feedback.type === "Product Review";
        if (activeTab === "seller") return feedback.type === "Seller Feedback";
        if (activeTab === "platform")
          return feedback.type === "Platform Feedback";
        if (activeTab === "flagged") return feedback.flagged;
        return true;
      });
    }

    return filtered;
  };

  const filteredFeedbacks = getFilteredFeedbacks();

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-50 text-green-700 border-green-200";
      case "Under Review":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Flagged":
        return "bg-red-50 text-red-700 border-red-200";
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

  return (
    <div className="p-4">
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
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search feedbacks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFeedbacks.map((feedback) => (
                <motion.div
                  key={feedback.id}
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
                          <CardTitle className="text-lg">
                            {feedback.title}
                          </CardTitle>
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
                            <DropdownMenuItem>
                              <MessageCircle className="h-4 w-4 mr-2" /> Respond
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" /> Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Flag className="h-4 w-4 mr-2" /> Flag
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Trash className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">{feedback.type}</Badge>
                        <Badge
                          variant="outline"
                          className={getStatusColor(feedback.status)}
                        >
                          {feedback.status}
                        </Badge>
                        {feedback.responded && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            Responded
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {feedback.message}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={feedback.user.avatar || "/placeholder.svg"}
                              alt={feedback.user.name}
                            />
                            <AvatarFallback>
                              {feedback.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {feedback.user.name}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{feedback.date}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {feedback.helpful}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {feedback.unhelpful}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredFeedbacks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                <p>No feedbacks found matching your criteria</p>
              </div>
            )}
          </div>
        </div>

        {selectedFeedback && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(selectedFeedback.rating)}
                  </div>
                  <CardTitle>{selectedFeedback.title}</CardTitle>
                  <CardDescription>
                    {selectedFeedback.type} • {selectedFeedback.date}
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className={getStatusColor(selectedFeedback.status)}
                >
                  {selectedFeedback.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={selectedFeedback.user.avatar || "/placeholder.svg"}
                    alt={selectedFeedback.user.name}
                  />
                  <AvatarFallback>
                    {selectedFeedback.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {selectedFeedback.user.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedFeedback.user.email}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <p>{selectedFeedback.message}</p>
              </div>

              {selectedFeedback.product && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Product:</span>
                  <span>{selectedFeedback.product}</span>
                </div>
              )}

              {selectedFeedback.seller && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Seller:</span>
                  <span>{selectedFeedback.seller}</span>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {selectedFeedback.helpful} found helpful
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {selectedFeedback.unhelpful} found unhelpful
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Response</h3>
                <Textarea
                  placeholder="Write your response here..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-4">
              <div className="flex gap-2">
                <Button variant="outline">
                  <Flag className="h-4 w-4 mr-2" /> Flag
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-600"
                >
                  <Trash className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedFeedback(null)}
                >
                  Cancel
                </Button>
                <Button>
                  <MessageCircle className="h-4 w-4 mr-2" /> Send Response
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Feedback Analytics</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-3xl font-bold">4.2</div>
                  <div className="flex items-center ml-2">{renderStars(4)}</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on 1,248 reviews
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Response Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Flagged Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Requires moderation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Responses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting reply
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
