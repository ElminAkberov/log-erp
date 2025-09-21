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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";
import {
  useDeleteProductsMutation,
  useEditProductsMutation,
} from "@/services/products/productsApi";
import toast from "react-hot-toast";

interface ProductProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductProps) {
  const [editingStock, setEditingStock] = useState<
    Record<string, number | undefined>
  >({});

  const [editingProduct, { isLoading: isEditing }] = useEditProductsMutation();
  const [deleteProducts, { isLoading: isDeleting }] =
    useDeleteProductsMutation();

  const handleStockChange = (id: string, value: number) => {
    setEditingStock((prev) => ({ ...prev, [id]: value }));
  };

  const handleEdit = async (id: string) => {
    const newStock = editingStock[id];
    if (newStock === undefined || newStock < 0) return;
    try {
      await editingProduct({ id, data: { stock: newStock } }).unwrap();
      setEditingStock((prev) => ({ ...prev, [id]: undefined }));
      toast.success("Product updated!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {products && products.length > 0 && (
        <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead >Stock</TableHead>
                <TableHead className="text-center">Process</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.sku}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell className="text-center">${p.price}</TableCell>
                  <TableCell >
                    <Label>
                      <Input
                        value={editingStock[p._id] ?? p.stock}
                        type="number"
                        onChange={(e) =>
                          handleStockChange(p._id, Number(e.target.value))
                        }
                        className="w-max w-[75px]"
                      />
                    </Label>
                  </TableCell>
                  <TableCell className="flex justify-center gap-x-2">
                    <Button
                      onClick={() => deleteProducts(p._id)}
                      variant="destructive"
                      size="sm"
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleEdit(p._id)}
                      disabled={editingStock[p._id] === undefined || isEditing}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
