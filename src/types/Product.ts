export interface Product {
    _id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    __v?: number;
}