import { Router } from "express";
import { createNotes, deleteNotes, getAll, getNotes, updateNotes } from "../Controller/user.controller.js";

const router = Router()


router.post('/createNotes',createNotes)
router.get('/getNotes/:id',getNotes)
router.post('/update/:id',updateNotes)
router.delete('/deleteNotes/:id',deleteNotes)
router.get('/getall',getAll)

export default router