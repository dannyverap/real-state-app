import express, { NextFunction, Request, Response } from "express";
import { SignUpInput } from "../dto/user.dto";
import { RequestValidator } from "../utils/requestValidator";
import { UserService } from "../service/userService";
import { UserRepository } from "../repository/user.Repository";

const router = express.Router()


export const userService = new UserService(new UserRepository())

router.post("/signup", async (req: Request, res: Response, next: NextFunction
) => {
    try {
        const { errors, input } = await RequestValidator(SignUpInput, req.body)
        if (errors) return res.status(400).json(errors)
        const data = await userService.SignUpUser(input)
        return res.status(201).json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
})

export default router