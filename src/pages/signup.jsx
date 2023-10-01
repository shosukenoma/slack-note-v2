import axios from "axios"
function signup(){

    async function registerUser(id){
        try {
            const user = await axios.post(`/api/v1/users/${id}`) 
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <h1>Sign-Up Page</h1>
            <form>
                <label>Email Address</label>
                <input type="text" id="email" required></input>
                <label>Password</label>
                <input type="text" id="password" required></input>
            </form>
            <button onClick={registerUser}>submit</button>
        </div>
    )
}

export default signup