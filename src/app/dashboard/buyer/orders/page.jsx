"use client";

import { MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CustomTable } from "@/components/customTable";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import { cancelOrder, getAllOrders } from "@/services/orderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { OrderDetailModal } from "./components/orderDetailModal";

export default function BuyerOrdersPage() {
  const queryClient = useQueryClient();
  const {
    delayedSearch: search,
    handleSearchChange,
    searchValue,
  } = useDebouncedSearch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [cancelConfirmation, setCancelConfirmation] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [orderDetailModal, setOrderDetailModal] = useState(false);

  const {
    data: ordersData,
    isLoading: ordersLoading,
    isFetching: ordersFetching,
    isError: ordersError,
    error: ordersErrorMessage,
  } = useQuery({
    queryKey: ["buyerOrders", page, limit, search],
    queryFn: () => getAllOrders({ page, limit, search, seller: "" }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => cancelOrder(selectedOrder?._id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error while updating order"
      );
    },
  });
  const handleUpdateOrder = () => {
    const payload = {
      status: statusValue,
    };
    toast.promise(updateMutation.mutateAsync(payload), {
      loading: "Changing Status",
      success: "Status Updated...",
      error: (error) =>
        error?.response?.data?.message || "Error while updating order",
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
            <DropdownMenuItem
              onClick={() => {
                setSelectedOrder(info.row.original);
                setOrderDetailModal(true);
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedOrder(info.row.original);
                setStatusValue("C");
                setCancelConfirmation(true);
              }}
            >
              Cancel
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
      {orderDetailModal && (
        <OrderDetailModal
          isOpen={orderDetailModal}
          onClose={() => setOrderDetailModal(false)}
          order={selectedOrder}
        />
      )}
      {cancelConfirmation && (
        <ConfirmationModal
          open={cancelConfirmation}
          onOpenChange={setCancelConfirmation}
          title="Cancel Order"
          description="Are you sure you want to cancel this Order? This action cannot be undone."
          onConfirm={handleUpdateOrder}
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
