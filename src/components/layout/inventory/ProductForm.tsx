"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProductsMutation } from "@/services/products/productsApi";

const productSchema = z.object({
  name: z
    .string()
    .min(3, "Min 3 letters")
    .refine((val) => !val.includes("-"), "Name not include '-'"),
  sku: z
    .string()
    .regex(/^[A-Z]{3}-\d{3}-[A-Z]{3}$/, "SKU must be in this format:AAA-000-AAA"),
  category: z.string().min(1, "Category required"),
  price: z.number().min(0, "Price must be greater than zero"),
  stock: z.number().min(0, "Stock must be greater than zero"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      price: 0,
      stock: 0,
    },
  });

  const [createProduct, { isLoading }] = useCreateProductsMutation();

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await createProduct(data).unwrap();
      reset();
      toast.success("Product created!");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow rounded-2xl p-6 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input {...register("name")} placeholder="Product name" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label>SKU</Label>
          <Input {...register("sku")} placeholder="AAA-000-AAA" />
          {errors.sku && (
            <p className="text-red-500 text-sm">{errors.sku.message}</p>
          )}
        </div>
        <div>
          <Label>Category</Label>
          <Input {...register("category")} placeholder="Category" />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            {...register("price", { valueAsNumber: true })}
            placeholder="Price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            placeholder="Stock"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="cursor-pointer">
        {isLoading ? "Loading..." : "Save"}
      </Button>
    </form>
  );
}
