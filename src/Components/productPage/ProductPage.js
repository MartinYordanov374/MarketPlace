import Navbar from "../Navbar/navbar"
import Footer from "../Footer/footer"
import Axios from 'axios'
import { useEffect, useState } from "react"
import './ProductPageStyling.css'
import { Buffer } from 'buffer';
import { Button,CardActionArea,Divider } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CircularProgress from '@mui/material/CircularProgress';
import {Rating} from 'react-simple-star-rating'   

export default function ProductPage()
{
    const productID = window.location.href.split('/')[4]
    const [targetProduct, setTargetProduct] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [rating, setRating] = useState(0)

    useEffect(() => {

        async function getProductData()
        {
            let res = await Axios.post('http://localhost:3001/getProductById', {TargetProductId: productID})
            .then((res) => {
                console.log(res)
                setTargetProduct(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

            setIsLoading(false)

        }
        getProductData()
    }, [])

    const handleRating = () => {

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
                                            initialValue={0}
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
                                <CardActionArea>
                                    <p className="noReviewsMessage"> 
                                        <strong> Be the first to leave a review for this product! </strong>
                                    </p>
                                </CardActionArea>
                                :
                                <h1>{targetProduct.productReviews}</h1>
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