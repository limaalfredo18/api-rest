import dotenv from 'dotenv'
import { sign, verify } from 'jsonwebtoken'

dotenv.config()

export const generateToken = async (email: string) => {
    const token = await sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
    return token
}

export const verifyToken = async (token: string) => {
    const isUserValid = await verify(token, process.env.JWT_SECRET as string)
    return isUserValid
}