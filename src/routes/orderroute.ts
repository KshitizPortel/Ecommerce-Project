import express,{Router} from 'express'
import Authenticateuser from '../middleware/authmiddleware.js'
import {Role} from '../middleware/authmiddleware.js'
import errorhandler from '../services/errorasync.js'
import Ordercontroller from '../controllers/ordercontroller.js'
const router=express.Router()

router.route("/")
.post(Authenticateuser.isAuthenticated,errorhandler(Ordercontroller.createorder))
.get(Authenticateuser.isAuthenticated,errorhandler(Ordercontroller.getorder))
router.route("/verify/").post(Authenticateuser.isAuthenticated,errorhandler(Ordercontroller.verifytransaction))
router.route("/:id")
.get(Authenticateuser.isAuthenticated,errorhandler(Ordercontroller.getorderdetails))
.patch(Authenticateuser.isAuthenticated,Authenticateuser.restrictTo(Role.Customer),errorhandler(Ordercontroller.cancelorder))
export default router