import express, { Request, Response } from "express";
import userRoutes from "./api/user.routes"
import { authSession } from "./middleware/authSession"
import { RequestExt } from "./interface/request.interface";

const app = express();
app.use(express.json())

app.use("/health", (req: Request, res: Response) => {
    return res.status(201).json("healthy")
})
app.get("/checkPayload", authSession, (req: RequestExt, res: Response) => {
    return res.status(200).json(req.payload)
})

app.use("/user", userRoutes)

export default app