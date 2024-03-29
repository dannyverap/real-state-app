import { IsEmail, IsString, Length } from "class-validator";

export class LoginInput {
    @IsEmail()
    mail: string;
    @IsString()
    @Length(5, 20)
    password: string;
}
