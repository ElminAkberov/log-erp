// services/orders/ordersApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '@/types/Order'; // Order tipini ayrıca yaradacaqsan

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://logistic-erp-backend.onrender.com' }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        // Get all orders (with optional filters)
        getOrders: builder.query<Order[], { status?: string; customerId?: string } | void>({
            query: () => ({ url: '/orders' }),
            providesTags: ['Orders'],
        }),

        // Create order
        createOrder: builder.mutation<Order, Partial<Order>>({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Orders'],
        }),

        // Update order
        updateOrder: builder.mutation<Order, { id: string; data: Partial<Order> }>({
            query: ({ id, data }) => ({
                url: `/orders/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Orders'],
        }),

        // Delete order
        deleteOrder: builder.mutation<{ message: string; id?: string }, string>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});

// Hooks
export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = ordersApi;
