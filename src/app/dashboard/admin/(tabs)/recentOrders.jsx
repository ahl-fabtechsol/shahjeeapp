"use client";

import { CustomTable } from "@/components/customTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "lucide-react";

export const RecentOrders = () => {
  const [data, setData] = useState([
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.j@example.com",
      age: 28,
      status: "Active",
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Smith",
      email: "bob.smith@example.com",
      age: 34,
      status: "Pending",
    },
    {
      id: 3,
      firstName: "Charlie",
      lastName: "Lee",
      email: "charlie.lee@acme.io",
      age: 22,
      status: "Inactive",
    },
    {
      id: 4,
      firstName: "Diana",
      lastName: "Garcia",
      email: "diana.g@widget.co",
      age: 45,
      status: "Active",
    },
    {
      id: 5,
      firstName: "Ethan",
      lastName: "Wong",
      email: "ethan.w@foobar.net",
      age: 30,
      status: "Pending",
    },
    {
      id: 6,
      firstName: "Fiona",
      lastName: "Brown",
      email: "fiona.b@website.org",
      age: 27,
      status: "Active",
    },
    {
      id: 7,
      firstName: "George",
      lastName: "Davis",
      email: "george.d@hello.com",
      age: 52,
      status: "Inactive",
    },
    {
      id: 8,
      firstName: "Hannah",
      lastName: "Kim",
      email: "hannah.k@world.io",
      age: 19,
      status: "Pending",
    },
    {
      id: 9,
      firstName: "Ian",
      lastName: "Martinez",
      email: "ian.m@example.org",
      age: 41,
      status: "Active",
    },
    {
      id: 10,
      firstName: "Jasmine",
      lastName: "Patel",
      email: "jasmine.p@site.com",
      age: 36,
      status: "Inactive",
    },
  ]);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: (info) => <strong>{info.getValue()}</strong>,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => (
        <a
          href={`mailto:${info.getValue()}`}
          className="text-blue-600 underline"
        >
          {info.getValue()}
        </a>
      ),
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const s = info.getValue();
        let variant =
          s === "Active" ? "green" : s === "Pending" ? "yellow" : "red";
        return <Badge variant={variant}>{s}</Badge>;
      },
    },
  ];
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomTable
            data={data}
            columns={columns}
            loading={false}
            editable={false}
            pagination={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};
