import express, { NextFunction, Request, Response } from "express";

import { SignupInput } from "../dto/SignupInput.dto";
import { LoginInput } from "../dto/LoginInput.dto";
import { VerificationInput } from "../dto/VerificationInput.dto";
import { RequestValidator } from "../utils/requestValidator";
import { UserService } from "../service/userService";
import { UserRepository } from "../repository/user.Repository";
import { authSession } from "../middleware/authSession";
import { RequestExt } from "../interface/request.interface";

const router = express.Router()


export const userService = new UserService(new UserRepository())

router.post("/signup", async (req: Request, res: Response, next: NextFunction
) => {
    try {
        const { errors, input } = await RequestValidator(SignupInput, req.body)
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

router.post("/login", async (req: Request, res: Response, next: NextFunction
) => {
    try {
        const { errors, input } = await RequestValidator(LoginInput, req.body)
        if (errors) return res.status(400).json(errors)
        const token = await userService.LoginUser(input)
        return res.status(200).json(token)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
})

router.get("/verify", authSession, async (req: RequestExt, res: Response) => {
    try {
        await userService.GetVerificationCode(req.payload)
        return res.status(200).json("Verification code send, you have 30 minutes to validate")
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
})

router.post("/verify", authSession, async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const { errors, input } = await RequestValidator(VerificationInput, req.body)
        if (errors) return res.status(400).json(errors)
        await userService.VerifyUser(req.payload!.id, input)
        return res.status(200).json("User successfully verified.")
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
})

export default router