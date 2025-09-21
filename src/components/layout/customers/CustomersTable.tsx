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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useDeleteCustomerMutation,
  useGetCustomerByIdQuery,
} from "@/services/customers/customersApi";
import toast from "react-hot-toast";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  orders: number;
}

export default function CustomersTable({
  initialCustomers,
}: {
  initialCustomers: Customer[];
}) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [deleteCustomer] = useDeleteCustomerMutation();

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id).unwrap();
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      toast.success("Customer deleted!");
    } catch (err) {
      console.error("Failed to delete customer:", err);
      toast.error("Something went wrong!");
    }
  };

  const { data: customerDetail, isLoading: isDetailLoading } =
    useGetCustomerByIdQuery(selectedCustomerId!);

  return (
    <div className="bg-white shadow rounded-2xl p-4 space-y-4">
      <Input
        placeholder="Search for a customer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64"
      />

      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Phone</TableHead>
            <TableHead className="text-right">Process</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((c) => (
            <TableRow key={c._id}>
              <TableCell className="text-left">{c.name}</TableCell>
              <TableCell className="text-left">{c.email}</TableCell>
              <TableCell className="text-left">{c.phone}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCustomerId(c._id)}
                    >
                      Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg overflow-y-scroll max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>{c.name}</DialogTitle>
                      <DialogDescription>
                        {isDetailLoading && <p className="text-center">Loading...</p>}
                        {!isDetailLoading && customerDetail && (
                          <>
                            Email: {customerDetail.customer?.email}
                            <br />
                            Phone: {customerDetail.customer?.phone}
                            <br />
                            Orders: {customerDetail?.orders?.length}
                            <br />
                            <hr className="my-2" />
                            <h4 className="font-semibold">Orders:</h4>
                            {customerDetail.orders?.map((order) => (
                              <div
                                key={order._id}
                                className="mb-2 p-2 border rounded"
                              >
                                <p>Order ID: {order._id}</p>
                                <p>Status: {order.status}</p>
                                <p>
                                  Date:{" "}
                                  {new Date(order.createdAt).toLocaleString()}
                                </p>
                                <p>Products:</p>
                                <ul className="ml-4 list-disc">
                                  {order.products.map((p) => (
                                    <li key={p._id}>
                                      Product: {p.productId || "Deleted"} |
                                      Quantity: {p.quantity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(c._id)}
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
