import { NextFunction, Response } from "express";
import { VerifyToken } from "../utils/auth"
import { RequestExt } from "../interface/request.interface";

const authSession = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization || "";
        const tokenParts = authorizationHeader.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            res.status(401);
            res.send("Invalid token");
            return;
        }
        const token = tokenParts[1]; // Obtener el token JWT real
        const verifiedToken = VerifyToken(token);

        if (!verifiedToken) {
            res.status(401);
            res.send("Unauthorized");
        } else {
            req.payload = verifiedToken;
            next();
        }
    } catch (error) {
        res.status(400);
        res.send(error);
    }
};

export { authSession };
