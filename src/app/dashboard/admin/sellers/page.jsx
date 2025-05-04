"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Calendar,
  Check,
  Download,
  Eye,
  Filter,
  Mail,
  MoreHorizontal,
  Package,
  Search,
  ShoppingBag,
  Star,
  Store,
  Trash2,
  UserCheck,
  X,
} from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Add this CSS utility class
const noScrollbarStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Sample seller data
const sellers = [
  {
    id: "SLR-1001",
    name: "TechGadgets",
    owner: "Emma Wilson",
    email: "contact@techgadgets.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    verified: true,
    featured: true,
    joinDate: "2022-01-10",
    products: 45,
    orders: 234,
    rating: 4.8,
    revenue: 45231.89,
    commission: 4523.19,
    category: "Electronics",
  },
  {
    id: "SLR-1002",
    name: "FashionHub",
    owner: "James Rodriguez",
    email: "info@fashionhub.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    verified: true,
    featured: false,
    joinDate: "2022-03-15",
    products: 128,
    orders: 187,
    rating: 4.5,
    revenue: 32456.78,
    commission: 3245.68,
    category: "Fashion",
  },
  {
    id: "SLR-1003",
    name: "HomeDecor",
    owner: "Sophia Chen",
    email: "support@homedecor.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    verified: true,
    featured: false,
    joinDate: "2022-05-20",
    products: 87,
    orders: 156,
    rating: 4.7,
    revenue: 28765.43,
    commission: 2876.54,
    category: "Home & Garden",
  },
  {
    id: "SLR-1004",
    name: "SportsGear",
    owner: "Michael Brown",
    email: "info@sportsgear.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Pending",
    verified: false,
    featured: false,
    joinDate: "2022-07-05",
    products: 0,
    orders: 0,
    rating: 0,
    revenue: 0,
    commission: 0,
    category: "Sports",
  },
  {
    id: "SLR-1005",
    name: "BeautyEssentials",
    owner: "Olivia Johnson",
    email: "contact@beautyessentials.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    verified: true,
    featured: true,
    joinDate: "2021-11-30",
    products: 92,
    orders: 312,
    rating: 4.9,
    revenue: 52345.67,
    commission: 5234.57,
    category: "Beauty",
  },
  {
    id: "SLR-1006",
    name: "BookWorm",
    owner: "William Davis",
    email: "sales@bookworm.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Suspended",
    verified: true,
    featured: false,
    joinDate: "2022-09-10",
    products: 215,
    orders: 98,
    rating: 3.8,
    revenue: 12456.78,
    commission: 1245.68,
    category: "Books",
  },
  {
    id: "SLR-1007",
    name: "KidsCorner",
    owner: "Ava Martinez",
    email: "support@kidscorner.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    verified: true,
    featured: false,
    joinDate: "2022-02-18",
    products: 76,
    orders: 145,
    rating: 4.6,
    revenue: 23456.78,
    commission: 2345.68,
    category: "Kids",
  },
];

