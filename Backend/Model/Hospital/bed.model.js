import { Schema,model } from "mongoose";

const bedSchema = new Schema({
    id:{type:String},
    type:{type:String},
    ward:{type:String},
    isOccupied:{type:Boolean, default:false}
})

const Bed = model('Bed',bedSchema)
export default Bed;