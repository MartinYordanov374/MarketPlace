import AppBar  from "@mui/material/AppBar";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { List, ListItem, Divider, Container, TextField, InputAdornment} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';

import Axios from 'axios'
import { toast } from "react-toastify";

import './navbarStyles.css'


function handleMenuIconClick(){
    let dropdownMenu = document.querySelector('.dropdownMenu')
    if(dropdownMenu.style.display == 'none')
    {
        dropdownMenu.style.display = 'block'
    } 
    else{
        dropdownMenu.style.display ='none'
    }
}

function handleLogout()
{
    Axios.get('http://localhost:3001/logout', {withCredentials: true})
    .then((res) => {
        if(res.status == 200)
        {
           window.location.href='/login'
        }
        
    })
    .catch((err) => {
        console.log(err)
    })
}

export default function Navbar() {

        
    let [loginStatus, setLoginStatus] = useState('')

    useEffect(() => {
        Axios.get('http://localhost:3001/isUserLoggedIn', {withCredentials: true})
        .then((res)=>{
            if(res.data == true)
            {
                setLoginStatus(true)
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

    if(loginStatus)
    {
        return <LoggedUserNavbar/>
    }
    else
    {
        return <NotLoggedUserNavabr/>
    }
}
  

function LoggedUserNavbar()
{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="warning" position="static">

                  { isMobile ? (

                    <span style={{textAlign: 'center'}}>

                        <IconButton onClick={(e) => handleMenuIconClick()}>
                            <MenuIcon style={{color:"white"}} ></MenuIcon>
                        </IconButton>

                        <List class='dropdownMenu'>

                            <ListItem class='dropdownOption'> 
                                <a href='/home'>MarketPlace</a> 
                            </ListItem>
                            
                            <ListItem class='dropdownOption' onClick={() => handleLogout()}> 
                                <a href='/profile'>My Profile</a> 
                            </ListItem>

                            <ListItem class='dropdownOption' onClick={() => handleLogout()}> 
                                Logout 
                            </ListItem>

                        </List>
                    </span>

                    ) 
                    :
                    ( 
                        <Toolbar>

                            <Typography variant="h5" sx={{marginLeft: 0}}>
                                <a href='/home'> MarketPlace</a> 
                            </Typography>

                            <TextField 
                                hiddenLabel
                                variant="outlined" 
                                size="small"
                                color="warning"
                                sx={{
                                    marginLeft: 10, 
                                    marginRight: 20, 
                                    width: 1200,
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    height: 40
                                }}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                            <SearchIcon className='SearchIcon'/>
                                        </InputAdornment>)
                                }}
                                placeholder="Enter tags to search marketplaces by, e.g. Real Estate, Beauty..."/>

                            
                            <Typography variant="h5" sx={{marginLeft: -7}}>
                                <a href='/profile'> My profile</a> 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 17}} onClick={() => handleLogout()}>
                                <a href='#'>Logout</a>
                            </Typography>
                        </Toolbar>
                    )}
            </AppBar>
        </Box>
    )
}

function NotLoggedUserNavabr()
{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return ( 
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="warning" position="static">

                { isMobile ? (
                    <span style={{textAlign: 'center'}}>

                        <IconButton onClick={(e) => handleMenuIconClick()}>
                            <MenuIcon style={{color:"white"}} ></MenuIcon>
                        </IconButton>
                        <List class='dropdownMenu'>

                            <ListItem class='dropdownOption'> 
                                <a href='/login'>Login</a> 
                            </ListItem>

                            <ListItem class='dropdownOption'> 
                                <a href='/register'>Register</a> 
                            </ListItem>

                        </List>
                    </span>

                    ) 
                    :
                    (
                        <Toolbar>

                            <Typography variant="h5" sx={{marginLeft: 70}}>
                                <a href='/login'> Login </a> 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 75}}>
                                <a href='/register'>Register</a> 
                            </Typography>

                        </Toolbar>

                    )}
            </AppBar>
        </Box>
    )
}