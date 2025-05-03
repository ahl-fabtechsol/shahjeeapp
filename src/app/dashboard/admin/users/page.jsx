"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Calendar,
  Check,
  Download,
  Eye,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  Shield,
  Trash2,
  UserCog,
  UserPlus,
  X,
} from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample user data
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

  return (
    <div className="p-4">
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
          <Button className="sm:w-auto">
            <UserPlus className="h-4 w-4 mr-2" /> Add User
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="md:col-span-1">
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
                  <span className="text-muted-foreground">Inactive Users</span>
                  <span className="font-medium">
                    {users.filter((u) => u.status === "Inactive").length}
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

          <Card className="md:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" /> Filter by Date
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
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  <TabsTrigger value="suspended">Suspended</TabsTrigger>
                  <TabsTrigger value="unverified">Unverified</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="role">Role</SelectItem>
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
                            selectedUsers.length === filteredUsers.length &&
                            filteredUsers.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">Avatar</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          User
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="group"
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected(user.id)}
                            onCheckedChange={() => handleSelectUser(user.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getRoleColor(user.role)}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(user.status)}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.verified ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
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
                                <Eye className="h-4 w-4 mr-2" /> View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserCog className="h-4 w-4 mr-2" /> Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" /> Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Active" ? (
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
                        </TableCell>
                      </motion.tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredUsers.length}</strong> of{" "}
                  <strong>{users.length}</strong> users
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
                    className="flex items-center space-x-4"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last active on {user.lastActive} ({user.orders} total
                        orders)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4 mr-2" /> Call
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4 mr-2" /> Email
                      </Button>
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
