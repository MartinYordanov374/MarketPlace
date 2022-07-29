import Navbar from "../Navbar/navbar"
import Footer from "../Footer/footer"
import Axios from 'axios'
import { useEffect, useState } from "react"
import './ProductPageStyling.css'
import { Buffer } from 'buffer';
import { Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProductPage()
{
    const productID = window.location.href.split('/')[4]
    const [targetProduct, setTargetProduct] = useState('')

    const [isLoading, setIsLoading] = useState(true)

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
                                <div className="ProductTitleWrapper">
                                    <h1 className="productTitle">{targetProduct.productName}</h1>
                                </div>

                                <div className="ProductImageWrapper">
                                    <img className="MarketplaceIcon" src={`data:${targetProduct.productImage.contentType};base64,
                                    ${Buffer.from(targetProduct.productImage.data.data).toString('base64')}`}/>

                                </div>
                            </div>

                            <div className="rightSideMenu">

                                <div className="productDescriptionWrapper">
                                    <p className="productDescription">{targetProduct.productDescription}</p>
                                </div>
                                <div className="productPriceWrapper">
                                    <p className="productPrice">$ {targetProduct.productPrice.toFixed(2)}</p>
                                </div>
                                <Button color='warning' variant='contained'> 
                                    <AddShoppingCartIcon/> 
                                    <strong> Add to cart </strong>
                                </Button>
                            </div>

                        </div>




                            <div className="productReviewsWrapper">
                                <h1>{targetProduct.productReviews}</h1>
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