import { IUserRepository } from "../interface/userRepository.Interface";
import { User } from "../models/user.model";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

export class UserRepository implements IUserRepository {

    _prisma: PrismaClient
    constructor() {
        this._prisma = new PrismaClient()
    }

    async CreateUser(data: User): Promise<User> {
        try {
            const createdUser = await this._prisma.user.create({ data });
            return createdUser;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new Error("there is a unique constraint violation, a new user cannot be created with this mail")
                }
            }
            throw error
        }
    }


    async FindUser(mail: string): Promise<User> {
        const user = await this._prisma.user.findFirst({ where: { mail } })
        if (!user) throw Error("User not found")
        return Promise.resolve(user)
    }
    async FindUserById(id: number): Promise<User> {
        const user = await this._prisma.user.findFirst({ where: { id } })
        if (!user) throw Error("User not found")
        return Promise.resolve(user)
    }
    async UpdateUser(data: User): Promise<User> {
        return this._prisma.user.update({
            where: { id: data.id },
            data
        })
    }

}