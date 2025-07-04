import  express from "express"
import {createPost, verityUser} from "../controllers/post.js";
import {verifyToken} from "../middleware/verify.js";
const router = express.Router()

export default  router

router.post("/create",createPost)
router.get("/get",verifyToken,verityUser)

