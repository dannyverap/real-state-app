
import { IClientRepository } from "../interface/clientRepository.Interface";
import { ClientModel } from "../models/ClientModel";
import { DBOperation } from "./dbOperation";

export class ClientRepository implements IClientRepository {
    _dbO: DBOperation
    constructor() {
        this._dbO = new DBOperation();
    }
    async FindClientByMail(mail: string): Promise<ClientModel> {
        const queryString = `
        SELECT *
        FROM clients
        WHERE mail=$1`
        const values = [mail];
        const results = await this._dbO.executeQuery(queryString, values);
        if (results.rowCount) {
            return results.rows[0] as ClientModel;
        }
        return {} as ClientModel
    }
    async FindClientByNationalId(national_id: string): Promise<ClientModel> {
        const queryString = `
        SELECT *
        FROM clients
        WHERE national_id=$1`
        const values = [national_id];
        const results = await this._dbO.executeQuery(queryString, values);
        if (results.rowCount) {
            return results.rows[0] as ClientModel;
        }
        return {} as ClientModel
    }
    async FindClients(limit: number, offset: number): Promise<ClientModel[]> {
        const queryString = `
        SELECT *
        FROM clients
        LIMIT $1
        OFFSET $2
        `;
        const values = [limit, offset];
        const results = await this._dbO.executeQuery(queryString, values);

        if (results.rowCount) {
            return results.rows as ClientModel[];
        }
        return {} as ClientModel[]
    }
    async CreateClient({ phone, mail, first_name, last_name, profile_pic, national_id }: ClientModel): Promise<ClientModel> {
        const queryString = `
        INSERT INTO clients(phone, mail, first_name, last_name, profile_pic, national_id) 
        VALUES($1,$2,$3,$4,$5,$6) 
        RETURNING *`;
        const values = [phone, mail, first_name, last_name, profile_pic, national_id];
        const results = await this._dbO.executeQuery(queryString, values);

        if (results.rowCount) {
            return results.rows[0] as ClientModel;
        }
        return {} as ClientModel
    }
    async FindClientById(client_id: number): Promise<ClientModel> {
        const queryString = `
        SELECT *
        FROM clients
        WHERE client_id=$1`
        const values = [client_id];
        const results = await this._dbO.executeQuery(queryString, values);
        if (results.rowCount) {
            return results.rows[0] as ClientModel;
        }
        return {} as ClientModel
    }
    async UpdateClient(id: number, { phone, mail, profile_pic }: ClientModel): Promise<ClientModel> {
        const queryString = `
        UPDATE 
            clients
        SET 
            phone=$2,
            mail=$3,
            profile_pic=$4
        WHERE 
            client_id=$1 
        RETURNING *`;
        const values = [id, phone, mail, profile_pic];
        const results = await this._dbO.executeQuery(queryString, values);
        return results.rowCount ? results.rows[0] : {} as ClientModel;
    }

}

