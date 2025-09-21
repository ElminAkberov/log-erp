// services/customers/customersApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Customer } from "@/types/Customer";
import { Order } from "@/types/Order";

interface CustomerWithOrders {
  customer: Customer | null;
  orders: Order[];
}

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://logistic-erp-backend.onrender.com", // backend URL
  }),
  tagTypes: ["Customers"],
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      query: () => "/customers",
      providesTags: [{ type: "Customers" }],
    }),

    getCustomerById: builder.query<CustomerWithOrders, string>({
      query: (id) => `/customers/${id}`,
      providesTags: [{ type: "Customers", id: "LIST" }],
    }),

    createCustomer: builder.mutation<Customer, Partial<Customer>>({
      query: (body) => ({
        url: "/customers",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Customers" }],
    }),

    deleteCustomer: builder.mutation<{ message: string; id?: string }, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Customers" }],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
