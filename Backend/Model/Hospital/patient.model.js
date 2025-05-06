import { Schema,model } from "mongoose";

const patientSchema = new Schema({
    patientid:{type:String},
    name:{type:String},
    age:{type:Number},
    gender:{type:String},
    condition:{type:String},
    bedid:{type:String},
    admissionTime:{type:Date},
    dischargeTime:{type:Date},
})

const Patient = model('Patient',patientSchema)
export default Patient;