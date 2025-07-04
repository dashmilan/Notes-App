import  express from "express"
import {auth, login, registerUser} from "../controllers/auth.js";
import {update} from "../controllers/user.js";

const router = express.Router()

router.get("/",auth)

router.post("/register",registerUser)
router.post("/login",login)
router.post("/:id",update)


export default  router