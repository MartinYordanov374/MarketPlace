import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import {Card, Divider} from '@mui/material'

import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from 'buffer';

// import './reviewsStyling.css'

export default function UserReview(reviewData) {
    console.log(reviewData)
    const reviewNotHelpfulHandler = (reviewID) => {
    
        // Axios.get('http://localhost:3001/getSessionData', {withCredentials: true})
        // .then((res) => {
        //     let userID = res.data
        //     // Axios.post('http://localhost:3001/marketplaceReviewNotHelpful', {userID: userID, marketplaceID: marketplaceData.marketplaceID, reviewID: reviewID}, {withCredentials: true})
        //     // .then((res) => {
        //     //     toast.success(res.data)
        //     // })
        // })
    }
    
    // const reviewHelpfulHandler = (reviewID) => {
    //     Axios.get('http://localhost:3001/getSessionData', {withCredentials: true})
    //     .then((res) => {
    //         let userID = res.data
    //         Axios.post('http://localhost:3001/marketplaceReviewHelpful', {userID: userID, marketplaceID: marketplaceData.marketplaceID, reviewID: reviewID}, {withCredentials: true})
    //         .then((res) => {
    //             toast.success(res.data)
    //         })
    //     })
    // }
    return (
        <div>
            <ToastContainer/>

                <Card className="marketplaceReview">

                    <span className="reviewGiver">
                        {reviewData.targetReview.reviewOwner.profilePicture != undefined 
                            ?
                            <a href={"/profile/" + reviewData.targetReview.reviewOwner._id}>
                                <img className='reviewGiverPfp' src={`data:image/jpg;base64, ${Buffer.from(reviewData.targetReview.reviewOwner.profilePicture).toString('base64')}`}></img>
                            </a>
                            :
                            <PersonOutlineIcon className="reviewGiverIcon"/>
                        }
                        <a href={"/profile/" + reviewData.targetReview.reviewOwner._id} class="reviewGiverUsername">{reviewData.targetReview.reviewOwner.username}</a>
                    </span>
                    <span className="reviewRatingWrapper">
                        <p className="reviewRating">{reviewData.targetReview.positiveRatings.length - reviewData.targetReview.negativeRatings.length} review rating</p>
                    </span>
                    <Divider/>
                    <span className="reviewContent">
                        <p>{reviewData.targetReview.reviewContent}</p>
                    </span>

                    <Divider/>
                    {/* <span className="reviewQuestionnaire">
                        <p>Was this review helpful?</p>
                        <ThumbUpIcon className="reviewHelpfulIcon" onClick={() => reviewHelpfulHandler(reviewData.targetReview._id)}/>
                        <ThumbDownAltIcon className="reviewNotHelpfulIcon" onClick={() => reviewNotHelpfulHandler(reviewData.targetReview._id)}/>

                    </span> */}
                </Card>
        </div>

        
    )
}