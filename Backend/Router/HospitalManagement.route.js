import { Router } from "express";
const router = Router()

router.post('/createPatient',createPatient)
router.post('/createBed',createBed)

router.get('/getallbeds',getallbeds)
router.get('/getallpatients',getallpatients)

router.delete('/deletePatient',deletePatient)
router.delete('/deletebed',deletebed)



export default router