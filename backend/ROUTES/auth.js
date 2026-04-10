import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { protect } from '../middleware/auth.js'
import pool from '../config/db.js'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:'Lax',
    maxAge: 30*24*60*60*1000 //30 days
}
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}
//Register

router.post('/register',async (req,res)=>{
    const {name,email,password} = req.body

    if(!name || !password || !email){
        return res.status(400).json({message:'Please provide an password'})
    }
    const userExists = await pool.query('SELECT * FROM accounts WHERE email = $1',[email])
    if(userExists.rows.length > 0){
        return res.status(400).json({message:'user with this email is already registered'})
    }
    const hashedPass = await bcrypt.hash(password,10)
    const result = await pool.query('INSERT INTO accounts (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email',[name,email,hashedPass])
    const token = generateToken(result.rows[0].id)
    res.cookie('token',token,cookieOptions)
    return res.status(201).json({user:result.rows[0], token})
})
//Login
router.post('/login',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message: 'fill in the login'})
    }
    const user = await pool.query('SELECT * FROM accounts WHERE email=$1',[email])
    if(user.rows.length === 0) {
        return res.status(400).json({message:'Invalid credentials'})
    }
    const userData = user.rows[0]

    const isMatch = await bcrypt.compare(password,userData.password)
    if(!isMatch) {
        return res.status(400).json({message:'incorrect password'})
    }
    const token = generateToken(userData.id)

    res.cookie('token',token,cookieOptions)
    
    res.json({user:{id:userData.id,userName:userData.name,email:userData.email}})
})
router.get('/login',(req,res)=>{
 res.send('this is the login server page')
})
//Me
router.get('/me',protect,async(req,res) =>{
    res.json(req.user)
    //return info of user from protect user
})

router.post('/logout',(req,res)=>{
     res.cookie('token','',{...cookieOptions,maxAge: 1})
     res.json({message:'Logged out succesufully'})
})
export default router;