import { customersApi } from '@/services/customers/customersApi'
import { ordersApi } from '@/services/orders/ordersApi'
import { productsApi } from '@/services/products/productsApi'
import { shipmentsApi } from '@/services/shipments/shipmentsApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [customersApi.reducerPath]: customersApi.reducer,
        [shipmentsApi.reducerPath]: shipmentsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware, ordersApi.middleware, customersApi.middleware,shipmentsApi.middleware),
})

setupListeners(store.dispatch)