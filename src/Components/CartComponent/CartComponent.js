import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import { Buffer } from 'buffer';
import {Card, CardActionArea, Typography, Button, Divider, Box} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import './CartComponentStyling.css'
import Axios from 'axios'
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function CartComponent() {

    // let cartProducts = await Axios.post('getCartcartProducts', )
    // get UserID

    let [userID, setUserID] = useState('')
    let [cartProducts, setCartProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Axios.get('http://localhost:3001/getCurrentUserSession', {withCredentials: true})
        .then((res) => {
            let targetUserID = res.data.user.id
            setUserID(targetUserID)
            Axios.post('http://localhost:3001/getProductsInCart', {userID: targetUserID})
            .then((res) => {
                setCartProducts(res.data)
                setIsLoading(false)
        
            })
        })

    }, [])

    const removeProductFromCart = (productID) => {
        Axios.post('http://localhost:3001/removeProductFromCart', {userID: userID, productID: productID})
        .then((res) => {
            toast.success(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
   
    const finishOrder = () => {
        toast.success('Your order was successfull!')
        Axios.post('http://localhost:3001/clearCart', {userID: userID})
    }

    const clearCart = () => {
        Axios.post('http://localhost:3001/clearCart', {userID: userID})
        .then((res) => {
            toast.success(res.data)
        })
    }

    const productLeftMenuStyle = {

    }

    const productRightMenuStyle = {
        width: "50% "

    }

    const CartContentWrapperStyle = {
        display: "flex",
        marginLeft: "30%",
        marginTop: "5%",
        marginBottom: "5%",
    }
    const productNameStyle = {
        marginLeft: "2%",
        marginRight: "1%",
        marginTop: "2%",
    }

    const productDescriptionStyle = {
        marginLeft: "2%",
        marginRight: "5%",
        marginTop: "3%",
    }

    // TODO Add options to :
    //  -- clear cart
    //  -- remove a specific element from cart

    return (

        <Box className="MyCartWrapper">
            <Navbar/>
            <ToastContainer/>
            {isLoading == false ?
                <div className="InsideWrapper">
                    

                    <div className="MyCartContent">
                        <Typography variant='h4' className = 'MyCartProducts'> My cart's products: </Typography>
                        <Divider/>
                        {cartProducts && cartProducts.length >= 1 
                            ?
                                <span className="clearCartButton" onClick = { () => clearCart() }>
                                    <DeleteOutlineOutlinedIcon className = 'ClearCartIcon'/>
                                    <br></br>
                                    <Typography variant = 'p' className = 'ClearCartText'> Clear Cart </Typography>
                                </span>
                            :
                            ""
                        }
                       {
                            cartProducts && cartProducts.length >= 1 
                            ?
                                cartProducts && cartProducts.map((product) => {
                                    return (
                                    <Box className="shoppingCartProductWrapper" sx = { CartContentWrapperStyle }>
                                        <Card className="productLeftMenu" sx = { productLeftMenuStyle }>
                                            <img
                                                src={
                                                    `data: image/jpg;base64,
                                                    ${Buffer.from(product.productImage.data).toString('base64')}`
                                                }
                                                width="140px"
                                            />
                                            <Typography variant="h6">
                                                {"$ " + product.productPrice.toFixed(2)}
                                            </Typography>
                                            <Divider/>
                                        </Card>
                                        <Card className="productRightMenu" sx = { productRightMenuStyle }>
                                            <Typography variant="h6" sx = { productNameStyle }>
                                                {product.productName}
                                                <ClearIcon className = 'RemoveProductButton' onClick = { (e) => removeProductFromCart(product._id) }/>
                                            </Typography>
                                            <Divider/>
                                            <Typography variant="h6" sx = { productDescriptionStyle }>
                                            {product.productDescription.length >= 120 ?
                                                product.productDescription.slice(0,120) + '...'
                                                :
                                                product.productDescription}
                                            </Typography>
                                        </Card>
                                    </Box>)
                                })
                            :
                            <h1 className = "NoProductsMessage" >There are no products in your cart yet.</h1>
                        }
                    </div>
                    <Card className="CheckoutSummary">
                        <Typography variant = 'h2' className = 'CheckoutSUmmaryTitle'>Summary</Typography>
                        <Divider/>
                        <Typography variant = 'h3' className = "totalPriceIndicator" >Total Price: </Typography>
                        <Typography variant = 'h4' className = 'totalPrice'> {"$ " + cartProducts.reduce((a,b) => a + b.productPrice, 0).toFixed(2)} </Typography>
                        <Typography variant = 'h2' className = 'plusSign'> + </Typography>
                        <Typography variant = 'h4' className = 'deliveryIndicator'> $ 10.00 </Typography>
                        <Divider/>
                        <Typography variant = 'h4' className = 'finalPrice'>{"$ " + (Number(cartProducts.reduce((a,b) => a + b.productPrice, 0) + 10).toFixed(2))} </Typography>
                        {cartProducts && cartProducts.length >= 1 
                            ?
                                <Button variant = 'contained' color = 'warning' className = 'submitOrderBtn' onClick = {() => finishOrder()}> <strong> Submit Order </strong> </Button>
                            :
                                <Button variant = 'contained' color = 'warning' className = 'submitOrderBtn' disabled = {true}> <strong> Submit Order </strong> </Button>
                        }
                    </Card>
                </div>
                :
                <h1>Loading...</h1>
            }
            <Footer/>
        </Box>
    )
    
}