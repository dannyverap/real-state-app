
import { IUserRepository } from "../interface/userRepository.Interface";

export class UserService {

    private _repository: IUserRepository
    constructor(repository: IUserRepository) {
        this._repository = repository
    }

    async SignUpUser(input: any) {
        const data = await this._repository.CreateUser({
            ...input,
            salt: "1233"
        })
        if (!data.id) throw new Error("unable to create user")
        return data
    }
}