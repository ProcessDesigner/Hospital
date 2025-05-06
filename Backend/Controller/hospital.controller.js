import Bed from "../Model/Hospital/bed.model"
import Patient from "../Model/Hospital/patient.model"
import AppError from "../Utils/Apperror"

const createBed = async(req,res,next) =>{
    
}
const createPatient = async(req,res,next) =>{

}
const getallbeds = async(req,res,next) =>{
    const beds = Bed.find()

    if(!beds){
        return next(new AppError('no beds found',503))
    }

    res.status(200).json({
        success:true,
        message:'All beds',
        beds
    })
}
const getallpatients = async(req,res,next) =>{
    const patients = await Patient.find()
    if(!patients){
        return next(new AppError('no patients found',503))
    }

    res.staus(200).json({
        success:true,
        message:'All the patients',
        patients
    })
}
const deletePatient = async(req,res,next) =>{

}
const deletebed = async(req,res,next) =>{

}

export {
    deletePatient,
    deletebed,
    getallbeds,
    getallpatients,
    createBed,
    createPatient
}