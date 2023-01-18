import { Posts } from '../interfaces/postsInterface'
import prisma from '../lib/prisma'

export const createPost = async (posts: Posts) => {
    const { title, content, userId } = posts
    const post = await prisma.post.create({
        data: {
            title,
            content,
            published: false,
            User: {
                connect: {
                    id: userId
                }
            }
        },
    })
    return post
}

export const allPosts = async () => {

    return await prisma.post.findMany({
        include: {
            User: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    })
}

export const onePost = async (id: string) => {
    const post = await prisma.post.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            content: true,
            published: true,
            User: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    })
    return post
}

export const updatePost = async (id: string, posts: Posts) => {
    const post = await prisma.post.update({
        where: { id },
        data: {
            title: posts.title,
            content: posts.content,
        }
    })
    return post
}

export const deletePost = async (id: string) => {
    await prisma.post.delete({
        where: { id }
    })
}