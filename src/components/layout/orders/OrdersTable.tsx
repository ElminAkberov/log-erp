"use client";

import React, { useState, useEffect } from "react";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateOrderMutation } from "@/services/orders/ordersApi";
import { Order } from "@/types/Order";
import { toast } from "react-hot-toast";

interface OrdersTableProps {
  initialOrders: Order[];
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [updateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const filteredOrders = orders.filter(
    (o) => filterStatus === "All" || o.status === filterStatus
  );

  const handleStatusChange = async (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));

    try {
      await updateOrder({ id, data: { status } }).unwrap();
      toast.success("Order status updated!");
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <Select onValueChange={(value) => setFilterStatus(value)} value={filterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Product count</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.customerId?.name || "N/A"}</TableCell>
              <TableCell>{order.customerId?.email || "N/A"}</TableCell>
              <TableCell className="text-center">{order.products?.length || 0}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value: Order["status"]) =>
                    handleStatusChange(order._id, value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString("az-AZ")}
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
