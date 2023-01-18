import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../lib/jwtHandle";

interface RequestExt extends Request {
    user?: string | JwtPayload
}

export const session = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const userToken = await req.headers.authorization;

        const token = await userToken?.split(" ")[1];

        const userValid = await verifyToken(`${token}`);
        console.log(userValid)

        if (!userValid) return res.status(401).json({ message: "Unauthorized" })

        req.user = userValid;

        next()

    } catch (err: any) {
        return res.status(401).json({ message: err.message });
    }
}