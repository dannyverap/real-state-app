
import { IUserRepository } from "../interface/userRepository.Interface";
import { CreateHashedPassword, GenerateSalt, GenerateToken, GenerateVerificationCode, VerifyPassword } from "../utils/auth";
import { SendVerificationCode } from "../utils/mailer";

export class UserService {

    private _repository: IUserRepository
    constructor(repository: IUserRepository) {
        this._repository = repository
    }

    async SignUpUser(input: any) {
        const salt = await GenerateSalt()
        const hashedPassword = await CreateHashedPassword(input.password, salt)

        const data = await this._repository.CreateUser({
            ...input,
            password: hashedPassword,
            salt,
        })
        if (!data.id) throw new Error("unable to create user")
        return data
    }

    async LoginUser(input: any) {
        const user = await this._repository.FindUser(input.mail)
        if (!user) {
            throw new Error("user or password incorrect")
        }
        const validPassword = await VerifyPassword(input.password, user.password)
        if (!validPassword) {
            throw new Error("user or password incorrect")
        }
        const token = GenerateToken(user)
        return token
    }

    async GetVerificationCode(input: any) {
        const user = await this._repository.FindUserById(input.id)
        if (user.verified) {
            throw new Error("user already verified")
        }
        const { verification_code, expiry } = GenerateVerificationCode()
        this._repository.UpdateUser(
            input.id, { ...user, verification_code, expiry }
        )
        SendVerificationCode(user.mail, verification_code)

        return { verification_code, expiry }
    }

    async VerifyUser(id: number, input: any) {
        const user = await this._repository.FindUserById(id)
        if (!user) {
            throw new Error("User not found");
        }
        if (user.verified) {
            throw new Error("User already verified");
        }
        if (!user.verification_code) {
            throw new Error("Verification code is missing. Please request a code")
        }
        if (user.verification_code !== input.verification_code) {
            throw new Error("Incorrect verification code")
        }
        if (user.expiry!.getTime() < Date.now()) {
            throw new Error("code is expired ")
        }

        this._repository.UpdateUser(
            id, { ...user, verified: true })

        return "sucess"
    }
}