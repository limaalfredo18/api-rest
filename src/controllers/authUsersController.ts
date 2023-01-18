import { registerUser, loginUser } from "../lib/dbAuthUsers";
import { Request, Response } from 'express'

export const registerCtrl = async (req: Request, res: Response) => {

    try {
        const user = await registerUser(req.body.email, req.body.password, req.body.name)
        return res.status(201).json({ user })

    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const loginCtrl = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await loginUser(email, password)

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        return res.status(200).json({ user })

    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}