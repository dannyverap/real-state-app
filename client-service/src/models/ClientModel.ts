
export class ClientModel {
    constructor(
        public readonly phone: string,
        public readonly mail: string,
        public readonly first_name: string,
        public readonly last_name: string,
        public readonly verified: boolean,
        public readonly national_id: string,
        public readonly profile_pic?: string,
        public readonly client_id?: number,
    ) { }
}