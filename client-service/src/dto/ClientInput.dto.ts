import { IsEmail, IsString, Length, IsOptional, IsBoolean } from "class-validator";
import { ClientUpdateInput } from "./ClientUpdateInput.dto";

export class ClientCreateInput extends ClientUpdateInput {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    @Length(7, 15)
    national_id: string;

    @IsBoolean()
    @IsOptional()
    verified?: boolean;

    @IsOptional()
    client_id?: number;
}
