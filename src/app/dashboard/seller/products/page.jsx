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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import { getCategories } from "@/services/categoryService";
import { deleteProduct, getProducts } from "@/services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductDialog } from "./(components)/productDialog";

const noScrollbarStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function SellerProductsPage() {
  const {
    delayedSearch: search,
    handleSearchChange,
    searchValue,
  } = useDebouncedSearch();
  const queryClient = useQueryClient();
  const [productDialog, setProductDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [mode, setMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deletecConfimation, setDeleteConfirmation] = useState(false);
  const {
    data: categories,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
    isError: categoriesError,
    error: categoriesErrorMessage,
  } = useQuery({
    queryKey: ["categories", { page, limit }],
    enabled: true,
    queryFn: () => getCategories({ page: 1, limit: 100 }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError: productsError,
    error: productsErrorMessage,
  } = useQuery({
    queryKey: ["products", { page, limit, search }],
    enabled: true,
    queryFn: () => getProducts({ page, limit, search: search }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error while deleting product"
      );
    },
  });

  const handleDeleteProduct = async () => {
    await toast.promise(deleteMutation.mutateAsync(selectedProduct._id), {
      loading: "Deleting product...",
      success: () => {
        setSelectedProduct(null);
        return "Product deleted successfully";
      },
      error: (error) => {
        setSelectedProduct(null);
        return error?.response?.data?.message || "Error while deleting product";
      },
    });
  };

  const columns = [
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
      accessorKey: "name",
      header: "Product",
      cell: (info) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: (info) => info.row.original.category.name,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: (info) => info.row.original.quantity,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge
          variant="outline"
          className={
            info.row.original.quantity > info.row.original.stockThreshold
              ? "bg-green-50 text-green-700 border-green-200"
              : info.row.original.quantity === 0
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-yellow-50 text-yellow-700 border-yellow-200"
          }
        >
          {info.row.original.quantity > info.row.original.stockThreshold
            ? "In Stock"
            : info.row.original.quantity === 0
            ? "Out of Stock"
            : "Low Stock"}
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
                setSelectedProduct(info.row.original);
                setProductDialog(true);
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
                setSelectedProduct(info.row.original);
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

  if (categoriesLoading || categoriesFetching) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (categoriesError) {
    toast.error(
      categoriesErrorMessage?.response?.data?.message || "Error while fetching"
    );
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching categories data</p>
        <p>{categoriesErrorMessage?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (productsError) {
    toast.error(
      productsErrorMessage?.response?.data?.message || "Error while fetching"
    );
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching products data</p>
        <p>{productsErrorMessage?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {productDialog && (
        <ProductDialog
          open={productDialog}
          onOpenChange={setProductDialog}
          categories={categories?.results}
          mode={mode}
          selectedProduct={selectedProduct}
        />
      )}
      {deletecConfimation && (
        <ConfirmationModal
          open={deletecConfimation}
          onOpenChange={setDeleteConfirmation}
          title="Delete Product"
          description="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={handleDeleteProduct}
        />
      )}
      <style>{noScrollbarStyle}</style>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your product inventory and listings.
            </p>
          </div>
          <Button
            className="sm:w-auto"
            onClick={() => {
              setMode("add");
              setSelectedProduct(null);
              setProductDialog(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 2xl:grid-cols-4">
          <Card className="2xl:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Summary</CardTitle>
              <CardDescription>Quick overview of your products</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Products</span>
                <span className="font-medium">
                  {productsData?.results?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">In Stock</span>
                <span className="font-medium">
                  {productsData?.results?.filter((p) => p.quantity > 0).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Low Stock</span>
                <span className="font-medium">
                  {
                    productsData?.results?.filter(
                      (p) => p.quantity < p.stockThreshold
                    ).length
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Out of Stock</span>
                <span className="font-medium">
                  {
                    productsData?.results?.filter((p) => p.quantity === 0)
                      .length
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Value</span>
                <span className="font-medium">
                  $
                  {productsData?.results
                    ?.reduce(
                      (sum, product) => sum + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="2xl:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Product Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <CustomTable
                data={productsData?.results || []}
                columns={columns}
                loading={productsLoading || productsFetching}
                page={page}
                limit={limit}
                total={productsData?.count || 0}
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
