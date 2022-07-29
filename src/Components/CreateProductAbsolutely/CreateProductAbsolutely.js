import Axios from 'axios'
import React, {useState, useRef} from 'react'

import { toast, ToastContainer } from "react-toastify";
import {Modal, Fade, Box, Button, Typography, Input} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload';

export default function CreateProductModal() {

    let [createProductModalState, setCreateProductModalState] = useState(false)
    
    const openCreateProductModal = () => {
        setCreateProductModalState(true)
    }
    
    const closeCreateProductModal = () => {
        setCreateProductModalState(false)
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

    const modalProductImageStyle = {
        marginTop: "5%",
        marginLeft: "23%",
        width: "220px",
        display: "inline-block"
        
    }
    const [productName, setProductName] = useState('')
    const [productTags, setProductTags] = useState('')
    const [productDescription, setProductDescription] = useState('')
    let [productImage, setProductImage] = useState('')


    const productNameRef = useRef()
    const productTagsRef = useRef()
    const productDescriptionRef = useRef()
    const productImageRef = useRef()
        
    const createProduct = () => {
        Axios.get('http://localhost:3001/getCurrentUserSession', {withCredentials: true})
        .then((res) => {
    
            productImage = productImage.replace('C:\\fakepath\\', '')
            const userID = res.data.user.id
    
            const productFormInput = document.querySelector('.uploadImageInput');
    
            let formData = new FormData()
            formData.append("creatorID", userID)
            formData.append("productName", productName)
            formData.append("productDescription", productDescription)
            formData.append("productPrice", productTags)
            formData.append("productImage", productFormInput.files[0])

    
            Axios.post('http://localhost:3001/createProductAbsolutely', formData)
            .then((res) => {
                toast.success('Product created successfully!')
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
    return(
        <div>
            <ToastContainer/>
                <Button color="warning" sx={{ width: "94%", marginTop: 2, marginLeft: "3%" }} onClick={() => openCreateProductModal()}>
                    <strong>Add Product</strong>
                </Button> 

                <Modal open={createProductModalState} onClose={closeCreateProductModal}>
                    <Fade in={createProductModalState}>
                        <Box sx= { ModalStyle } >
                                <Typography sx= { modalTitleStyle } >Create Product Form</Typography>
                                <Input sx = {modalInputStyle} name="productName" placeholder="Enter product name" value = { productName } ref = { productNameRef } onChange={ (e) => setProductName(e.target.value) } />
                                <Input sx = {modalInputStyle} name="productTags" placeholder="Enter product price" value = { productTags } ref = { productTagsRef } onChange={ (e) => setProductTags(e.target.value) } />
                                <Input sx = {modalInputStyle} name="productDescription" placeholder="Enter product description" value = { productDescription } ref = { productDescriptionRef } onChange={ (e) => setProductDescription(e.target.value) } />

                                <Button  variant="outlined" sx = {modalProductImageStyle} color='warning' component="label"> 
                                    <UploadIcon className='uploadImageIcon'/>
                                    <span className="uploadImageButtonText">upload image</span> 
                                    <input type="file" className="uploadImageInput" name="productImage" hidden ref={ productImageRef } onChange = {(e) => {
                                        setProductImage(e.target.value[0])
                                        let UploadSpanElement = document.querySelector('.uploadImageButtonText')
                                        UploadSpanElement.innerHTML = "Uploaded !"
                                    }}/>
                                </Button>

                                <Button variant="contained" sx = {modalSubmitButtonStyle} color='warning' 
                                    onClick={() => createProduct()}
                                    type="submit">
                                        Add Product
                                </Button> 
                        </Box>
                    </Fade>
                </Modal>  
        </div>
    )
}