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
import { CustomTable } from "@/components/customTable";

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

  const tableColumns = [
    {
      id: "select",
      accessorKey: "id",
      header: () => (
        <Checkbox
          checked={
            selectedOrders.length === filteredOrders.length &&
            filteredOrders.length > 0
          }
          onCheckedChange={handleSelectAll}
        />
      ),
      cell: (info) => (
        <Checkbox
          checked={isSelected(info.row.original.id)}
          onCheckedChange={() => handleSelectOrder(info.row.original.id)}
        />
      ),
    },
    {
      id: "orderId",
      accessorKey: "id",
      header: () => <div className="flex items-center">Order ID</div>,
      cell: (info) => (
        <div className="flex items-center">
          {info.getValue()}
          {info.row.original.disputed && (
            <AlertCircle
              className="h-4 w-4 text-red-500 ml-2"
              title="Disputed Order"
            />
          )}
        </div>
      ),
    },
    {
      id: "customer",
      accessorKey: "customer.name",
      header: () => <div>Customer</div>,
      cell: (info) => (
        <div className="flex flex-col">
          <div>{info.getValue()}</div>
          <div className="text-xs text-muted-foreground hidden sm:block">
            {info.row.original.customer.email}
          </div>
        </div>
      ),
    },
    {
      id: "seller",
      accessorKey: "seller.name",
      header: () => <div>Seller</div>,
      cell: (info) => <div>{info.getValue()}</div>,
    },
    {
      id: "date",
      accessorKey: "date",
      header: () => <div>Date</div>,
      cell: (info) => (
        <div className="hidden sm:flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          {info.getValue()}
        </div>
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: (info) => (
        <Badge variant="outline" className={getStatusColor(info.getValue())}>
          {info.getValue()}
        </Badge>
      ),
    },
    {
      id: "payment",
      accessorKey: "payment",
      header: () => <div>Payment</div>,
      cell: (info) => (
        <Badge variant="outline" className={getPaymentColor(info.getValue())}>
          {info.getValue()}
        </Badge>
      ),
    },
    {
      id: "total",
      accessorKey: "total",
      header: () => <div>Total</div>,
      cell: (info) => (
        <div className="flex flex-col">
          <div>${info.getValue().toFixed(2)}</div>
          <div className="text-xs text-muted-foreground hidden sm:block">
            {info.row.original.items} items
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
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
              <Eye className="h-4 w-4 mr-2" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Package className="h-4 w-4 mr-2" /> Update Status
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Truck className="h-4 w-4 mr-2" /> Shipping Info
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

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
        </div>

        <div className="grid gap-4 grid-cols-1 2xl:grid-cols-4">
          <Card className="2xl:col-span-1">
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

          <Card className="2xl:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center gap-2">
                <CardTitle>Order Management</CardTitle>
                <Select className="">
                  <SelectTrigger className="">
                    <SelectValue placeholder="Filter orders..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="active">Pending</SelectItem>
                    <SelectItem value="inactive">Processing</SelectItem>
                    <SelectItem value="suspended">Delivered</SelectItem>
                    <SelectItem value="unverified">Cancelled</SelectItem>
                    <SelectItem value="unverified">Disputed</SelectItem>
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
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <CustomTable
                columns={tableColumns}
                data={orders}
                editable={false}
                pagination={true}
                loading={false}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
