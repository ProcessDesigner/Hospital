import mongoose from "mongoose";

const MONGODBURI = 'mongodb://localhost:27017/pracs'

const dbConnection = async()=>{
    const {connection} = await mongoose.connect(MONGODBURI)
    try {
        if(connection){
            console.log(`connected to ${connection.host}`);
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default dbConnection;