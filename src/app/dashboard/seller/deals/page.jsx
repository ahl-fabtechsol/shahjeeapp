"use client";

import {
  ChevronDown,
  Edit,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CustomTable } from "@/components/customTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  deleteDeal,
  getDeals,
  getProductsForDeals,
} from "@/services/dealsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DealsDialog } from "./(components)/dealsDialog";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";

const noScrollbarStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function SellerDealsPage() {
  const {
    delayedSearch: search,
    handleSearchChange,
    searchValue,
  } = useDebouncedSearch();
  const queryClient = useQueryClient();
  const [dealsDialog, setDealsDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [mode, setMode] = useState("add");
  const [selectedDeal, seteSelectedDeal] = useState(null);
  const [deletecConfimation, setDeleteConfirmation] = useState(false);

  const {
    data: productOptions,
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError: productsError,
    error: productsErrorMessage,
  } = useQuery({
    queryKey: ["productsOptions"],
    queryFn: () => getProductsForDeals(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: true,
  });

  const {
    data: dealsData,
    isLoading: dealsLoading,
    isFetching: dealsFetching,
    isError: dealsError,
    error: dealsErrorMessage,
  } = useQuery({
    queryKey: ["deals", { page, limit, search }],
    queryFn: () => getDeals({ page, limit, seller: "", search: search }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteDeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["deals"]);
      toast.success("Deal deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error while deleting product"
      );
    },
  });

  const hanleDeleteDeal = async () => {
    await toast.promise(deleteMutation.mutateAsync(selectedDeal._id), {
      loading: "Deleting Deal...",
      success: () => {
        seteSelectedDeal(null);
        return "Deal deleted successfully";
      },
      error: (error) => {
        seteSelectedDeal(null);
        return error?.response?.data?.message || "Error while deleting deal";
      },
    });
  };

  const columns = [
    {
      accessorKey: "dealCode",
      header: "Name",
      cell: (info) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      accessorKey: "images",
      header: "Image",
      cell: (info) => (
        <img
          src={info.row.original.images[0] || "/placeholder.svg"}
          alt={info.row.original.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => `Rs.${info.getValue().toFixed(2)}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge
          variant="outline"
          className={
            info.row.original.status === "A"
              ? "bg-green-50 text-green-700 border-green-200"
              : info.row.original.status === "IA"
              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
              : "bg-red-50 text-red-700 border-red-200"
          }
        >
          {info.row.original.status === "A"
            ? "Active"
            : info.row.original.status === "IA"
            ? "Inactive"
            : "Suspended"}
        </Badge>
      ),
    },
    {
      accessorKey: "actions",
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
                setMode("edit");
                seteSelectedDeal(info.row.original);
                setDealsDialog(true);
              }}
            >
              <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ChevronDown className="h-4 w-4 mr-2" /> View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                seteSelectedDeal(info.row.original);
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

  if (productsLoading || productsFetching) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (productsError) {
    toast.error(
      productsErrorMessage?.response?.data?.message || "Error while fetching"
    );
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching categories data</p>
        <p>{productsErrorMessage?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (dealsError) {
    toast.error(
      dealsErrorMessage?.response?.data?.message || "Error while fetching"
    );
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching products data</p>
        <p>{dealsErrorMessage?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {dealsDialog && (
        <DealsDialog
          open={dealsDialog}
          onOpenChange={setDealsDialog}
          products={productOptions?.results}
          mode={mode}
          selectedDeal={selectedDeal}
        />
      )}
      {deletecConfimation && (
        <ConfirmationModal
          open={deletecConfimation}
          onOpenChange={setDeleteConfirmation}
          title="Delete Product"
          description="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={hanleDeleteDeal}
        />
      )}
      <style>{noScrollbarStyle}</style>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Deals</h1>
            <p className="text-muted-foreground">
              Manage your Deals and listings.
            </p>
          </div>
          <Button
            className="sm:w-auto"
            onClick={() => {
              setMode("add");
              seteSelectedDeal(null);
              setDealsDialog(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Deal
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 2xl:grid-cols-4">
          <Card className="2xl:col-span-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Deals Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search deals..."
                    className="pl-8"
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <CustomTable
                data={dealsData?.results || []}
                columns={columns}
                loading={dealsLoading || dealsFetching}
                page={page}
                limit={limit}
                total={dealsData?.count || 0}
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
