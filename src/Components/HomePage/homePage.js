import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import { ToastContainer } from "react-toastify";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';

import {Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Link, Divider, Modal, Fade, Box, Input, TextField} from '@mui/material'

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

    let [createMarketplaceModalState, setCreateMarketplaceModalState] = useState(false)

    const getData = async () => {
        let res = await getMarketplaces()

        setMarketplaces(res)
    }

    useEffect(() => {
        getData()
    }, [])


    const openCreateMarketplaceModal = () => {
        console.log('showing modal')
        setCreateMarketplaceModalState(true)
    }
    const closeCreateMarketplaceModal = () => {
        setCreateMarketplaceModalState(false)
    }
    
    const ModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const modalTitleStyle = {
        marginLeft: "27%",
        marginBottom: "5%",
        
    }
    const modalInputStyle = {
        marginTop: "5%",
        marginLeft: "23%",
    }
    const modalSubmitButtonStyle = {
        marginTop: "5%",
        marginLeft: "23%",
        width: "220px"
        
    }
    return (
        <div className='wrapper'>
            <Navbar/>
                <Button color="warning" sx={{ width: "94%", marginTop: 2, marginLeft: "3%" }} onClick={()=>openCreateMarketplaceModal()}>
                    <strong>Add Marketplace</strong>
                </Button> 


                <Modal open={createMarketplaceModalState} onClose={closeCreateMarketplaceModal}>

                    <Fade in={createMarketplaceModalState}>
                        <Box sx= { ModalStyle } >
                            <Typography sx= { modalTitleStyle } >Create Marketplace Form</Typography>
                            <Input sx = {modalInputStyle} placeholder="Enter Marketplace name"/>
                            <Input sx = {modalInputStyle} placeholder="Enter some marketplace tags"/>
                            <Input sx = {modalInputStyle} placeholder="Enter marketplace description"/>
                            <Button sx = {modalSubmitButtonStyle} color='warning'>Create Marketplace</Button>
                        </Box>
                    </Fade>

                </Modal>

            <div className='marketplacesWrapper'>
                <ToastContainer/>
                 {marketplaces.map(marketplace => {
                   
                        return(
                            <div class='marketplaceWrapper'>
                             <Link href={`marketplace/${marketplace._id}`} underline='none'>
                                <Card sx={{height: "260px", width: "240px"}}>
                                    <CardActionArea>
                                        <CardMedia>
                                            <StorefrontIcon className="MarketplaceIcon"/> 
                                            {/* // TODO LOAD IMAGES HERE */}
                                        </CardMedia>
                                        <Divider/>
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