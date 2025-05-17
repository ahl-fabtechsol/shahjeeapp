"use client";

import { MoreHorizontal, Package, Search, Trash2 } from "lucide-react";
import { useState } from "react";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CustomTable } from "@/components/customTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import {
  deleteOrder,
  getAllOrders,
  refundOrder,
  updateOrder,
} from "@/services/orderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectIcon } from "@radix-ui/react-select";

export default function SellerOrdersPage() {
  const queryClient = useQueryClient();
  const {
    delayedSearch: search,
    handleSearchChange,
    searchValue,
  } = useDebouncedSearch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deletecConfimation, setDeleteConfirmation] = useState(false);
  const [refundConfirmation, setRefundConfirmation] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("P");

  const {
    data: ordersData,
    isLoading: ordersLoading,
    isFetching: ordersFetching,
    isError: ordersError,
    error: ordersErrorMessage,
  } = useQuery({
    queryKey: ["orders", page, limit, search],
    queryFn: () => getAllOrders({ page, limit, search, seller: "" }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteOrder(id),
    onSuccess: () => {
      toast.success("Order deleted successfully");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error while deleting order"
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => updateOrder(selectedOrder?._id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error while updating order"
      );
    },
  });
  const handleUpdateOrder = (value) => {
    const payload = {
      status: value,
    };
    toast.promise(updateMutation.mutateAsync(payload), {
      loading: "Changing Status",
      success: "Status Updated...",
      error: (error) =>
        error?.response?.data?.message || "Error while updating order",
    });
  };

  const refundOrderMutation = useMutation({
    mutationFn: () => refundOrder(selectedOrder?._id),
    onSuccess: () => {
      toast.success("Order refunded successfully");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error while refunding order"
      );
    },
  });

  const handleRefundOrder = () => {
    toast.promise(refundOrderMutation.mutateAsync(), {
      loading: "Refunding order...",
      success: "Order refunded successfully",
      error: (error) =>
        error?.response?.data?.message || "Error while refunding order",
    });
  };

  const handleDeleteOrder = () => {
    toast.promise(deleteMutation.mutateAsync(selectedOrder._id), {
      loading: "Deleting order...",
      success: "Order deleted successfully",
      error: (error) =>
        error?.response?.data?.message || "Error while deleting order",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "D":
        return "bg-green-50 text-green-700 border-green-200";
      case "S":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "P":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "C":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "D":
        return "Delivered";
      case "S":
        return "Shipped";
      case "P":
        return "Pending";
      case "C":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "P":
        return "bg-green-50 text-green-700 border-green-200";
      case "U":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "R":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPaymentLabel = (payment) => {
    switch (payment) {
      case "P":
        return "Paid";
      case "U":
        return "Unpaid";
      case "R":
        return "Refunded";
      default:
        return "Unknown";
    }
  };

  const noScrollbarStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

  const columns = [
    {
      accessorKey: "orderCode",
      header: "Order Id",
      cell: (info) => info.getValue("orderCode"),
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: (info) => (
        <>
          <div>{info.row.original.createdByDetails.name}</div>
          <div className="text-xs text-muted-foreground">
            {info.row.original.createdByDetails.email}
          </div>
        </>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge variant="outline" className={getStatusColor(info.getValue())}>
          {getStatusLabel(info.getValue())}
        </Badge>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: (info) => (
        <Badge variant="outline" className={getPaymentColor(info.getValue())}>
          {getPaymentLabel(info.getValue())}
        </Badge>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: (info) => `Rs.${info.getValue().toFixed(2)}`,
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
            {/* <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" /> View Details
            </DropdownMenuItem> */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={2}>
                <DropdownMenuRadioGroup
                  value={selectedStatus}
                  onValueChange={(value) => {
                    setSelectedStatus(value);
                    setSelectedOrder(info.row.original);
                    handleUpdateOrder(value);
                  }}
                >
                  <DropdownMenuRadioItem value="P">
                    Pending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="S">
                    Shipped
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="D">
                    Delivered
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            {info.row.original.paymentStatus !== "R" && (
              <DropdownMenuItem
                onClick={() => {
                  setSelectedOrder(info.row.original);
                  setRefundConfirmation(true);
                }}
              >
                Refund
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                setSelectedOrder(info.row.original);
                setDeleteConfirmation(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (ordersError) {
    toast.error(
      ordersErrorMessage?.response?.data?.message || "Error while fetching"
    );
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching products data</p>
        <p>{ordersErrorMessage?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {deletecConfimation && (
        <ConfirmationModal
          open={deletecConfimation}
          onOpenChange={setDeleteConfirmation}
          title="Delete Order"
          description="Are you sure you want to delete this Order? This action cannot be undone."
          onConfirm={handleDeleteOrder}
        />
      )}
      {refundConfirmation && (
        <ConfirmationModal
          open={refundConfirmation}
          onOpenChange={setRefundConfirmation}
          title="Refund Order"
          description="Are you sure you want to refund this Order? This action cannot be undone."
          onConfirm={handleRefundOrder}
        />
      )}
      <style>{noScrollbarStyle}</style>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              Manage and track customer orders.
            </p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 2xl:grid-cols-4">
          <Card className="2xl:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Quick overview of your orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-medium">
                  {ordersData?.results?.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium">
                  {ordersData?.results?.filter((o) => o.status === "P").length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipped</span>
                <span className="font-medium">
                  {ordersData?.results?.filter((o) => o.status === "S").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivered</span>
                <span className="font-medium">
                  {ordersData?.results?.filter((o) => o.status === "D").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cancelled</span>
                <span className="font-medium">
                  {ordersData?.results?.filter((o) => o.status === "C").length}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="font-medium">
                  Rs.
                  {ordersData?.results
                    .reduce((sum, order) => sum + order.totalAmount, 0)
                    .toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="2xl:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Order Management</CardTitle>
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
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <CustomTable
                data={ordersData?.results || []}
                columns={columns}
                loading={ordersLoading || ordersFetching}
                page={page}
                limit={limit}
                total={ordersData?.count || 0}
                onPageChange={setPage}
                onPageSizeChange={setLimit}
                editable={false}
                pagination
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
