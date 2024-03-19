import { IClientRepository } from "../interface/clientRepository.Interface";


export class ClientService {
    private _repository: IClientRepository
    constructor(repository: IClientRepository) {
        this._repository = repository
    }

    async CreateClient(input: any) {
        const data = await this._repository.CreateClient(input)
        return data
    }
}