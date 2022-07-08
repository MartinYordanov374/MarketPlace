import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import Button from '@mui/material/Button'
import { FormControl, InputLabel, Input } from '@mui/material';
import './login.css'

import Axios from 'axios'
import React, { useEffect, useState, useRef} from "react";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function loginUser(userData)
{
    
    Axios.post('http://localhost:3001/login', userData, { withCredentials: true})
    .then(res => {
        let response = res.data
        toast.success(response.msg)
        console.log(res.data.session)
        window.location = '/'
    })
    .catch(err => {
        let response = err.response.data
        toast.warn(response)
    })
}

export default function Login() {

    // check if logged in
    let [loginStatus, setLoginStatus] = useState('')

    useEffect(() => {
        Axios.get('http://localhost:3001/isUserLoggedIn', {withCredentials: true})
        .then((res)=>{
            if(res.data == true)
            {
                setLoginStatus(true)
                window.location.href = '/'

            }
            else
            {
                setLoginStatus(false)
            }
        })
        .catch((error)=>{
            // console.log(error)
        })
    })

        
    if(loginStatus == false)
    {
        return <LoginPage/>
    }
    else
    {
        window.location.href = '/'
    }
        
    
}
  
function LoginPage()
{
        
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
                <ToastContainer/>
            <div className="formWrapper">
                <FormControl className="FormControl">
                    <InputLabel htmlFor="usernameInput" >Username</InputLabel>
                    <Input id="usernameInput" value={username} ref={usernameRef} onChange={(e)=> setUsername(e.target.value)}/>
                </FormControl>

                <FormControl className="FormControl">

                    <InputLabel htmlFor="passInput">Password</InputLabel>
                    <Input id="passInput" type={"password"}  value={password} ref={passwordRef} onChange={(e)=> setPassword(e.target.value)}/>
                </FormControl>

                <Button color="warning" className='loginButton' onClick={() => handleLogin()}>Login</Button>
            </div>
            <Footer/>

        </div>
    )
}