import { Router } from "express"
import { login, logout, currentEmployee, signup, updateDetails, updatePassword } from "../controllers/employeer.controller.js"
import empAuth from "../middlewares/empAuth.middlewares.js";

const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").get(empAuth, logout)
router.route("/current-employee").get(empAuth, currentEmployee)
router.route("/update").patch(empAuth, updateDetails)
router.route("/update-password").patch(empAuth, updatePassword)

export default router