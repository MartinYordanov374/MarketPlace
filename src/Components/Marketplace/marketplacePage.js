import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import Axios from 'axios'
import {useState, useEffect, useMemo} from 'react'
import './marketplaceStyles.css'
import {Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Link, Divider, Modal, Fade, Box, Input, TextField} from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from 'buffer';

export default function Marketplace ()
{
    // let targetMarketplaceData = getMarketplaceData()

    const [marketplaceData, setMarketplaceData] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [isUserOnProducts, setIsUserOnProducts] = useState(true)
    let marketplaceID = window.location.href.split('/')[4]

    useEffect(() => {
        async function getMarketplaceData()
        {
            let targetMarketplaceData = await Axios.post('http://localhost:3001/getMarketplaceById', {marketplaceID: marketplaceID}, {withCredentials: true})
            setMarketplaceData(targetMarketplaceData.data)
            setIsLoading(false)
        }

        getMarketplaceData()
    }, [])

    const handleMarketplaceView = () => {
        if(isUserOnProducts == true)
        {
            setIsUserOnProducts(false)
        }
        else
        {
            setIsUserOnProducts(true)
        }
    }

    const reviewNotHelpfulHandler = (reviewID) => {

        Axios.get('http://localhost:3001/getSessionData', {withCredentials: true})
        .then((res) => {
            let userID = res.data
            Axios.post('http://localhost:3001/marketplaceReviewNotHelpful', {userID: userID, marketplaceID: marketplaceID, reviewID: reviewID}, {withCredentials: true})
            .then((res) => {
                toast.success(res.data)
            })
        })
    }

    const reviewHelpfulHandler = (reviewID) => {
        Axios.get('http://localhost:3001/getSessionData', {withCredentials: true})
        .then((res) => {
            let userID = res.data
            Axios.post('http://localhost:3001/marketplaceReviewHelpful', {userID: userID, marketplaceID: marketplaceID, reviewID: reviewID}, {withCredentials: true})
            .then((res) => {
                toast.success(res.data)
            })
        })
    }

    if(isLoading)
    {
        return (
        <div>
            <Navbar/>
                <div className="loadingCircleWrapper">
                    <CircularProgress color="warning" />
                    <h2>Loading data...</h2>
                </div>
            <Footer/>
        </div>)
    }

    else
    {
            return (
            <div>
                <Navbar/>
                <ToastContainer/>
                    <div className="marketplaceWrapper">
                        <div className="marketplaceBannerWrapper">
                        <img className="marketplaceBanner" src={`data:${marketplaceData.marketplaceImage.contentType};base64, ${Buffer.from(marketplaceData.marketplaceImage.data.data).toString('base64')}`}/>

                            <div className="marketplaceBanner">

                            </div>
                        </div>

                        <div className="marketplaceDetailsWrapper">
                            <h1 className="marketplaceName"> {marketplaceData.marketplaceName} </h1>
                            <div className="marketplaceOwner"> By: {marketplaceData.marketplaceOwner.username} </div>

                            <div className="marketplaceDescription"> 
                                <span className="marketplaceDescriptionSpan">
                                    {marketplaceData.marketplaceDescription} 
                                </span>
                            </div>

                            <div className="marketplaceTagsWrapper">
                                {marketplaceData.marketplaceTags.map((tag) => {
                                    return ( 
                                        <div className="marketplaceTagWrapper">
                                            <span className="marketplaceTag"> <SellIcon className='tagIcon'/> {tag}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    <Divider/>
                    <div>
                        {
                            isUserOnProducts == true ?
                            <div className="marketplaceViewOptions">
                                <Card className="ProductsOption">
                                    <CardActionArea sx={{color: "orange"}} onClick={() => handleMarketplaceView()}>
                                        <h1>Products</h1>
                                    </CardActionArea>
                                </Card>
                                <Card className="ReviewsOption">
                                    <CardActionArea onClick={() => handleMarketplaceView()}>
                                        <h1>Reviews</h1>
                                    </CardActionArea>
                                </Card>
                            </div>
                            :
                            <div className="marketplaceViewOptions">
                                <Card className="ProductsOption">
                                    <CardActionArea onClick={() => handleMarketplaceView()}>
                                        <h1>Products</h1>
                                    </CardActionArea>
                                </Card>
                                <Card className="ReviewsOption">
                                    <CardActionArea sx={{color: "orange"}} onClick={() => handleMarketplaceView()}>
                                        <h1>Reviews</h1>
                                    </CardActionArea>
                                </Card>
                            </div>
                        }
                    </div>
                    {
                        isUserOnProducts ? 
                        <div className="marketplaceProducts">
                        {
                            marketplaceData.marketplaceProducts.length >= 1 ?
                            marketplaceData.marketplaceProducts.map( (prod) => {
                                return(
                                <div class='marketplaceProduct'>
                                    <Card className='productCard'>
                                        <CardActionArea>
                                            <CardContent>
                                                
                                                <StorefrontIcon className="productImage"/>
                                                <Divider/>

                                                <h2 className="productName">{prod.productName}</h2>
                                                <Divider/>

                                                <h3 className="productDescription">{prod.productDescription}</h3>

                                            </CardContent>
                                            
                                        </CardActionArea>
                                        <Divider/>
                                        <p className="productPrice"><strong>$ {prod.productPrice}</strong></p>
                                        <Divider/>
                                        <Button className="buyProductButton" sx={{fontSize: 15}} color='warning'> <strong> Add to cart </strong> <AddShoppingCartIcon/>  </Button>
                                    </Card>
                                </div>
                                )
                            })
                            :
                            <h1>No products here</h1>
                        }
                        </div>
                        :
                        <div className="marketplaceReviews">
                            
                            { marketplaceData.marketplaceReviews.length >= 1 ?
                                marketplaceData.marketplaceReviews.map((review) => {
                                    return (
                                        <Card className="marketplaceReview">
                                            {/* TODO: ADD PROFILE PICTURE TO THE REVIEW POST */}

                                            <span className="reviewGiver">
                                                <a href={"/profile/" + review.reviewOwner._id} class="reviewGiverUsername">{review.reviewOwner.username}</a>
                                            </span>
                                            <span className="reviewRatingWrapper">
                                                <p className="reviewRating">{review.positiveRatings.length - review.negativeRatings.length} review rating</p>
                                            </span>
                                            <Divider/>
                                            <span className="reviewContent">
                                                <p>{review.reviewContent}</p>
                                            </span>

                                            <Divider/>
                                            <span className="reviewQuestionnaire">
                                                <p>Was this review helpful?</p>
                                                <ThumbUpIcon className="reviewHelpfulIcon" onClick={() => reviewHelpfulHandler(review._id)}/>
                                                <ThumbDownAltIcon className="reviewNotHelpfulIcon" onClick={() => reviewNotHelpfulHandler(review._id)}/>

                                            </span>
                                        </Card>
                                        
                                    )
                                })
                                :
                                <h1>No reviews to show</h1>
                            }
                        </div>
                    }
                <Footer/>
            </div>
        )
    }
}

