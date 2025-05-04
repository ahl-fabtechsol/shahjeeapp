"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  Eye,
  Flag,
  MoreHorizontal,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

import { CustomTable } from "@/components/customTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const flaggedContent = [
  {
    id: "FLAG-1001",
    type: "Product",
    title: "Wireless Headphones",
    description:
      "Potentially misleading product description claiming medical benefits",
    seller: {
      name: "TechGadgets",
      id: "SLR-1001",
    },
    reporter: {
      name: "System",
      id: "SYS-001",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-15",
    status: "Pending",
    severity: "Medium",
    url: "/products/wireless-headphones",
  },
  {
    id: "FLAG-1002",
    type: "Review",
    title: "Negative Review for Fashion Item",
    description: "Review contains inappropriate language and personal attacks",
    seller: {
      name: "FashionHub",
      id: "SLR-1002",
    },
    reporter: {
      name: "Emma Wilson",
      id: "USR-1001",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-14",
    status: "Pending",
    severity: "High",
    url: "/products/fashion-item/reviews",
  },
  {
    id: "FLAG-1003",
    type: "Seller",
    title: "Potential Counterfeit Products",
    description: "Multiple reports of counterfeit items being sold",
    seller: {
      name: "LuxuryItems",
      id: "SLR-1008",
    },
    reporter: {
      name: "James Rodriguez",
      id: "USR-1002",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-13",
    status: "Under Review",
    severity: "Critical",
    url: "/sellers/luxury-items",
  },
  {
    id: "FLAG-1004",
    type: "Product",
    title: "Prohibited Item",
    description:
      "Product appears to violate platform policies on restricted items",
    seller: {
      name: "HomeDecor",
      id: "SLR-1003",
    },
    reporter: {
      name: "System",
      id: "SYS-001",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-12",
    status: "Pending",
    severity: "High",
    url: "/products/prohibited-item",
  },
  {
    id: "FLAG-1005",
    type: "User",
    title: "Suspicious Account Activity",
    description: "Multiple reports of spam messages and suspicious behavior",
    seller: {
      name: "N/A",
      id: "N/A",
    },
    reporter: {
      name: "System",
      id: "SYS-001",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-11",
    status: "Under Review",
    severity: "Medium",
    url: "/users/suspicious-user",
  },
  {
    id: "FLAG-1006",
    type: "Product Image",
    title: "Inappropriate Product Image",
    description: "Product image contains potentially offensive content",
    seller: {
      name: "BeautyEssentials",
      id: "SLR-1005",
    },
    reporter: {
      name: "Olivia Johnson",
      id: "USR-1005",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-10",
    status: "Resolved",
    severity: "Medium",
    url: "/products/beauty-product",
  },
  {
    id: "FLAG-1007",
    type: "Review",
    title: "Fake Review",
    description:
      "Suspected fake review with identical text posted across multiple products",
    seller: {
      name: "BookWorm",
      id: "SLR-1006",
    },
    reporter: {
      name: "System",
      id: "SYS-001",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-09",
    status: "Resolved",
    severity: "Low",
    url: "/products/book/reviews",
  },
  {
    id: "FLAG-1008",
    type: "Product",
    title: "Copyright Infringement",
    description: "Product appears to infringe on registered trademark",
    seller: {
      name: "KidsCorner",
      id: "SLR-1007",
    },
    reporter: {
      name: "William Davis",
      id: "USR-1006",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-04-08",
    status: "Under Review",
    severity: "High",
    url: "/products/kids-toy",
  },
];

export default function AdminModerationPage() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredContent = () => {
    let filtered = flaggedContent.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab === "pending") {
      filtered = filtered.filter((item) => item.status === "Pending");
    } else if (activeTab === "under-review") {
      filtered = filtered.filter((item) => item.status === "Under Review");
    } else if (activeTab === "resolved") {
      filtered = filtered.filter((item) => item.status === "Resolved");
    } else if (activeTab === "critical") {
      filtered = filtered.filter((item) => item.severity === "Critical");
    }

    return filtered;
  };

  const filteredContent = getFilteredContent();

  const handleSelectAll = () => {
    if (selectedItems.length === filteredContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredContent.map((item) => item.id));
    }
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const isSelected = (itemId) => selectedItems.includes(itemId);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Under Review":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Resolved":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Low":
        return "bg-green-50 text-green-700 border-green-200";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "High":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Critical":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Product":
        return <ShieldAlert className="h-5 w-5 text-orange-500" />;
      case "Review":
        return <Flag className="h-5 w-5 text-yellow-500" />;
      case "Seller":
        return <ShieldAlert className="h-5 w-5 text-red-500" />;
      case "User":
        return <ShieldAlert className="h-5 w-5 text-purple-500" />;
      case "Product Image":
        return <Flag className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const tableColumns = [
    {
      id: "select",
      accessorKey: "id",
      header: () => (
        <Checkbox
          checked={
            selectedItems.length === filteredContent.length &&
            filteredContent.length > 0
          }
          onCheckedChange={handleSelectAll}
        />
      ),
      cell: (info) => (
        <Checkbox
          checked={isSelected(info.row.original.id)}
          onCheckedChange={() => handleSelectItem(info.row.original.id)}
        />
      ),
    },
    {
      id: "type",
      accessorKey: "type",
      header: "Type",
      cell: (info) => getTypeIcon(info.row.original.type),
    },
    {
      id: "title",
      accessorKey: "title",
      header: "Content",
      cell: (info) => (
        <>
          <div className="font-medium">{info.row.original.title}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[250px]">
            {info.row.original.description}
          </div>
        </>
      ),
    },
    {
      id: "reporter",
      accessorKey: "reporter.name",
      header: "Reporter",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={info.row.original.reporter.avatar || "/placeholder.svg"}
              alt={info.row.original.reporter.name}
            />
            <AvatarFallback>
              {info.row.original.reporter.name === "System"
                ? "SYS"
                : info.row.original.reporter.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span>{info.row.original.reporter.name}</span>
        </div>
      ),
    },
    {
      id: "seller",
      accessorKey: "seller.name",
      header: "Seller",
      cell: (info) => info.row.original.seller.name,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge
          variant="outline"
          className={getStatusColor(info.row.original.status)}
        >
          {info.row.original.status}
        </Badge>
      ),
    },
    {
      id: "severity",
      accessorKey: "severity",
      header: "Severity",
      cell: (info) => (
        <Badge
          variant="outline"
          className={getSeverityColor(info.row.original.severity)}
        >
          {info.row.original.severity}
        </Badge>
      ),
    },
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => (
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
              <Eye className="h-4 w-4 mr-2" /> View Content
            </DropdownMenuItem>
            {info.row.original.status === "Pending" && (
              <DropdownMenuItem>
                <Shield className="h-4 w-4 mr-2" /> Start Review
              </DropdownMenuItem>
            )}
            {(info.row.original.status === "Pending" ||
              info.row.original.status === "Under Review") && (
              <>
                <DropdownMenuItem>
                  <Check className="h-4 w-4 mr-2" /> Approve Content
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <X className="h-4 w-4 mr-2" /> Remove Content
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ShieldCheck className="h-4 w-4 mr-2" /> Mark as Resolved
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" /> Delete Flag
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Content Moderation
            </h1>
            <p className="text-muted-foreground">
              Review and moderate flagged content across the platform.
            </p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 2xl:grid-cols-4">
          <Card className="2xl:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Moderation Overview</CardTitle>
              <CardDescription>Summary of flagged content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Flagged</span>
                  <span className="font-medium">{flaggedContent.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium">
                    {
                      flaggedContent.filter((i) => i.status === "Pending")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Under Review</span>
                  <span className="font-medium">
                    {
                      flaggedContent.filter((i) => i.status === "Under Review")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolved</span>
                  <span className="font-medium">
                    {
                      flaggedContent.filter((i) => i.status === "Resolved")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground">
                    Critical Severity
                  </span>
                  <span className="font-medium text-red-500">
                    {
                      flaggedContent.filter((i) => i.severity === "Critical")
                        .length
                    }
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Content Types</h3>
                <div className="space-y-4">
                  {["Product", "Review", "Seller", "User", "Product Image"].map(
                    (type) => {
                      const count = flaggedContent.filter(
                        (i) => i.type === type
                      ).length;
                      const percentage = (count / flaggedContent.length) * 100;
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {type}
                            </span>
                            <span className="font-medium">
                              {Math.round(percentage)}%
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="2xl:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center gap-2">
                <CardTitle>Flagged Content</CardTitle>
                <Select className="">
                  <SelectTrigger className="">
                    <SelectValue placeholder="Filter content..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content</SelectItem>
                    <SelectItem value="active">Pending</SelectItem>
                    <SelectItem value="inactive">Under Review</SelectItem>
                    <SelectItem value="suspended">Resolved</SelectItem>
                    <SelectItem value="unverified">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search flagged content..."
                    className="pl-8"
                  />
                </div>
              </div>

              <CustomTable
                columns={tableColumns}
                data={flaggedContent}
                loading={false}
                pagination={true}
                editable={false}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Critical Items</CardTitle>
            <CardDescription>
              Flagged content requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flaggedContent
                .filter((i) => i.severity === "Critical")
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 border rounded-md flex-wrap gap-4"
                  >
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center">
                        <p className="font-medium">{item.title}</p>
                        <Badge
                          variant="outline"
                          className={getStatusColor(item.status) + " ml-2"}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.type} • {item.seller.name} • Reported on{" "}
                        {item.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                      <Button size="sm">
                        <Shield className="h-4 w-4 mr-2" /> Review
                      </Button>
                    </div>
                  </motion.div>
                ))}
              {flaggedContent.filter((i) => i.severity === "Critical")
                .length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ShieldCheck className="h-8 w-8 mx-auto mb-2" />
                  <p>No critical items at the moment</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
