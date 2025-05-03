"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Box,
  Calendar,
  Clock,
  Eye,
  Filter,
  MapPin,
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

// Sample shipping data
const shipments = [
  {
    id: "SHP-7352",
    orderId: "ORD-7352",
    customer: {
      name: "Emma Wilson",
      address: "123 Main St, Anytown, CA 12345",
    },
    date: "2023-04-15",
    status: "Delivered",
    carrier: "FedEx",
    trackingNumber: "FDX123456789",
    estimatedDelivery: "2023-04-15",
    items: 3,
  },
  {
    id: "SHP-7353",
    orderId: "ORD-7353",
    customer: {
      name: "James Rodriguez",
      address: "456 Oak Ave, Somewhere, NY 67890",
    },
    date: "2023-04-14",
    status: "In Transit",
    carrier: "UPS",
    trackingNumber: "UPS987654321",
    estimatedDelivery: "2023-04-16",
    items: 1,
  },
  {
    id: "SHP-7354",
    orderId: "ORD-7354",
    customer: {
      name: "Sophia Chen",
      address: "789 Pine Rd, Elsewhere, TX 54321",
    },
    date: "2023-04-14",
    status: "Out for Delivery",
    carrier: "USPS",
    trackingNumber: "USPS567891234",
    estimatedDelivery: "2023-04-15",
    items: 1,
  },
  {
    id: "SHP-7355",
    orderId: "ORD-7355",
    customer: {
      name: "Michael Brown",
      address: "321 Cedar Ln, Nowhere, FL 98765",
    },
    date: "2023-04-13",
    status: "Processing",
    carrier: "DHL",
    trackingNumber: "DHL246813579",
    estimatedDelivery: "2023-04-17",
    items: 2,
  },
  {
    id: "SHP-7356",
    orderId: "ORD-7356",
    customer: {
      name: "Olivia Johnson",
      address: "654 Maple Dr, Anywhere, WA 13579",
    },
    date: "2023-04-12",
    status: "Delivered",
    carrier: "FedEx",
    trackingNumber: "FDX987654321",
    estimatedDelivery: "2023-04-12",
    items: 3,
  },
  {
    id: "SHP-7357",
    orderId: "ORD-7358",
    customer: {
      name: "Ava Martinez",
      address: "987 Birch Blvd, Someplace, IL 24680",
    },
    date: "2023-04-10",
    status: "Delivered",
    carrier: "UPS",
    trackingNumber: "UPS123456789",
    estimatedDelivery: "2023-04-10",
    items: 2,
  },
];

// Carrier statistics
const carrierStats = [
  { name: "FedEx", count: 45, onTime: 95 },
  { name: "UPS", count: 38, onTime: 92 },
  { name: "USPS", count: 27, onTime: 88 },
  { name: "DHL", count: 15, onTime: 90 },
];

export default function SellerShippingPage() {
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredShipments = () => {
    let filtered = shipments.filter(
      (shipment) =>
        shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.customer.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        shipment.trackingNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

    if (activeTab !== "all") {
      filtered = filtered.filter(
        (shipment) =>
          shipment.status.toLowerCase().replace(" ", "-") === activeTab
      );
    }

    return filtered;
  };

  const filteredShipments = getFilteredShipments();

  const handleSelectAll = () => {
    if (selectedShipments.length === filteredShipments.length) {
      setSelectedShipments([]);
    } else {
      setSelectedShipments(filteredShipments.map((s) => s.id));
    }
  };

  const handleSelectShipment = (shipmentId) => {
    if (selectedShipments.includes(shipmentId)) {
      setSelectedShipments(selectedShipments.filter((id) => id !== shipmentId));
    } else {
      setSelectedShipments([...selectedShipments, shipmentId]);
    }
  };

  const isSelected = (shipmentId) => selectedShipments.includes(shipmentId);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "out for delivery":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "in transit":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shipping</h1>
            <p className="text-muted-foreground">
              Manage and track shipments for your orders.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" /> Print Labels
            </Button>
            <Button>
              <Truck className="h-4 w-4 mr-2" /> Create Shipment
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Shipping Overview</CardTitle>
              <CardDescription>Current shipping status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Shipments</span>
                  <span className="font-medium">{shipments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing</span>
                  <span className="font-medium">
                    {shipments.filter((s) => s.status === "Processing").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">In Transit</span>
                  <span className="font-medium">
                    {shipments.filter((s) => s.status === "In Transit").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Out for Delivery
                  </span>
                  <span className="font-medium">
                    {
                      shipments.filter((s) => s.status === "Out for Delivery")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivered</span>
                  <span className="font-medium">
                    {shipments.filter((s) => s.status === "Delivered").length}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">
                  Carrier Performance
                </h3>
                <div className="space-y-4">
                  {carrierStats.map((carrier) => (
                    <div key={carrier.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className="font-medium">{carrier.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({carrier.count} shipments)
                          </span>
                        </div>
                        <span className="text-xs">
                          {carrier.onTime}% on time
                        </span>
                      </div>
                      <Progress
                        value={carrier.onTime}
                        max={100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Shipment Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" /> Filter by Date
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" /> Recent Shipments
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
                  <TabsTrigger value="all">All Shipments</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="in-transit">In Transit</TabsTrigger>
                  <TabsTrigger value="out-for-delivery">
                    Out for Delivery
                  </TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search shipments..."
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
                      <SelectItem value="carrier">Carrier</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
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
                            selectedShipments.length ===
                              filteredShipments.length &&
                            filteredShipments.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Shipment ID
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Est. Delivery</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.map((shipment) => (
                      <motion.tr
                        key={shipment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="group"
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected(shipment.id)}
                            onCheckedChange={() =>
                              handleSelectShipment(shipment.id)
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {shipment.id}
                        </TableCell>
                        <TableCell>{shipment.orderId}</TableCell>
                        <TableCell>
                          <div>{shipment.customer.name}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {shipment.customer.address}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium">
                              {shipment.carrier}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {shipment.trackingNumber}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(shipment.status)}
                          >
                            {shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{shipment.estimatedDelivery}</TableCell>
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
                                <Eye className="h-4 w-4 mr-2" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Truck className="h-4 w-4 mr-2" /> Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MapPin className="h-4 w-4 mr-2" /> Track
                                Shipment
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Printer className="h-4 w-4 mr-2" /> Print Label
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                    {filteredShipments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No shipments found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredShipments.length}</strong> of{" "}
                  <strong>{shipments.length}</strong> shipments
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
            <CardTitle>Pending Shipments</CardTitle>
            <CardDescription>
              Orders that need to be shipped soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-start space-x-4 rounded-md border p-4"
                >
                  <Box className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Order #{`ORD-735${i + 8}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Placed on April 1{i}, 2023
                    </p>
                    <div className="flex items-center pt-2">
                      <Badge
                        variant="outline"
                        className="bg-orange-50 text-orange-700 border-orange-200"
                      >
                        Ready to Ship
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 ml-auto">
                        <Package className="h-4 w-4 mr-2" /> Process
                      </Button>
                    </div>
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
