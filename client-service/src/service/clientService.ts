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
    async GetClients(limit: number, offset: number) {
        const data = await this._repository.FindClients(limit, offset)
        return data
    }
    async GetClientById(client_id: number) {
        const data = await this._repository.FindClientById(client_id)
        return data
    }
    async GetClientByNationalId(national_id: string) {
        const data = await this._repository.FindClientByNationalId(national_id)
        return data
    }
    async GetClientByMail(mail_id: string) {
        const data = await this._repository.FindClientByMail(mail_id)
        return data
    }
    async UpdateClient(id: number, input: any) {
        const data = await this._repository.UpdateClient(id, input)
        return data
    }
}