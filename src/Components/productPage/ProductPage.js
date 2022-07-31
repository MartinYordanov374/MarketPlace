import Navbar from "../Navbar/navbar"
import Footer from "../Footer/footer"
import Axios from 'axios'
import { useEffect, useState } from "react"
import './ProductPageStyling.css'
import { Buffer } from 'buffer';
import { Button,CardActionArea,Divider,Card,Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CircularProgress from '@mui/material/CircularProgress';
import {Rating} from 'react-simple-star-rating'   
import AddProductReviewModal from "../AddProductReviewModal/AddProductReviewModal"

export default function ProductPage()
{
    const productID = window.location.href.split('/')[4]
    const [targetProduct, setTargetProduct] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [rating, setRating] = useState(0)
    const [userData, setUserData] = useState('')

    useEffect(() => {

        async function getProductData()
        {
            let res = await Axios.post('http://localhost:3001/getProductById', {TargetProductId: productID})
            .then((res) => {
                setTargetProduct(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

            Axios.get('http://localhost:3001/getCurrentUserSession', {withCredentials: true})
            .then((res) => {
                setUserData(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })

            setIsLoading(false)
        }



        getProductData()
    }, [])

    const handleRating = (rate) => {
        switch(rate){
            case 20:
                rate = 1
                break;
            case 40:
                rate = 2
                break;
            case 60:
                rate = 3
                break;
            case 80:
                rate = 4
                break;
            case 100:
                rate = 5
                break;
        }
        setRating(rate)
        console.log(rating)
    }

    return (
        <div>
            <Navbar/>
                {
                    isLoading == true ?
                    <CircularProgress className="loadingCircle" color="warning" /> 
                    :
                    <div className="targetProductWrapper">
                        <div className="TargetProduct">

                            <div className="MenusWrapper">

                                <div className="leftSideMenu">

                                    <div className="ProductImageWrapper">
                                        <img className="productImage"
                                        width="330px"
                                        height="470px"
                                        src={`data:${targetProduct.productImage.contentType};base64,
                                        ${Buffer.from(targetProduct.productImage.data.data).toString('base64')}`}/>
                                    </div>
                                    
                                </div>

                                <div className="rightSideMenu">

                                    <div className="ProductTitleWrapper">
                                        <h1 className="productTitle">{targetProduct.productName}</h1>
                                        <Rating
                                            transition
                                            onClick={handleRating}
                                            ratingValue={rating}
                                            size={25}
                                        />
                                        {targetProduct.productRating.length < 1 ?
                                            <p>Rating: 0.00 / 5.00</p>
                                            :
                                            <p>Rating: {targetProduct.productRating} / 5.00</p>
                                        }
                                    </div>
                                    <Divider/>
                                    
                                    <div className="productDescriptionWrapper">
                                        <p className="productDescription">{targetProduct.productDescription}</p>
                                    </div>
                                    <Divider/>
                                    <div className="productInteractionWrapper">
                                        <div className="productPriceWrapper">
                                            <p className="productPrice">$ {targetProduct.productPrice.toFixed(2)}</p>
                                        </div>
                                        <Button color='warning' variant='contained' className='addProductButton'> 
                                            <AddShoppingCartIcon/> 
                                            <strong> Add to cart </strong>
                                        </Button>

                                    </div>
                                </div>

                            </div>
                            <div className="productReviewsWrapper">
                                <h1>Reviews</h1>
                                <Divider/>
                                {targetProduct.productReviews.length < 1 ?
                                    <AddProductReviewModal productData = {targetProduct} userData = {userData}/>
                                :
                                    targetProduct.productReviews.map((review) => {
                                        console.log(review)
                                        return(
                                            <Card>
                                                <Typography>{review.reviewOwner.username}</Typography>

                                                <Typography>{review.reviewContent}</Typography>

                                            </Card>
                                        )
                                    })
                                }
                            </div>

                            <div className="productRatingWrapper">
                                <h1>{targetProduct.productRating}</h1>
                            </div>
                        </div>
                    </div>
                }
            <Footer/>
        </div>
    )
}