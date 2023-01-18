import { Router } from "express";
import { getCreatePost, getDeletePost, getPost, getPosts, getUpdatePost } from "../controllers/postsController";
import { session } from "../middleware/session";


const postsRoutes = Router()

postsRoutes.route('/posts').post(getCreatePost).get(session, getPosts)
postsRoutes.route('/posts/:id').get(getPost).put(getUpdatePost).delete(getDeletePost)

export default postsRoutes