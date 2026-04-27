import express,{Router} from 'express'
import Authenticateuser,{Role} from '../middleware/authmiddleware.js'
import Productcontroller from '../controllers/productcontroller.js'
import {multer,storage} from '../middleware/multermiddleware.js'
const upload=multer({storage:storage})

const router:Router=express.Router()

router.route("/").post(Authenticateuser.isAuthenticated,Authenticateuser.restrictTo(Role.Admin),
upload.single('image'),Productcontroller.addProduct)

export default router