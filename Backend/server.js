import dbConnection from "./Model/dbConnection.js";
import app from "./app.js";

const PORT = 5032

app.listen(
    PORT,
    async()=>{
        await dbConnection()
        console.log(`connected to http://localhost:${PORT}`);
    }
)