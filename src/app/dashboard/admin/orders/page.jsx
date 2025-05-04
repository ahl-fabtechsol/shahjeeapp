"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpDown,
  Calendar,
  Check,
  Clock,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Package,
  Printer,
  Search,
  Truck,
} from "lucide-react";

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

const noScrollbarStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const orders = [
  {
    id: "ORD-7352",
    customer: {
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
    },
    seller: {
      name: "TechGadgets",
      id: "SLR-1001",
    },
    date: "2023-04-15",
    status: "Delivered",
    payment: "Paid",
    total: 249.99,
    items: 3,
    disputed: false,
  },
  {
    id: "ORD-7353",
    customer: {
      name: "James Rodriguez",
      email: "james.r@example.com",
    },
    seller: {
      name: "FashionHub",
      id: "SLR-1002",
    },
    date: "2023-04-14",
    status: "Processing",
    payment: "Paid",
    total: 129.99,
    items: 1,
    disputed: false,
  },
  {
    id: "ORD-7354",
    customer: {
      name: "Sophia Chen",
      email: "sophia.c@example.com",
    },
    seller: {
      name: "HomeDecor",
      id: "SLR-1003",
    },
    date: "2023-04-14",
    status: "Shipped",
    payment: "Paid",
    total: 89.99,
    items: 1,
    disputed: false,
  },
  {
    id: "ORD-7355",
    customer: {
      name: "Michael Brown",
      email: "michael.b@example.com",
    },
    seller: {
      name: "SportsGear",
      id: "SLR-1004",
    },
    date: "2023-04-13",
    status: "Pending",
    payment: "Pending",
    total: 159.98,
    items: 2,
    disputed: false,
  },
  {
    id: "ORD-7356",
    customer: {
      name: "Olivia Johnson",
      email: "olivia.j@example.com",
    },
    seller: {
      name: "BeautyEssentials",
      id: "SLR-1005",
    },
    date: "2023-04-12",
    status: "Delivered",
    payment: "Paid",
    total: 299.97,
    items: 3,
    disputed: false,
  },
  {
    id: "ORD-7357",
    customer: {
      name: "William Davis",
      email: "william.d@example.com",
    },
    seller: {
      name: "BookWorm",
      id: "SLR-1006",
    },
    date: "2023-04-11",
    status: "Cancelled",
    payment: "Refunded",
    total: 79.99,
    items: 1,
    disputed: true,
  },
  {
    id: "ORD-7358",
    customer: {
      name: "Ava Martinez",
      email: "ava.m@example.com",
    },
    seller: {
      name: "KidsCorner",
      id: "SLR-1007",
    },
    date: "2023-04-10",
    status: "Delivered",
    payment: "Paid",
    total: 149.99,
    items: 2,
    disputed: false,
  },
  {
    id: "ORD-7359",
    customer: {
      name: "Ethan Wilson",
      email: "ethan.w@example.com",
    },
    seller: {
      name: "TechGadgets",
      id: "SLR-1001",
    },
    date: "2023-04-09",
    status: "Delivered",
    payment: "Paid",
    total: 199.99,
    items: 1,
    disputed: true,
  },
];

