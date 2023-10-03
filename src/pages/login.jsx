import axios from "axios"
import {Link} from 'react-router-dom'
import {useState} from 'react'

function Login(){
    const [errors,setErrors] = useState()

    async function handleSubmit(){
        try {
            const user = {
                email:document.getElementById('email').value,
                password:document.getElementById('password').value}
            const {data} = await axios.post(`/api/v1/users/login`,user) 
            setErrors(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <h1>Sign-In Page</h1>
            <form>
                <label>Email Address:</label>
                <input type="email" id="email"></input>
                <label>Password:</label>
                <input type="password" id='password' ></input>
            </form>
            <p>
                <Link to='/register'> Don't have an account?</Link>
            </p>
            <button onClick={handleSubmit}>Sign in</button>
            <p>{errors}</p>
        </div>
    )
}

export default Login