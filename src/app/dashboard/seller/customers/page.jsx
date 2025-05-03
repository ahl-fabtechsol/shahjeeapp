"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Calendar,
  Download,
  Eye,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  ShoppingBag,
  Star,
  UserPlus,
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

// Sample customer data
const customers = [
  {
    id: "CUST-1001",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    orders: 12,
    totalSpent: 1249.99,
    lastOrder: "2023-04-15",
    joinDate: "2022-01-10",
    location: "New York, USA",
    type: "Returning",
  },
  {
    id: "CUST-1002",
    name: "James Rodriguez",
    email: "james.r@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    orders: 8,
    totalSpent: 879.95,
    lastOrder: "2023-04-14",
    joinDate: "2022-03-15",
    location: "Los Angeles, USA",
    type: "Returning",
  },
  {
    id: "CUST-1003",
    name: "Sophia Chen",
    email: "sophia.c@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    orders: 5,
    totalSpent: 549.97,
    lastOrder: "2023-04-10",
    joinDate: "2022-05-20",
    location: "Chicago, USA",
    type: "Returning",
  },
  {
    id: "CUST-1004",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Inactive",
    orders: 3,
    totalSpent: 329.99,
    lastOrder: "2023-02-22",
    joinDate: "2022-07-05",
    location: "Houston, USA",
    type: "New",
  },
  {
    id: "CUST-1005",
    name: "Olivia Johnson",
    email: "olivia.j@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    orders: 15,
    totalSpent: 1599.95,
    lastOrder: "2023-04-12",
    joinDate: "2021-11-30",
    location: "Miami, USA",
    type: "VIP",
  },
  {
    id: "CUST-1006",
    name: "William Davis",
    email: "william.d@example.com",
    phone: "+1 (555) 678-9012",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Inactive",
    orders: 2,
    totalSpent: 159.98,
    lastOrder: "2023-01-15",
    joinDate: "2022-09-10",
    location: "Seattle, USA",
    type: "New",
  },
  {
    id: "CUST-1007",
    name: "Ava Martinez",
    email: "ava.m@example.com",
    phone: "+1 (555) 789-0123",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    orders: 9,
    totalSpent: 899.92,
    lastOrder: "2023-04-05",
    joinDate: "2022-02-18",
    location: "Boston, USA",
    type: "Returning",
  },
];

export default function SellerCustomersPage() {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredCustomers = () => {
    let filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab === "active") {
      filtered = filtered.filter((customer) => customer.status === "Active");
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((customer) => customer.status === "Inactive");
    } else if (activeTab === "vip") {
      filtered = filtered.filter((customer) => customer.type === "VIP");
    } else if (activeTab === "new") {
      filtered = filtered.filter((customer) => customer.type === "New");
    }

    return filtered;
  };

  const filteredCustomers = getFilteredCustomers();

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map((c) => c.id));
    }
  };

  const handleSelectCustomer = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const isSelected = (customerId) => selectedCustomers.includes(customerId);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "VIP":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Returning":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "New":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">
              Manage your customer relationships and data.
            </p>
          </div>
          <Button className="sm:w-auto">
            <UserPlus className="h-4 w-4 mr-2" /> Add Customer
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Customer Insights</CardTitle>
              <CardDescription>Overview of your customer base</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Customers</span>
                  <span className="font-medium">{customers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Active Customers
                  </span>
                  <span className="font-medium">
                    {customers.filter((c) => c.status === "Active").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Inactive Customers
                  </span>
                  <span className="font-medium">
                    {customers.filter((c) => c.status === "Inactive").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VIP Customers</span>
                  <span className="font-medium">
                    {customers.filter((c) => c.type === "VIP").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New Customers</span>
                  <span className="font-medium">
                    {customers.filter((c) => c.type === "New").length}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-medium">
                    $
                    {customers
                      .reduce((sum, customer) => sum + customer.totalSpent, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Customer Segments</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">VIP</span>
                      <span className="font-medium">
                        {Math.round(
                          (customers.filter((c) => c.type === "VIP").length /
                            customers.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (customers.filter((c) => c.type === "VIP").length /
                          customers.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Returning</span>
                      <span className="font-medium">
                        {Math.round(
                          (customers.filter((c) => c.type === "Returning")
                            .length /
                            customers.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (customers.filter((c) => c.type === "Returning")
                          .length /
                          customers.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">New</span>
                      <span className="font-medium">
                        {Math.round(
                          (customers.filter((c) => c.type === "New").length /
                            customers.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (customers.filter((c) => c.type === "New").length /
                          customers.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Customer Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" /> Filter by Date
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-4"
              >
                <TabsList>
                  <TabsTrigger value="all">All Customers</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  <TabsTrigger value="vip">VIP</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="orders">Most Orders</SelectItem>
                      <SelectItem value="spent">Highest Spent</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={
                            selectedCustomers.length ===
                              filteredCustomers.length &&
                            filteredCustomers.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">Avatar</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Customer
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="group"
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected(customer.id)}
                            onCheckedChange={() =>
                              handleSelectCustomer(customer.id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage
                              src={customer.avatar || "/placeholder.svg"}
                              alt={customer.name}
                            />
                            <AvatarFallback>
                              {getInitials(customer.name)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {customer.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(customer.status)}
                          >
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getTypeColor(customer.type)}
                          >
                            {customer.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
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
                                <Mail className="h-4 w-4 mr-2" /> Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ShoppingBag className="h-4 w-4 mr-2" /> View
                                Orders
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" /> Mark as VIP
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No customers found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredCustomers.length}</strong> of{" "}
                  <strong>{customers.length}</strong> customers
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
            <CardTitle>Recent Customer Activity</CardTitle>
            <CardDescription>
              Latest interactions with your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers
                .filter((c) => c.status === "Active")
                .slice(0, 5)
                .map((customer, index) => (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <Avatar>
                      <AvatarImage
                        src={customer.avatar || "/placeholder.svg"}
                        alt={customer.name}
                      />
                      <AvatarFallback>
                        {getInitials(customer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {customer.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Placed an order on {customer.lastOrder} (
                        {customer.orders} total orders)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4 mr-2" /> Call
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4 mr-2" /> Email
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
