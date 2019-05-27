import { User } from "../user";

export interface IRegres {
    getUser(userId:number):Promise<User>;

    getAvatar(userId:number):Promise<Buffer>;

    getUsers(pageId:number):Promise<User[]>;
}