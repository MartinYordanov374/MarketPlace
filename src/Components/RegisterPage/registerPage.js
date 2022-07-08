import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";

import {FormControl, Input, InputLabel, Button} from '@mui/material'
import React, {useState, useRef, useEffect} from 'react'

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Axios from 'axios'

import './registerPageStyles.css'
export default function RegisterPage()
{

    const [loginStatus, setLoginStatus] = useState('')

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
        })})

    if(loginStatus == false)
    {
        return <RegisterView/>
    }
    else
    {
        window.location.href = '/'
    }

}

function RegisterView()
{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repass, setRePass] = useState('')


    const usernameRef = useRef()
    const passwordRef = useRef()
    const rePasswordRef = useRef()

        
    const handleRegister = () => {
        
        const pass = passwordRef.current.firstChild.attributes.value.value
        const uname = usernameRef.current.firstChild.attributes.value.value
        let userData = { username: uname, password: pass, repass: repass}
       
        Axios.post('http://localhost:3001/register', userData)
        .then((res) => {
            toast.success(res.data)
            window.location.href='/login'
        })
        .catch((err) => {
            toast.warn(err.response.data)
        })
        

    }

    return(
        <div>
            <Navbar></Navbar>
            <div className="formWrapper">
                <ToastContainer></ToastContainer>
                <FormControl className="FormControl">
                    <InputLabel htmlFor="usernameInput" >Username</InputLabel>
                    <Input id="usernameInput" value={username} ref={usernameRef} onChange={(e)=> setUsername(e.target.value)}/>
                </FormControl>

                <FormControl className="FormControl">

                    <InputLabel htmlFor="passInput">Password</InputLabel>
                    <Input id="passInput" type={"password"}  value={password} ref={passwordRef} onChange={(e)=> setPassword(e.target.value)}/>
                </FormControl>


                <FormControl className="FormControl">

                    <InputLabel htmlFor="passInput">Confirm Password</InputLabel>
                    <Input id="passInput" type={"password"}  value={repass} ref={rePasswordRef} onChange={(e)=> setRePass(e.target.value)}/>
                </FormControl>

                <Button color="warning" className='loginButton' onClick={() => handleRegister()}>Register</Button>
            </div>
            <Footer></Footer>
        </div>
    )
}