import axios from "axios"
function Login(){

    async function userSignIn(id){
        try {
            const user = await axios.get(`/api/v1/users${id}`) 
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <h1>Sign-In Page</h1>
            <form>
                <label></label>
                <input type="text"></input>
                <input type="text"></input>
            </form>
            <button ahref='./signup'></button>
        </div>
    )
}

export default Login