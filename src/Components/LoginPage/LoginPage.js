import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import Button from '@mui/material/Button'
import { FormControl, InputLabel, Input } from '@mui/material';
import './login.css'
import {useRef, useState} from 'react'
import Axios from 'axios'

async function loginUser(userData)
{
    console.log('logging in...')
    // TODO send data to the server
    
    Axios.post('http://localhost:3001/login', userData)
    .then(res => {
        let response = res.data
        console.log(response)
    })
    .catch(err => {
        let response = err.response.data
        console.log(response)
    })
}

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameRef = useRef()
    const passwordRef = useRef()

    const handleLogin = () => {
        const username = usernameRef.current.firstChild.attributes.value.value
        const password = passwordRef.current.firstChild.attributes.value.value

        let userObj = {username: username, password: password}
        loginUser(userObj)
    }
    return (
    <div>
        <Navbar/>
        <div className="formWrapper">
            
            <FormControl className="FormControl">
                <InputLabel htmlFor="usernameInput" >Username</InputLabel>
                <Input id="usernameInput" value={username} ref={usernameRef} onChange={(e)=> setUsername(e.target.value)}/>
            </FormControl>

            <FormControl className="FormControl">

                <InputLabel htmlFor="passInput">Password</InputLabel>
                <Input id="passInput"  type="password"  value={password} ref={passwordRef} onChange={(e)=> setPassword(e.target.value)}/>
            </FormControl>

            <Button color="warning" className='loginButton' onClick={() => handleLogin()}>Login</Button>
        </div>
        <Footer/>
    </div>);
}
  