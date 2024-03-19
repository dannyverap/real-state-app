import { IsEmail, IsString, Length, IsOptional, IsBoolean } from "class-validator";

export class ClientInput {
    @IsEmail()
    mail: string;

    @IsString()
    phone: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;
    
    @IsString()
    @Length(7,15)
    national_id: string;
    
    @IsString()
    @IsOptional()
    profile_pic?: string;

    @IsBoolean()
    @IsOptional()
    verified?: boolean;


    @IsOptional()
    client_id?: number;
}
