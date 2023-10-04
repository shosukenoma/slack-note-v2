import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'

function Login(){
    const [errors,setErrors] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(){
        try {
            const user = {
                email:emailInput,
                password:passwordInput}
            const {data} = await axios.post(`/api/v1/users/login`,user) 
            setErrors(data.message)
            if(data.status =='success'){
               navigate('/')
            } else{
                setPasswordInput('')
                document.getElementById('password').value = ''
            } 

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <h1>Sign-In Page</h1>
            <form>
                <label>Email Address:</label>
                <input type="email" onChange={e => setEmailInput(e.target.value)}></input>
                <label>Password:</label>
                <input type="password" id='password' onChange={e => setPasswordInput(e.target.value)}></input>
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