import { User } from "../models/user.model";

export interface IUserRepository {
    CreateUser(data: User): Promise<User>;
    FindUser(mail: string): Promise<User>;
    FindUserById(id:number): Promise<User>;
    UpdateUser(data: User): Promise<User>;
}