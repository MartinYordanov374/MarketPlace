import {Typography, Button, Modal, Fade, Box, Divider, Card, TextareaAutosize, CardMedia, CardActionArea, Input} from '@mui/material'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from 'buffer';
import EditIcon from '@mui/icons-material/Edit';


export default function EditModal(targetEditObject){

    let targetProduct = targetEditObject.TargetProduct
    console.log(targetProduct)
    let [productImage, setProductImage] = useState('')

    const [editModalState, setEditModalState] = useState(false)

    const openEditModal = () => {
        setEditModalState(true)
    }
    const closeEditModal = () => {
        setEditModalState(false)

    }

    const ModalStyle = {
        position: 'absolute',
        top: '45%',
        left: '51%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        // border: '2px solid #000',
        borderRadius: '2%',
        boxShadow: 24,
        p: 4,
      };



    const cardStyle = {
        marginTop: "4%", 
        width: "180px",  
        marginLeft: "28%"
    }

    const buttonStyle = {
        marginTop: "5%",
        marginLeft: "23%",
        width: "220px"
    }
    return(
        <div className='editModalWrapper'>
            <ToastContainer/>
            
            <EditIcon onClick = { () => openEditModal()}/>

            <Modal open={editModalState} onClose={closeEditModal}>
                <Fade in={editModalState}>
                    <Box sx={ModalStyle}>

                        <Typography className='addReviewTitle' variant="h5">Edit your product:</Typography>

                            <Card sx = {cardStyle}>
                                <CardActionArea>
                                    <Input placeholder={targetProduct.productName}/>
                                </CardActionArea>
                            </Card>

                            <Card sx = {cardStyle}>
                                <CardActionArea>
                                    <Input placeholder={'$ ' + targetProduct.productPrice.toFixed(2)}/>
                                </CardActionArea>
                            </Card>

                            <Card sx = {cardStyle}>
                                <CardActionArea>
                                    <Input multiline={true} placeholder={targetProduct.productDescription}/>

                                </CardActionArea>
                            </Card>


                        <Button variant='contained'  color='warning' sx = { buttonStyle }> Edit Product</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}