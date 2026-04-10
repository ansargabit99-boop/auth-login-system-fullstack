import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

export const protect = async (req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.json({message:'No authorised No token'})
        }
        const decoded  = jwt.verify(token,process.env.JWT_SECRET)
        const user = await pool.query('SELECT id, name, email FROM accounts WHERE id = $1',[decoded.id])

        if(user.rows.length === 0){
            return res.json({message:'the user not found'})
        }
        req.user = user.rows[0]
        next()
    } catch (error) {
        console.log('error detected',error)
        res.status(401).json({message:'Not authorised token failed'})
    }
}