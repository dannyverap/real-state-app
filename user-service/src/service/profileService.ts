import { IUserRepository } from "../interface/userRepository.Interface"


export class ProfileService {
    private _repository: IUserRepository
    constructor(repository: IUserRepository) {
        this._repository = repository
    }

    async CreateProfile(id: number, input: any) {

        const user = await this._repository.FindUserById(id)
        const data = await this._repository.UpdateUser(
            id, {
            ...user,
            first_name: input.firstName,
            last_name: input.lastName
        })
        return data
    }
    async GetProfile(id: number) {
        return await this._repository.FindUserById(id)
    }

    async EditProfile(id: number, input: any) {
        const user = await this._repository.FindUserById(id)
        const data = await this._repository.UpdateUser(
            id, {
            ...user,
            first_name: input.firstName,
            last_name: input.lastName
        })
        return data
    }

}