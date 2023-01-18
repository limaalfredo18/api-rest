import { encryptPassword, comparePassword } from './bcryptHandle'
import { generateToken } from './jwtHandle'
import prisma from './prisma'

export const registerUser = async (email: string, password: string, name: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (user) {
        throw new Error('User already exists')
    }

    const hashPassword = await encryptPassword(password)

    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashPassword,
            name
        }
    })
    return newUser
}

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    if (!user) {
        throw new Error('Invalid credentials')
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
        throw new Error('Invalid credentials')
    }

    const jwt = await generateToken(user.email)
    const data = { user, jwt }
    return data
}