import express, { Response } from "express"
import { authSession } from "../middleware/authSession"
import { RequestExt } from "../interface/request.interface"
import { ClientCreateInput } from "../dto/ClientInput.dto"
import { RequestValidator } from "../utils/requestValidator"
import { ClientService } from "../service/clientService"
import { ClientRepository } from "../repository/client.Repository"
import { ClientUpdateInput } from "../dto/ClientUpdateInput.dto"

const router = express.Router()


export const clientService = new ClientService(new ClientRepository())

router.post("/", authSession, async (req: RequestExt, res: Response) => {

    try {
        const { errors, input } = await RequestValidator(ClientCreateInput, req.body)
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

router.get("/by-national-id", authSession, async (req: RequestExt, res: Response) => {
    try {
        const { national_id } = req.query;
        if (!national_id) {
            return res.status(400).json({ message: "National ID is required" });
        }
        const data = await clientService.GetClientByNationalId(String(national_id));
        return res.status(200).json(data);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});
router.get("/by-mail", authSession, async (req: RequestExt, res: Response) => {
    try {
        const { mail } = req.query;
        if (!mail) {
            return res.status(400).json({ message: "Email is required" });
        }
        const data = await clientService.GetClientByMail(String(mail));
        return res.status(200).json(data);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});
router.get("/:id", authSession, async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params
        const data = await clientService.GetClientById(+id);
        return res.status(200).json(data);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
}
)

router.get("/", authSession, async (req: RequestExt, res: Response) => {
    try {
        const limit = req.query.limit ? +req.query.limit : 10
        const offset = req.query.offset ? +req.query.offset : 0
        const data = await clientService.GetClients(limit, offset);
        return res.status(200).json(data);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message)
        };
        return res.status(500).json("Something when wrong");
    }
}
)

router.patch("/:id", authSession, async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params
        const { errors, input } = await RequestValidator(ClientUpdateInput, req.body)
        if (errors) return res.status(400).json(errors)
        const data = await clientService.UpdateClient(+id, input)
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