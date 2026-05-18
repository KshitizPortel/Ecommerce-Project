import express,{Router} from 'express'
import Authenticateuser,{Role} from '../middleware/authmiddleware.js'
import Productcontroller from '../controllers/productcontroller.js'
import {multer,storage} from '../middleware/multermiddleware.js'
import catergoryclass from '../controllers/catergorycontroller.js'
const upload=multer({storage:storage})

const router:Router=express.Router()

router.route("/")
.post(Authenticateuser.isAuthenticated,Authenticateuser.restrictTo(Role.Admin),
upload.single('image'),Productcontroller.addProduct)
.get(Productcontroller.getallproducts)
// get single product
router.route("/:id").get(Productcontroller.getsingleproduct)

// update the product:
router.route("/:id").patch(Authenticateuser.isAuthenticated,Authenticateuser.restrictTo(Role.Admin),
upload.single('image'),Productcontroller.updatesingleproduct)

// delete single product
router.route("/:id")
.delete(Authenticateuser.isAuthenticated,Authenticateuser.restrictTo(Role.Admin),Productcontroller.deletesingleproduct)

export default router