export default function AdminSellersPage() {
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredSellers = () => {
    let filtered = sellers.filter(
      (seller) =>
        seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab === "active") {
      filtered = filtered.filter((seller) => seller.status === "Active");
    } else if (activeTab === "pending") {
      filtered = filtered.filter((seller) => seller.status === "Pending");
    } else if (activeTab === "suspended") {
      filtered = filtered.filter((seller) => seller.status === "Suspended");
    } else if (activeTab === "featured") {
      filtered = filtered.filter((seller) => seller.featured);
    }

    return filtered;
  };

  const filteredSellers = getFilteredSellers();

  const handleSelectAll = () => {
    if (selectedSellers.length === filteredSellers.length) {
      setSelectedSellers([]);
    } else {
      setSelectedSellers(filteredSellers.map((s) => s.id));
    }
  };

  const handleSelectSeller = (sellerId) => {
    if (selectedSellers.includes(sellerId)) {
      setSelectedSellers(selectedSellers.filter((id) => id !== sellerId));
    } else {
      setSelectedSellers([...selectedSellers, sellerId]);
    }
  };

  const isSelected = (sellerId) => selectedSellers.includes(sellerId);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Suspended":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4">
      <style>{noScrollbarStyle}</style>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Seller Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor seller accounts across the platform.
            </p>
          </div>
          <Button className="sm:w-auto">
            <Store className="h-4 w-4 mr-2" /> Add Seller
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Seller Statistics</CardTitle>
              <CardDescription>Overview of seller accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Sellers</span>
                  <span className="font-medium">{sellers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Sellers</span>
                  <span className="font-medium">
                    {sellers.filter((s) => s.status === "Active").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Pending Approval
                  </span>
                  <span className="font-medium">
                    {sellers.filter((s) => s.status === "Pending").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Suspended Sellers
                  </span>
                  <span className="font-medium">
                    {sellers.filter((s) => s.status === "Suspended").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Featured Sellers
                  </span>
                  <span className="font-medium">
                    {sellers.filter((s) => s.featured).length}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-medium">
                    $
                    {sellers
                      .reduce((sum, seller) => sum + seller.revenue, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Total Commission
                  </span>
                  <span className="font-medium">
                    $
                    {sellers
                      .reduce((sum, seller) => sum + seller.commission, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Top Categories</h3>
                <div className="space-y-4">
                  {[
                    "Electronics",
                    "Fashion",
                    "Beauty",
                    "Home & Garden",
                    "Books",
                  ].map((category, index) => {
                    const count = sellers.filter(
                      (s) => s.category === category
                    ).length;
                    const percentage = (count / sellers.length) * 100;
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {category}
                          </span>
                          <span className="font-medium">
                            {Math.round(percentage)}%
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle>Seller Management</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Calendar className="h-4 w-4 mr-2" /> Filter by Date
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="overflow-x-auto flex w-full pb-1 mb-1 no-scrollbar">
                    <TabsTrigger value="all" className="flex-shrink-0">
                      All Sellers
                    </TabsTrigger>
                    <TabsTrigger value="active" className="flex-shrink-0">
                      Active
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex-shrink-0">
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="suspended" className="flex-shrink-0">
                      Suspended
                    </TabsTrigger>
                    <TabsTrigger value="featured" className="flex-shrink-0">
                      Featured
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search sellers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select defaultValue="revenue">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Highest Revenue</SelectItem>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                      <SelectItem value="products">Most Products</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={
                            selectedSellers.length === filteredSellers.length &&
                            filteredSellers.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">Logo</TableHead>
                      <TableHead className="whitespace-nowrap">
                        <div className="flex items-center">
                          Seller
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        Status
                      </TableHead>
                      <TableHead className="whitespace-nowrap hidden sm:table-cell">
                        Products
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        Rating
                      </TableHead>
                      <TableHead className="whitespace-nowrap hidden md:table-cell">
                        Revenue
                      </TableHead>
                      <TableHead className="text-right whitespace-nowrap">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSellers.map((seller) => (
                      <motion.tr
                        key={seller.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="group"
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected(seller.id)}
                            onCheckedChange={() =>
                              handleSelectSeller(seller.id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage
                              src={seller.avatar || "/placeholder.svg"}
                              alt={seller.name}
                            />
                            <AvatarFallback>
                              {getInitials(seller.name)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium truncate max-w-[150px] sm:max-w-none">
                            {seller.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-none">
                            {seller.owner}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge
                              variant="outline"
                              className={getStatusColor(seller.status)}
                            >
                              {seller.status}
                            </Badge>
                            {seller.featured && (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {seller.products}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {seller.rating > 0 ? (
                              <>
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <span>{seller.rating.toFixed(1)}</span>
                              </>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          ${seller.revenue.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
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
                                <Eye className="h-4 w-4 mr-2" /> View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="h-4 w-4 mr-2" /> View
                                Products
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ShoppingBag className="h-4 w-4 mr-2" /> View
                                Orders
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" /> Contact Seller
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {seller.status === "Pending" && (
                                <DropdownMenuItem>
                                  <UserCheck className="h-4 w-4 mr-2" /> Approve
                                  Seller
                                </DropdownMenuItem>
                              )}
                              {seller.status === "Active" ? (
                                <DropdownMenuItem>
                                  <X className="h-4 w-4 mr-2" /> Suspend Seller
                                </DropdownMenuItem>
                              ) : seller.status === "Suspended" ? (
                                <DropdownMenuItem>
                                  <Check className="h-4 w-4 mr-2" /> Reactivate
                                  Seller
                                </DropdownMenuItem>
                              ) : null}
                              {seller.featured ? (
                                <DropdownMenuItem>
                                  <Star className="h-4 w-4 mr-2" /> Remove
                                  Featured
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Star className="h-4 w-4 mr-2" /> Make
                                  Featured
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                                Seller
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                    {filteredSellers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No sellers found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredSellers.length}</strong> of{" "}
                  <strong>{sellers.length}</strong> sellers
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Sellers</CardTitle>
            <CardDescription>
              Sellers with the highest revenue and ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sellers
                .filter((s) => s.status === "Active")
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5)
                .map((seller, index) => (
                  <motion.div
                    key={seller.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-md"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={seller.avatar || "/placeholder.svg"}
                        alt={seller.name}
                      />
                      <AvatarFallback>
                        {getInitials(seller.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium leading-none">
                          {seller.name}
                        </p>
                        {seller.featured && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {seller.products} products • $
                        {seller.revenue.toFixed(2)} revenue
                      </p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-yellow-700">
                          {seller.rating.toFixed(1)}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                      >
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
