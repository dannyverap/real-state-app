import { IsNotEmpty ,IsString } from "class-validator";
import { LoginInput } from "../dto/LoginInput.dto";


export class SignupInput extends LoginInput {
    @IsString()
    @IsNotEmpty()
    phone: string;
}
