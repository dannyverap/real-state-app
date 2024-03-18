import { Role } from "@prisma/client"
export interface payload {
    id: number,
    mail: string,
    user_type: Role
}