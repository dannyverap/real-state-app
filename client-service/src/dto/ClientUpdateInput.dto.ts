import { IsEmail, IsString, Length, IsOptional, IsBoolean } from "class-validator";

export class ClientUpdateInput {
    @IsEmail()
    mail: string;

    @IsString()
    phone: string;

    @IsString()
    @IsOptional()
    profile_pic?: string;
}
