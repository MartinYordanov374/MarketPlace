import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import MarketplaceCard from "../marketplaceCard/marketplaceCard";

import { toast, ToastContainer } from "react-toastify";
import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';

import CreateMarketplaceModal from '../createMarketplaceModal/CreateMarketplaceModal'


import { Typography, Button, Modal, Fade, Box, Input} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload';
import './homepageStyling.css'
import CircularProgress from '@mui/material/CircularProgress';

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

    const [isLoading, setIsLoading] = useState(true)


    const getData = async () => {
        let res = await getMarketplaces()
        setMarketplaces(res)
        setIsLoading(false)
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

    
    
    return (
        <div className='wrapper'>
            <Navbar />
                
            <CreateMarketplaceModal/>
                 
                

            <div className='marketplacesWrapper'>
                <ToastContainer/>
                {isLoading ? 
                        
                        <div className="loadingCircleWrapperHome">
                            <CircularProgress color="warning" />
                            <h2>Loading data...</h2>
                        </div>

                        : marketplaces.map(marketplace => {
                            return(
                                <MarketplaceCard TargetMarketplace = {marketplace} />
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