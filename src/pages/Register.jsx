import axios from "axios"
import {Link} from 'react-router-dom'
import { useState } from "react"

function Register(){

    const [errors, setErrors] = useState()
    async function handleSubmit(){
        try {
            const newUser = {
                email:document.getElementById('email').value,
                profileName:document.getElementById('profileName').value,
                password:document.getElementById('password').value}
            const {data} = await axios.post(`/api/v1/users/register`,newUser) 
            setErrors(data.message)
            
        } catch (error) {
            console.log(error)
        
        }
    }

    return(
        <div>
            <h1>Sign-Up Page</h1>
            <form>
                <label>Email Address:</label>
                <input type="email" id="email" required></input>
                <label>Profile Name:</label>
                <input type="text" id="profileName" required></input>
                <label>Password:</label>
                <input type="password" id="password" required></input>
            </form>
            <Link to="/login">Already have and account?</Link>
            <button onClick={handleSubmit}>Create account</button>
            <p>{errors}</p>
        </div>
    )
}

export default Register