import Axios from 'axios'
import React, {useState, useRef} from 'react'

import { toast, ToastContainer } from "react-toastify";
import {Modal, Fade, Box, Button, Typography, Input} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload';

export default function CreateMarketplaceModal() {

    let [createMarketplaceModalState, setCreateMarketplaceModalState] = useState(false)
    
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
    const [marketplaceName, setMarketplaceName] = useState('')
    const [marketplaceTags, setMarketplaceTags] = useState('')
    const [marketplaceDescription, setMarketplaceDescription] = useState('')
    let [marketplaceImage, setMarketplaceImage] = useState('')


    const marketplaceNameRef = useRef()
    const marketplaceTagsRef = useRef()
    const marketplaceDescriptionRef = useRef()
    const marketplaceImageRef = useRef()
    
    return(
        <div>
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
                                    <input type="file" className="uploadImageInput" name="marketplaceImage" hidden ref={ marketplaceImageRef } onChange = {(e) => {
                                        setMarketplaceImage(e.target.value[0])
                                        let UploadSpanElement = document.querySelector('.uploadImageButtonText')
                                        UploadSpanElement.innerHTML = "Uploaded !"
                                    }}/>
                                </Button>

                                <Button variant="contained" sx = {modalSubmitButtonStyle} color='warning' 
                                    onClick={() => createMarketplace()}
                                    type="submit">
                                        Create Marketplace
                                </Button> 
                        </Box>
                    </Fade>
                </Modal>  
        </div>
    )
}