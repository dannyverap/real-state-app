import { UserModel } from "../models/user.model";

export interface IUserRepository {
    CreateUser(data: UserModel): Promise<UserModel>;
    FindUser(mail: string): Promise<UserModel>;
    FindUserById(id: number): Promise<UserModel>;
    UpdateUser(id: number, data: UserModel): Promise<UserModel>;
}