import { ClientModel } from "../models/ClientModel";

export interface IClientRepository {
    CreateClient(data: ClientModel): Promise<ClientModel>;
    FindClientById(client_id: number): Promise<ClientModel>;
    FindClientByNationalId(national_id: string): Promise<ClientModel>;
    FindClientByMail(mail: string): Promise<ClientModel>;
    FindClients(limit: number, offset: number): Promise<ClientModel[]>;
    UpdateClient(id: number, data: ClientModel): Promise<ClientModel>;
}
