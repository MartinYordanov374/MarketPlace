import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import Button from '@mui/material/Button'
import { FormControl, InputLabel, Input } from '@mui/material';
import './login.css'
import {useRef, useState} from 'react'

function loginUser(userData)
{
    console.log('logging in...')
    console.log(userData)
}

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameRef = useRef()
    const passwordRef = useRef()

    const handleLogin = () => {
        console.log(usernameRef.current.firstChild.attributes.value.value)
        console.log(passwordRef.current.firstChild.attributes.value.value)

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
  