import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import { toast, ToastContainer } from "react-toastify";
import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';

import {Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Link, Divider, Modal, Fade, Box, Input, TextField} from '@mui/material'

import './homepageStyling.css'

import 'react-toastify/dist/ReactToastify.css';

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

    const [marketplaceName, setMarketplaceName] = useState('')
    const [marketplaceTags, setMarketplaceTags] = useState('')
    const [marketplaceDescription, setMarketplaceDescription] = useState('')

    const marketplaceNameRef = useRef()
    const marketplaceTagsRef = useRef()
    const marketplaceDescriptionRef = useRef()

    const getData = async () => {
        let res = await getMarketplaces()

        setMarketplaces(res)
    }

    useEffect(() => {
        getData()
    }, [])

    const checkSearchResults = () => {

        if(localStorage.getItem('searchResult'))
        {
            console.log('searching')
            let searchResults = localStorage.getItem('searchResult')
            let parsedSearchResults = JSON.parse(searchResults)
        
            setMarketplaces(parsedSearchResults)
            localStorage.clear()
            searchResults = ''
            parsedSearchResults = ''
            window.location.reload()


        }
    }

    

    const openCreateMarketplaceModal = () => {
        setCreateMarketplaceModalState(true)
    }
    
    const closeCreateMarketplaceModal = () => {
        setCreateMarketplaceModalState(false)
    }
    
    const createMarketplace = () => {
        Axios.get('http://localhost:3001/getCurrentUserSession', {withCredentials: true})
        .then((res) => {
            const userID = res.data.user.id
            Axios.post('http://localhost:3001/createMarketplace', 
            {   
                userID: userID, 
                marketplaceDescription: marketplaceDescription, 
                marketplaceName: marketplaceName, 
                marketplaceTags: marketplaceTags
            }, 
            { withCredentials: true })
            .then((res) => {
                toast.success('Marketplace created successfully!')
                setTimeout(() => {
                    window.location.reload()
                },6000)
            })
            .catch((err) => {
                let errorMessage = err.response.data.msg
                toast.warn(errorMessage)

            })
        })
    }

    const searchMarketplaces = (tags) => {
        let searchTagsSplitted = tags.split(', ')

        searchTagsSplitted = searchTagsSplitted.join(' ')
        searchTagsSplitted = searchTagsSplitted.split(' ')
        searchTagsSplitted = searchTagsSplitted.map((tag) => tag.toLowerCase())
        Axios.post('http://localhost:3001/searchMarketplacesByTags', ({tags: searchTagsSplitted}), {withCredentials: true})
        .then((res) => {
            setMarketplaces(res.data)
        
        })
        .catch((err) => {
            console.log(err)
        }) 
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
            <Navbar searchMarketplaces = {searchMarketplaces}/>
                
                <ToastContainer/>
                <Button color="warning" sx={{ width: "94%", marginTop: 2, marginLeft: "3%" }} onClick={() => openCreateMarketplaceModal()}>
                    <strong>Add Marketplace</strong>
                </Button> 


                <Modal open={createMarketplaceModalState} onClose={closeCreateMarketplaceModal}>

                    <Fade in={createMarketplaceModalState}>
                        <Box sx= { ModalStyle } >
                            <Typography sx= { modalTitleStyle } >Create Marketplace Form</Typography>
                            <Input sx = {modalInputStyle} placeholder="Enter Marketplace name" value = { marketplaceName } ref = { marketplaceNameRef } onChange={ (e) => setMarketplaceName(e.target.value) } />
                            <Input sx = {modalInputStyle} placeholder="Enter some marketplace tags" value = { marketplaceTags } ref = { marketplaceTagsRef } onChange={ (e) => setMarketplaceTags(e.target.value) } />
                            <Input sx = {modalInputStyle} placeholder="Enter marketplace description" value = { marketplaceDescription } ref = { marketplaceDescriptionRef } onChange={ (e) => setMarketplaceDescription(e.target.value) } />
                            <Button sx = {modalSubmitButtonStyle} color='warning' onClick={() => createMarketplace()}>Create Marketplace</Button>
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