import AppBar  from "@mui/material/AppBar";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import React, { useEffect, useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";

import { List, ListItem, Divider, Container, TextField, InputAdornment} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

export default function Navbar(props) {

        
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
        return <LoggedUserNavbar data = {props}/>
    }
    else
    {
        return <NotLoggedUserNavabr/>
    }
}
  

function LoggedUserNavbar(props)
{

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const searchRef = useRef()
    const [searchTags, setSearchTags] = useState('')

    // let searchMarketplaces = props.data.searchMarketplaces

    const [currUserId, setCurrUserId] = useState('')

    const [cartProductsAmount, setCartProductsAmount] = useState([])

    

    useEffect(() => {
        Axios.get('http://localhost:3001/getSessionData', {withCredentials: true})
        .then((res) => {
            setCurrUserId(res.data)
        })
        .catch((err) => {
            console.log(err)
        })


            Axios.post('http://localhost:3001/getProductsInCart', {userID: currUserId})
            .then((res) => {
                setCartProductsAmount(res.data)
            })
        
        
    }, [currUserId])


    const navigate = useNavigate()

    const searchMarketplaces = (tags) => {
        let searchTagsSplitted = tags.split(', ')

        searchTagsSplitted = searchTagsSplitted.join(' ')
        searchTagsSplitted = searchTagsSplitted.split(' ')
        searchTagsSplitted = searchTagsSplitted.map((tag) => tag.toLowerCase())
        Axios.post('http://localhost:3001/searchMarketplacesByTags', ({tags: searchTagsSplitted}), {withCredentials: true})
        .then((res) => {
            if(res.data.length >= 1)
            {
                navigate('/searchResults',{state: {searchResults: res.data}})
            }
            else
            {
                toast.warn('This search did not return any results. Hmm...')
            }
        
        })
        .catch((err) => {
            console.log(err)
        }) 
    }

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
                                <a href={`/profile/${currUserId}`}> My profile</a> 
                            </ListItem>

                            <ListItem class = 'dropdownOption'>
                                <a href={`/profile/${currUserId}`}> My shopping cart </a> 
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
                                ref={searchRef}
                                value={searchTags}
                                onChange={(e) => setSearchTags(e.target.value)}
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
                                            {/* <SearchIcon className='SearchIcon' onClick={() => searchMarketplaces()}/> */}
                                            <SearchIcon className='SearchIcon' onClick={() => searchMarketplaces(searchTags)}/>
                                        </InputAdornment>)
                                }}
                                placeholder="Enter tags to search marketplaces by, e.g. Real Estate, Beauty..."/>

                            
                            <Typography variant="h5" sx={{marginLeft: -10}}>
                                <a href={`/profile/${currUserId}`}> My profile</a> 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 6}} className = 'cartProductsWrapper'>
                                <a href={`/MyCart`}>
                                    <Typography variant="span" className = 'cartProductsAmountIndicator'> {cartProductsAmount.length} </Typography>  
                                    <ShoppingCartIcon className = 'cartProductsAmountIndicatorIcon'/>
                                </a> 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 8}} onClick={() => handleLogout()}>
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