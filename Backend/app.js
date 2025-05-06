import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRoutes from './Router/User.route.js'
import hospitalRoutes from './Router/HospitalManagement.route.js'
import errorMiddlware from './Middleware/error.middleware.js'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.urlencoded({encoded:true}))

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}
))


app.use(errorMiddlware)


app.use('/api/v1/user',userRoutes)
app.use('/api/v1/hospital',hospitalRoutes)
export default app;