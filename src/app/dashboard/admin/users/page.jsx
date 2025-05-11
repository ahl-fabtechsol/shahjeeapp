"use client";

import {
  Check,
  Eye,
  MoreHorizontal,
  Search,
  Shield,
  Trash2,
  UserCog,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CustomTable } from "@/components/customTable";
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
import { deleteUser, getAllUsers, updateUser } from "@/services/adminUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserDialog from "./(components)/userDialog";
import { toast } from "sonner";

const noScrollbarStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function AdminUsersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [userStatus, setUserStatus] = useState("");

  const {
    data: usersData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["users", page, limit, userStatus],
    queryFn: () => getAllUsers({ page, limit, userStatus }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Delete failed");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateUser(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Update failed");
    },
  });

  const handleDeactivate = (id) => {
    toast.promise(updateMutation.mutateAsync({ id, status: "I" }), {
      loading: "Deactivating User…",
      success: "User deactivated successfully!",
      error: (err) => err?.response?.data?.message || "Deactivate failed",
    });
  };

  const handleActivate = (id) => {
    toast.promise(updateMutation.mutateAsync({ id, status: "A" }), {
      loading: "Activating User…",
      success: "User activated successfully!",
      error: (err) => err?.response?.data?.message || "Activate failed",
    });
  };
  const handleDelete = async () => {
    await toast.promise(deleteMutation.mutateAsync(currentUser._id), {
      loading: "Deleting User...",
      success: "User deleted successfully!",
      error: (err) => err.response?.data?.message || "Delete failed",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "A":
        return "bg-green-50 text-green-700 border-green-200";
      case "I":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "S":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "A":
        return "Active";
      case "I":
        return "Inactive";
      case "S":
        return "Suspended";
      default:
        return "Unknown";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "M":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "S":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "B":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "M":
        return "Manager";
      case "S":
        return "Seller";
      case "B":
        return "Buyer";
      default:
        return "Unknown";
    }
  };

  const columns = [
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: (info) => (
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={info.row.original.image}
            alt={info.row.original.name}
          />
          <AvatarFallback>{getInitials(info.row.original.name)}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "name",
      header: "User",
      cell: (info) => (
        <>
          <div className="font-medium">{info.row.original.name}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-none">
            {info.row.original.email}
          </div>
        </>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (info) => (
        <Badge
          variant="outline"
          className={getRoleColor(info.row.original.role)}
        >
          {getRoleLabel(info.row.original.role)}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge
          variant="outline"
          className={getStatusColor(info.row.original.status)}
        >
          {getStatusLabel(info.row.original.status)}
        </Badge>
      ),
    },

    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: (info) =>
        new Date(info.row.original.createdAt).toLocaleDateString(),
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
                setMode("view");
                setCurrentUser(info.row.original);
                setModalOpen(true);
              }}
            >
              <Eye className="h-4 w-4 mr-2" /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setMode("edit");
                setCurrentUser(info.row.original);
                setModalOpen(true);
              }}
            >
              <UserCog className="h-4 w-4 mr-2" /> Edit User
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            {info.row.original.status === "A" ? (
              <DropdownMenuItem
                onClick={() => {
                  handleDeactivate(info.row.original._id);
                }}
              >
                <X className="h-4 w-4 mr-2" /> Deactivate
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  handleActivate(info.row.original._id);
                }}
              >
                <Check className="h-4 w-4 mr-2" /> Activate
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                setCurrentUser(info.row.original);
                setDeleteConfirmation(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-4">
      {deleteConfirmation && (
        <ConfirmationModal
          open={deleteConfirmation}
          onOpenChange={setDeleteConfirmation}
          title="Are you sure you want to delete this User ?"
          onConfirm={handleDelete}
        />
      )}
      {modalOpen && (
        <UserDialog
          open={modalOpen}
          mode={mode}
          currentUser={currentUser}
          onOpenChange={setModalOpen}
        />
      )}
      <style>{noScrollbarStyle}</style>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor user accounts across the platform.
            </p>
          </div>
          <Button
            className="sm:w-auto"
            onClick={() => {
              setMode("add");
              setCurrentUser(null);
              setModalOpen(true);
            }}
          >
            <UserPlus className="h-4 w-4 mr-2" /> Add User
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 2xl:grid-cols-4">
          <Card className="2xl:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>Overview of user accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Users</span>
                  <span className="font-medium">
                    {usersData?.results?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="font-medium">
                    {usersData?.results?.filter((u) => u.status === "A")
                      ?.length || 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Suspended Users</span>
                  <span className="font-medium">
                    {usersData?.results?.filter((u) => u.status === "S")
                      ?.length || 0}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">User Roles</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Customers</span>
                      <span className="font-medium">
                        {Math.round(
                          (usersData?.results?.filter((u) => u.role === "B")
                            ?.length /
                            usersData?.results?.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (usersData?.results?.filter((u) => u.role === "B")
                          ?.length /
                          usersData?.results?.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sellers</span>
                      <span className="font-medium">
                        {Math.round(
                          (usersData?.results?.filter((u) => u.role === "S")
                            ?.length /
                            usersData?.results?.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (usersData?.results?.filter((u) => u.role === "S")
                          ?.length /
                          usersData?.results?.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Managers</span>
                      <span className="font-medium">
                        {Math.round(
                          (usersData?.results?.filter((u) => u.role === "M")
                            ?.length /
                            usersData?.results?.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (usersData?.results?.filter((u) => u.role === "M")
                          ?.length /
                          usersData?.results?.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="2xl:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center gap-2">
                <CardTitle>User Management</CardTitle>
                <Select
                  className=""
                  value={userStatus}
                  onValueChange={(value) => {
                    setUserStatus(value === "all" ? "" : value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Filter users…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="A">Active</SelectItem>
                    <SelectItem value="I">Inactive</SelectItem>
                    <SelectItem value="S">Suspended</SelectItem>
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
                    placeholder="Search users..."
                    className="pl-8"
                  />
                </div>
              </div>

              <CustomTable
                data={usersData?.results || []}
                columns={columns}
                loading={isLoading || isFetching}
                page={page}
                limit={limit}
                total={usersData?.count || 0}
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
