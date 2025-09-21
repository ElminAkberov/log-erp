"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/types/Order";

interface OrdersTableProps {
  orders: Order[];
}

export default function DashOrdersTable({ orders }: OrdersTableProps) {
  const [filterStatus, setFilterStatus] = React.useState<string>("All");
  const filteredOrders = orders.filter(
    (o) => filterStatus === "All" || o.status.toLowerCase() === filterStatus.toLowerCase()
  );

  return (
    <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto overflow-y-auto max-h-[400px] space-y-4">
      <div className="flex gap-4 mb-2">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.customerId?.name || "Unknown"}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
