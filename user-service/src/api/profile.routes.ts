import express, { Response } from "express"
import { UserRepository } from "../repository/user.Repository"
import { ProfileService } from "../service/profileService"
import { RequestExt } from "../interface/request.interface"
import { ProfileInput } from "../dto/ProfileInput.dto"
import { RequestValidator } from "../utils/requestValidator"
import { authSession } from "../middleware/authSession"

const router = express.Router()


export const profileService = new ProfileService(new UserRepository())

router.post("/", authSession, async (req: RequestExt, res: Response) => {

    try {
        const { errors, input } = await RequestValidator(ProfileInput, req.body)

        if (errors) return res.status(400).json(errors)
        const id = req.payload?.id
        const profile = await profileService.CreateProfile(id!, input)
        return res.status(200).json(profile)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
})

router.get("/", authSession, async (req: RequestExt, res: Response) => {

    try {
        const id = req.payload?.id
        const profile = await profileService.GetProfile(id!)
        return res.status(200).json(profile)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
})

router.patch("/", authSession, async (req: RequestExt, res: Response) => {

    try {
        const { errors, input } = await RequestValidator(ProfileInput, req.body)

        if (errors) return res.status(400).json(errors)
        const id = req.payload?.id
        const profile = await profileService.EditProfile(id!, input)
        return res.status(200).json(profile)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
})

export default router