import { useState, useEffect } from "react"

const Me = () => {
    const [name, setName] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await fetch('http://localhost:5000/api/auth/me', {
                    method: 'GET',
                    credentials: "include" // 🔥 VERY IMPORTANT
                })

                const data = await result.json()

                if (!result.ok) {
                    console.log(data.message)
                    return
                }

                setName(data.name)

            } catch (err) {
                console.log("Error:", err)
            }
        }

        fetchUser()
    }, [])

    return <div>Hello {name}</div>
}

export default Me