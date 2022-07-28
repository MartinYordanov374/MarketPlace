import {Typography, Button, Modal, Fade, Box, TextareaAutosize, Card} from '@mui/material'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

export default function ReviewModal (props)
{
    const closeReviewModal = () => {
        setReviewModalState(false)
    }
    
    const openReviewModal = () => {
        setReviewModalState(true)
    }
    
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

    const addReview = () => {
        let userID = userData.id
        let marketplaceID = marketplaceData._id
        let reviewContent = userReview
    
        Axios.post('http://localhost:3001/addMarketplaceReview', {reviewerUserId: userID, reviewedMarketplaceId: marketplaceID, reviewContent: reviewContent})
        .then((res) => {
            console.log(res)
            toast.success(res.data)
            setTimeout(() => {
                window.location.reload()
            }, 6000)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const [reviewModalState, setReviewModalState] = useState(false)

    const [userReview, setUserReview] = useState('')

    const [marketplaceData, setMarketplaceData] = useState([])

    const [userData, setUserData] = useState('')

    useEffect(() => {
        setMarketplaceData(props.marketplaceData)
        setUserData(props.userData)
    },[])

    
    return (

        <div className='addReviewWrapper'>
            <ToastContainer/>
            <Card className='addReviewCard'>
                <Button 
                    color='warning' 
                    sx={{fontSize:30}} 
                    className="addReviewButton" 
                    onClick={() => openReviewModal()}
                > 
                    Add Review  
                </Button>
            </Card>
            <Modal open={reviewModalState} onClose={closeReviewModal} >
                <Fade in={reviewModalState}>
                    <Box sx={ModalStyle}>
                        <Typography className='addReviewTitle' variant="h5">Share your thoughts:</Typography>
                        <TextareaAutosize 
                            className="addReviewInput" 
                            maxLength={120} 
                            value = {userReview}
                            onChange={(e) => setUserReview(e.target.value)}
                        />
                        <Button color='warning' className='addReviewButton' onClick={() => addReview()}>Submit</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
        
    )
}