import {  Length } from "class-validator";

export class ProfileInput {
    @Length(3, 32)
    firstName: string;

    @Length(3, 32)
    lastName: string;

}
