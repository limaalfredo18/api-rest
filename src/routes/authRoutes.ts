import { Router } from 'express'
import { registerCtrl, loginCtrl } from '../controllers/authUsersController'


const authUserRoute = Router()

authUserRoute.route('/auth/register').post(registerCtrl)
authUserRoute.route('/auth/login').post(loginCtrl)

export default authUserRoute