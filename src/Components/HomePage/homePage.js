import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import { ToastContainer } from "react-toastify";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';

import {Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Link} from '@mui/material'

import './homepageStyling.css'

Axios.defaults.withCrendentails = true


export default function Home() {
    
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
        return <LoggedUser/>
    }
    else
    {
        return <LoggedOutUser/>
    }
}

function LoggedUser()
{   
    let [marketplaces, setMarketplaces] = useState([])

    // let marketplaces = []
    const getData = async () => {
        let res = await getMarketplaces()

        setMarketplaces(res)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='wrapper'>
            <Navbar/>

            <Button color="success" sx={{width: "94%", marginTop: 2, marginLeft: "3%"}}><strong>Add Marketplace</strong></Button> 

            <div className='marketplacesWrapper'>
                <ToastContainer/>

                {/* <Link href='/AddMarketplace' underline='none'>
                    <Card className='addMarketplaceWrapper' sx={{height: "240px", width: "240px"}}>
                        <CardActionArea>
                            <CardMedia>
                                <AddBusinessIcon className="addMarketplaceIcon"/> 
                            </CardMedia>
                            <CardContent>
                                <Typography className='addMarketplaceCallToAction'>Add Marketplace</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link> */}
                 {marketplaces.map(marketplace => {
                   
                        return(
                            <div class='marketplaceWrapper'>
                             <Link href={`marketplace/${marketplace._id}`} underline='none'>
                                <Card sx={{height: "240px", width: "240px"}}>
                                    <CardActionArea>
                                        <CardMedia>
                                            <StorefrontIcon className="MarketplaceIcon"/> 
                                            {/* // TODO LOAD IMAGES HERE */}
                                        </CardMedia>
                                        <CardContent>
                                            <Typography>{marketplace.marketplaceName}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                             </Link>
                            </div>
                        )
                    
                })}
               
            </div>
            <Footer/>
        </div>
    )
}

function LoggedOutUser()
{
    return (
        <div>
            <Navbar/>
                <ToastContainer/>
                <div class='loggedOut'>
                    <h1 class='userMessage'>Sorry, this page is accessible by registered users only.</h1>
                </div>
            <Footer/>
        </div>
    )
}

async function getMarketplaces(){
    const result = await Axios.get('http://localhost:3001/getAllMarketplaces')
    
    return result.data
}