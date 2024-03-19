
import { IClientRepository } from "../interface/clientRepository.Interface";
import { ClientModel } from "../models/ClientModel";
import { DBOperation } from "./dbOperation";

export class ClientRepository implements IClientRepository {
    _db: DBOperation
    constructor() {
        this._db = new DBOperation();
    }
    async CreateClient({  phone, mail, first_name, last_name, profile_pic, national_id }: ClientModel): Promise<ClientModel> {
        const queryString = `
        INSERT INTO clients(phone, mail, first_name, last_name, profile_pic, national_id) 
        VALUES($1,$2,$3,$4,$5,$6) 
        RETURNING *`;
        const values = [ phone, mail, first_name, last_name, profile_pic,national_id];
        const results = await this._db.executeQuery(queryString, values);

        if (results.rowCount) {
            return results.rows[0] as ClientModel;
        }
        return {} as ClientModel
    }
    FindClient(mail: string): Promise<ClientModel> {
        throw new Error("Method not implemented.");
    }
    FindClientById(id: number): Promise<ClientModel> {
        throw new Error("Method not implemented.");
    }
    UpdateClient(id: number, data: ClientModel): Promise<ClientModel> {
        throw new Error("Method not implemented.");
    }

}

