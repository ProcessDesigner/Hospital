import { Schema,model } from "mongoose";

const notesSchema = new Schema({
    content:{type:String},
    title: { type: String},
    tags: [{ type: String }],     
    date:{type:String},

})

const Notes = model('Notes',notesSchema)
export default Notes