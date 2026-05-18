import express,{Router} from 'express'
import authenticateuser from '../middleware/authmiddleware.js'
import cartcontroller from '../controllers/cartcontroller.js'
const router:Router=express.Router()

router.route("/")
.post(authenticateuser.isAuthenticated,cartcontroller.addtocart)
.get(authenticateuser.isAuthenticated,cartcontroller.getallitems)

router.route("/:id")
.delete(authenticateuser.isAuthenticated,cartcontroller.deletecart)
.patch(authenticateuser.isAuthenticated,cartcontroller.updatecart)

export default router