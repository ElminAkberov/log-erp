"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  useUpdateShipmentMutation,
  useDeleteShipmentMutation,
} from "@/services/shipments/shipmentsApi";
import toast from "react-hot-toast";
import Loading from "@/components/ui/loading";
import { Shipment } from "@/types/Shipments";

export default function ShipmentsTable({
  initialShipments,
  isLoading,
  refetch,
}: {
  initialShipments: Shipment[];
  isLoading: boolean;
  refetch: () => void;
}) {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [updateShipment] = useUpdateShipmentMutation();
  const [deleteShipment] = useDeleteShipmentMutation();

  const filtered: Shipment[] = initialShipments?.filter(
    (s: Shipment) => filterStatus === "All" || s.status === filterStatus
  );

  const handleStatusChange = async (
    _id: string,
    status: Shipment["status"]
  ) => {
    try {
      await updateShipment({ id: _id, data: { status } }).unwrap();
      toast.success("Shipment status updated!");
      refetch();
    } catch (err) {
      console.error("Failed to update shipment status:", err);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await deleteShipment(_id).unwrap();
      toast.success("Shipment deleted!");
    } catch (err) {
      console.error("Failed to delete shipment:", err);
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[10vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto space-y-4">
      <div className="flex gap-4 mb-2">
        <Select
          value={filterStatus}
          onValueChange={(value: string) => setFilterStatus(value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead className="text-center">Carrier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Estimated Delivery</TableHead>
            <TableHead className="text-center">Process</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s._id}>
              <TableCell>
                {typeof s.orderId === "string"
                  ? s.orderId
                  : s.orderId?._id ?? "Unknown"}
              </TableCell>
              <TableCell className="text-center">{s.carrier}</TableCell>
              <TableCell>
                <Select
                  value={s.status}
                  onValueChange={(value) =>
                    handleStatusChange(s._id, value as Shipment["status"])
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {new Date(s.estimatedDelivery).toLocaleDateString("az-AZ")}
              </TableCell>
              <TableCell className="flex gap-2 justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
