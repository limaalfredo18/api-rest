import { allPosts, createPost, updatePost, onePost, deletePost } from '../lib/dbPosts';
import { Request, Response } from 'express';



export const getCreatePost = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const newPost = await createPost(body);
        return res.status(201).json(newPost);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }

}

export const getPosts = async (_req: Request, res: Response) => {

    try {
        const posts = await allPosts()
        return res.status(200).json(posts)
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const post = await onePost(id)

        return res.status(200).json(post)
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const getUpdatePost = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req

    try {
        const post = await updatePost(id, body)
        return res.status(200).json({ post })
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const getDeletePost = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await deletePost(id)
        return res.status(200).json({ message: `Post with id ${id} was deleted` })
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}