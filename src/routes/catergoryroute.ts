import express,{Router} from 'express'
import authmiddleware ,{Role} from '../middleware/authmiddleware.js'
import catergorycontroller from '../controllers/catergorycontroller.js'

const router:Router=express.Router()
router.route("/")
.post(authmiddleware.isAuthenticated,authmiddleware.restrictTo(Role.Admin),catergorycontroller.addcatergories)
.get(catergorycontroller.getcatergory)

router.route("/:id")
.patch(authmiddleware.isAuthenticated,authmiddleware.restrictTo(Role.Admin),catergorycontroller.updatecatergory)
.delete(authmiddleware.isAuthenticated,authmiddleware.restrictTo(Role.Admin),catergorycontroller.deletecatergory)


export default router