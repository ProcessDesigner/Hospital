import { Router } from "express";
import { createBed, createPatient, deletePatient, deletebed, getallbeds, getallpatients, updateBed } from "../Controller/hospital.controller.js";
const router = Router()

router.post('/createPatient',createPatient)
router.post('/createBed',createBed)

router.get('/getallbeds',getallbeds)
router.get('/getallpatients',getallpatients)

router.delete('/deletePatient/:patientid',deletePatient)
router.delete('/deletebed/:id',deletebed)

router.get('/updatebed/:id',updateBed)


export default router