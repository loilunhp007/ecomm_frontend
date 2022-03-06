import { Order } from "./order";
import { Product } from "./product";
import { Transport } from "./transport";

export class OrderDetail {
    orderID:string
    productID:string
    quantity:number;
    price:number;
    deliveryAddress:string;
    destination:string;
    totalItem:number;
    userPay:number;
    transport:Transport;
    product:Product;
    order:Order;
}
