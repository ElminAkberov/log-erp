export interface Shipment {
  _id: string;
  orderId:
    | string
    | { _id: string; customerId: string; products: any[]; status: string };
  carrier: string;
  status: "Pending" | "Shipped" | "Delivered";
  estimatedDelivery: string;
  createdAt: string;
}