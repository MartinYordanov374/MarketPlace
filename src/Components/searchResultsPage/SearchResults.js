import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import {Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Link, Divider, Modal, Fade, Box, Input, TextField} from '@mui/material'
import { Buffer } from 'buffer';
import React, { useEffect, useState, useRef} from "react";
import {useLocation} from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

import './searchResultsStyling.css'

export default function SearchResults() {
    
    const [searchResults, setSearcResults] = useState('')
    
    const location = useLocation()

    return (
        <div>
            <Navbar/>
                    <div className="marketplacesWrapper">
                        <ToastContainer/>
                        {location.state.searchResults.map(marketplace => {
                            return(
                                <div class='marketplaceWrapper'>
                                     <Link href={`marketplace/${marketplace._id}`} underline='none'>
                                        <Card sx={{height: "260px", width: "240px"}}>
                                            <CardActionArea>
                                                <CardMedia>
                                                    <img className="MarketplaceIcon" src={`data:${marketplace.marketplaceImage.contentType};base64, ${Buffer.from(marketplace.marketplaceImage.data.data).toString('base64')}`}/>
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