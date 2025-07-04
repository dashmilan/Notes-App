import  express from "express"

import {createNote, getUserAllNotes, updateNote} from "../controllers/notes.js"


const router = express.Router()

export default  router

router.post("/create",createNote)
router.get("/get/:id",getUserAllNotes)
router.put("/update/:id",updateNote)