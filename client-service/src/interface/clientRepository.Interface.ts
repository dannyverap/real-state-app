import { ClientModel } from "../models/ClientModel";

export interface IClientRepository {
    CreateClient(data: ClientModel): Promise<ClientModel>;
    FindClient(mail: string): Promise<ClientModel>;
    FindClientById(id: number): Promise<ClientModel>;
    UpdateClient(id: number, data: ClientModel): Promise<ClientModel>;
}
