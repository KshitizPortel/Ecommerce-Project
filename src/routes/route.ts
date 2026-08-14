import express,{Router}  from 'express'
import AuthenticateUser from '../controllers/control.js'
import errorhandler from '../services/errorasync.js'
import authmiddleware, { Role } from '../middleware/authmiddleware.js'
const router:Router=express.Router()

router.route('/register')
// .post(errorhandler(AuthenticateUser.registeruser))
.post(AuthenticateUser.registeruser)

router.route('/login')
.post(errorhandler(AuthenticateUser.loginuser))

router.route('/users')
.get(authmiddleware
.isAuthenticated,authmiddleware.restrictTo(Role.Admin),errorhandler(AuthenticateUser.fetchusers ))

export default router