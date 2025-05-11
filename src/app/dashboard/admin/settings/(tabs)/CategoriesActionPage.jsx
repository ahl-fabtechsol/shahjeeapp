"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CustomTable } from "@/components/customTable";
import { Button } from "@/components/ui/button";
import CategoryDialog from "./CategoryDialog";
import { getCategories, deleteCategory } from "@/services/categoryService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConfirmationModal } from "@/components/ConfirmationModal";

export default function CategoriesActionPage() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [current, setCurrent] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => getCategories({ page, limit }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Delete failed");
    },
  });

  const handleDelete = async () => {
    await toast.promise(deleteMutation.mutateAsync(current._id), {
      loading: "Deleting category…",
      success: "Category deleted successfully!",
      error: (err) => err.response?.data?.message || "Delete failed",
    });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={info.row.original.image} alt="category image" />
            <AvatarFallback>{info.row.original.name[0]}</AvatarFallback>
          </Avatar>
          <p className="m-0 p-0 ">{info.row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => <>{info.row.original.description}</>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setMode("edit");
              setCurrent(info.row.original);
              setOpen(true);
            }}
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setCurrent(info.row.original);
              setDeleteConfirmation(true);
            }}
          >
            <Trash2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setMode("view");
              setCurrent(info.row.original);
              setOpen(true);
            }}
          >
            <Eye size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
    >
      {deleteConfirmation && (
        <ConfirmationModal
          open={deleteConfirmation}
          onOpenChange={setDeleteConfirmation}
          title="Are you sure you want to delete this category ?"
          onConfirm={handleDelete}
        />
      )}
      {open && (
        <CategoryDialog
          mode={mode}
          category={current}
          open={open}
          onOpenChange={setOpen}
        />
      )}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Category Management</CardTitle>
            <CardDescription>
              Manage product categories for your platform
            </CardDescription>
          </div>
          <Button
            onClick={() => {
              setMode("add");
              setCurrent(null);
              setOpen(true);
            }}
          >
            <Plus size={16} className="mr-2" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <CustomTable
            data={data?.results || []}
            columns={columns}
            loading={isLoading || isFetching}
            page={page}
            limit={limit}
            total={data?.count || 0}
            onPageChange={setPage}
            onPageSizeChange={setLimit}
            editable={false}
            pagination
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
