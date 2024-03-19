import express, { Response } from "express"
import { authSession } from "../middleware/authSession"
import { RequestExt } from "../interface/request.interface"
import { ClientInput } from "../dto/ClientInput.dto"
import { RequestValidator } from "../utils/requestValidator"
import { ClientService } from "../service/clientService"
import { ClientRepository } from "../repository/client.Repository"

const router = express.Router()


export const clientService = new ClientService(new ClientRepository())

router.post("/", authSession, async (req: RequestExt, res: Response) => {

    try {
        const { errors, input } = await RequestValidator(ClientInput, req.body)
        if (errors) return res.status(400).json(errors)
        const data = await clientService.CreateClient(input)
        return res.status(201).json(data);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
}
)

export default router