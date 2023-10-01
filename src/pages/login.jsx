import axios from "axios"
function signIn(){

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
        </div>
    )
}

export default login