import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validationResult(req).throw()
        return next()

    } catch (err: any) {
        return res.status(403).json({ errors: err.array() });
    }
}


export const validateUser = [
    body("name").isString(),
    body("email").exists().isString().isEmail(),
    body("password").exists().isString(),
    body("published").isBoolean(),
    async (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
]