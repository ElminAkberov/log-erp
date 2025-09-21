import { Product } from '@/types/Product'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://logistic-erp-backend.onrender.com' }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => `/products`,
            providesTags: ['Products'],
        }),

        createProducts: builder.mutation<Product, Partial<Product>>({
            query: (body) => ({
                url: '/products',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Products'],
        }),
        editProducts: builder.mutation<Product, { id: string; data: Partial<Product> }>({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products"]
        }),

        deleteProducts: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
})

export const { useGetProductsQuery, useCreateProductsMutation, useDeleteProductsMutation, useEditProductsMutation } = productsApi