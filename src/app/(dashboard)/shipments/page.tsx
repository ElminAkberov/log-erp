"use client";

import ShipmentsTable from "@/components/layout/shipments/ShipmentsTable";
import ShipmentForm from "@/components/layout/shipments/ShipmentsForm";
import { useGetShipmentsQuery } from "@/services/shipments/shipmentsApi";
import Loading from "@/components/ui/loading";

export default function ShipmentsPage() {
  const { data: shipments = [], isLoading, refetch } = useGetShipmentsQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loading />
      </div>
    );
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Shipments / Logistics</h1>
      <ShipmentForm />
      <ShipmentsTable
        initialShipments={shipments}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
}
