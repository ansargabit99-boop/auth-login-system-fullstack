import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import router from './ROUTES/auth.js'
import cors from 'cors'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth',router)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

const PORT = process.env.PORT || 5000


app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT} link: http://localhost:5000`)
})