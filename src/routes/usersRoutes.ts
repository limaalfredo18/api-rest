import express from 'express'
import { getUsers, getUpdateUser, getUser, getDeleteUser } from '../controllers/usersController'
//import { validateUser } from '../lib/usersValidator'
import { session } from '../middleware/session'



const usersRoutes = express.Router()

usersRoutes.route('/users').get(session, getUsers)
usersRoutes.route('/users/:id').get(getUser).put(getUpdateUser).delete(getDeleteUser)

export default usersRoutes