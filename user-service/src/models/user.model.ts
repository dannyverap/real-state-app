import { Role } from "@prisma/client"

export class UserModel {
    constructor(
        public readonly phone: string,
        public readonly mail: string,
        public readonly password: string,
        public readonly salt: string,
        public readonly user_type: Role,
        public readonly verification_code: number | null,
        public readonly expiry: Date | null,
        public readonly verified: boolean,
        public readonly first_name: string | null,
        public readonly last_name: string | null,
        public readonly id?: number,
    ) { }
}