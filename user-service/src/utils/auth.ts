import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model"
import "dotenv/config";
import { payload } from "../interface/payload.interface";

export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

const JWT_SECRET = process.env.JWT_SECRET || ""
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

export const CreateHashedPassword = async (password: string, salt: string): Promise<string> => {
    return await bcrypt.hash(password, salt)
}

export const VerifyPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

export const GenerateToken = ({ id, mail, user_type }: UserModel): string => {
    return jwt.sign(
        {
            id,
            mail,
            user_type,
        },
        JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );
}


export const VerifyToken = (token: string): payload | false => {
    try {
        if (token !== "") {
            const payload = jwt.verify(token, JWT_SECRET);
            return payload as payload;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const GenerateVerificationCode = () => {
    const verification_code = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { verification_code, expiry };
}
