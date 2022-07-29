import {Typography, Button, Modal, Fade, Box, TextareaAutosize, Card, CardMedia, CardActionArea} from '@mui/material'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from 'buffer';




export default function ProductsModal (props)
{
    const [productsModalState, setProductsModalState] = useState(false)
    const [userData, setUserData] = useState(false)
    const [marketplaceData, setMarketplaceData] = useState('')

    const uploadProduct = () => {
        console.log('uploading product')
    }

    const closeProductsModal = () => {
        setProductsModalState(false)
    }
    
    const openProductsModal = () => {
        setProductsModalState(true)
    }

    useEffect(() => {
        Axios.post('http://localhost:3001/getUserById', {id: props.UserData.id})
        .then((res) => {
            setUserData(res.data)
        })
        setMarketplaceData(props.MarketplaceData)
    }, [])



    const ModalStyle = {
        position: 'absolute',
        top: '35%',
        left: '51%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return(
    <div className='userProductsWrapper'>
        <ToastContainer/>
        
        <Card className='addProductButtonWrapper'>
            <Button 
                color='warning' 
                sx={{fontSize:30}} 
                className="addProductButton" 
                onClick={() => openProductsModal()}
            > 
                Add Product  
            </Button>
        </Card>

        <Modal open={productsModalState} onClose={closeProductsModal} >
                <Fade in={productsModalState}>
                    <Box sx={ModalStyle}>
                        <Typography className='addReviewTitle' variant="h5">Select the product you want to upload:</Typography>
                            {userData.products && userData.products.map(product => {
                                return(
                                    <Card sx={{marginTop: "4%", width: "180px", height: "23vh", display: "flex", float: "left", marginLeft: "4%"}}>
                                        <CardActionArea>

                                            <CardMedia >
                                                <img className="MarketplaceIcon" src={`data:${product.productImage.contentType};base64, ${Buffer.from(product.productImage.data.data).toString('base64')}`}/>
                                            </CardMedia>
                                            <Typography variant="h6">{product.productName}</Typography>
                                        </CardActionArea>
                                    </Card>
                                )
                            })}
                        <Button color='warning' className='addReviewButton' onClick={() => uploadProduct()}>Select</Button>
                    </Box>
                </Fade>
        </Modal>
    </div>
    )
}

