export interface Shipment {
  _id: string;
  orderId:
  | string
  | { _id: string; customerId: string; products: { productId: string, quantity: number, _id: string}[]; status: string };
  carrier: string;
  status: "Pending" | "Shipped" | "Delivered";
  estimatedDelivery: string;
  createdAt: string;
}