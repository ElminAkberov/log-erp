"use client";

import CustomersTable from "@/components/layout/customers/CustomersTable";
import Loading from "@/components/ui/loading";
import { useGetCustomersQuery } from "@/services/customers/customersApi";

export default function CustomersPage() {
  const { data: customers = [], isLoading, error } = useGetCustomersQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loading />
      </div>
    );
  }

  if (error) return <div>Error loading customers</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Customers</h1>
      <CustomersTable initialCustomers={customers} />
    </div>
  );
}
