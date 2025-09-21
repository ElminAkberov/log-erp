"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { useCreateShipmentMutation } from "@/services/shipments/shipmentsApi";
import toast from "react-hot-toast";

const shipmentSchema = z.object({
  orderId: z.string().min(1, "Order ID required"),
  carrier: z.string().min(1, "Carrier required"),
  status: z.enum(["In Transit", "Delivered", "Pending Pickup"]),
  estimatedDelivery: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export type ShipmentFormValues = z.infer<typeof shipmentSchema>;

export default function ShipmentForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      orderId: "",
      carrier: "",
      status: "Pending Pickup",
      estimatedDelivery: "",
    },
  });

  const [createShipment, { isLoading }] = useCreateShipmentMutation();

  const statusMap: Record<
    ShipmentFormValues["status"],
    "Delivered" | "Pending" | "Shipped"
  > = {
    Delivered: "Delivered",
    "Pending Pickup": "Pending",
    "In Transit": "Shipped",
  };

  const onSubmit = async (data: ShipmentFormValues) => {
    try {
      const mappedData = {
        ...data,
        status: statusMap[data.status],
      };
      await createShipment(mappedData).unwrap();
      toast.success("Shipment created!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow rounded-2xl p-6 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Order ID</Label>
          <Input {...register("orderId")} placeholder="Order ID" />
          {errors.orderId && (
            <p className="text-red-500 text-sm">{errors.orderId.message}</p>
          )}
        </div>
        <div>
          <Label>Carrier</Label>
          <Input {...register("carrier")} placeholder="Carrier" />
          {errors.carrier && (
            <p className="text-red-500 text-sm">{errors.carrier.message}</p>
          )}
        </div>
        <div>
          <Label>Status</Label>
          <Select
            onValueChange={(value: ShipmentFormValues["status"]) =>
              setValue("status", value)
            }
            defaultValue="Pending Pickup"
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Transit">In Transit</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Pending Pickup">Pending Pickup</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>
        <div>
          <Label>Estimated Delivery</Label>
          <Input {...register("estimatedDelivery")} placeholder="YYYY-MM-DD" />
          {errors.estimatedDelivery && (
            <p className="text-red-500 text-sm">
              {errors.estimatedDelivery.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="cursor-pointer">
        {isLoading ? "Loading..." : "Save"}
      </Button>
    </form>
  );
}
