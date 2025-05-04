"use client";

import { motion } from "framer-motion";
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
import UserDialog from "./(components)/userDialog";

const noScrollbarStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const users = [
  {
    id: "USR-1001",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    role: "Customer",
    verified: true,
    joinDate: "2022-01-10",
    lastActive: "2023-04-15",
    orders: 12,
    totalSpent: 1249.99,
  },
  {
    id: "USR-1002",
    name: "James Rodriguez",
    email: "james.r@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    role: "Customer",
    verified: true,
    joinDate: "2022-03-15",
    lastActive: "2023-04-14",
    orders: 8,
    totalSpent: 879.95,
  },
  {
    id: "USR-1003",
    name: "Sophia Chen",
    email: "sophia.c@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    role: "Seller",
    verified: true,
    joinDate: "2022-05-20",
    lastActive: "2023-04-10",
    orders: 5,
    totalSpent: 549.97,
  },
  {
    id: "USR-1004",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Inactive",
    role: "Customer",
    verified: true,
    joinDate: "2022-07-05",
    lastActive: "2023-02-22",
    orders: 3,
    totalSpent: 329.99,
  },
  {
    id: "USR-1005",
    name: "Olivia Johnson",
    email: "olivia.j@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    role: "Customer",
    verified: true,
    joinDate: "2021-11-30",
    lastActive: "2023-04-12",
    orders: 15,
    totalSpent: 1599.95,
  },
  {
    id: "USR-1006",
    name: "William Davis",
    email: "william.d@example.com",
    phone: "+1 (555) 678-9012",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Inactive",
    role: "Customer",
    verified: false,
    joinDate: "2022-09-10",
    lastActive: "2023-01-15",
    orders: 2,
    totalSpent: 159.98,
  },
  {
    id: "USR-1007",
    name: "Ava Martinez",
    email: "ava.m@example.com",
    phone: "+1 (555) 789-0123",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    role: "Seller",
    verified: true,
    joinDate: "2022-02-18",
    lastActive: "2023-04-05",
    orders: 9,
    totalSpent: 899.92,
  },
  {
    id: "USR-1008",
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "+1 (555) 890-1234",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    role: "Admin",
    verified: true,
    joinDate: "2021-08-15",
    lastActive: "2023-04-15",
    orders: 0,
    totalSpent: 0,
  },
  {
    id: "USR-1009",
    name: "Ethan Wilson",
    email: "ethan.w@example.com",
    phone: "+1 (555) 901-2345",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Suspended",
    role: "Customer",
    verified: true,
    joinDate: "2022-04-22",
    lastActive: "2023-03-10",
    orders: 4,
    totalSpent: 429.96,
  },
];

export default function AdminUsersPage() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [currentUser, setCurrentUser] = useState(null);

  const openAdd = () => {
    setMode("add");
    setCurrentUser(null);
    setDrawerOpen(true);
  };

  const openEdit = (u) => {
    setMode("edit");
    setCurrentUser(u);
    setDrawerOpen(true);
  };

  const openView = (u) => {
    setMode("view");
    setCurrentUser(u);
    setDrawerOpen(true);
  };

  const handleSubmit = (m, user) => {
    if (m === "add") {
    } else if (m === "edit") {
    }
  };

  const getFilteredUsers = () => {
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab === "active") {
      filtered = filtered.filter((user) => user.status === "Active");
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((user) => user.status === "Inactive");
    } else if (activeTab === "suspended") {
      filtered = filtered.filter((user) => user.status === "Suspended");
    } else if (activeTab === "unverified") {
      filtered = filtered.filter((user) => !user.verified);
    }

    return filtered;
  };

  const filteredUsers = getFilteredUsers();

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const isSelected = (userId) => selectedUsers.includes(userId);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Inactive":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "Suspended":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Seller":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Customer":
        return "bg-green-50 text-green-700 border-green-200";
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
            selectedUsers.length === filteredUsers.length &&
            filteredUsers.length > 0
          }
          onCheckedChange={handleSelectAll}
        />
      ),
      cell: (info) => (
        <Checkbox
          checked={isSelected(info.getValue())}
          onCheckedChange={() => handleSelectUser(info.getValue())}
        />
      ),
    },
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: (info) => (
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={info.getValue()}
            alt={users.find((u) => u.id === info.row.original.id).name}
          />
          <AvatarFallback>
            {getInitials(users.find((u) => u.id === info.row.original.id).name)}
          </AvatarFallback>
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
          className={getRoleColor(
            users.find((u) => u.id === info.row.original.id).role
          )}
        >
          {users.find((u) => u.id === info.row.original.id).role}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge
          variant="outline"
          className={getStatusColor(
            users.find((u) => u.id === info.row.original.id).status
          )}
        >
          {users.find((u) => u.id === info.row.original.id).status}
        </Badge>
      ),
    },
    {
      accessorKey: "verified",
      header: "Verified",
      cell: (info) =>
        users.find((u) => u.id === info.row.original.id).verified ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <X className="h-5 w-5 text-red-500" />
        ),
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: (info) => users.find((u) => u.id === info.row.original.id).joinDate,
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
            <DropdownMenuItem onClick={() => openView(info.row.original)}>
              <Eye className="h-4 w-4 mr-2" /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openEdit(info.row.original)}>
              <UserCog className="h-4 w-4 mr-2" /> Edit User
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            {info.row.original.status === "Active" ? (
              <DropdownMenuItem>
                <X className="h-4 w-4 mr-2" /> Deactivate
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" /> Activate
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Shield className="h-4 w-4 mr-2" /> Change Role
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" /> Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-4">
      {drawerOpen && (
        <UserDialog
          open={drawerOpen}
          mode={mode}
          initialUser={currentUser}
          onOpenChange={setDrawerOpen}
          onSubmit={handleSubmit}
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
          <Button className="sm:w-auto" onClick={openAdd}>
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
                  <span className="font-medium">{users.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="font-medium">
                    {users.filter((u) => u.status === "Active").length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Suspended Users</span>
                  <span className="font-medium">
                    {users.filter((u) => u.status === "Suspended").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Unverified Users
                  </span>
                  <span className="font-medium">
                    {users.filter((u) => !u.verified).length}
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
                          (users.filter((u) => u.role === "Customer").length /
                            users.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (users.filter((u) => u.role === "Customer").length /
                          users.length) *
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
                          (users.filter((u) => u.role === "Seller").length /
                            users.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (users.filter((u) => u.role === "Seller").length /
                          users.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Admins</span>
                      <span className="font-medium">
                        {Math.round(
                          (users.filter((u) => u.role === "Admin").length /
                            users.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (users.filter((u) => u.role === "Admin").length /
                          users.length) *
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
                <Select className="">
                  <SelectTrigger className="">
                    <SelectValue placeholder="Filter users…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="unverified">Unverified</SelectItem>
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
                data={users}
                columns={tableColumns}
                loading={false}
                editable={false}
                pagination={true}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>
              Latest user actions on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users
                .filter((u) => u.status === "Active")
                .slice(0, 5)
                .map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-md"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1 min-w-0">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate text-wrap">
                        Last active on {user.lastActive} ({user.orders} total
                        orders)
                      </p>
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
