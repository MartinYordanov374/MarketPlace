import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import { toast, ToastContainer } from "react-toastify";
import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';

import {Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Link, Divider, Modal, Fade, Box, Input, TextField} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload';
import './homepageStyling.css'

import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';

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
    let [marketplaceImage, setMarketplaceImage] = useState('')

    const marketplaceNameRef = useRef()
    const marketplaceTagsRef = useRef()
    const marketplaceDescriptionRef = useRef()
    const marketplaceImageRef = useRef()


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

            marketplaceImage = marketplaceImage.replace('C:\\fakepath\\', '')
            const userID = res.data.user.id

            const marketplaceFormInput = document.querySelector('.uploadImageInput');


            let formData = new FormData()
            formData.append("userID", userID)
            formData.append("marketplaceDescription", marketplaceDescription)
            formData.append("marketplaceName", marketplaceName)
            formData.append("marketplaceTags", marketplaceTags)
            formData.append("marketplaceImage", marketplaceFormInput.files[0])
            

            Axios.post('http://localhost:3001/createMarketplace', formData)
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
            if(res.data.length >= 1)
            {
                setMarketplaces(res.data)
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

    const modalMarketplaceImageButton = {
        marginTop: "5%",
        marginLeft: "23%",
        width: "220px",
        display: "inline-block"
        
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
                                        <Input sx = {modalInputStyle} name="marketplaceName" placeholder="Enter Marketplace name" value = { marketplaceName } ref = { marketplaceNameRef } onChange={ (e) => setMarketplaceName(e.target.value) } />
                                        <Input sx = {modalInputStyle} name="marketplaceTags" placeholder="Enter some marketplace tags" value = { marketplaceTags } ref = { marketplaceTagsRef } onChange={ (e) => setMarketplaceTags(e.target.value) } />
                                        <Input sx = {modalInputStyle} name="marketplaceDescription" placeholder="Enter marketplace description" value = { marketplaceDescription } ref = { marketplaceDescriptionRef } onChange={ (e) => setMarketplaceDescription(e.target.value) } />

                                        <Button  variant="outlined" sx = {modalMarketplaceImageButton} color='warning' component="label"> 
                                            <UploadIcon className='uploadImageIcon'/>
                                            <span className="uploadImageButtonText">upload image</span> 
                                            <input type="file" className="uploadImageInput" name="marketplaceImage" hidden ref={ marketplaceImageRef } onChange = {(e) => {setMarketplaceImage(e.target.value[0])}}/>
                                        </Button>

                                        <Button variant="contained" sx = {modalSubmitButtonStyle} color='warning' 
                                            onClick={() => createMarketplace()}
                                            type="submit">
                                                Create Marketplace
                                        </Button> 
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
                                            {/* <StorefrontIcon className="MarketplaceIcon"/>  */}
                                            {/* // TODO LOAD IMAGES HERE */}
                                            <img width="240px" height="240px" src={`data:${marketplace.marketplaceImage.contentType};base64, ${Buffer.from(marketplace.marketplaceImage.data.data).toString('base64')}`}/>
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