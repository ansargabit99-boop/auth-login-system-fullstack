import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const result = await fetch('http://localhost:5000/api/auth/login',{
            method: 'POST',
            credentials:'include',
            headers: {
                "Content-type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const data = await result.json()
        if(!result.ok) {
             return console.log(data.message)
        }
        console.log('succes',data)
        navigate('/me')
    }
    return <form className="p-6 flex w-100 mx-auto justify-center items-center h-screen gap-1 flex-col" onSubmit={handleSubmit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
         className="bg-white w-60 p-3 rounded-3xl"/>
        <input value={password}onChange={e=>setPassword(e.target.value)} type="password" className=" bg-white w-60 p-3 rounded-3xl" />
        <button type="submit"className="bg-blue-400 w-60 p-3 rounded-3xl">Login</button>
    </form>
}

export default Login;