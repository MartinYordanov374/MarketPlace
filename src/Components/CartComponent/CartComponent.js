import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import { Buffer } from 'buffer';
import {Card, CardActionArea, Typography, Button, Divider, Box} from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import './CartComponentStyling.css'
export default function CartComponent() {

    const items = JSON.parse(localStorage.getItem('productsInCart'))
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

    return (
        <Box className="MyCartWrapper">
            <Navbar/>
                <div className="MyCartContent">
                    {items && items.map((product) => {
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
                    })}
                </div>
                <Card className="CheckoutSummary">
                    <Typography variant = 'h2' className = 'CheckoutSUmmaryTitle'>Summary</Typography>

                    <Divider/>
                    <Typography variant = 'h3' className = "totalPriceIndicator" >Total Price: </Typography>
                    <Typography variant = 'h4' className = 'totalPrice'> {"$ " + items.reduce((a,b) => a + b.productPrice, 0).toFixed(2)} </Typography>
                    <Typography variant = 'h2' className = 'plusSign'> + </Typography>
                    <Typography variant = 'h4' className = 'deliveryIndicator'> $ 10.00 </Typography>
                    <Divider/>
                    <Typography variant = 'h4' className = 'finalPrice'>{"$ " + (Number(items.reduce((a,b) => a + b.productPrice, 0) + 10).toFixed(2))} </Typography>

                    <Button variant = 'contained' color = 'warning' className = 'submitOrderBtn'> <strong> Submit Order </strong> </Button>
                </Card>
            <Footer/>
        </Box>


    )
}