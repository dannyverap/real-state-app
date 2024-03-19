import { IsNotEmpty, IsNumber } from "class-validator";

export class VerificationInput {
    @IsNumber()
    @IsNotEmpty()
    verificationCode: number;
}
