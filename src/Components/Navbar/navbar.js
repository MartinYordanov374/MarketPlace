import AppBar  from "@mui/material/AppBar";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { List, ListItem, Divider, Container} from '@mui/material'

import Axios from 'axios'

// TODO show diff navbars for logged in and logged out users



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

                            <ListItem class='dropdownOption'> 
                                <a href='/buy'>Buy</a> 
                            </ListItem>

                            <ListItem class='dropdownOption'> 
                                <a href='/sell'>Sell</a> 
                            </ListItem>

                        </List>
                    </span>

                    ) 
                    :
                    (
                        <Toolbar>

                            <Typography variant="h5" sx={{marginLeft: 20}}>
                                <a href='/home'> MarketPlace</a> 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 75}}>
                                <a href='/buy'>Buy</a> 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 75}}>
                                <a href='/sell'>Sell</a> 
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

                            <Typography variant="h5" sx={{marginLeft: 20}}>
                                <a href='/home'> MarketPlace</a> 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 75}}>
                                <a href='/buy'>Buy</a> 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 75}}>
                                <a href='/sell'>Sell</a> 
                            </Typography>
                        </Toolbar>

                    )}
            </AppBar>
        </Box>
    )
}