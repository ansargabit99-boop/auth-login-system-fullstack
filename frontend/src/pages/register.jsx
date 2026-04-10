import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Register = ()=>{
    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [password,setPassoword] = useState('')
    const [email,setEmail] = useState('')
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const result = await fetch('http://localhost:5000/api/auth/register',{ 
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            },
            credentials:"include",
            body: JSON.stringify({name:name,email:email,password:password})
        })
        const data = await result.json()
        if(!result.ok){
            return console.log(data.message)
        } 
        console.log('Succes',data)
        navigate('/me')
    }
    return <form className="p-6 flex w-100 mx-auto justify-center items-center h-screen gap-1 flex-col" onSubmit={handleSubmit}>
        
        <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder="type your name" className=" bg-white w-60 p-3 rounded-3xl"/>
        <input value={email} placeholder="type your email" className=" bg-white w-60 p-3 rounded-3xl" type="email" 
        onChange={(e)=>{setEmail(e.target.value)}}
        />
        <input value={password} onChange={e=>setPassoword(e.target.value)} placeholder="type your password" className=" bg-white w-60 p-3 rounded-3xl" type="password" />
        <button type="submit"  className="bg-blue-400 w-60 p-3 rounded-3xl">REGISTER</button>
    </form>
}
export default Register;