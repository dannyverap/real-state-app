import express, { Request, Response } from "express";
 import clientRoutes from "./api/client.routes"
import { RequestExt } from "./interface/request.interface";
import { authSession } from "./middleware/authSession";

const app = express();
app.use(express.json())

app.use("/health", (req: Request, res: Response) => {
    return res.status(201).json("healthy")
})
app.get("/checkPayload", authSession, (req: RequestExt, res: Response) => {
    return res.status(200).json(req.payload)
})

app.use("/client", clientRoutes)

export default app