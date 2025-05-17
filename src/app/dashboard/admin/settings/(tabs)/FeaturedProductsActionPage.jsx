import { CustomTable } from "@/components/customTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { featureProduct, getProducts } from "@/services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Badge, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FeaturedProductsActionPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [toggleValue, setToggleValue] = useState(null);

  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError: productsError,
    error: productsErrorMessage,
  } = useQuery({
    queryKey: ["products", { page, limit }],
    enabled: true,
    queryFn: () => getProducts({ page, limit, search: "" }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: (id) =>
      featureProduct(id, {
        featured: toggleValue,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success(toggleValue ? "Product Featured" : "Product Un featured");
      setToggleValue(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const toggleFeature = (id) => {
    mutation.mutate(id);
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
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
      cell: (info) => `Rs.${info.getValue().toFixed(2)}`,
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
      accessorKey: "featured",
      header: "Featured",
      cell: (info) => (
        <Switch
          checked={info.row.original.featured}
          onCheckedChange={(checked) => {
            setToggleValue(checked);
            toggleFeature(info.row.original._id);
          }}
        />
      ),
    },
  ];

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
    <motion.div variants={containerAnimation} initial="hidden" animate="show">
      <Card>
        <CardHeader className="flex gap-4 flex-wrap  flex-row items-center justify-between">
          <div>
            <CardTitle>Featured Products</CardTitle>
            <CardDescription>
              Manage which products are featured on your landing page
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <CustomTable
            data={productsData?.results || []}
            columns={columns}
            loading={
              productsLoading ||
              productsFetching ||
              mutation.isPending ||
              mutation.isLoading
            }
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
    </motion.div>
  );
};

export default FeaturedProductsActionPage;
