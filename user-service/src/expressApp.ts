import express, { Request, Response } from "express";
import userRoutes from "./api/user.routes"

const app = express();
app.use(express.json())

app.use("/health", (req: Request, res: Response) => {
    return res.status(201).json("healthy")
})

app.use("/user", userRoutes)

export default app