import prisma from './prisma'
import { Users } from '../interfaces/usersInterface'

export const allUsers = async () => {
    return await prisma.user.findMany({})
}

export const updateUser = async (id: string, users: Users) => {
    const { name, email } = users
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            name,
            email

        },
    })
    return user
}

export const oneUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    })
    return user
}

export const deleteUser = async (id: string) => {
    await prisma.user.delete({
        where: { id }
    })
}