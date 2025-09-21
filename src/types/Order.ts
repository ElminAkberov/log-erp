export interface Order {
    _id: string
    customerId: { _id: string, name: string, email: string, phone: string, __v: number }
    products: { productId: string; quantity: number, _id: string }[];
    status: "pending" | "shipped" | "canceled"
    createdAt: Date;
}