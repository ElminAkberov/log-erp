"use client";

import OrdersTable from "@/components/layout/orders/OrdersTable";
import Loading from "@/components/ui/loading";
import { useGetOrdersQuery } from "@/services/orders/ordersApi";

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      <OrdersTable initialOrders={orders} />
    </div>
  );
}
