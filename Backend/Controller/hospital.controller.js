import Bed from "../Model/Hospital/bed.model.js"
import Patient from "../Model/Hospital/patient.model.js"
import AppError from "../Utils/Apperror.js"

const createBed = async(req,res,next) =>{
    try {
        const { id, type, ward } = req.body;
        console.log(req.body)
        const existingBed = await Bed.findOne({ id });
        if (existingBed) {
            return res.status(400).json({ message: "Bed ID already exists" });
        }

        const bed = new Bed({
            id,
            type,
            ward,
            isOccupied: false
        });

        await bed.save();
        res.status(201).json({success:true, message: "Bed created successfully", bed });
    } catch (error) {
        next(error);
    }
}
const createPatient = async(req,res,next) =>{
    try {
        const { patientid, name, age, gender, condition, id } = req.body;

        // Check if bed is available
        const bed = await Bed.findOne({ id });
        if (!bed) {
            return next(new AppError('bed not found',503))
        }
        if (bed.isOccupied) {
            return next(new AppError('Bed Already occupied',503))
        }

        const patient = new Patient({
            patientid,
            name,
            age,
            gender,
            condition,
            bedid,
            admissionTime: new Date(),
            dischargeTime: null
        });

        await patient.save();

        bed.isOccupied = true;
        await bed.save();

        res.status(201).json({success:true, message: "Patient admitted successfully", patient });
    } catch (error) {
        return next(new AppError(error,503))
    }
}
const getallbeds = async (req, res, next) => {
    try {
        const beds = await Bed.find();

        if (!beds || beds.length === 0) {
            return next(new AppError('No beds found', 503));
        }

        res.status(200).json({
            success: true,
            message: 'All beds',
            beds
        });
    } catch (error) {
        next(error);
    }
};

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
    try {
        const { patientid } = req.params;

        const patient = await Patient.findOne({ patientid });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Mark bed as unoccupied
        const bed = await Bed.findOne({ bedid: patient.bedid });
        if (bed) {
            bed.isOccupied = false;
            await bed.save();
        }

        // Update dischargeTime (optional, else use .deleteOne)
        patient.dischargeTime = new Date();
        await patient.save();

        // Optionally delete the patient record:
        // await Patient.deleteOne({ patientid });

        res.status(200).json({ message: "Patient discharged successfully", patient });
    } catch (error) {
        next(error);
    }
}
const deletebed = async(req,res,next) =>{
    try {
        const { id } = req.params;

        const bed = await Bed.findOne({ id });
        if (!bed) {
            return res.status(404).json({ message: "Bed not found" });
        }

        if (bed.isOccupied) {
            return res.status(400).json({ message: "Cannot delete an occupied bed" });
        }

        await Bed.deleteOne({ id });
        res.status(200).json({ message: "Bed deleted successfully" });
    } catch (error) {
        next(error);
    }
}

const updateBed = async(req,res,next) =>{
    const {id} = req.params
    const bed = await Bed.findOne({id});

    if(!bed){
        return next(new AppError('no bed Found',503))
    }

    bed.isOccupied = !bed.isOccupied;

    await bed.save()
    res.status(200).json({
        success:true,
        message:'Bed is occupied now ',
        beds:bed
    })
}

export {
    deletePatient,
    deletebed,
    getallbeds,
    getallpatients,
    createBed,
    createPatient,
    updateBed
}