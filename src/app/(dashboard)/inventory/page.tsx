"use client";

import ProductTable from "@/components/layout/inventory/ProductTable";
import ProductForm from "@/components/layout/inventory/ProductForm";
import { useGetProductsQuery } from "@/services/products/productsApi";

export default function InventoryPage() {
  const { data: products = [] } = useGetProductsQuery();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Inventory</h1>
      <ProductForm />
      <ProductTable products={products} />
    </div>
  );
}
