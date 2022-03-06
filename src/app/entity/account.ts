import { UserDetail } from "./user-detail";

export class Account {
    uid: number;
    email: string;
    password: string;
    state: number;
    userDetail:UserDetail
}