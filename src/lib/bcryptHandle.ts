import { hash, compare } from "bcryptjs";

export const encryptPassword = async (password: string) => {
    const hashPassword = await hash(password, 10)
    return hashPassword
}

export const comparePassword = async (password: string, hashPassword: string) => {
    const isValid = await compare(password, hashPassword)
    return isValid
}