export default function AdminOrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredOrders = () => {
    let filtered = orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab !== "all") {
      if (activeTab === "disputed") {
        filtered = filtered.filter((order) => order.disputed);
      } else {
        filtered = filtered.filter(
          (order) => order.status.toLowerCase() === activeTab.toLowerCase()
        );
      }
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const isSelected = (orderId) => selectedOrders.includes(orderId);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "pending":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment.toLowerCase()) {
      case "paid":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "refunded":
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
              Order Management
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage orders across all sellers.
            </p>
          </div>
          <Button className="sm:w-auto">
            <Download className="h-4 w-4 mr-2" /> Export Orders
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Quick overview of all orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-medium">{orders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium">
                    {orders.filter((o) => o.status === "Pending").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing</span>
                  <span className="font-medium">
                    {orders.filter((o) => o.status === "Processing").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipped</span>
                  <span className="font-medium">
                    {orders.filter((o) => o.status === "Shipped").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivered</span>
                  <span className="font-medium">
                    {orders.filter((o) => o.status === "Delivered").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cancelled</span>
                  <span className="font-medium">
                    {orders.filter((o) => o.status === "Cancelled").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Disputed</span>
                  <span className="font-medium">
                    {orders.filter((o) => o.disputed).length}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-medium">
                    $
                    {orders
                      .reduce((sum, order) => sum + order.total, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Order Status</h3>
                <div className="space-y-4">
                  {[
                    "Delivered",
                    "Shipped",
                    "Processing",
                    "Pending",
                    "Cancelled",
                  ].map((status) => {
                    const count = orders.filter(
                      (o) => o.status === status
                    ).length;
                    const percentage = (count / orders.length) * 100;
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {status}
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
                <CardTitle>Order Management</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Calendar className="h-4 w-4 mr-2" /> Filter by Date
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Clock className="h-4 w-4 mr-2" /> Recent Orders
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="overflow-x-auto flex w-full pb-1 mb-1 no-scrollbar">
                    <TabsTrigger value="all" className="flex-shrink-0">
                      All Orders
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex-shrink-0">
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="processing" className="flex-shrink-0">
                      Processing
                    </TabsTrigger>
                    <TabsTrigger value="shipped" className="flex-shrink-0">
                      Shipped
                    </TabsTrigger>
                    <TabsTrigger value="delivered" className="flex-shrink-0">
                      Delivered
                    </TabsTrigger>
                    <TabsTrigger value="cancelled" className="flex-shrink-0">
                      Cancelled
                    </TabsTrigger>
                    <TabsTrigger value="disputed" className="flex-shrink-0">
                      Disputed
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest first</SelectItem>
                      <SelectItem value="oldest">Oldest first</SelectItem>
                      <SelectItem value="highest">Highest value</SelectItem>
                      <SelectItem value="lowest">Lowest value</SelectItem>
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
                            selectedOrders.length === filteredOrders.length &&
                            filteredOrders.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        <div className="flex items-center">
                          Order ID
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        Customer
                      </TableHead>
                      <TableHead className="whitespace-nowrap hidden md:table-cell">
                        Seller
                      </TableHead>
                      <TableHead className="whitespace-nowrap hidden sm:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        Status
                      </TableHead>
                      <TableHead className="whitespace-nowrap hidden sm:table-cell">
                        Payment
                      </TableHead>
                      <TableHead className="whitespace-nowrap">Total</TableHead>
                      <TableHead className="text-right whitespace-nowrap">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="group"
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected(order.id)}
                            onCheckedChange={() => handleSelectOrder(order.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">
                          <div className="flex items-center">
                            {order.id}
                            {order.disputed && (
                              <AlertCircle
                                className="h-4 w-4 text-red-500 ml-2"
                                title="Disputed Order"
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div>{order.customer.name}</div>
                          <div className="text-xs text-muted-foreground hidden sm:block">
                            {order.customer.email}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap hidden md:table-cell">
                          {order.seller.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap hidden sm:table-cell">
                          {order.date}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge
                            variant="outline"
                            className={getStatusColor(order.status)}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap hidden sm:table-cell">
                          <Badge
                            variant="outline"
                            className={getPaymentColor(order.payment)}
                          >
                            {order.payment}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div>${order.total.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground hidden sm:block">
                            {order.items} items
                          </div>
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
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
                                <Eye className="h-4 w-4 mr-2" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="h-4 w-4 mr-2" /> Update
                                Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Truck className="h-4 w-4 mr-2" /> Shipping Info
                              </DropdownMenuItem>
                              {order.disputed && (
                                <DropdownMenuItem>
                                  <AlertCircle className="h-4 w-4 mr-2" />{" "}
                                  Resolve Dispute
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Printer className="h-4 w-4 mr-2" /> Print
                                Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" /> Download
                                Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          No orders found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredOrders.length}</strong> of{" "}
                  <strong>{orders.length}</strong> orders
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
            <CardTitle>Disputed Orders</CardTitle>
            <CardDescription>
              Orders that require admin attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders
                .filter((o) => o.disputed)
                .map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border rounded-md"
                  >
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2">
                        <p className="font-medium truncate">{order.id}</p>
                        <Badge
                          variant="outline"
                          className={getStatusColor(order.status)}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {order.customer.name} • {order.seller.name} • $
                        {order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                      >
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                      <Button size="sm" className="flex-1 sm:flex-none">
                        <Check className="h-4 w-4 mr-2" /> Resolve
                      </Button>
                    </div>
                  </motion.div>
                ))}
              {orders.filter((o) => o.disputed).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Check className="h-8 w-8 mx-auto mb-2" />
                  <p>No disputed orders at the moment</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
