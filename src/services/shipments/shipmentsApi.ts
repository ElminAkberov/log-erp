// services/shipments/shipmentsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Shipment } from "@/types/Shipments"; // Shipment tipi yaradılıbsa import et

export const shipmentsApi = createApi({
  reducerPath: "shipmentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://logistic-erp-backend.onrender.com",
  }),
  tagTypes: ["Shipments"],
  endpoints: (builder) => ({
    getShipments: builder.query<Shipment[], void>({
      query: () => "/shipments",
      providesTags: ["Shipments"],
    }),
    getShipmentById: builder.query<Shipment, string>({
      query: (id) => `/shipments/${id}`,
      providesTags: (result, error, id) => [{ type: "Shipments", id }],
    }),
    createShipment: builder.mutation<Shipment, Partial<Shipment>>({
      query: (body) => ({
        url: "/shipments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Shipments"],
    }),
    updateShipment: builder.mutation<Shipment, { id: string; data: Partial<Shipment> }>({
      query: ({ id, data }) => ({
        url: `/shipments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Shipments", id }],
    }),
    deleteShipment: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/shipments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shipments"],
    }),
  }),
});

export const {
  useGetShipmentsQuery,
  useGetShipmentByIdQuery,
  useCreateShipmentMutation,
  useUpdateShipmentMutation,
  useDeleteShipmentMutation,
} = shipmentsApi;
