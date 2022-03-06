import { Product } from "./product";
import { UserDetail } from "./user-detail";

export class Cart {
    id:number;
    product = new Product();
    userDetail = new UserDetail()
    soluong:number;
}
