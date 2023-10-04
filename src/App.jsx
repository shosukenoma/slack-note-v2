import {useState} from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom'

function App(){
  // const [userIsLoggedIn, setUserIsLoggedIn] = useState(true)
  return (
  <BrowserRouter>
    <Routes>
        <Route path = "/" element={<Home/>}/>
          <Route path ='login' element={<Login/>}/>
          <Route path ='register' element={<Register/>}/>
    </Routes>
  </BrowserRouter>)
}

export default App
