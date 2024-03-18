import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class LoginInput {
    @IsEmail()
    mail: string;
    @IsString()
    @Length(5, 20)
    password: string;
}

export class SignUpInput extends LoginInput {
    @IsString()
    @IsNotEmpty()
    phone: string;
}

export class VerificationInput {
    @IsNumber()
    @IsNotEmpty()
    verification_code: number;
}
