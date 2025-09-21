"use client";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { SectionCards } from "@/components/ui/section-cards";
import OrdersTable from "@/components/layout/dashboard/DashOrdersTable";
import { useGetOrdersQuery } from "@/services/orders/ordersApi";

export default function Page() {
  const { data: orders = [] } = useGetOrdersQuery();

  return (
    <>
      <div className="flex flex-1 flex-col px-2">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartAreaInteractive />
              <OrdersTable orders={orders} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
