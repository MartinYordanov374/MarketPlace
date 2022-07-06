import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import { ToastContainer } from "react-toastify";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StorefrontIcon from '@mui/icons-material/Storefront';

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
    return (
        <div class='wrapper'>
            <Navbar/>
            <div class='marketplacesWrapper'>
                <ToastContainer/>
                <div class='addMarketplaceWrapper'>
                    <AddBusinessIcon className="addMarketplaceIcon"/>      
                    <p class='addMarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
                <div class='marketplaceWrapper'>
                    <StorefrontIcon className="MarketplaceIcon"/>      
                    <p class='MarketplaceCallToAction'>Add Marketplace</p>              
                </div>
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
                <div>
                    <h1>Logged out user</h1>
                </div>
            <Footer/>
        </div>
    )
}