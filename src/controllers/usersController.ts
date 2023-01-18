import { Request, Response } from 'express'
import { allUsers, oneUser, updateUser, deleteUser } from '../lib/dbUsers'
import { JwtPayload } from 'jsonwebtoken'

interface RequestExt extends Request {
    user?: string | JwtPayload
}

export const getUsers = async (req: RequestExt, res: Response) => {
    try {
        const users = await allUsers()
        return res.status(200).json({ users, user: req.user })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const getUpdateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req
    try {
        const user = await updateUser(id, body)
        return res.status(200).json(user)
    } catch (err: any) {
        return res.status(400).json({ message: err.message })
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await oneUser(id)
        return res.status(200).json(user)
    } catch (err: any) {
        return res.status(400).json({ message: err.message })
    }
}

export const getDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await deleteUser(id)
        return res.status(200).json({ message: `User with id ${id} was deleted` })
    } catch (err: any) {
        return res.status(400).json({ message: err.message })
    }
}


