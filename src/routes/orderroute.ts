import express,{Router} from 'express'
import Authenticateuser from '../middleware/authmiddleware.js'
import errorhandler from '../services/errorasync.js'
import Ordercontroller from '../controllers/ordercontroller.js'
const router=express.Router()

router.route("/")
.post(Authenticateuser.isAuthenticated,errorhandler(Ordercontroller.createorder))

export default router