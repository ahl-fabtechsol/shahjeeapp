// components/UserDialog.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function UserDialog({
  open,
  mode,
  initialUser,
  onOpenChange,
  onSubmit,
}) {
  const [user, setUser] = useState({
    image: null,
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    } else {
      setUser({ image: null, name: "", email: "", password: "", role: "user" });
    }
  }, [initialUser, mode]);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "image" && files?.[0]) {
      setUser((u) => ({ ...u, image: files[0] }));
    } else {
      setUser((u) => ({ ...u, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mode, user);
    onOpenChange(false);
  };

  const isView = mode === "view";
  const title =
    mode === "add"
      ? "Add New User"
      : mode === "edit"
      ? "Edit User"
      : "View User";
  const actionText = mode === "add" ? "Create" : "Update";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isView
              ? "Review the user’s details below."
              : `Fill out the form to ${actionText.toLowerCase()} a user.`}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4"
        >
          <div className="md:col-span-2 flex flex-col items-center">
            <label
              htmlFor="user-image"
              className="relative group cursor-pointer"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center transition group-hover:border-primary">
                {user.image && typeof user.image !== "string" ? (
                  <Image
                    src={URL.createObjectURL(user.image)}
                    alt="Avatar Preview"
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <UploadCloud className="w-10 h-10 text-gray-400" />
                )}
              </div>
              {!isView && (
                <input
                  id="user-image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="sr-only"
                />
              )}
            </label>
            {!isView && (
              <span className="mt-2 text-sm text-primary">
                {user.image ? "Change Photo" : "Upload Photo"}
              </span>
            )}
          </div>

          <div className="flex flex-col  ">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={user.name}
              disabled={isView}
              onChange={handleChange}
              placeholder="Full name"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={user.email}
              disabled={isView}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          {!isView && (
            <div className="flex flex-col md:col-span-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          )}

          <div className="flex flex-col md:col-span-2">
            <Label htmlFor="role">Role</Label>
            <Select
              className="w-full"
              id="role"
              disabled={isView}
              defaultValue={user.role}
              onValueChange={(val) => setUser((u) => ({ ...u, role: val }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>

        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {!isView && <Button onClick={handleSubmit}>{actionText}</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
