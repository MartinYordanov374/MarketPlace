import {Typography, Button, Modal, Fade, Box, Divider, Card, TextareaAutosize, CardMedia, CardActionArea, Input} from '@mui/material'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from 'buffer';
import EditIcon from '@mui/icons-material/Edit';


export default function EditModal(targetEditObject){

    let targetProduct = targetEditObject.TargetProduct
    let UserData = targetEditObject.UserData

    const [editModalState, setEditModalState] = useState(false)

    const [updatedProductName, setUpdatedProductName] = useState('')
    const [updatedProductPrice, setUpdatedProductPrice] = useState('')
    const [updatedProductDescription, setUpdatedProductDescription] = useState('')

    // TODO add regex for the price

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

    const editProduct = ( ) => {
        let newProductName = updatedProductName
        let newProductPrice = updatedProductPrice
        let newProductDescription = updatedProductDescription
        let productID = targetProduct._id
        let userID = UserData.id


        Axios.post('http://localhost:3001/updateProduct', {
            editorID: userID, 
            productID: productID, 
            newProductName: newProductName, 
            newProductDescription: newProductDescription, 
            newProductPrice: newProductPrice
        })
        .then((res) => {
          toast.success(res.data)
        })
        .catch((err) => {
            toast.warn(err.response)
        })
    }
    return(
        <div className='editModalWrapper'>
            <ToastContainer/>
            
            <EditIcon onClick = { () => openEditModal() }/>

            <Modal open={editModalState} onClose={closeEditModal}>
                <Fade in={editModalState}>
                    <Box sx={ModalStyle}>

                        <Typography className='addReviewTitle' variant="h5">Edit your product:</Typography>

                            <Card sx = {cardStyle}>
                                <CardActionArea>
                                    <Input 
                                    placeholder = { targetProduct.productName }
                                    onChange = { (e) => setUpdatedProductName(e.target.value) }
                                    />
                                </CardActionArea>
                            </Card>

                            <Card sx = {cardStyle}>
                                <CardActionArea>
                                    <Input 
                                    placeholder = { '$ ' + targetProduct.productPrice.toFixed( 2 ) }
                                    onChange = { (e) => setUpdatedProductPrice( e.target.value ) }/> 
                                </CardActionArea>
                            </Card>

                            <Card sx = {cardStyle}>
                                <CardActionArea>
                                    <Input multiline={ true } 
                                    placeholder={ targetProduct.productDescription }
                                    onChange = { (e) => setUpdatedProductDescription( e.target.value ) }/>

                                </CardActionArea>
                            </Card>


                        <Button 
                        variant = 'contained'  
                        color = 'warning' 
                        sx = { buttonStyle }
                        onClick = { () => editProduct() }> Edit Product</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}